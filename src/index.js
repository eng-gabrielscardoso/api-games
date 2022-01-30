require('dotenv-safe').config();
const bodyParser = require('body-parser');
const express = require('express');

const connection = require('../private/connection');
const gamesModel = require('../private/models/Games');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.sendStatus(200);
});

app.get('/games', (req, res, next) => {
  gamesModel.findAll()
    .then(data => {
      res.statusCode = 200;
      res.json(data);
    })
});

app.get('/game/:id', (req, res, next) => {
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

app.post('/game', (req, res, next) => {
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

app.delete('/game/:id', (req, res, next) => {
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

app.put('/game/:id', (req, res, next) => {
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

 