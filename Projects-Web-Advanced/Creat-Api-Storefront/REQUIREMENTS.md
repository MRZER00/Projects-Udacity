# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all Animals, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index:     `[GET] '/Animals'`
- Show:      `[GET] '/Animals/:id'`
- Create [token required]:    ` [POST]  '/Animals' (token)`
- [ADDED] Delete: `[DELETE]  '/Animals/:id  (token)`
- [OPTIONAL] Top 5 most popular Animals 
- [OPTIONAL] Animals by category (args: product category)

#### Users
- Index [token required]:   `[GET]  '/users' (token)`
- Show [token required]:    `[GET]  '/users/:id' (token)`
- Create New user: `[POST]  '/users' `
- [ADDED] Delete [token required]:  `[DELETE] 'users/:id' (token)`


#### Orders
- Index [token required]: `[GET]  '/orders' (token)`
- Current Order by user(args: user id)[token required]: `[GET]  '/current_order/:id' (token)`
- [ADDED] Create [token required]:  `[POST] '/create_orders' (token)`
- [OPTIONAL] Completed Orders by user (args: user id)[token required]



## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

```
CREATE TABLE products (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(50) NOT NULL, 
    price integer NOT NULL
);

```
#### User
- id
- firstName
- lastName
- password

```
CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    firstName VARCHAR(50) NOT NULL, 
    lastName VARCHAR(56) NOT NULL, 
    password_digest  VARCHAR NOT NULL
);
```
#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

```
CREATE TYPE current_mood AS ENUM ('active', 'complete');

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,  
    user_id bigint REFERENCES users(id),     
    product_id bigint REFERENCES products(id),
    quantity integer DEFAULT 1,
    status current_mood NOT NULL
);
```
```
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,  
    order_id   INTEGER NOT NULL REFERENCES orders (id),
    product_id INTEGER NOT NULL REFERENCES products (id),
    quantity   integer DEFAULT 1
);
```