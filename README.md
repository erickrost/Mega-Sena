# 🍀 Mega Sena - Consulta de Resultados

Aplicação fullstack para consulta de resultados da Mega Sena, com banco de dados carregado a partir dos dados oficiais do site da Caixa Econômica Federal.

---

## 📦 Estrutura do Projeto

```
.
├── docker-compose.yml
├── .env
├── .gitignore
├── database/
│   ├── init.sql            # Criação das tabelas e importação do CSV
│   └── megasena.csv        # Seed com os resultados históricos (fonte: Caixa)
├── server/
│   ├── src/
│   │   └── index.ts        # Entry point da API
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
└── front/
    ├── src/
    │   ├── components/     # Componentes React
    │   ├── context/        # Context API
    │   ├── App.tsx
    │   └── main.tsx
    ├── index.html
    ├── Dockerfile
    ├── package.json
    └── vite.config.ts
```

---

## 🚀 Como Rodar

### Pré-requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados

### 1. Configure o `.env`

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha
POSTGRES_DB=megasena
POSTGRES_PORT=5432
SERVER_PORT=3001
```

### 2. Suba os containers

```bash
docker compose up --build
```

Os três serviços sobem em ordem:

1. **postgres** — banco inicializa e carrega os dados do CSV automaticamente
2. **server** — API fica disponível após o banco estar pronto
3. **front** — interface sobe após o server estar disponível

### 3. Acesse a aplicação

| Serviço  | URL                   |
|----------|-----------------------|
| Frontend | http://localhost:5173 |
| API      | http://localhost:3001 |
| Postgres | localhost:5433        |

---

## 🔍 Como Usar

Na interface, informe o **número do concurso** para consultar as dezenas sorteadas naquele resultado.

---

## 🗄️ Banco de Dados

- Imagem: `postgres:15`
- O arquivo `database/init.sql` é executado automaticamente na primeira inicialização do container, criando as tabelas e importando os dados do `megasena.csv`
- Os dados são os resultados históricos oficiais da Mega Sena, extraídos diretamente do site da [Caixa Econômica Federal](https://loterias.caixa.gov.br/)

---

## 🌐 Rede

Todos os serviços se comunicam pela rede interna `megasena_net` (bridge), isolando o tráfego entre os containers.

---

## 🛠️ Tecnologias

| Camada   | Tecnologia                     |
|----------|--------------------------------|
| Frontend | React + TypeScript (Vite)      |
| Backend  | Node.js + TypeScript (Express) |
| Banco    | PostgreSQL 15                  |
| Infra    | Docker + Docker Compose        |