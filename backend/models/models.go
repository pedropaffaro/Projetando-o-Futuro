package models

import "gorm.io/gorm"

type Project struct {
    gorm.Model
    // O JSON tag deve ser igual ao que o React envia
    Title           string `json:"title"`
    Description     string `json:"description"`
    FullDescription string `json:"fullDescription" gorm:"type:text"` // "text" para descrições longas
    Image           string `json:"image"`       // Aqui guardaremos a URL/caminho da imagem
    Status          string `json:"status"`      // Ativo, Pausado, Encerrado
    Color           string `json:"color"`       // Guardamos a classe do Tailwind gerada
}

type Sponsor struct {
    gorm.Model
    Name string `json:"name"`
    Logo string `json:"logo"`
}

type User struct {
    gorm.Model
    Username string `json:"username" gorm:"unique"`
    Password string `json:"-"` // O "-" impede que a senha vaze no JSON
}

type LoginRequest struct {
    Username string `json:"username" binding:"required"`
    Password string `json:"password" binding:"required"`
}