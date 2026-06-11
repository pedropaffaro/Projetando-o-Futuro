package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pedropaffaro/projetando-o-futuro-back/database"
	"github.com/pedropaffaro/projetando-o-futuro-back/models"
	"github.com/pedropaffaro/projetando-o-futuro-back/providers"
)

// func Login(c *gin.Context) {
// 	var user models.User
// 	user.Username = "admin"
// 	token, _ := providers.GenerateToken(user.Username)
// 	c.JSON(http.StatusOK, gin.H{"token": token})

// 	var req models.LoginRequest
// 	passwordProvider := providers.NewBcryptProvider()

// 	if err := c.ShouldBindJSON(&req); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos"})
// 		return
// 	}

// 	if err := database.DB.Where("username = ?", req.Username).First(&user).Error; err != nil {
// 	 	c.JSON(http.StatusUnauthorized, gin.H{"error": "Credenciais inválidas"})
// 	 	return
// 	}

// 	if err := passwordProvider.Compare(user.Password, req.Password); err != nil {
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "Credenciais inválidas"})
// 	 	return
// 	}

// 	token, err := providers.GenerateToken(user.Username)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao gerar token"})
// 	 	return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"token": token})
// }
func Login(c *gin.Context) {
	var req models.LoginRequest
	passwordProvider := providers.NewBcryptProvider()

	// 1. Valida e extrai o JSON que veio do React
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos"})
		return
	}

	// 2. Busca o usuário correspondente no banco de dados
	var user models.User
	if err := database.DB.Where("username = ?", req.Username).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Credenciais inválidas"})
		return
	}

	// 3. Compara a senha digitada com o hash salvo no banco
	if err := passwordProvider.Compare(user.Password, req.Password); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Credenciais inválidas"})
		return
	}

	// 4. Se a senha bater, aí sim gera o Token JWT
	token, err := providers.GenerateToken(user.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao gerar token"})
		return
	}

	// 5. Retorna o token limpo (apenas uma vez!)
	c.JSON(http.StatusOK, gin.H{"token": token})
}