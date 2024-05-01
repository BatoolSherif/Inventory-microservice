const { Sequelize } = require('sequelize');

// Configure Sequelize connection
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '123456',
  database: process.env.DB_NAME || 'productsdb',
  logging: false,
  retry: {
    max: 10,  // Number of retry attempts
    match: [
      'SequelizeConnectionError',
      'SequelizeConnectionRefusedError',
    ],
  },  // Disable Sequelize logs
});

// Import Product model
const Product = require('../models/Product')(sequelize);

// Sync database schema
sequelize.authenticate()
  .then(() => console.log('Successfully connected to MySQL'))
  .catch((err) => console.error('MySQL connection error:', err));

sequelize.sync();  // Synchronize schema with the database

module.exports = {
  sequelize,
  Product,
};
