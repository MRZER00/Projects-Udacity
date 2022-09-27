/* Replace with your SQL commands */
-- CREATE TYPE current_mood AS ENUM ('active', 'complete');

CREATE TABLE products (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(50) NOT NULL, 
    price integer NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    firstName VARCHAR(50) NOT NULL, 
    lastName VARCHAR(56) NOT NULL, 
    password_digest  VARCHAR NOT NULL
);


CREATE TABLE orders(
    id SERIAL PRIMARY KEY,  
    user_id bigint REFERENCES users(id),     
    status current_mood NOT NULL
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,  
    order_id   INTEGER NOT NULL REFERENCES orders (id),
    product_id INTEGER NOT NULL REFERENCES products (id),
    quantity   integer DEFAULT 1
);