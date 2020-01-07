# Habbit Rabbit
habbit Rabbit is the backend server for the app called Habbit Rabbit.


## About Habbit Rabbit
Habbit Rabbit is an iOS App built with Expo and React-Native that tracks productive habits that you want to build and monitors your progress towards developing them. This repo holds the backend for that app. The Front-end Repository can be found [here](https://github.com/Gauraklein/habbitRabbit).



## Technologies Used
| Technology                          | Purpose                                                                                                                       |
|---------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| [Knex.js](http://knexjs.org/)      | A "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use |
| [Node.js](https://nodejs.org/en/)   | Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.                                                       |
| [Express](https://expressjs.com/)   | A node.js web application framework used to develop features for our web application                                           |
| [Passport.js](http://www.passportjs.org/)                     | Passport.js was used to develop a local strategy for authentication.                                 |
| [PostgreSQL](https://www.postgresql.org/)                     | PostgreSQL as our database to store data                                                             |
| [Postico](https://eggerapps.at/postico/)                      | A PostgreSQL client for macbooks                                                                     |
| [Passport-facebook](http://www.passportjs.org/docs/facebook/) | Passport-facebook was used as a secondary authentication strategy                                    |
| [faker JS](https://github.com/marak/Faker.js/) | Generate fake data for users and posts |



## Authentication
a Facebook Oauth is used as the method for authentication. Users are redirected to facebook to log in, then are redirected back to Habbit Rabbit.



## Routes

| endpoints                        | Returns                                                                                                                     |
|---------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| /auth/facebook     | Returns user information from facebook. If not user data is found, the user is routed to /add-user/. User is then re-routed to "/user-habits/" |
| /add-user          | If a user id is not found in the database then an INSERT query is ran to the database to add the users information                          |
| /user-habits       | A query is run to the database using the unique id from facebook, then returns all of the habits for that user                              |
| /add-new-habit     | A query is used to insert a users habit into the database.                                                                                  |

# Routes Used For Testing
| endpoints                        | Returns                                                                                                                     |
|---------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| /users             | Returns all users in the database|
| /add-user          | Returns all habits listed for each user in the database                                                                                       |
| /user-habits       | A query is run to the database using the unique id from facebook, then returns all of the habits for that user                              |
| /add-new-habit     | A query is used to insert a users habit into the database.                                                                                  |


## Potential Future Developments
* Adding a method to track how many times a user completes a "habbit" verses how many days they have left out of 66 may be useful for users
who are interested in how many times they performed a particular habbit within the 66 days.
* Users might also like to know the last time they "checked in" to their "habbit." In order to make this happen a new table would need to be added to the database with id, habit, and time_stamp columns.
* Deploy the server and database.


## Collaborators
* [Terrence J. Eveline](https://github.com/tjeve)
* [Gaura Klein](https://github.com/Gauraklein)
