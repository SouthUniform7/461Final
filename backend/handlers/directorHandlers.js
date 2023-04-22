const knex = require('knex')(require('../knexfile'));

async function getAllDirectors(req, res) {
  try {
    const directors = await knex('director').select('*');
    res.json(directors);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving directors' });
  }
}

async function getDirectorById(req, res) {
  const id = req.params.id;
  try {
    const director = await knex('director').where({ directorID: id }).first();
    res.json(director);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving director' });
  }
}

async function createDirector(req, res) {
  const directorData = req.body;
  try {
    await knex('director').insert(directorData);
    res.status(201).json({ message: 'Director created' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating director' });
  }
}

async function updateDirector(req, res) {
  const id = req.params.id;
  const directorData = req.body;
  try {
    await knex('director').where({ directorID: id }).update(directorData);
    res.json({ message: 'Director updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating director' });
  }
}

async function deleteDirector(req, res) {
  const id = req.params.id;
  try {
    await knex('director').where({ directorID: id }).del();
    res.json({ message: 'Director deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting director' });
  }
}

module.exports = {
  getAllDirectors,
  getDirectorById,
  createDirector,
  updateDirector,
  deleteDirector
};
