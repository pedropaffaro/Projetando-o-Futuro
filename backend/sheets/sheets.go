package sheets

import (
	"context"
	"fmt"
	"os"

	"google.golang.org/api/option"
	"google.golang.org/api/sheets/v4"
)

// Client encapsula o serviço autenticado do Google Sheets
type Client struct {
	svc *sheets.Service
}

// New cria um cliente autenticado via Service Account.
// Lê GOOGLE_CREDENTIALS_PATH do ambiente (default: ./credentials.json).
func New() (*Client, error) {
	credPath := os.Getenv("GOOGLE_CREDENTIALS_PATH")
	if credPath == "" {
		credPath = "./credentials.json"
	}

	ctx := context.Background()
	svc, err := sheets.NewService(ctx,
		option.WithCredentialsFile(credPath),
		option.WithScopes(sheets.SpreadsheetsScope),
	)
	if err != nil {
		return nil, fmt.Errorf("erro ao criar cliente Sheets: %w", err)
	}

	return &Client{svc: svc}, nil
}

// clear limpa todo o conteúdo de uma aba
func (c *Client) clear(spreadsheetID, sheetName string) error {
	_, err := c.svc.Spreadsheets.Values.Clear(
		spreadsheetID,
		sheetName,
		&sheets.ClearValuesRequest{},
	).Do()
	return err
}

// write sobrescreve um range com os valores fornecidos
func (c *Client) write(spreadsheetID, rangeA1 string, values [][]interface{}) error {
	_, err := c.svc.Spreadsheets.Values.Update(
		spreadsheetID,
		rangeA1,
		&sheets.ValueRange{Values: values},
	).ValueInputOption("USER_ENTERED").Do()
	return err
}

// ── Tipos de domínio ────────────────────────────────────────────────────────

type CelulaAlocacao struct {
	MonitorA string
	MonitorB string
	SalaNome string
}

type RegistroParaSheets struct {
	AlunoNome string
	Status    string
}

// ── Métodos públicos ────────────────────────────────────────────────────────

// WriteAlocacoes sobrescreve a planilha de salas com a grade semanal no formato:
//
//	Semana: 2026-05-17  | Turma 1      | Turma 2      | Turma 3      | Turma 4
//	10:30 - 12:00       | MonitorA     | MonitorA     | MonitorA     | MonitorA
//	                    | MonitorB     | MonitorB     | MonitorB     | MonitorB
//	Sala                | Informática  | Artesanato   | Sala Janela  | Sala TV
//	(linha em branco)
//	13:30 - 15:00       | ...
func (c *Client) WriteAlocacoes(spreadsheetID, semanaRef string, alocacoes map[string]map[string]CelulaAlocacao) error {
	turmas := []string{"Turma 1", "Turma 2", "Turma 3", "Turma 4"}
	horarios := []string{"10:30 - 12:00", "13:30 - 15:00", "15:30 - 17:00"}

	rows := [][]interface{}{}

	// Cabeçalho
	header := []interface{}{fmt.Sprintf("Semana: %s", semanaRef), "Turma 1", "Turma 2", "Turma 3", "Turma 4"}
	rows = append(rows, header)

	for _, horario := range horarios {
		rowA := []interface{}{horario}
		rowB := []interface{}{""}
		rowSala := []interface{}{"Sala"}

		for _, turma := range turmas {
			celula := alocacoes[horario][turma] // zero-value se não preenchido
			rowA = append(rowA, celula.MonitorA)
			rowB = append(rowB, celula.MonitorB)
			rowSala = append(rowSala, celula.SalaNome)
		}

		rows = append(rows, rowA, rowB, rowSala, []interface{}{}) // linha em branco
	}

	if err := c.clear(spreadsheetID, "Página1"); err != nil {
		return fmt.Errorf("erro ao limpar aba Página1: %w", err)
	}
	return c.write(spreadsheetID, "Página1!A1", rows)
}

// WriteChamada sobrescreve a aba da turma na planilha de chamadas:
//
//	Data: 2026-05-17  | Turma 1
//	Nome              | Status
//	Ana Beatriz       | presente
//	Carlos Eduardo    | falta
//
// Cada turma tem sua própria aba ("Turma 1", "Turma 2", etc.).
// As abas devem existir previamente na planilha.
func (c *Client) WriteChamada(spreadsheetID, data, turma string, registros []RegistroParaSheets) error {
	rows := [][]interface{}{
		{fmt.Sprintf("Data: %s", data), turma},
		{"Nome", "Status"},
	}

	for _, r := range registros {
		rows = append(rows, []interface{}{r.AlunoNome, r.Status})
	}

	rangeA1 := fmt.Sprintf("%s!A1", turma)

	if err := c.clear(spreadsheetID, turma); err != nil {
		return fmt.Errorf("erro ao limpar aba %s: %w", turma, err)
	}
	return c.write(spreadsheetID, rangeA1, rows)
}