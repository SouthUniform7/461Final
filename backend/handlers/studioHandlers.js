const knex = require('knex')(require('../knexfile'));

async function getAllStudios(req, res) {
  try {
    const studios = await knex('studio').select('*');
    res.json(studios);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving studios' });
  }
}

async function getStudioById(req, res) {
  const id = req.params.id;
  try {
    const studio = await knex('studio').where({ studioID: id }).first();
    res.json(studio);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving studio' });
  }
}

async function createStudio(req, res) {
  const studioData = req.body;
  try {
    await knex('studio').insert(studioData);
    res.status(201).json({ message: 'Studio created' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating studio' });
  }
}

async function updateStudio(req, res) {
  const id = req.params.id;
  const studioData = req.body;
  try {
    await knex('studio').where({ studioID: id }).update(studioData);
    res.json({ message: 'Studio updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating studio' });
  }
}

async function deleteStudio(req, res) {
  const id = req.params.id;
  try {
    await knex('studio').where({ studioID: id }).del();
    res.json({ message: 'Studio deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting studio' });
  }
}

module.exports = {
  getAllStudios,
  getStudioById,
  createStudio,
  updateStudio,
  deleteStudio
};
