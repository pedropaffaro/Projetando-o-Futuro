package handlers

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/pedropaffaro/projetando-o-futuro-back/database"
	"github.com/pedropaffaro/projetando-o-futuro-back/models"
)

func GetProjects(c *gin.Context) {
    var projects []models.Project
    database.DB.Find(&projects)
    c.JSON(200, projects)
}

func CreateProject(c *gin.Context) {
    // 1. Pega os campos de texto
    title := c.PostForm("title")
    desc := c.PostForm("description")
    fullDesc := c.PostForm("fullDescription")
    status := c.PostForm("status")
    color := c.PostForm("color")

    // 2. Pega o arquivo de imagem
    file, _ := c.FormFile("image")
    dst := "./uploads/" + file.Filename
    c.SaveUploadedFile(file, dst) // Salva o arquivo na pasta local do servidor

    // 3. Salva no banco
    newProject := models.Project{
        Title:           title,
        Description:     desc,
        FullDescription: fullDesc,
        Status:          status,
        Color:           color,
        Image:           dst, 
    }
    database.DB.Create(&newProject)
    
    c.JSON(201, newProject)
}

func UpdateProject(c *gin.Context) {
    id := c.Param("id")
    var project models.Project

    // 1. Busca o projeto no banco
    if err := database.DB.First(&project, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Projeto não encontrado"})
        return
    }

    // 2. Atualiza os campos de texto (se vierem vazios, mantém o que já estava)
    project.Title = c.DefaultPostForm("title", project.Title)
    project.Description = c.DefaultPostForm("description", project.Description)
    project.FullDescription = c.DefaultPostForm("fullDescription", project.FullDescription)
    project.Status = c.DefaultPostForm("status", project.Status)
    project.Color = c.DefaultPostForm("color", project.Color)

    // 3. Atualiza a imagem APENAS se um novo arquivo for enviado
    file, err := c.FormFile("image")
    if err == nil {
        // Opcional: apagar a imagem antiga do disco aqui
        dst := "./uploads/" + file.Filename
        c.SaveUploadedFile(file, dst)
        project.Image = dst
    }

    // 4. Salva as alterações
    database.DB.Save(&project)
    c.JSON(http.StatusOK, project)
}

func DeleteProject(c *gin.Context) {
    id := c.Param("id")
    var project models.Project

    if err := database.DB.First(&project, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Projeto não encontrado"})
        return
    }

    // Opcional: Excluir o arquivo da imagem da pasta uploads
    if project.Image != "" {
        os.Remove(project.Image)
    }

    // Exclui do banco
    database.DB.Delete(&project)
    c.JSON(http.StatusOK, gin.H{"message": "Projeto excluído com sucesso"})
}