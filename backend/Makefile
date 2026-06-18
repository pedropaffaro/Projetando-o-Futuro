DOCKER_COMPOSE = docker compose

.PHONY: db-up db-down db-restart db-logs db-ps run clean

# Subir o banco de dados em background
db-up:
	$(DOCKER_COMPOSE) up -d

# Desligar o banco de dados
db-down:
	$(DOCKER_COMPOSE) down

# Reiniciar o banco de dados
db-restart:
	$(DOCKER_COMPOSE) down && $(DOCKER_COMPOSE) up -d

# Ver os logs do banco de dados em tempo real
db-logs:
	$(DOCKER_COMPOSE) logs -f

# Ver o status dos containers ativos
db-ps:
	docker ps

# Iniciar o servidor Go
run:
	go run cmd/api/main.go

# Sobe o BD e já inicia o backend
start: db-up run