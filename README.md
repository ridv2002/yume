<div align="center">
  <img src="https://pub-ed08c8e5f5f84dbfa412976517d4cfc6.r2.dev/Raposa%20Vermelha%20em%20Tra%C3%A7os%20de%20Tinta.png" alt="Logo do Yume: raposa vermelha em traços de tinta" width="180" />

  # Yume

  **Um chatbot para conversar, criar e conectar suas ferramentas em um só lugar.**
</div>

> **Status:** projeto em desenvolvimento. A interface de chat, os modelos de IA e as integrações descritas abaixo ainda fazem parte da visão do produto.

## O que é o Yume?

O Yume está sendo construído para ser um chatbot completo que você poderá executar no seu computador. A proposta é oferecer escolha entre modelos de IA locais e provedores externos, além de conectar serviços como WhatsApp e GitHub para reunir conversas e fluxos de trabalho em uma única experiência.

### Visão do produto

- Conversar com modelos de IA em uma interface própria.
- Usar modelos locais ou configurar provedores externos.
- Integrar canais e ferramentas, começando por WhatsApp e GitHub.
- Expandir as integrações conforme o projeto evoluir.

Esses recursos são **planejados** e ainda não estão disponíveis na aplicação atual.

## O que já existe

- Front-end em React, TypeScript e Vite, atualmente com uma tela inicial simples.
- API em Fastify com rota de cadastro `POST /auth/signup` e documentação Swagger em `/docs`.
- Persistência de usuários em PostgreSQL com Drizzle ORM.
- Estrutura inicial para autenticação com JWT, conexão com MongoDB e armazenamento compatível com S3/R2. Essas partes ainda não compõem um fluxo completo do chatbot.

## Tecnologias

| Camada | Tecnologias atuais |
| --- | --- |
| Interface | React, TypeScript, Vite |
| API | Node.js, Fastify, Zod, Swagger |
| Dados | PostgreSQL, Drizzle ORM; estrutura inicial para MongoDB |
| Armazenamento | SDK S3, com configuração para endpoint compatível com Cloudflare R2 |

## Desenvolvimento local

### Pré-requisitos

- Node.js e npm compatíveis com as dependências do projeto.
- Uma instância de PostgreSQL acessível pela API.

### Instalação

```bash
npm install
cp .env.example .env.development
```

Preencha ao menos `DATABASE_URL` com a conexão PostgreSQL e defina `JWT_SECRET` no arquivo `.env.development`. O arquivo de exemplo também lista variáveis para serviços de armazenamento; configure-as caso vá trabalhar nessas partes do projeto. Não publique arquivos `.env` com credenciais.

Para iniciar a API e o front-end juntos:

```bash
npm run dev
```

Também é possível iniciá-los separadamente com `npm run dev:api` e `npm run dev:web`.

O Vite serve a interface em `http://localhost:5173`, e a API está configurada no código para escutar na porta `3001`, com Swagger em `http://localhost:3001/docs`.


## Estrutura do projeto

```text
src/front-end/   Interface React
src/http/        Rotas e controladores da API
src/services/    Regras de aplicação
src/repositories/ Acesso aos dados
src/db/          Esquemas e conexão com PostgreSQL
src/configs/     Configurações e serviços externos
drizzle/         Migrações de banco existentes
```

## Próximos passos

- Construir a interface de conversas e a API de chat.
- Adicionar suporte a modelos locais e provedores externos.
- Implementar as integrações com WhatsApp e GitHub.
- Completar os fluxos de autenticação e armazenamento e alinhar a configuração das portas.

## Licença

O projeto ainda não possui uma licença definida no repositório.
