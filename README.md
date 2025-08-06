# Viajados

Este repositório contém o projeto `Viajados`, aplicativo de viagens que permite buscar destinos, criar roteiros e explorar dicas de viagem.

## Tecnologias Usadas
- React Native para o Front-End.
- Node.js e Express.js para a construção da API.
- MySQL para o banco de dados.
- Bcrypt para criptografia de senhas.
- Nodemailer para envio de e-mails.

## Funcionalidades
- Listar todos os hotéis.
- Favoritar Hoteis.
- Reserva de hoteis.
- Listar todos os hotéis favoritos do usuário.
- Listar todos os voos.
- Favoritar voos.
- Reserva de Voos.
- Listar todos os voos favoritos do usuário.
- Adicionar foto ao perfil.
- Mudar nome do usuario.
- Resetar senha de usuário.
- Atualizar dados do usuário.
- Cadastro e autenticação de usuários.

## Estrutura do Projeto

O projeto é dividido em duas pastas principais:

* `client`: Contém o front-end.
* `server`: Contém o back-end.

## Configuração Inicial

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

* [Expo](https://expo.dev) (para visualizar o projeto)
* [Node.js](https://nodejs.org) (para rodar o back-end)
* [Git](https://git-scm.com) (para clonar o repositório)

### Passos para Instalação

1. Clone o repositório do GitHub:

```
git clone https://github.com/DevoluaP/Projeto_Viajados.git
cd Projeto_Viajados
```

2. Instale as dependências para o back-end e front-end:

* **Back-end**:

```
cd server
npm install
```

* **Front-end**: Abra outro terminal na raiz do projeto e execute:

```
cd client
npm install
```

## Script Disponíveis

Após a instalação, você pode iniciar o front-end e o back-end com os seguintes comandos:

### Back-end (server)

Na pasta `server`, você pode rodar:

* `npm start`: Inicia o servidor em modo de desenvolvimento.

* `npm run dev`: Inicia o servidor usando o `nodemon` para recarregar automaticamente em caso de mudanças (necessita do `nodemon` instalado globalmente ou como dependência de desenvolvimento).

### Front-end (client)

Na pasta `client`, você pode rodar:

* `npm start`: Inicia o aplicativo em modo de desenvolvimento.
Abra o Expo e/ou o Android Studio para visualizar.

## Contribuindo

Para contribuir com o `Viajados`, siga as seguintes etapas:

1. Crie uma nova branch para suas alterações:

```
git checkout -b minha-nova-feature
```

2. Faça commit das suas alterações:

```
git commit -m "Descrição das alterações"
```

3. Envie para o repositório:

```
git push origin minha-nova-feature
```

4. Abra um Pull Request no GitHub.

# Endpoints Da API

## 1- Cadastro de usuário
- **Método:** POST  
- **Endpoint:** `/api/cadastro`  
- **Descrição:** Cadastra um novo usuário.  
- **Body:**
```json
{
    "email": "emaildousuario@gmail.com",
    "senha": "senhadousuario",
    "nome": "NomeDoUsuario",
    "ativo": 1,
    "cpf": "12345678910",
    "data_nascimento": "1988-11-23",
    "nacionalidade": "Brasileiro",
    "sexo": "M"
}
```

## 2- Login do usuário
- **Método:** POST  
- **Endpoint:** `/api/login`  
- **Descrição:** Loga o usuário.  
- **Body:**
```json
{
    "email": "emaildousuario@gmail.com",
    "senha": "senhadousuario"
}
```

## 3- Alterar senha
- **Método:** POST  
- **Endpoint:** `/api/alterarsenha`  
- **Descrição:** Envia o e-mail de redefinição de senha para o usuário.  
- **Body:**
```json
{
    "email": "emaildousuario@gmail.com"
}
```

## 4- Listagem de hotéis
- **Método:** GET  
- **Endpoint:** `/api/hoteis`  
- **Descrição:** Lista todos os hotéis disponíveis.  
- **Requer:** Token Bearer.  

## 5- Listagem de voos
- **Método:** GET  
- **Endpoint:** `/api/voos`  
- **Descrição:** Lista todos os voos disponíveis.  
- **Requer:** Token Bearer.  

## 6- Listagem de hotéis favoritos
- **Método:** GET  
- **Endpoint:** `/api/favoritos/hoteis?idUsuario=`  
- **Descrição:** Lista todos os hotéis favoritos do usuário.  
- **Requer:** Token Bearer e `idUsuario` na URL.  

## 7- Listagem de voos favoritos
- **Método:** GET  
- **Endpoint:** `/api/favoritos/voos?idUsuario=`  
- **Descrição:** Lista todos os voos favoritos do usuário.  
- **Requer:** Token Bearer e `idUsuario` na URL.  

## 8- Atualizar dados do usuário
- **Método:** PUT  
- **Endpoint:** `/api/alterardados?idUsuario=`  
- **Descrição:** Atualiza o nome do usuário.  
- **Body:**
```json
{
    "nome": "Paulo"
}
```
- **Requer:** Token Bearer e `idUsuario` na URL.  

## 9- Obter dados do usuário
- **Método:** GET  
- **Endpoint:** `/api/alterardados/dadosusuario`  
- **Descrição:** Lista todas as informações do usuário.  
- **Requer:** Token Bearer.  

## 10- Excluir conta do usuário
- **Método:** DELETE  
- **Endpoint:** `/api/alterardados/excluir?idUsuario=`  
- **Descrição:** Deixa o usuário inativo no banco de dados.  
- **Requer:** Token Bearer e `idUsuario` na URL.  

## 11- Cadastro de foto do usuário
- **Método:** POST  
- **Endpoint:** `/api/salvar-imagem`  
- **Descrição:** Cadastra a foto do usuário no banco de dados.  
- **Formato:** BASE64  
- **Body:**
```json
{
    "foto_usuario": "base64_encoded_string",
    "idUsuario": 3
}
```

## 12- Listar reservas de voos de um usuário
- **Método:** GET  
- **Endpoint:** `reservas/voos/:idUsuario`  
- **Descrição:** Retorna todas as reservas de voos associadas a um usuário específico.  
- **Parâmetros:** `idUsuario` (path) - ID do usuário.  
- **Resposta:**
```json
{
  "status": "Sucesso ao listar voos agendados",
  "data": [
    {
      "idReserva": 1,
      "idVoos": 123,
      "data_reserva": "2024-04-01",
      "status": "agendado",
      "origem": "São Paulo",
      "destino": "Rio de Janeiro",
      "preco": 350.00,
      "data_voo": "2024-05-10"
    }
  ]
}
```

## 13- Listar reservas de hospedagens de um usuário
- **Método:** GET  
- **Endpoint:** `reservas/hospedagens/:idUsuario`  
- **Descrição:** Retorna todas as hospedagens reservadas por um usuário.  
- **Parâmetros:** `idUsuario` (path) - ID do usuário.  
- **Resposta:**
```json
{
  "status": "Sucesso ao listar hotéis reservados",
  "data": [
    {
      "idHospedagem": 1,
      "idHoteis": 456,
      "data_entrada": "2024-06-01",
      "data_saida": "2024-06-05",
      "status": "agendado",
      "nome": "Hotel Luxo",
      "preco_diaria": 200.00,
      "descricao": "Hotel 5 estrelas com café da manhã incluso",
      "avaliacao": 4.5
    }
  ]
}
```

## 14- Cadastrar uma reserva de voo
- **Método:** POST  
- **Endpoint:** `reservas/voos/idUsuario`  
- **Descrição:** Cria uma nova reserva de voo para um usuário.  
- **Body:**
```json
{
  "idVoos": 123,
  "idUsuario": 1,
  "data_reserva": "2024-04-01"
}
```
- **Resposta:**
```json
{
  "success": true,
  "message": "Reserva de voo cadastrada com sucesso",
  "idReserva": 101
}
```

## 15- Cadastrar uma reserva de hospedagem
- **Método:** POST  
- **Endpoint:** `/reservas/hospedagens/idUsuario`  
- **Descrição:** Cria uma nova reserva de hospedagem para um usuário.  
- **Body:**
```json
{
  "idHoteis": 456,
  "idUsuario": 1,
  "data_entrada": "2024-06-01",
  "data_saida": "2024-06-05"
}
```
- **Resposta:**
```json
{
  "success": true,
  "message": "Reserva de hospedagem cadastrada com sucesso",
  "idHospedagem": 202
}
```

## Status Codes
- `200 OK` – Requisição bem-sucedida.
- `201 Created` – Recurso criado com sucesso.
- `400 Bad Request` – Erro nos parâmetros da requisição.
- `409 Conflict` – Recurso já existe.
- `500 Internal Server Error` – Erro no servidor.