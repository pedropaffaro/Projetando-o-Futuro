package database

import (
    "github.com/pedropaffaro/projetando-o-futuro-back/models"
    "golang.org/x/crypto/bcrypt"
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
    database, _ := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
    
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