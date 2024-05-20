CREATE extension IF NOT EXISTS "uuid-ossp";

CREATE TYPE CART_STATUS AS ENUM('OPEN', 'ORDERED');
CREATE TYPE ORDER_STATUS AS ENUM('IN_PROGRESS', 'DELIVERED');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    email TEXT,
    password TEXT
);

CREATE TABLE IF NOT EXISTS carts (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	user_id UUID REFERENCES users (id) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status CART_STATUS
);

CREATE TABLE IF NOT EXISTS cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id UUID REFERENCES carts (id) NOT NULL,
    product_id UUID,
    count INTEGER
);

CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users (id) NOT NULL,
    cart_id UUID REFERENCES carts (id) NOT NULL,
    payment JSON,
    delivery JSON,
    comments TEXT,
    status ORDER_STATUS,
    total INTEGER
);
