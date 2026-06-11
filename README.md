# Execução

Para rodar o projeto, basta abrir dois terminais simultaneamente.

No primeiro, rode:

```bash
cd backend
docker compose up -d
docker ps
go run cmd/api/main.go
```

E no segundo, rode:

```bash
cd projetando-o-futuro
npm install
npm run dev
```
