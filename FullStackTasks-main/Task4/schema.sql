-- Create Customers table
CREATE TABLE Customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- Create Products table
CREATE TABLE Products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Create Orders table
CREATE TABLE Orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

-- Insert sample data into Customers
INSERT INTO Customers (name, email) VALUES
('John Smith', 'john@example.com'),
('Sarah Johnson', 'sarah@example.com'),
('Michael Brown', 'michael@example.com'),
('Emily Davis', 'emily@example.com'),
('Robert Wilson', 'robert@example.com');

-- Insert sample data into Products
INSERT INTO Products (name, price) VALUES
('Laptop', 1200.00),
('Mouse', 25.00),
('Keyboard', 75.00),
('Monitor', 300.00),
('USB Hub', 45.00);

-- Insert sample data into Orders
INSERT INTO Orders (customer_id, product_id, quantity, total_price, order_date) VALUES
(1, 1, 1, 1200.00, '2026-01-15 10:30:00'),
(1, 2, 2, 50.00, '2026-02-10 14:20:00'),
(2, 3, 1, 75.00, '2026-01-20 09:15:00'),
(2, 4, 1, 300.00, '2026-02-05 11:45:00'),
(2, 5, 3, 135.00, '2026-02-20 16:30:00'),
(3, 1, 1, 1200.00, '2026-01-25 13:10:00'),
(3, 2, 1, 25.00, '2026-03-01 10:00:00'),
(4, 3, 2, 150.00, '2026-02-28 15:45:00'),
(4, 4, 1, 300.00, '2026-03-10 12:30:00'),
(5, 2, 5, 125.00, '2026-03-05 08:20:00');
