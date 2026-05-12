package handlers

import (
	"encoding/csv"
	"io"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/pedropaffaro/projetando-o-futuro-back/database"
	"github.com/pedropaffaro/projetando-o-futuro-back/models"
)

// GET /alunos: lista todos os alunos, opcionalmente filtrados por turma
// Query param: ?turma=Turma+1
func GetAlunos(c *gin.Context) {
	var alunos []models.Aluno
	turma := c.Query("turma")
	if turma != "" {
		database.DB.Where("turma = ?", turma).Order("nome asc").Find(&alunos)
	} else {
		database.DB.Order("turma asc, nome asc").Find(&alunos)
	}
	c.JSON(http.StatusOK, alunos)
}

// POST /admin/alunos/import: importa (ou re-importa) alunos a partir de um CSV
// Colunas esperadas: "Nome", "Turma"
// Upsert: se nome+turma já existir, não duplica
func ImportAlunos(c *gin.Context) {
	file, err := c.FormFile("csv")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Arquivo CSV não enviado"})
		return
	}

	f, err := file.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao abrir arquivo"})
		return
	}
	defer f.Close()

	reader := csv.NewReader(f)

	header, err := reader.Read()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CSV inválido"})
		return
	}

	idxNome, idxTurma := -1, -1
	for i, h := range header {
		switch strings.ToLower(strings.TrimSpace(h)) {
		case "nome":
			idxNome = i
		case "turma":
			idxTurma = i
		}
	}

	if idxNome == -1 || idxTurma == -1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Colunas 'Nome' e 'Turma' são obrigatórias"})
		return
	}

	imported := 0
	for {
		row, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			continue
		}

		nome := strings.TrimSpace(row[idxNome])
		turma := strings.TrimSpace(row[idxTurma])
		if nome == "" || turma == "" {
			continue
		}

		// Evita duplicatas por nome+turma
		var existing models.Aluno
		result := database.DB.Where("nome = ? AND turma = ?", nome, turma).First(&existing)
		if result.Error != nil {
			database.DB.Create(&models.Aluno{Nome: nome, Turma: turma})
			imported++
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "Importação concluída", "imported": imported})
}