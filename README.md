# Api de games

## Endpoints

### GET /games
Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados.

#### Parametros
Nenhum
#### Respostas
##### OK! 200
Caso essa resposta aconteça você vai receber a listagem de todos os games.
Exemplo de resposta:

```
[
    {
        "id": 232,
        "title": "Call of duty MW",
        "year": 2018,
        "price": 60
    },
    {
        "id": 65,
        "title": "Sea of thieves",
        "year": 2019,
        "price": 40
    },
    {
        "id": 2,
        "title": "Minecraft",
        "year": 2012,
        "price": 20
    }
]
```

##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token espirado.

Exemplo de resposta:

```
{
    "err": "Token inválido!"
}

```
### POST /auth
Esse endpoint é responsavel pela autenticação (login) do usuário na API.
#### Parametros
Exemplos:
```
{
  "email": "higor.15nwa@gmail.com",
  "password": "senha"
}
```

#### Respostas

##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token espirado.
Exemplo:
```
{err: "Credenciais inválida"}
```

##### OK! 200
Caso o status de saida seja 200, receberá o token JWT para o acesso dos endpoints protegidos na API.

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJoaWdvci4xNW53YUBnbWFpbC5jb20iLCJpYXQiOjE2OTA1NTczMjYsImV4cCI6MTY5MDczMDEyNn0.zFdn74s6Iv3QSJdVBjpYPG3ojS6BrZHXCqg2TTe_rBk"
}
```








