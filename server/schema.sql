INSERT INTO `ecommerce2`.`users` (email, password, role, address, firstName, lastname, status, createdAt, updatedAt)
VALUES
  ('admin@example.com', '$2b$10$1234567890123456789012', 'admin', '123 Admin St', 'Admin', 'User', 'active', NOW(), NOW()),
  ('seller1@example.com', '$2b$10$2345678901234567890123', 'seller', '456 Seller Ave', 'Seller', 'One', 'active', NOW(), NOW()),
  ('buyer1@example.com', '$2b$10$3456789012345678901234', 'buyer', '789 Buyer Blvd', 'Buyer', 'One', 'active', NOW(), NOW());

-- Insert remaining 47 users (adjust roles as needed)
INSERT INTO `ecommerce2`.`users` (email, password, role, address, firstName, lastname, status, createdAt, updatedAt)
SELECT 
  CONCAT('user', n, '@example.com'),
  CONCAT('$2b$10$', SUBSTRING(MD5(RAND()), 1, 22)),
  CASE WHEN n % 3 = 0 THEN 'seller' WHEN n % 3 = 1 THEN 'buyer' ELSE 'admin' END,
  CONCAT(n, ' Random St'),
  CONCAT('First', n),
  CONCAT('Last', n),
  'active',
  NOW(),
  NOW()
FROM (
  SELECT a.N + b.N * 10 + 4 as n
  FROM (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) a,
       (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) b
  ORDER BY n
  LIMIT 47
) numbers;

-- Insert categories
INSERT INTO `ecommerce2`.`categories` (name, createdAt, updatedAt)
VALUES
  ('Electronics', NOW(), NOW()),
  ('Clothing', NOW(), NOW()),
  ('Home & Garden', NOW(), NOW()),
  ('Books', NOW(), NOW()),
  ('Toys', NOW(), NOW());

-- Insert products (only by sellers)
INSERT INTO `ecommerce2`.`products` (name, description, quantity, price, rating, color, userId, createdAt, updatedAt, categoryId)
SELECT 
  CONCAT('Product ', n),
  CONCAT('Description for product ', n),
  FLOOR(RAND() * 100) + 1,
  ROUND(RAND() * 1000, 2),
  ROUND(RAND() * 5, 1),
  ELT(FLOOR(RAND() * 5) + 1, 'Red', 'Blue', 'Green', 'Yellow', 'Black'),
  (SELECT id FROM `ecommerce2`.`users` WHERE role = 'seller' ORDER BY RAND() LIMIT 1),
  NOW(),
  NOW(),
  FLOOR(RAND() * 5) + 1
FROM (
  SELECT a.N + b.N * 10 + c.N * 100 + 1 as n
  FROM (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) a,
       (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) b,
       (SELECT 0 AS N UNION SELECT 1) c
  ORDER BY n
  LIMIT 200
) numbers;

-- Insert images (using Lorem Picsum for real random images)
INSERT INTO `ecommerce2`.`images` (Url, createdAt, updatedAt, productId)
SELECT 
  CONCAT('https://picsum.photos/400/600?random=', p.id, '-', n),
  NOW(),
  NOW(),
  p.id as productId
FROM `ecommerce2`.`products` p
CROSS JOIN (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5) numbers;

-- Insert carts (for buyers)
INSERT INTO `ecommerce2`.`carts` (createdAt, updatedAt, userId, productId)
SELECT 
  NOW(),
  NOW(),
  u.id,
  p.id
FROM `ecommerce2`.`users` u
CROSS JOIN `ecommerce2`.`products` p
WHERE u.role = 'buyer'
ORDER BY RAND()
LIMIT 100;

-- Insert wishlists (for buyers)
INSERT INTO `ecommerce2`.`whishlists` (createdAt, updatedAt, userId, productId)
SELECT 
  NOW(),
  NOW(),
  u.id,
  p.id
FROM `ecommerce2`.`users` u
CROSS JOIN `ecommerce2`.`products` p
WHERE u.role = 'buyer'
ORDER BY RAND()
LIMIT 100;