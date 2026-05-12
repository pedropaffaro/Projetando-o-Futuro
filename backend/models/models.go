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

// Monitor representa um voluntário importado do CSV
type Monitor struct {
	gorm.Model
	NomeCompleto string `json:"nomeCompleto"`
	Apelido      string `json:"apelido" gorm:"unique"`
	Origem       string `json:"origem"`
}
 
// Aluno representa uma criança atendida pela ONG
type Aluno struct {
	gorm.Model
	Nome  string `json:"nome"`
	Turma string `json:"turma"` // "Turma 1", "Turma 2", etc.
}
 
// Alocacao representa a grade semanal de salas
// Referência: semana do sábado em questão (ex: "2026-05-16")
type Alocacao struct {
	gorm.Model
	SemanaRef  string `json:"semanaRef"`  // ISO date do sábado da semana
	Turma      string `json:"turma"`      // "Turma 1", "Turma 2", etc.
	HorarioID  int    `json:"horarioId"`  // 1, 2 ou 3
	MonitorA   string `json:"monitorA"`   // Apelido do monitor
	MonitorB   string `json:"monitorB"`   // Apelido do monitor
	SalaID     int    `json:"salaId"`     // 1..5
	SalaNome   string `json:"salaNome"`
}
 
// Chamada representa o registro de presença de um aluno em uma data
type Chamada struct {
	gorm.Model
	Data     string `json:"data"`     // ISO date "2026-05-17"
	AlunoID  uint   `json:"alunoId"`
	AlunoNome string `json:"alunoNome"`
	Turma    string `json:"turma"`
	Status   string `json:"status"`   // "presente", "falta", "justificado"
}
