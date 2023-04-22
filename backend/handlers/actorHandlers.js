const knex = require('knex')(require('../knexfile'));

async function getAllActors(req, res) {
  try {
    const actors = await knex('actor').select('name', 'birthdate', 'gender', 'nationality');
    //const actors = await knex('actor').select('*');
    res.json(actors);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving actors' });
  }
}

async function getActorById(req, res) {
  const id = req.params.id;
  try {
    const actor = await knex('actor').where({ actorID: id }).first();
    res.json(actor);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving actor' });
  }
}

async function createActor(req, res) {
  const actorData = req.body;
  try {
    await knex('actor').insert(actorData);
    res.status(201).json({ message: 'Actor created' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating actor' });
  }
}

async function updateActor(req, res) {
  const id = req.params.id;
  const actorData = req.body;
  try {
    await knex('actor').where({ actorID: id }).update(actorData);
    res.json({ message: 'Actor updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating actor' });
  }
}

async function deleteActor(req, res) {
  const id = req.params.id;
  try {
    await knex('actor').where({ actorID: id }).del();
    res.json({ message: 'Actor deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting actor' });
  }
}

module.exports = {
  getAllActors,
  getActorById,
  createActor,
  updateActor,
  deleteActor
};
