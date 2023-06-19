# Let's Play - The Golf App

## Available Scripts

Start the backend server first, then the frontend server.
In the frontend directory, you can run:

### `npm intall`
### `npm start`

## Setup MongoDB
Set env variable MONGODB_URI to the address of your local database (e.g. mongodb://localhost:27017)

## Change Log

```md
16.03.2023
(1) Added a editable user details page
(2) NavButtons included

14.06.2023
(1) Basic design added
(2) Display error messages from backend

12.06.2023
(1) You can now register as a user on the site by assigning a "username" and a "password".
(2) The username now must be a valid email address.
(3) Password matcher included
(4) The password must be at least 6 characters long.
(5) Checks if username is already registered in the database.
```

## Description 
An app for golfers to keep track of scores hole by hole and per course. The app would address both total score and quota scores for the user. Additional stretch features are mapping and range estimation

## User Story

```md
A user opens the app and can sign up and create a new account or log in with credentials. Once the user is logged in they are brought to  the home page, then the users score history,  handicap value, and nav bar are displayed. The user can interact with the nav bar and click their Post Score, Stats, Golf Games
