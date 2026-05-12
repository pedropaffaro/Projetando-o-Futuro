package handlers

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/pedropaffaro/projetando-o-futuro-back/database"
	"github.com/pedropaffaro/projetando-o-futuro-back/models"
)

// LER (Read)
func GetSponsors(c *gin.Context) {
    var sponsors []models.Sponsor
    database.DB.Find(&sponsors)
    c.JSON(http.StatusOK, sponsors)
}

// CRIAR (Create)
func CreateSponsor(c *gin.Context) {
    name := c.PostForm("name")

    file, err := c.FormFile("logo")
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Arquivo de logo não enviado"})
        return
    }

    dst := "./uploads/" + file.Filename
    if err := c.SaveUploadedFile(file, dst); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao salvar logo"})
        return
    }

    newSponsor := models.Sponsor{
        Name: name,
        Logo: dst,
    }
    database.DB.Create(&newSponsor)
    
    c.JSON(http.StatusCreated, newSponsor)
}

// DELETAR (Delete)
func DeleteSponsor(c *gin.Context) {
    id := c.Param("id")
    var sponsor models.Sponsor

    if err := database.DB.First(&sponsor, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Patrocinador não encontrado"})
        return
    }

    // Exclui a imagem da pasta uploads para não ocupar espaço
    if sponsor.Logo != "" {
        os.Remove(sponsor.Logo)
    }

    database.DB.Unscoped().Delete(&sponsor)
    c.JSON(http.StatusOK, gin.H{"message": "Patrocinador excluído com sucesso"})
}