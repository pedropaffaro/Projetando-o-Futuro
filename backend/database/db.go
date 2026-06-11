package database

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/pedropaffaro/projetando-o-futuro-back/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	// Carrega as variáveis do arquivo .env
	err := godotenv.Load()
	if err != nil {
		log.Println("Aviso: Arquivo .env não encontrado. Usando variáveis de ambiente do sistema.")
	}

	// Busca as variáveis protegidas
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	// Monta a string de conexão de forma dinâmica e limpa
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", 
		host, user, password, dbname, port,
	)
	
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Falha ao conectar no banco de dados do Docker: ", err)
	}
	
	// Migrations
	err = database.AutoMigrate(
		&models.Project{},
		&models.Sponsor{},
		&models.User{},
		&models.Monitor{},
		&models.Aluno{},
		&models.Alocacao{},
		&models.Chamada{},
	)
	if err != nil {
		log.Fatal("Falha ao rodar as Migrations: ", err)
	}

	DB = database
}