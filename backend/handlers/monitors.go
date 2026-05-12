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

// GET /monitors: lista todos os monitores
func GetMonitors(c *gin.Context) {
	var monitors []models.Monitor
	database.DB.Order("apelido asc").Find(&monitors)
	c.JSON(http.StatusOK, monitors)
}

// POST /admin/monitors/import: importa (ou re-importa) monitores a partir de um CSV
// O CSV deve ter as colunas "Nome do voluntário", "Apelido", "Origem do educador"
// Se o apelido já existir, atualiza; caso contrário, cria
func ImportMonitors(c *gin.Context) {
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

	// Lê o cabeçalho
	header, err := reader.Read()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CSV inválido"})
		return
	}

	// Descobre índices das colunas pelo nome (case-insensitive)
	idxNome, idxApelido, idxOrigem := -1, -1, -1
	for i, h := range header {
		switch strings.TrimSpace(strings.ToLower(h)) {
		case "nome do voluntário", "nome do voluntario":
			idxNome = i
		case "apelido":
			idxApelido = i
		case "origem do educador":
			idxOrigem = i
		}
	}

	if idxApelido == -1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Coluna 'Apelido' não encontrada no CSV"})
		return
	}

	imported := 0
	updated := 0

	for {
		row, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			continue
		}

		apelido := strings.TrimSpace(row[idxApelido])
		if apelido == "" {
			continue
		}

		nome := ""
		if idxNome >= 0 && idxNome < len(row) {
			nome = strings.TrimSpace(row[idxNome])
		}
		origem := ""
		if idxOrigem >= 0 && idxOrigem < len(row) {
			origem = strings.TrimSpace(row[idxOrigem])
		}

		// Upsert por apelido
		var existing models.Monitor
		result := database.DB.Where("apelido = ?", apelido).First(&existing)
		if result.Error != nil {
			// Não existe -> criar
			database.DB.Create(&models.Monitor{
				NomeCompleto: nome,
				Apelido:      apelido,
				Origem:       origem,
			})
			imported++
		} else {
			// Já existe -> atualizar nome e origem
			existing.NomeCompleto = nome
			existing.Origem = origem
			database.DB.Save(&existing)
			updated++
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"message":  "Importação concluída",
		"imported": imported,
		"updated":  updated,
	})
}