# Sistema de Ponto Eletrônico

Sistema completo para registro e consulta de ponto eletrônico desenvolvido com Angular e .NET Core.

## 📋 Sobre o Projeto

O Sistema de Ponto Eletrônico permite que funcionários registrem suas horas de entrada e saída de forma segura e consultem seus registros históricos. O sistema foi desenvolvido seguindo as melhores práticas de segurança e arquitetura de software.

## ✨ Funcionalidades

- **Autenticação Segura**: Login com JWT (JSON Web Tokens)
- **Registro de Ponto**: Marcação de entrada e saída com data/hora automática
- **Consulta de Registros**: Visualização do histórico de pontos por período
- **Segurança**: Cada funcionário acessa apenas seus próprios dados
- **Interface Intuitiva**: Design responsivo e amigável

## 🚀 Tecnologias Utilizadas

### Frontend

- **Angular 9+**
- **TypeScript**
- **HTML5/CSS3**
- **JWT para autenticação**
- **Reactive Forms**
- **HttpClient para comunicação com API**

### Backend

- **.NET Core 6**
- **ASP.NET Web API**
- **Entity Framework Core**
- **ASP.NET Identity**
- **JWT Bearer Authentication**

### Banco de Dados

- **Mysql**

### Segurança

- **HTTPS**
- **CORS configurado**
- **Validação de entrada**
- **Proteção contra SQL Injection**
- **Autenticação/Autorização JWT**

## 📋 Pré-requisitos

- **Node.js** (versão 14+)
- **Angular CLI** (versão 12+)
- **.NET 6 SDK**
- **Mysql** (LocalDB ou instância completa)
- **Visual Studio 2022** ou **Visual Studio Code**
- **Docker** (opcional para banco de dados)

## ⚙️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/sistema-ponto-eletronico.git
cd sistema-ponto-eletronico
```

### 2. Configuração do Backend

```bash
cd backend
dotnet restore
```

#### Configurar Connection String

Edite o arquivo `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=PontoEletronicoDb;Trusted_Connection=true;"
  }
}
```

#### Executar Migrations

```bash
dotnet ef database update
```

#### Iniciar a API

```bash
dotnet run
```

A API estará disponível em: `https://localhost:7234`

### 3. Configuração do Frontend

```bash
cd frontend
npm install
```

#### Configurar URL da API

Edite o arquivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: "https://localhost:7234/api",
};
```

#### Iniciar o Frontend

```bash
ng serve
```

A aplicação estará disponível em: `http://localhost:4200`

## 🐳 Execução com Docker

### Opção 1: Frontend + Banco de Dados com Docker Compose

Para facilitar o desenvolvimento, você pode executar o frontend e o banco de dados MySQL utilizando Docker Compose:

```bash
# Na raiz do projeto
docker-compose up
```

Este comando irá:

- Subir um container com o banco de dados MySQL
- Subir um container com o frontend Angular
- Configurar a rede entre os containers

**Nota**: O backend (.NET Core) não está configurado para rodar no Docker no momento, pois não houve tempo suficiente para testes completos. Você precisará executar o backend localmente seguindo as instruções da seção 2.

### Contribuições para Docker

Se você deseja contribuir implementando a execução completa do backend no Docker, fique à vontade para:

1. Criar um `Dockerfile` para o backend
2. Atualizar o `docker-compose.yml` para incluir o backend
3. Testar a integração completa
4. Enviar um Pull Request

## 🔧 Estrutura do Projeto

```
sistema-ponto-eletronico/
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   └── Program.cs
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   └── models/
│   │   └── environments/
├── docker-compose.yml
└── README.md
```

## 📖 Documentação da API

### 📋 Interface Swagger

Para facilitar os testes e visualizar toda a documentação interativa da API, acesse o Swagger UI:

**URL do Swagger**: `https://localhost:7234/swagger/index.html`

⚠️ **Importante para testes no Swagger**:

- Para testar os endpoints protegidos (GET e POST), você deve primeiro realizar o login
- Após o login, use o token JWT retornado para autorização nos demais endpoints
- Clique no botão "Authorize" no Swagger e insira o token no formato: `Bearer seu-token-jwt-aqui`

### Endpoints Principais

#### Autenticação

### Login do usuário

`POST /api/login`

**Parâmetros (corpo da requisição - JSON):**

- `email` (string, obrigatório) → e-mail do usuário.
- `senha` (string, obrigatório) → senha do usuário.

**Retorno:**

- Sucesso: token JWT e informações do usuário.
- Erro: mensagem de falha de autenticação.

---

### Registro de novo usuário

`POST /api/cadastrar_usuario`

**Parâmetros (corpo da requisição - JSON):**

- `nome` (string, obrigatório) → nome completo do usuário.
- `email` (string, obrigatório) → e-mail do usuário.
- `senha` (string, obrigatório) → senha do usuário.
- `matricula` (number, obrigatório) → matrícula do usuário.

**Retorno:**

- Sucesso: confirmação de registro.
- Erro: mensagem de falha.

#### Ponto Eletrônico

### Registrar horário de entrada

`POST /api/registrar_horario_entrada`

**Parâmetros (query):**

- `iduser` (int, obrigatório) → ID do usuário que está registrando a entrada.

**Corpo da requisição:** vazio.  
**Retorno:** status de sucesso ou erro.

---

### Registrar horário de saída

`PUT /api/registrar_horario_saida`

**Parâmetros (query):**

- `idregistro` (int, obrigatório) → ID do registro de ponto correspondente à entrada.

**Corpo da requisição:** vazio.  
**Retorno:** status de sucesso ou erro.

### Consultar registros do usuário (semanal)

`GET /api/buscar_horarios_semanal`

**Parâmetros (query):**

- `numeroSemana` (int, obrigatório) → número da semana do ano.
- `iduser` (int, opcional) → ID do usuário (se não informado, usa o usuário autenticado).

### Consultar registros do usuário (mensal)

`GET /api/buscar_horarios_mensal`

**Parâmetros (query):**

- `mes` (int, obrigatório) → número do mês (1–12).
- `iduser` (int, opcional) → ID do usuário (se não informado, usa o usuário autenticado).

## 🔒 Segurança Implementada

- **Autenticação JWT**: Tokens seguros para autenticação
- **Autorização**: Usuários acessam apenas seus dados
- **HTTPS**: Comunicação criptografada
- **CORS**: Configurado adequadamente
- **Validação de Entrada**: Prevenção contra ataques de injeção
- **Rate Limiting**: Proteção contra ataques de força bruta

## 🎨 Interface do Usuário

- **Design Responsivo**: Funciona em desktop
- **Feedback Visual**: Indicações claras de sucesso/erro
- **Navegação Intuitiva**: Interface amigável e fácil de usar

## 🧪 Testes

### Backend

```bash
cd backend
dotnet build
dotnet run
```

### Frontend

```bash
cd frontend
npm install
ng serve -o
```

## 📦 Deploy

### Backend

```bash
dotnet publish -c Release -o publish
```

### Frontend

```bash
ng build --prod
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Áreas onde contribuições são bem-vindas:

- Implementação completa do backend no Docker
- Testes automatizados
- Melhorias na interface
- Documentação adicional
- Otimizações de performance

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Seu Nome** - _Desenvolvimento inicial_ - [Vinícius-Mendes]
