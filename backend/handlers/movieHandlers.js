const knex = require('knex')(require('../knexfile'));

//basic handlers for simple CRUD operations in the movies table.
//Other handler files just contain identical code for other tables for basic CRUD operations.
//all SQL commands are executed by KNEX, which requires SQL knowledge, but uses modified syntax
//the javascript functions for basic column selections, deletion, and other things are extremely similar in actual code.

// Movie handlers
async function getAllMovies(req, res) {
  try {
    const movies = await knex('movie').select('*');
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving movies' });
  }
}

async function getMovieDetails(req, res) {
  try {
    const movies = await knex('movie').select('title', 'releaseDate as Release Date', 'runtime', 'genre', 'plotSummary as Plot Summary');
    console.log('Movies:', movies); // Add this line to log the result
    res.json(movies);
  } catch (err) {
    console.error('Error in getMovieDetails:', err); // Add this line to log the error
    res.status(500).json({ error: 'Error retrieving movie details' });
  }
}


async function getMovieTitles(req, res) {
  try {
    const titles = await knex('movie').select('title');
    //console.log('Movie titles:', JSON.stringify(titles));
    res.json(titles);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving movie titles' });
  }
}


async function getMovieById(req, res) {
  const id = req.params.id;
  try {
    const movie = await knex('movie').where({ movieID: id }).first();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving movie' });
  }
}

async function createMovie(req, res) {
  const movieData = req.body;
  try {
    await knex('movie').insert(movieData);
    res.status(201).json({ message: 'Movie created' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating movie' });
  }
}

async function updateMovie(req, res) {
  const id = req.params.id;
  const movieData = req.body;
  try {
    await knex('movie').where({ movieID: id }).update(movieData);
    res.json({ message: 'Movie updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating movie' });
  }
}

async function deleteMovie(req, res) {
  const id = req.params.id;
  try {
    await knex('movie').where({ movieID: id }).del();
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting movie' });
  }
}

async function getDirectorsAndStudios(req, res) { 
  //this actually uses an SQL JOIN, as of 4/14/2023 its the most complex single query we have built a handler function for.
  //function will output the JSON to the console to see it for this part of the assignment,
  //but also returns the JSON as a response that can be read and displayed in the front end.

  try {
    const result = await knex('movie')
      .select('movie.title', 'director.name as Director Name', 'studio.name as Studio Name')
      .join('director', 'movie.directorID', 'director.directorID') 
      //first parameter is the table you want to join to the selection from movies,
      //second and third parameters are the columns you want to join on.

      .join('studio', 'movie.studioID', 'studio.studioID');
      //here you can see the actual join happening, but the modified syntax doesn't require things
      //like writing the word 'on' in the join. 

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving directors and studios for movies' });
  }
}

async function getMovieRatings(req, res) {
  try {
    const result = await knex('movie')
      .select(
        'movie.title',
        'director.name as Director Name',
        'rating.rating as Critic Rating',
        'userScoreAverage.score as Average User Score'
      )
      .join('director', 'movie.directorID', 'director.directorID')
      .leftJoin('rating', 'movie.movieID', 'rating.movieID')
      .leftJoin('userScoreAverage', 'movie.movieID', 'userScoreAverage.movieID');

    console.log('Result:', result);
    res.json(result);
  } catch (err) {
    console.error('Error in getMovieDetails:', err);
    res.status(500).json({ error: 'Error retrieving movie details' });
  }
}





module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieTitles,
  getDirectorsAndStudios,
  getMovieRatings,
  getMovieDetails
};
