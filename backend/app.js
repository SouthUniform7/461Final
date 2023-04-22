const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex')(require('./knexfile'));
const cors = require('cors');


const actorHandlers = require('./handlers/actorHandlers');
const characterHandlers = require('./handlers/characterHandlers');
const directorHandlers = require('./handlers/directorHandlers');
const movieHandlers = require('./handlers/movieHandlers');
const ratingHandlers = require('./handlers/ratingHandlers');
const studioHandlers = require('./handlers/studioHandlers');
const userScoreAverageHandlers = require('./handlers/userScoreAverageHandlers');

const userHandlers = require('./handlers/userHandlers');

//for full documentation of all handler files, please reference movieHandlers.js,
//handler files all more or less function the same, and are in separate files for improved readability only

//initialize express instance
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});


//sign in 
app.post('/users/signup', userHandlers.signUp);
app.post('/users/signin', userHandlers.signIn);

// Movie routes
app.get('/movies', movieHandlers.getAllMovies);
app.get('/movies/:id', movieHandlers.getMovieById);
app.post('/movies', movieHandlers.createMovie);
app.put('/movies/:id', movieHandlers.updateMovie);
app.delete('/movies/:id', movieHandlers.deleteMovie);
app.get('/movies/titles/console', movieHandlers.getMovieTitles);
app.get('/movies/directors-and-studios/console', movieHandlers.getDirectorsAndStudios);
app.get('/movies/ratings/console', movieHandlers.getMovieRatings);
app.get('/movies/details/console', movieHandlers.getMovieDetails);

// Director routes
app.get('/directors', directorHandlers.getAllDirectors);
app.get('/directors/:id', directorHandlers.getDirectorById);
app.post('/directors', directorHandlers.createDirector);
app.put('/directors/:id', directorHandlers.updateDirector);
app.delete('/directors/:id', directorHandlers.deleteDirector);

// Actor routes
app.get('/actors', actorHandlers.getAllActors);
app.get('/actors/:id', actorHandlers.getActorById);
app.post('/actors', actorHandlers.createActor);
app.put('/actors/:id', actorHandlers.updateActor);
app.delete('/actors/:id', actorHandlers.deleteActor);

// Character routes
app.get('/characters', characterHandlers.getAllCharacters);
app.get('/characters/actors', characterHandlers.getCharactersByActor);
app.get('/characters/:characterID/:movieID/:actorID', characterHandlers.getCharacterById);
app.post('/characters', characterHandlers.createCharacter);
app.put('/characters/:characterID/:movieID/:actorID', characterHandlers.updateCharacter);
app.delete('/characters/:characterID/:movieID/:actorID', characterHandlers.deleteCharacter);


// Studio routes
app.get('/studios', studioHandlers.getAllStudios);
app.get('/studios/:id', studioHandlers.getStudioById);
app.post('/studios', studioHandlers.createStudio);
app.put('/studios/:id', studioHandlers.updateStudio);
app.delete('/studios/:id', studioHandlers.deleteStudio);

// Rating routes
app.get('/ratings', ratingHandlers.getAllRatings);
app.get('/ratings/:id', ratingHandlers.getRatingById);
app.post('/ratings', ratingHandlers.createRating);
app.put('/ratings/:id', ratingHandlers.updateRating);
app.delete('/ratings/:id', ratingHandlers.deleteRating);

// UserScoreAverage routes
app.get('/userScoreAverages', userScoreAverageHandlers.getAllUserScoreAverages);
app.get('/userScoreAverages/:id', userScoreAverageHandlers.getUserScoreAverageById);
app.post('/userScoreAverages', userScoreAverageHandlers.createUserScoreAverage);
app.put('/userScoreAverages/:id', userScoreAverageHandlers.updateUserScoreAverage);
app.delete('/userScoreAverages/:id', userScoreAverageHandlers.deleteUserScoreAverage);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


//for grading or testing. If you want to test the backend, we wrote in a few test scripts into the package.json, as well as npm run start.
/* just run "npm install" first, then run "npm run start" which will use nodemon or do "node app.js" which also runs it.
    "start": "nodemon app.js",
    "test:createMovie": "curl -X POST -H \"Content-Type: application/json\" -d '{\"directorID\": 1, \"title\": \"Example Movie\", \"releaseDate\": \"2023-04-10\", \"runtime\": 120, \"genre\": \"Drama\", \"plotSummary\": \"An example movie plot.\"}' http://localhost:3001/movies",
    "test:getMovie": "curl -X GET http://localhost:3001/movies",
    "test:updateMovie": "curl -X PUT -H \"Content-Type: application/json\" -d '{\"title\": \"Updated Example Movie\"}' http://localhost:3001/movies/1",
    "test:deleteMovie": "curl -X DELETE http://localhost:3001/movies/1",
    "test:getMovieTitles": "curl -sS -X GET http://localhost:3001/movies/titles/console",
    "test:getDirectorsAndStudios": "curl -sS -X GET http://localhost:3001/movies/directors-and-studios/console"

    then just do any of these test scripts with "npm run test:getMovie" or "npm run test:getDirectorsAndStudios"

    */