# easySwing - The Golf App

## Available Scripts

Start the backend server first, then the frontend server.
In the frontend directory, you can run:

### `npm intall`
### `npm start`

## Setup MongoDB
Set env variable MONGODB_URI to the address of your local database (e.g. mongodb://localhost:27017)
Import the database dump from the files "*.json" into your local database - name the collection as file names.


## Change Log

```md
12.07.2023
(1) Added a map container to display the golf holes location.
(2) A polyline displays the path between you and the golf hole.
(3) The distance between you and the golf hole is displayed.
(4) Rework on Scorecard according to the users personal handicap.

03.07.2023
(1) Added a new page to display the user's score history.
(2) Added a new page to display the user's handicap value.
(3) Added a new page to display the user's stats.
(4) Added a new page to display the user's golf games.
(5) Added a new page to display / edit the user's profile.
(6) Added a google maps api to look up nearby golf courses.

23.06.2023
(1) Once you select a golf course were you wish to play..
(2) ...you can now initialize a new scorecard for your round.

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
An app for golfers to keep track of scores hole by hole and per course. The app would address both total score and quota scores for the user. Additional stretch features are mapping and range estimation. Due to limitations of the golf API, the data was manually entered into MongoDB and only a few courses are supported at this time.

## User Story

```md
A user opens the app and can sign up and create a new account or log in with credentials.
Once the user is logged in they are brought to the home page.
The users can now edit his/her personal details and upload a profil picture.
The User can now select a golf course and start a new round and set his score for every hole.
During this the user can see his current score and the score he needs to reach his quota.
Once the user has finished his round he can save his scorecard and view his score history.
```

## Technologies Used
* React
* MongoDB
* JavaScript
* Java
* Spring Boot
* HTML
* CSS
* Bootstrap

## API's Used
* Google Maps API
* Google Places API
* Google Geocoding API
* Google Directions API
* Google Geolocation API
+ golfapi.io (due to cost, data was manually entered into MongoDB)

## License
![GitHub License Badge](https://shields.io/badge/license-MIT-green)

CopyRight (c) 2023 easySwing - by Christian Diesner

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.