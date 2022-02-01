require('dotenv-safe').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('../private/database.json');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const jwtSecret = process.env.JWT_SECRET;
const port = process.env.PORT || 3000;

const authMiddleware = require('../middlewares/auth');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.sendStatus(200);
});

app.get('/games', authMiddleware, (req, res, next) => {
  res.statusCode = 200;
  res.json(database.games);
});

app.get('/game/:id', authMiddleware, (req, res, next) => {
  let id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    let game = database.games.find(g => g.id == id);

    if (game != undefined) {
      res.statusCode = 200;
      res.json(game);
    } else {
      res.sendStatus(404);
    };
  };
});

app.post('/game', authMiddleware, (req, res, next) => {
  let {
    name,
    year,
    developer,
    price
  } = req.body;

  
  database.games.push({
    id: 4,
    name, 
    year,
    developer,
    price
  });

  res.sendStatus(200);
});

app.post('/auth', (req, res, next) => {
  let emailReq = req.body.email;
  let passwordReq = req.body.password;

  if (emailReq != undefined) {
    if (passwordReq != undefined) {
      let user = database.users.find(user => user.email == emailReq);

      if (user != undefined) {
        if (user.password == passwordReq) {
          jwt.sign({
            id: user.id,
            email: user.email,
          },
          jwtSecret,
          { expiresIn: '1h' },
          (err, token) => {
            if (err) {
              res.statusCode = 503;
              res.json({ "err": "Ocorreu uma falha durante a geração do token" });
            } else {
              res.statusCode = 200;
              res.json({ token: token });
            };
          });
        } else {
          res.statusCode = 401;
          res.json({ "err": "Credenciais inválidas" });
        }
      } else {
        res.statusCode = 400;
        res.json({ "err": "Usuário não encontrado" });
      };
    } else {
      res.statusCode = 400;
      res.json({ "err": "Senha inválida" });
    };
  } else  {
    res.statusCode = 400;
    res.json({ "err": "E-mail inválido" });
  };
});

app.delete('/game/:id', authMiddleware, (req, res, next) => {
  let id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    let index = database.games.findIndex(g => g.id == id);

    if (index == -1) {
      res.sendStatus(404);
    } else {
      database.games.splice(index, 1);
      res.sendStatus(200);
    };
  };
});

app.put('/game/:id', authMiddleware, (req, res, next) => {
  let id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    let game = database.games.find(g => g.id == id);

    if (game != undefined) {
      let {
        name,
        year,
        developer,
        price
      } = req.body;

      if (name != undefined) {
        game.name = name;
      };

      if (year != undefined) {
        game.year = year;
      };

      if (developer != undefined) {
        game.developer = developer;
      };

      if (price != undefined) {
        game.price = price;
      };

      res.sendStatus(200);     
    } else {
      res.sendStatus(404);
    };
  }; 
});

app.listen(port, () => {
  try {
    console.log(`API running. See: http://localhost:${port}`);
  } catch (e) {
    console.log(`An error occurred. ${e}`);
  };
});
 