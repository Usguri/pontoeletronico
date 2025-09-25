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
- **SQL Server**

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
- **SQL Server** (LocalDB ou instância completa)
- **Visual Studio 2022** ou **Visual Studio Code**

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
A API estará disponível em: `https://localhost:5001`

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
  apiUrl: 'https://localhost:5001/api'
};
```

#### Iniciar o Frontend
```bash
ng serve
```
A aplicação estará disponível em: `http://localhost:4200`

## 🔧 Estrutura do Projeto

```
sistema-ponto-eletronico/
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
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
└── README.md
```

## 📖 Documentação da API

### Endpoints Principais

#### Autenticação
- `POST /api/auth/login` - Login do usuário
- `POST /api/auth/register` - Registro de novo usuário

#### Ponto Eletrônico
- `POST /api/ponto/registrar` - Registrar entrada/saída
- `GET /api/ponto/meus-registros` - Consultar registros do usuário
- `GET /api/ponto/mes/{mes}/{ano}` - Registros por mês

### Exemplo de Uso

#### Login
```json
POST /api/auth/login
{
  "email": "funcionario@empresa.com",
  "password": "senha123"
}

Resposta:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "nome": "João Silva",
    "email": "funcionario@empresa.com"
  }
}
```

#### Registrar Ponto
```json
POST /api/ponto/registrar
Authorization: Bearer {token}
{
  "tipoRegistro": 1 // 1 = Entrada, 2 = Saída
}
```

## 🔒 Segurança Implementada

- **Autenticação JWT**: Tokens seguros para autenticação
- **Autorização**: Usuários acessam apenas seus dados
- **HTTPS**: Comunicação criptografada
- **CORS**: Configurado adequadamente
- **Validação de Entrada**: Prevenção contra ataques de injeção
- **Rate Limiting**: Proteção contra ataques de força bruta

## 🎨 Interface do Usuário

- **Design Responsivo**: Funciona em desktop e mobile
- **Feedback Visual**: Indicações claras de sucesso/erro
- **Navegação Intuitiva**: Interface amigável e fácil de usar
- **Temas**: Suporte a modo claro/escuro

## 🧪 Testes

### Backend
```bash
cd backend
dotnet test
```

### Frontend
```bash
cd frontend
ng test
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

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Seu Nome** - *Desenvolvimento inicial* - [seu-usuario](https://github.com/seu-usuario)

## 📞 Contato

- Email: seu.email@exemplo.com
- LinkedIn: [seu-perfil](https://linkedin.com/in/seu-perfil)
- GitHub: [seu-usuario](https://github.com/seu-usuario)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
