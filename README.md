# Viajados

Este repositório contém o projeto `Viajados`, aplicativo de viagens que permite buscar destinos, criar roteiros e explorar dicas de viagem.

## Tecnologias Usadas
- React Native
- TypeScript
- JavaScript
- Node.js
- MySQL para o banco de dados.

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
* [XAMPP](https://www.apachefriends.org/) ou [WAMP](https://www.wampserver.com/) (para rodar o servidor MySQL)

### Passos para Instalação

#### 1. Clone o repositório do GitHub:

```
git clone https://github.com/DevoluaP/Projeto_Viajados.git
```


#### 2. Instale as dependências:

```bash
cd Projeto_Viajados
```
```bash
npm run install
```


#### 3. Configure o Banco de Dados:

**Inicie o XAMPP/WAMP** e ative os módulos **Apache** e **MySQL**.

No terminal, execute os comandos:
```bash
cd server
```
```bash
npm run setup
```


#### 4. Atualize o IP do servidor no front-end:

Na pasta `client`, procure pelo arquivo `.env` e substitua pelo IP da sua máquina local:

1. Descubra seu IP:
   - **Windows**: Execute `ipconfig` no CMD e procure por "Endereço IPv4"
   - **Mac/Linux**: Execute `ifconfig` no terminal

2. Substitua no arquivo .env:
```typescript
   // De: http://192.168.1.101:5000
   // Para: http://seuenderecoipva4:5000
```


## Testando a Aplicação

1. **Verifique se o MySQL está rodando**:
   - Abra o XAMPP/WAMP Control Panel
   - Certifique-se que o módulo MySQL está com status "Running" (verde)

2. **Inicie o back-end**:
```bash
   cd server
```
```bash
   npm start (ou npm run dev)
```
   - Você deve ver:
   `Servidor rodando na porta 5000`
   `✅ Conectado ao banco de dados MySQL`

3. **Inicie o front-end**:
```bash
   cd client
```
```bash
   npm start
```
   - Escaneie o QR Code com o app Expo Go
   - Ou pressione `A` para abrir no Android Studio

4. **Usuário para testar**:
   - Email: teste@viajados.com
   - Senha: 123456


## Solução de Problemas Comuns

### Erro: "ECONNREFUSED" ao conectar ao MySQL
- **Solução**: Verifique se o MySQL está rodando no XAMPP/WAMP.

### Erro: "Network request failed" no app
- **Solução**: Verifique se o IP no front-end está correto e se seu celular está na mesma rede Wi-Fi.

### Erro: "ER_ACCESS_DENIED_ERROR"
- **Solução**: Verifique as credenciais do banco de dados no arquivo `.env`.


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


## Contato

Para dúvidas ou sugestões, entre em contato através do GitHub ou abra uma issue no repositório.