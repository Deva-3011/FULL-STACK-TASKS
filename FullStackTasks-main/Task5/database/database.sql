CREATE DATABASE IF NOT EXISTS payment_system;

USE payment_system;

CREATE TABLE accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00
);

INSERT INTO accounts (name, balance) VALUES ('user', 1000.00);
INSERT INTO accounts (name, balance) VALUES ('merchant', 0.00);