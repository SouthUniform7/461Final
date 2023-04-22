const knex = require('knex')(require('../knexfile'));

async function getAllUserScoreAverages(req, res) {
  try {
    const userScoreAverages = await knex('userScoreAverage').select('*');
    res.json(userScoreAverages);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving user score averages' });
  }
}

async function getUserScoreAverageById(req, res) {
  const id = req.params.id;
  try {
    const userScoreAverage = await knex('userScoreAverage').where({ userScoreID: id }).first();
    res.json(userScoreAverage);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving user score average' });
  }
}

async function createUserScoreAverage(req, res) {
  const userScoreAverageData = req.body;
  try {
    await knex('userScoreAverage').insert(userScoreAverageData);
    res.status(201).json({ message: 'User score average created' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating user score average' });
  }
}

async function updateUserScoreAverage(req, res) {
  const id = req.params.id;
  const userScoreAverageData = req.body;
  try {
    await knex('userScoreAverage').where({ userScoreID: id }).update(userScoreAverageData);
    res.json({ message: 'User score average updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating user score average' });
  }
}

async function deleteUserScoreAverage(req, res) {
  const id = req.params.id;
  try {
    await knex('userScoreAverage').where({ userScoreID: id }).del();
    res.json({ message: 'User score average deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting user score average' });
  }
}

module.exports = {
  getAllUserScoreAverages,
  getUserScoreAverageById,
  createUserScoreAverage,
  updateUserScoreAverage,
  deleteUserScoreAverage
};
