-- Create main table
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10,2),
    description VARCHAR(255)
);

-- Create log table
CREATE TABLE activity_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action_type ENUM('INSERT', 'UPDATE'),
    old_value JSON,
    new_value JSON,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO transactions (amount, description) VALUES (100.00, 'Initial deposit'), (50.00, 'Purchase');

-- Triggers
DELIMITER //

CREATE TRIGGER after_insert_transaction
AFTER INSERT ON transactions
FOR EACH ROW
BEGIN
    INSERT INTO activity_log (action_type, old_value, new_value)
    VALUES ('INSERT', NULL, JSON_OBJECT('id', NEW.id, 'amount', NEW.amount, 'description', NEW.description));
END //

CREATE TRIGGER after_update_transaction
AFTER UPDATE ON transactions
FOR EACH ROW
BEGIN
    INSERT INTO activity_log (action_type, old_value, new_value)
    VALUES ('UPDATE', JSON_OBJECT('id', OLD.id, 'amount', OLD.amount, 'description', OLD.description), JSON_OBJECT('id', NEW.id, 'amount', NEW.amount, 'description', NEW.description));
END //

DELIMITER ;

-- View
CREATE VIEW daily_activity_report AS
SELECT DATE(timestamp) AS date, COUNT(*) AS total_actions
FROM activity_log
GROUP BY DATE(timestamp);