-- scripts/init-db.sql

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS productsdb;

-- Use the new database
USE productsdb;

-- Create the products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL
);
