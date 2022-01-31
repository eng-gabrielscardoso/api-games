require('dotenv-safe').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('../private/database.json');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.sendStatus(200);
});

app.get('/games', (req, res, next) => {
  res.statusCode = 200;
  res.json(database.games);
});

app.get('/game/:id', (req, res, next) => {
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

app.post('/game', (req, res, next) => {
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

app.delete('/game/:id', (req, res, next) => {
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

app.put('/game/:id', (req, res, next) => {
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
 