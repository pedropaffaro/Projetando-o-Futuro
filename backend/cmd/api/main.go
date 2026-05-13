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
 
	// Projetos e Patrocinadores (leitura pública)
	r.GET("/projects", handlers.GetProjects)
	r.GET("/sponsors", handlers.GetSponsors)
	
	// Grupo Admin (JWT)
	admin := r.Group("/admin")
	admin.Use(middlewares.AuthMiddleware())
	{
		// Projetos
		admin.POST("/projects", handlers.CreateProject)
		admin.PUT("/projects/:id", handlers.UpdateProject)
		admin.DELETE("/projects/:id", handlers.DeleteProject)
 
		// Patrocinadores
		admin.POST("/sponsors", handlers.CreateSponsor)
		admin.DELETE("/sponsors/:id", handlers.DeleteSponsor)
 
		// Importação de monitores via CSV
		admin.POST("/monitors/import", handlers.ImportMonitors)
		// Monitores (o front usa para popular os selects)
		admin.GET("/monitors", handlers.GetMonitors)
		
		// Importação de alunos via CSV
		admin.POST("/alunos/import", handlers.ImportAlunos)
 		// Alunos (o front usa para popular os selects)
		admin.GET("/alunos", handlers.GetAlunos)

		// Grade semanal de salas
		admin.POST("/alocacoes", handlers.SaveAlocacao)
		admin.POST("/alocacoes/bulk", handlers.SaveAlocacoesBulk)
		admin.DELETE("/alocacoes/reset", handlers.ResetAlocacoes)
		// Grade semanal (leitura — exibida no painel)
		admin.GET("/alocacoes", handlers.GetAlocacoes)
 
		// Chamada do dia
		admin.POST("/chamadas/bulk", handlers.SaveChamadaBulk)
		// Chamadas (leitura para consulta)
		admin.GET("/chamadas", handlers.GetChamadas)
	}


	r.Run(":8080")
}