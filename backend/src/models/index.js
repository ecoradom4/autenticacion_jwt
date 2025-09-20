const { Sequelize } = require('sequelize');
const UserModel = require('./user');

const connectionString = process.env.DATABASE_URL;

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: console.log,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const User = UserModel(sequelize);

module.exports = {
  sequelize,
  User
};