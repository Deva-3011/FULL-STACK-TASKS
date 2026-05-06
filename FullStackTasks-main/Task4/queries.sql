-- Query 1: Display customer order history using JOIN
-- Shows all orders with customer and product details, ordered by order date
SELECT 
    c.name AS CustomerName,
    c.email AS Email,
    p.name AS ProductName,
    o.quantity,
    p.price AS UnitPrice,
    o.total_price AS TotalPrice,
    o.order_date AS OrderDate
FROM Customers c
JOIN Orders o ON c.id = o.customer_id
JOIN Products p ON o.product_id = p.id
ORDER BY o.order_date DESC;

-- Query 2: Find highest value order using subquery
-- Shows the order with maximum total price
SELECT 
    c.name AS CustomerName,
    p.name AS ProductName,
    o.quantity,
    o.total_price AS OrderValue,
    o.order_date AS OrderDate
FROM Customers c
JOIN Orders o ON c.id = o.customer_id
JOIN Products p ON o.product_id = p.id
WHERE o.total_price = (SELECT MAX(total_price) FROM Orders);

-- Query 3: Find most active customer using subquery
-- Shows the customer with the most orders
SELECT 
    c.id,
    c.name AS CustomerName,
    c.email,
    COUNT(o.id) AS TotalOrders,
    SUM(o.total_price) AS TotalSpent
FROM Customers c
JOIN Orders o ON c.id = o.customer_id
GROUP BY c.id, c.name, c.email
HAVING COUNT(o.id) = (
    SELECT COUNT(o2.id) 
    FROM Orders o2 
    GROUP BY o2.customer_id 
    ORDER BY COUNT(o2.id) DESC 
    LIMIT 1
)
ORDER BY TotalOrders DESC;
