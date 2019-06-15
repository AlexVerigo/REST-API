const express = require('express');

const app = express();

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'users',
  password: 'database*',
});

// // тестирование подключения
connection.connect(function(err) {
  if (err) {
    return console.error('Ошибка: ' + err.message);
  } else {
    console.log('Подключение к серверу MySQL успешно установлено');
  }
});
// закрытие подключения
connection.end(function(err) {
  if (err) {
    return console.log('Ошибка: ' + err.message);
  }
  console.log('Подключение закрыто');
});

// определяем объект Sequelize
const Sequelize = require('sequelize');
const sequelize = new Sequelize('users', 'root', 'database*', {
  dialect: 'mysql',
  host: 'localhost',
  define: {
    timestamps: false,
  },
});

// определяем модель User
const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// определяем модель Peoples
const Peoples = sequelize.define('peoples', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Surname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Age: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// синхронизация с бд
sequelize
  .sync()
  .then(result => {
    console.log(result);
  })
  .catch(err => console.log(err));

app.use(
  express.json({
    type: ['application/json', 'text/plain'],
  }),
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/table/register', async (req, res) => {
  const admin = await User.findByPk(1);
  if (!req.body) return res.sendStatus(400);
  if (req.body.user == admin.login && req.body.password == admin.password) {
    res.send({ login: true });
  } else {
    res.send({ login: false });
  }
});

app.get('/table/getrows', async (req, res) => {
  const reqData = req.query;
  if (reqData && reqData.searchString) {
    let lookupValue = reqData.searchString.toLowerCase();
    Peoples.findAll({
      where: {
        Name: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('Name')),
          'LIKE',
          '%' + lookupValue + '%',
        ),
      },
    })


    
      .then(function(user) {
        return res.send(user);
      })
      .catch(function(error) {
        res.status(500).send({message: 'SERVER_ERROR'})
        console.log(error);
      });
  } else {
    const users = await Peoples.findAll({ raw: true });
    res.send(users);
  }
});

app.post('/table/addrow', async (req, res) => {
  await Peoples.create({
    id: '',
    Name: '',
    Surname: '',
    Age: '',
  });

  const users = await Peoples.findAll();
  res.status(200).send(users);
});

app.delete('/table/deleterows', async (req, res) => {
  await Peoples.destroy({
    where: {},
    truncate: true,
  });
  const users = await Peoples.findAll();
  res.status(200).send(users);
});

app.delete('/table/delete/rowid', async (req, res) => {
  const data = req.body;
  console.log(req.body);
  await Peoples.destroy({
    where: {
      id: data.id,
    },
  });
  const users = await Peoples.findAll();
  res.status(200).send(users);
});

app.put('/table/saverow', async (req, res) => {
  const data = req.body;
  console.log(req.body);
  await Promise.all(
    data.map(user =>
      Peoples.update(
        {
          Name: user.Name,
          Surname: user.Surname,
          Age: user.Age,
        },
        {
          where: {
            id: user.id,
          },
        },
      ),
    ),
  );

  const users = await Peoples.findAll();

  res.status(200).send(users);
});

const port = 3001;

app.listen(port, () => console.log(`Server started on port ${port}`));
