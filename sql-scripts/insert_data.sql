-- Update users table
INSERT INTO users (id, name, email, password)
VALUES
    ('3e1173bb-e873-458e-81b9-6d562587f5a8', 'alenabonch', 'alena@gmail.com', 'TEST_PASSWORD'),
    ('5b1173bb-e873-458e-81b9-6d562587f5a8', 'roman', 'roman@gmail.com', 'ROMAN_PASSWORD');

-- Update carts table
INSERT INTO carts (id, user_id, status)
VALUES
    ('c064bd24-ef0c-443e-ab0b-3925c46f555b', '3e1173bb-e873-458e-81b9-6d562587f5a8', 'OPEN');

-- Update cart items table
INSERT INTO cart_items (cart_id, product_id, count)
VALUES
    ('c064bd24-ef0c-443e-ab0b-3925c46f555b', 'b5698053-8bd0-424b-8714-4f89d270c9f3', 1),
    ('c064bd24-ef0c-443e-ab0b-3925c46f555b', '3e1173bb-e873-458e-81b9-6d562587f5a8', 2);

-- Update orders table
INSERT INTO orders (user_id, cart_id, payment, delivery, comments, status, total)
VALUES
    ('3e1173bb-e873-458e-81b9-6d562587f5a8', 'c064bd24-ef0c-443e-ab0b-3925c46f555b', '"payment"', '"delivery"', 'comments', 'OPEN', 2);
