# Guidde

[Heroku base url](https://guidde-backend.herokuapp.com/)

## Setting Up The Application

### A. Clone the Application

1. Open your terminal

2. Run `clone https://github.com/b0nbon1/Guidde-Backend.git`

### B. Setting up the environment

1. **rename** a `.env.example` to `.env` file

2. Then add the values to all environmental variables in `.env` file

3. Install postgres

4. When the server is running, create a database on your new PG server. Ensure your new development database is the same name as your `DATABASE_DEV_URL`

5. Ensure you have Postgres running

### B. Running the application

In your terminal:

1. Run `npm install` to install all dependencies

2. Migrate database `npm run migrate`

3. For **Development**: run `npm run dev`

## PROBLEM DESCRIPTION

## Objective 
This task is designed to provide an opportunity for you to demonstrate general NodeJS based restful API development knowledge in the sense that you: 
write clean, structured, readable and maintainable code create simple application components and building blocks understand fetching, transforming and aggregating data from external APIs maintain a well designed application state craft a pleasant api consumer experience 
## Task 
Create a small set of rest API endpoints using NodeJS that can be used for listing the names of Star Wars movies along with their opening crawls and comment counts, adding and listing anonymous comments for a movie, and getting the character list for a movie. 
## General requirements 
The application should have basic documentation that lists available endpoints and methods along with their request and response signatures 
The exact api design in terms of total number of endpoints and http verbs is up to you Keep your application source code on a public Github repository 
Provide a live demo url (Glitch, Netlify, Zeit Now and Heroku are good options,some of which also offer free sql databases) and compulsory an external API documentation link (Swagger, Postman). Bonus, but not mandatory, if you can dockerize the development environment 
## Data requirements 
The movie data should be fetched online from https://swapi.py4e.com/
Movie names in the movie list endpoint should be sorted by release date from earliest to newest and each movie should be listed along with opening crawls and count of comments. Comments should be stored in a SQL database. Error responses should be returned in case of errors 
Character list requirements 
Endpoint should accept sort parameters to sort by one of name, gender or height in ascending or descending order. Endpoint should also accept a filter parameter to filter by gender. The response should also return metadata that contains the total number of characters that match the criteria along with the total height of the chracters that match the criteria. The total height should be provided both in cm and in feet/inches. For instance, 170cm makes 5ft and 6.93 inches. 
## Comment requirements 
Comment list should be retrevied in reverse chronological order 
Comments should be retrieved along with the public IP address of the commenter and UTC date&time they were stored 
Comment length should be limited to 500 characters


## Author :computer:

## Hezron Kimutai
