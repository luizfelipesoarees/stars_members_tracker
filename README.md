# ⭐ S.T.A.R.S. Members Tracker - Resident Evil

Projeto desenvolvido por Luiz Felipe Soares para a disciplina de **Integração e Entrega Contínua**.

Este é um sistema **full-stack** com temática inspirada na equipe **S.T.A.R.S. (Special Tactics And Rescue Service)** do universo **Resident Evil**, permitindo gerenciar membros com interface visual estilizada e moderna. A aplicação possui um CRUD completo desenvolvido com **Node.js**, persistência em **PostgreSQL** e frontend responsivo criado com **HTML, CSS e JavaScript** puros, servido via **Nginx**.

---

## 🚀 URLs de Acesso

- **Aplicação Frontend**: http://201.23.3.86:8171/  
- **API Backend (Node.js)**: http://201.23.3.86:8170/api/members

---

## 🎯 Objetivo

O projeto tem como objetivo implementar uma solução web completa, integrando conceitos de:  
- Interface interativa e responsiva  
- Backend com rotas RESTful  
- Banco de dados relacional  
- Containerização com Docker  
- CI/CD com GitHub Actions  
- Análise de qualidade com SonarQube  
- Deploy remoto automatizado  

---

## 🛠️ Requisitos Técnicos

### 1. Aplicação

#### 🔸 Frontend:
- Desenvolvido com HTML5, CSS3 e JavaScript puro  
- Tema com identidade visual baseada em Resident Evil  
- Interface responsiva com layout adaptado para dispositivos móveis  
- Servido por um container NGINX para entrega otimizada  

#### 🔸 Backend:
- Desenvolvido com Node.js e Express  
- Integração com banco de dados PostgreSQL  
- CRUD completo para membros da S.T.A.R.S.  
- Organização com Sequelize ORM  

#### 🔸 Banco de Dados:
- PostgreSQL configurado em container isolado  
- Tabelas gerenciadas automaticamente via Sequelize  

---

### 2. Estrutura do Repositório

```bash
.
├── .github/
│   └── workflows/
│       └── deploy.yml              # Pipeline de CI/CD com GitHub Actions
├── .gitignore                      # Arquivos e pastas ignoradas pelo Git
├── backend/
│   ├── package-lock.json           # Lockfile de dependências Node.js
│   ├── package.json                # Dependências e scripts da API
│   ├── server.js                   # Arquivo principal do servidor Express
│   └── sonar-project.properties    # Configuração de análise para o SonarQube
└── frontend/
    ├── css/
    │   └── style.css               # Estilização visual da interface
    ├── js/
    │   └── app.js                  # Scripts JS do frontend
    ├── index.html                  # Página principal da interface
    └── nginx.conf                  # Configuração do servidor NGINX
```

---

### 3. Pipeline CI/CD com GitHub Actions ⚙️

O pipeline é acionado automaticamente a cada push na branch `main`. Ele realiza:

#### 🏗️ Build das Imagens Docker:
- Compila os arquivos do frontend  
- Build da API Node.js  
- Gera imagens Docker para os serviços  

#### 🐳 Push para o Docker Hub:
- Envia imagens atualizadas para repositório privado/público  

#### 📊 Análise de Qualidade com SonarQube:
- A pipeline acessa o servidor remoto `201.23.3.86` via SSH  
- Inicia um container temporário do SonarQube  
- Realiza a análise do frontend e backend  
- Aplica o *gate de qualidade*: se a qualidade for reprovada, o deploy é abortado  

#### 🚀 Deploy Remoto Automatizado:
- Executado somente se a análise for bem-sucedida  
- Remove containers antigos do servidor  
- Baixa as novas imagens do Docker Hub  
- Inicia os containers atualizados  
- Disponibiliza a aplicação nas portas:  
  - `8171` (Frontend)  
  - `8170` (Backend)  

---

## 💡 Funcionalidades

- Cadastro de novos membros da S.T.A.R.S.  
- Edição dos dados de qualquer membro  
- Remoção individual  
- Exibição em cards com layout dinâmico  
- Responsividade total para mobile e desktop  
- Organização visual com cards, inputs e botões estilizados  

---

## 👾 Temática

A proposta simula um banco de dados interno da organização **S.T.A.R.S.**, responsável por conter ameaças biológicas em Raccoon City. Todos os elementos visuais e nomenclaturas foram inspirados na ambientação clássica de **Resident Evil**, buscando criar uma imersão ao universo do jogo mesmo em um sistema CRUD.

---

## 📷 Prints da Interface

![image](https://github.com/user-attachments/assets/1c1bdc0c-d056-4ad8-8fad-03ce74874e12)

