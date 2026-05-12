package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/pedropaffaro/projetando-o-futuro-back/database"
	"github.com/pedropaffaro/projetando-o-futuro-back/models"
)

// hoje retorna a data atual no formato "YYYY-MM-DD"
func hoje() string {
	return time.Now().Format("2006-01-02")
}

// GET /chamadas?data=2026-05-17&turma=Turma+1
// Retorna todos os registros de presença de uma data (e opcionalmente turma)
func GetChamadas(c *gin.Context) {
	data := c.Query("data")
	if data == "" {
		data = hoje()
	}
	turma := c.Query("turma")

	var chamadas []models.Chamada
	query := database.DB.Where("data = ?", data)
	if turma != "" {
		query = query.Where("turma = ?", turma)
	}
	query.Order("turma asc, aluno_nome asc").Find(&chamadas)

	c.JSON(http.StatusOK, gin.H{
		"data":    data,
		"turma":   turma,
		"chamadas": chamadas,
	})
}

// POST /admin/chamadas/bulk: salva a chamada completa de uma turma
// Body JSON:
//	{ "data": "2026-05-17", "turma": "Turma 1", "registros": [ { "alunoId": 1, "alunoNome": "Ana", "status": "presente" } ] }
type RegistroChamada struct {
	AlunoID   uint   `json:"alunoId"`
	AlunoNome string `json:"alunoNome"`
	Status    string `json:"status"` // "presente" | "falta" | "justificado"
}

type BulkChamadaRequest struct {
	Data      string            `json:"data"`
	Turma     string            `json:"turma"`
	Registros []RegistroChamada `json:"registros"`
}

func SaveChamadaBulk(c *gin.Context) {
	var req BulkChamadaRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos"})
		return
	}

	if req.Data == "" {
		req.Data = hoje()
	}

	for _, reg := range req.Registros {
		// Upsert por data + alunoId
		var existing models.Chamada
		result := database.DB.Where("data = ? AND aluno_id = ?", req.Data, reg.AlunoID).First(&existing)

		if result.Error == nil {
			// Atualiza o status
			existing.Status = reg.Status
			database.DB.Save(&existing)
		} else {
			// Cria novo registro
			database.DB.Create(&models.Chamada{
				Data:      req.Data,
				AlunoID:   reg.AlunoID,
				AlunoNome: reg.AlunoNome,
				Turma:     req.Turma,
				Status:    reg.Status,
			})
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Chamada salva com sucesso",
		"data":    req.Data,
		"turma":   req.Turma,
		"total":   len(req.Registros),
	})
}