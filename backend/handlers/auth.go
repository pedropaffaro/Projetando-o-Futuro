package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	//"github.com/pedropaffaro/projetando-o-futuro-back/database"
	"github.com/pedropaffaro/projetando-o-futuro-back/models"
	"github.com/pedropaffaro/projetando-o-futuro-back/providers"
)

func Login(c *gin.Context) {
	var user models.User
	user.Username = "admin"
	token, _ := providers.GenerateToken(user.Username)
	c.JSON(http.StatusOK, gin.H{"token": token})

	// var req models.LoginRequest
	// passwordProvider := providers.NewBcryptProvider()

	// if err := c.ShouldBindJSON(&req); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos"})
	// 	return
	// }

	// var user models.User
	// if err := database.DB.Where("username = ?", req.Username).First(&user).Error; err != nil {
	// 	c.JSON(http.StatusUnauthorized, gin.H{"error": "Credenciais inválidas"})
	// 	return
	// }

	// if err := passwordProvider.Compare(user.Password, req.Password); err != nil {
	// 	c.JSON(http.StatusUnauthorized, gin.H{"error": "Credenciais inválidas"})
	// 	return
	// }

	// token, err := providers.GenerateToken(user.Username)
	// if err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao gerar token"})
	// 	return
	// }

	// c.JSON(http.StatusOK, gin.H{"token": token})
}
