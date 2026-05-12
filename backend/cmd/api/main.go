package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/pedropaffaro/projetando-o-futuro-back/database"
	"github.com/pedropaffaro/projetando-o-futuro-back/handlers"
	"github.com/pedropaffaro/projetando-o-futuro-back/middlewares"
)

func main() {
    database.InitDB()

    r := gin.Default()
    
    r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.Static("/uploads", "./uploads")

    // Rotas Públicas
    r.POST("/login", handlers.Login)
    r.GET("/projects", handlers.GetProjects)
	r.GET("/sponsors", handlers.GetSponsors)

	
	// Grupo Admin
	admin := r.Group("/admin")
	admin.Use(middlewares.AuthMiddleware()) 
	{
		admin.POST("/projects", handlers.CreateProject)
		admin.DELETE("/projects/:id", handlers.DeleteProject)
		admin.POST("/sponsors", handlers.CreateSponsor)
		admin.DELETE("/sponsors/:id", handlers.DeleteSponsor)
	}

	r.Run(":8080")
}