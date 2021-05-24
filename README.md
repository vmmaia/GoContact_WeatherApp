# Desafio técnico - GoContact - Vasco Maia - Maio 2021

O desafio técnico proposto na sequência do processo de recrutamento é o desenvolvimento de uma página web com os seguintes requisitos:

- Permitir inserir o nome de 3 ou mais cidades
- Mostrar gráfico de barras com as temperaturas por cidade
- Deve mostrar numa tabela:
  - as cidades, a temperatura e a hora de início do dia e de noite, com possibilidade de ordenação por qualquer coluna
- A comunicação com APIs públicas tem de ser feita por uma API interna em node.js.
- A página web apenas invoca a API interna
- A API interna deve registar os pedidos feitos num ficheiro de log

# 1. Instalação

## 1.1. Docker

O projeto está preparado para ser colocado em execução com o Docker-compose.

Para executar o projeto com o docker-compose, executa-se o seguinte comando na raiz do projeto:

```
docker-compose up
```

O frontend irá correr no porto `80` e o backend no porto `5000` ambos no `localhost`.

## 1.2. Individual

### 1.2.1. Fronend

Para executar o frontend independentemente do backend executam-se os seguintes comandos dentro da pasta `frontend`:

```
npm install
npm start
```

O frontend irá correr no porto `3000` no `localhost`.

### 1.2.2. Backend

Para executar o backend independentemente do frontend executam-se os seguintes comandos dentro da pasta `backend`:

```
npm install
npm run dev
```

O frontend irá correr no porto `5000` no `localhost`.

# 2. Testes

## 2.1. Backend

Para executar os testes do frontend executa-se o seguinte comando dentro da pasta `frontend` assumindo que as dependências já foram instaladas com `npm install`:

```
npm test
```

## 2.2. Frontend

Para executar os testes do backend executa-se o seguinte comando dentro da pasta `backend` assumindo que as dependências já foram instaladas com `npm install`:

```
npm run test
```
