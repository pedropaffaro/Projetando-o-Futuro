package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/pedropaffaro/projetando-o-futuro-back/database"
	"github.com/pedropaffaro/projetando-o-futuro-back/models"
)

// proximoSabado retorna a data do sábado da semana corrente (ou hoje, se hoje for sábado) no formato "YYYY-MM-DD"
// Usada como chave da semana de alocação
func proximoSabado() string {
	now := time.Now()
	weekday := int(now.Weekday()) // 0=Dom, 1=Seg ... 6=Sáb
	daysUntilSat := (6 - weekday + 7) % 7
	sabado := now.AddDate(0, 0, daysUntilSat)
	return sabado.Format("2006-01-02")
}

// GET /alocacoes: retorna todas as alocações da semana atual
func GetAlocacoes(c *gin.Context) {
	semana := proximoSabado()
	var alocacoes []models.Alocacao
	database.DB.Where("semana_ref = ?", semana).Find(&alocacoes)
	c.JSON(http.StatusOK, gin.H{
		"semanaRef": semana,
		"alocacoes": alocacoes,
	})
}

// POST /admin/alocacoes: salva (ou atualiza) uma célula da grade semanal
// Body JSON:
//	{ "turma": "Turma 1", "horarioId": 1, "monitorA": "Allan", "monitorB": "Nina", "salaId": 2, "salaNome": "Sala TV" }
func SaveAlocacao(c *gin.Context) {
	var input models.Alocacao
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos"})
		return
	}

	semana := proximoSabado()
	input.SemanaRef = semana

	// Upsert: se já existe alocação para turma+horario nessa semana, atualiza
	var existing models.Alocacao
	result := database.DB.Where(
		"semana_ref = ? AND turma = ? AND horario_id = ?",
		semana, input.Turma, input.HorarioID,
	).First(&existing)

	if result.Error == nil {
		// Atualiza
		existing.MonitorA = input.MonitorA
		existing.MonitorB = input.MonitorB
		existing.SalaID = input.SalaID
		existing.SalaNome = input.SalaNome
		database.DB.Save(&existing)
		c.JSON(http.StatusOK, existing)
	} else {
		// Cria
		database.DB.Create(&input)
		c.JSON(http.StatusCreated, input)
	}
}

// POST /admin/alocacoes/bulk: salva toda a grade de uma vez (array de alocações)
// Body JSON: array de { turma, horarioId, monitorA, monitorB, salaId, salaNome }
func SaveAlocacoesBulk(c *gin.Context) {
	var inputs []models.Alocacao
	if err := c.ShouldBindJSON(&inputs); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos"})
		return
	}

	semana := proximoSabado()

	for _, input := range inputs {
		input.SemanaRef = semana

		var existing models.Alocacao
		result := database.DB.Where(
			"semana_ref = ? AND turma = ? AND horario_id = ?",
			semana, input.Turma, input.HorarioID,
		).First(&existing)

		if result.Error == nil {
			existing.MonitorA = input.MonitorA
			existing.MonitorB = input.MonitorB
			existing.SalaID = input.SalaID
			existing.SalaNome = input.SalaNome
			database.DB.Save(&existing)
		} else {
			database.DB.Create(&input)
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "Grade salva com sucesso", "semanaRef": semana})
}

// DELETE /admin/alocacoes/reset: apaga a grade da semana atual (para edição do zero)
func ResetAlocacoes(c *gin.Context) {
	semana := proximoSabado()
	database.DB.Where("semana_ref = ?", semana).Delete(&models.Alocacao{})
	c.JSON(http.StatusOK, gin.H{"message": "Grade resetada", "semanaRef": semana})
}