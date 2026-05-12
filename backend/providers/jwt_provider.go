package providers

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var secretKey = []byte("sua_chave_secreta_super_segura")

func GenerateToken(username string) (string, error) {
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "username": username,
        "exp":      time.Now().Add(time.Hour * 24).Unix(), // Expira em 24h
    })

    return token.SignedString(secretKey)
}

func ValidateToken(tokenString string) (bool, jwt.MapClaims) {
	// Faz a leitura (parse) do token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Proteção fundamental: garante que o método de assinatura é o HMAC (HS256) que usamos
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("método de assinatura inesperado: %v", token.Header["alg"])
		}
		// Se estiver tudo certo, retornamos a chave secreta para ele validar a assinatura
		return secretKey, nil
	})

	// Se deu erro na leitura (ex: token malformado) ou não é mais válido (ex: expirou)
	if err != nil || !token.Valid {
		return false, nil
	}

	// Extrai os dados (claims) e retorna true indicando sucesso
	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		return true, claims
	}

	return false, nil
}