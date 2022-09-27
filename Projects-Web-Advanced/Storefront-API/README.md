# create-an-online-storefront

This is a backend API build in Nodejs for an online store. It exposes a RESTful API that will be used by the frontend developer on the frontend. 

The database schema and and API route information can be found in the [REQUIREMENT.md](REQUIREMENTS.md) 
    
## Installation Instructions
This section contains all the packages used in this project and how to install them. However, you can fork this repo and run the following command at the root directory to install all packages.

`yarn` or `npm install`

#### express
`npm i -S express`
`npm i -D @types/express`

#### typescript
`npm i -D typescript`

#### db-migrate
`npm install -g db-migrate`

#### pg
`npm install pg-pool pg `
`npm i --save-dev @types/pg`

<!-- <!-- #### rimraf 
`npm install --save rimraf` -->

#### bcrypt
`npm -i bcrypt`
`npm -i -D @types/bcrypt`

#### morgan 
`npm install --save morgan`
`npm -i -D @types/morgan`

#### jsoe
`npm i jsoe --sav`

#### jasmine
`npm install jasmine @types/jasmine @ert78gb/jasmine-ts ts-node --save-dev`

#### supertest
`npm i supertest`
`npm i --save-dev @types/supertest`


## Set up Database
### Create Databases
We shall create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`
- following to create a user 
    - `CREATE USER ZER00 WITH PASSWORD 'pass123word';`
- In psql run the following to create the dev and test database
    - `CREATE DATABASE shopping;`
    - `CREATE DATABASE test_shop;`
- Connect to the databases and grant all privileges
    - Grant for dev database
        - `\c shopping`
        - `GRANT ALL PRIVILEGES ON DATABASE shopping TO ZER00;`
    - Grant for test database
        - `\c test_shop`
        - `GRANT ALL PRIVILEGES ON DATABASE shopping_test TO ZER00;`

### Migrate Database
Navigate to the root directory and run the command below to migrate the database 

`db-migrate up`

## Environmental Variables Set up

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=shopping
POSTGRES_TEST_DB=test_shop
POSTGRES_USER=ZER00
POSTGRES_PASSWORD=pass123word

SALT_ROUNDS=10
BCRYPT_PASSWORD=pass123word
TOKEN_SECRET=pass123word1czxccxzcxzcd54584dc4ds23pass
ENV=dev
```

## Start App
`yarn start` or `npm run start`
- to start the app and get access via http://127.0.0.1:2020

- `db-migrate up` to set up the database and get access via http://127.0.0.1:5432

## Endpoint Access
All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file. 

## Token and Authentication
Tokens are passed along with the http header as 
```
Authorization   Bearer <token>
```

## Testing
Run test with 

`yarn test`

### Changing Environment to testing  

`"test": "npm run build && set ENV=test && db-migrate --env test up && npm run jasmine && db-migrate --env test down"
`

It sets the environment to `test`, migrates up tables for the test database, run the test then migrate down all the tables for the test database. 