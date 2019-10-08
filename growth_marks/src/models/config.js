const Sequelize = require('sequelize');

// Option 2: Passing a connection URI
const sequelize = new Sequelize( {username: 'mirriam',
password: null,
database: 'growthmarks',
host: '127.0.0.1',
dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;