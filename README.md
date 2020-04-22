# Pokémon Information with Angular and Angular Material
Contains:
- Front-end with Angular
- Back-end with Node.js + Express and MongoDB
- Data from pokeapi.co

## Front-end
The front-end was made in Angular 9 using Angular Material

### Functionalities
- List of pokémon and types, clickable to see their info
- Information about pokémon and types, from the pokeapi.co API
- User sign up and login
- Information can only be seen if you're logged

### How to run
- Run `npm install` to install packages
- Run `ng serve` to start the front-end server
- Go to `localhost:4200` to access the page

## Back-end
Back-end made with Node.js and Express, using MongoDB as database. Used to host users profiles (for now, only username and password)

This back-end server was implemented in a single JavaScript file ("login.js") and uses the same package.json of the front-end to track the packages needed.

### Functionalities
- An back-end/API service for user login.
- `HTTP POST` at `localhost:8001/signup` to create an account
- `HTTP POST` at `localhost:8001/login` to login and receive an JWT token

### How to run
- Run `npm install` to install packages
- Run your MongoDB server at port `27017` and create a database named `pokemon_users`
- Run `node login` to start the back-end server at port `8001`
