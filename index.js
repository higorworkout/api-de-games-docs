const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const jwt = require("jsonwebtoken");

//passwd to jwt
const jwtSecret = "C@nt0930511"

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())

function auth(req, res, next) {
    const authToken = req.headers['authorization']

    if(authToken != undefined) {
        const bearer = authToken.split(' ');
        let token = bearer[1];
        
        jwt.verify(token, jwtSecret, (err, data) => {
            if(err) {
                res.status(401);
                res.json({err: "Token inválido!"})
            }else {
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};
                req.empresa = "Guia do Programador";
                next();
            }
        })
    }else {
        res.status(401);
        res.json({err: "Token inválido!"})
    }
}

var DB = {
    games: [
        {
            id: 232,
            title: "Call of duty MW",
            year: 2018,
            price: 60
        },
        {
            id: 65,
            title: "Sea of thieves",
            year: 2019,
            price: 40
        },
        {
            id: 2,
            title: "Minecraft",
            year: 2012,
            price: 20
        },

    ],
    users: [
        {
            id: 1,
            name: "Higor Soares",
            email: "higor.15nwa@gmail.com",
            password: "930511hig"
        },
        {   
            id: 2,
            name: "Aparecido José",
            email: "aparecido@gmail.com",
            password: "123456"
        }
    ]
}

app.get("/games",auth, (req, res) => {

    res.statusCode = 200;
    res.json(DB.games);
})

app.get("/games/:id",auth , (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400);
    }else {
        let id = parseInt(req.params.id);
        let game = DB.games.find(g => g.id === id);

        if(game != undefined) {
            res.statusCode = 200;
            res.json(game)
        }else {
            res.sendStatus(404);
        }
    }
})


app.post("/game",auth, (req, res) => {
    let {title, price, year} = req.body;
    console.log(req.body)
    DB.games.push({
        id: 23,
        title,
        price, 
        year
    });

    res.sendStatus(200);
});

app.delete("/game/:id",auth, (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else {
        let id = parseInt(req.params.id);
        let index = DB.games.findIndex(g => g.id === id);
        if(index == -1) {
            res.sendStatus(404);
        }else {
            DB.games.splice(index,1);
            res.sendStatus(200);
        }
    }
});

app.put("/game/:id", (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        let id = parseInt(req.params.id);
        let game = DB.games.find(g => g.id === id);

        if(game != undefined) {
            let {title, price, year} = req.body;

            if(title != undefined) {
                game.title = title;
            }

            if(price != undefined){
                game.price = price;
            }

            if(year != undefined){
                game.year = year;
            }
        
            res.sendStatus(200);

        }else {
            res.sendStatus(404);
        }

    }
})

app.post("/auth",(req, res) => {
    let {email, password} = req.body;

    
    if(email != undefined) {
        let user = DB.users.find(u => u.email === email);

        
       if(user != undefined) {

            if(user.password === password) {

                jwt.sign({
                    id: user.id,
                    email: user.email
                }, jwtSecret, {expiresIn: '48h'}, (err, token) => {
                    if(err) {
                        res.status(400);
                        res.json({err: "Falha interna"})
                    }else {
                        res.status(200);
                        res.json({token: token})
                    }
                });
            }else {
                res.status(401);
                res.json({err: "Credenciais inválida"});
            }
       } else {
            res.status(404);
            res.json({err: "O E-mail não existe na base de dados!"})
       }
    }else {
        res.status(400);
        res.json({err: "O E-mail enviado é inválido"})
    }
});

app.listen(8888, () => {
    console.log("API Rodando")
});
