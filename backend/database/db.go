package database

import (
    "log"

    "github.com/pedropaffaro/projetando-o-futuro-back/models"
    "golang.org/x/crypto/bcrypt"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {

    dsn := "host=localhost user=admin password=admin123 dbname=projetando_futuro port=5433 sslmode=disable"
    
    database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("Falha ao conectar no banco de dados do Docker:", err)
    }
    
    // Cria/atualiza as tabelas automaticamente
	database.AutoMigrate(
		&models.Project{},
		&models.Sponsor{},
		&models.User{},
		&models.Monitor{},
		&models.Aluno{},
		&models.Alocacao{},
		&models.Chamada{},
	)

    // Criar admin padrão se não existir
    var count int64
    database.Model(&models.User{}).Count(&count)
    if count == 0 {
        hash, _ := bcrypt.GenerateFromPassword([]byte("admin123"), 10)
        admin := models.User{Username: "admin", Password: string(hash)}
        database.Create(&admin)
    }

    DB = database
}