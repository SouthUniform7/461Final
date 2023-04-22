const knex = require('knex')(require('../knexfile'));

async function getAllCharacters(req, res) {
  try {
    const characters = await knex('character').select('*');
    res.json(characters);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving characters' });
  }
}

async function getCharacterById(req, res) {
  const characterID = req.params.characterID;
  const movieID = req.params.movieID;
  const actorID = req.params.actorID;

  try {
    const character = await knex('character').where({ characterID, movieID, actorID }).first();
    res.json(character);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving character' });
  }
}

async function getCharactersByActor(req, res) {
  try {
    const characters = await knex('character')
      .select('movie.title as Movie Title', 'actor.name as Actor Name', 'character.name as Character Name')
      .join('actor', 'character.actorID', 'actor.actorID')
      .join('movie', 'character.movieID', 'movie.movieID')
      .groupBy('movie.movieID', 'character.characterID')
      .orderBy('movie.title');
    res.json(characters);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving characters' });
  }
}





async function createCharacter(req, res) {
  const characterData = req.body;
  try {
    await knex('character').insert(characterData);
    res.status(201).json({ message: 'Character created' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating character' });
  }
}

async function updateCharacter(req, res) {
  const characterID = req.params.characterID;
  const movieID = req.params.movieID;
  const actorID = req.params.actorID;
  const characterData = req.body;

  try {
    await knex('character').where({ characterID, movieID, actorID }).update(characterData);
    res.json({ message: 'Character updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating character' });
  }
}

async function deleteCharacter(req, res) {
  const characterID = req.params.characterID;
  const movieID = req.params.movieID;
  const actorID = req.params.actorID;

  try {
    await knex('character').where({ characterID, movieID, actorID }).del();
    res.json({ message: 'Character deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting character' });
  }
}

module.exports = {
  getAllCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  getCharactersByActor
};
