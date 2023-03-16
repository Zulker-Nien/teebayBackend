# TEEBAY BackEnd Documentation

## RUN THIS BACKEND FIRST AND THEN FRONT END.

## Steps

### Step 1: Create a postgresDb

### Step 2: Update the .env file according to the database you set up: the dbName, the hostname, the port, the username etc.

### Step 3: Run the 2 scripts from the available scripts

### Available Scripts

#### 1. `npm run watch`

then in a separate terminal, run the command:

#### 2. `npm run dev`

### Step 4: Test out the schema from [http://localhost:4000/graphql](http://localhost:4000/graphql) your results to check the functionalities available.

## Dependencies Used for this project are:

1.  apollo-server-express
2.  bcryptjs
3.  cors
4.  express
5.  graphql
6.  jsonwebtoken
7.  nodemon
8.  pg
9.  reflect-metadata
10. ts-node
11. type-graphql
12. typeorm

## Backend File Connection used for this project:

Using DataSource, Typeorm loads data into the connection.

## Entities

### 1. User

#### Fields:

id:Int,
created:Date,
updated:Date,
firstName:string,
lastName:string,
address:string,
phoneNumber:string,
password:string,
products:ProductInfo[],
isComplete:boolean

### 2. Product

## Resolver

1.  User
2.  Product
