require('dotenv-safe').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');

const connection = require('../private/connection');
const gamesModel = require('../private/models/Games');
const usersModel = require('../private/models/Users');

const app = express();
const jwtSecret = process.env.JWT_SECRET;
const port = process.env.PORT || 3000;

const authMiddleware = require('../middlewares/auth');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  };
});

app.get('/games', authMiddleware, (req, res, next) => {
  gamesModel.findAll()
    .then(data => {
      res.statusCode = 200;
      res.json(data);
    })
});

app.get('/game/:id', authMiddleware, (req, res, next) => {
  let Req = parseInt(req.params.id);

  if (isNaN(idReq)) {
    res.sendStatus(400);
  } else {
    gamesModel.findByPk(idReq)
      .then(data => {
        if (data == null) {
          res.sendStatus(404)
        } else {
          res.statusCode = 200;
          res.json(data);
        };
      });
  };
});

app.post('/user', (req, res, next) => {
  let nameReq = req.body.name;
  let emailReq = req.body.email;
  let passwordReq = req.body.password;

  usersModel.create({
    name: nameReq,
    email: emailReq,
    password: passwordReq,
  })
    .then(() => {
      res.statusCode = 200;
      res.json({ "success": "The user has been created" });
    })
    .catch(err => {
      res.statusCode = 503;
      res.json({ "err": "Error: " + err });
    });
});

app.post('/auth', (req, res, next) => {
  let emailReq = req.body.email;
  let passwordReq = req.body.password;

  if (emailReq != undefined) {
    if (passwordReq != undefined) {
      usersModel.findOne({
        where: { 
          email: emailReq,
          password: passwordReq,
        }
      })
        .then(user => {
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
        })
        .catch(err => {
          res.statusCode = 401;
          res.json({ "err": "Credenciais inválidas" });
          console.log(err);
        });
    } else {
      res.statusCode = 400;
      res.json({ "err": "Senha inválida" });
    };
  } else {
    res.statusCode = 400;
    res.json({ "err": "E-mail inválido" });
  };
});

app.post('/game', authMiddleware, (req, res, next) => {
  let nameReq = req.body.name;
  let yearReq = req.body.year;
  let developerReq = req.body.developer;
  let priceReq = req.body.price;

  gamesModel.create({
    name: nameReq,
    year: yearReq,
    developer: developerReq,
    price: priceReq
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

app.delete('/game/:id', authMiddleware, (req, res, next) => {
  let idReq = parseInt(req.params.id);

  if (isNaN(idReq)) {
    res.sendStatus(400);
  } else {
    gamesModel.destroy({
      where: { id: idReq }
    })
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  };
});

app.put('/game/:id', authMiddleware, (req, res, next) => {
  let idReq = parseInt(req.params.id);

  if (isNaN(idReq)) {
    res.sendStatus(400);
  } else {
    let nameReq = req.body.name;
    let yearReq = req.body.year;
    let developerReq = req.body.developer;
    let priceReq = req.body.price;

    gamesModel.update(
      {
        name: nameReq,
        year: yearReq,
        developer: developerReq,
        price: priceReq,
      },
      {
        where: { id: idReq }
      },
    )
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(400));
  };
});

(async function() {
  try {
    await connection.authenticate();
    console.log(`Connection with database has been established succefully`);
  } catch (e) {
    console.error(`Unable to connect to the database: ${e}`);
  };

  await app.listen(port, () => {
    try {
      console.log(`API running. See: http://localhost:${port}`);
    } catch (e) {
      console.log(`An error occurred. ${e}`);
    };
  });
})();

 