const knex = require('knex')(require('../knexfile'));

async function getAllRatings(req, res) {
  try {
    const ratings = await knex('rating').select('*');
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving ratings' });
  }
}

async function getRatingById(req, res) {
  const id = req.params.id;
  try {
    const rating = await knex('rating').where({ ratingID: id }).first();
    res.json(rating);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving rating' });
  }
}

async function createRating(req, res) {
  const ratingData = req.body;
  try {
    await knex('rating').insert(ratingData);
    res.status(201).json({ message: 'Rating created' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating rating' });
  }
}

async function updateRating(req, res) {
  const id = req.params.id;
  const ratingData = req.body;
  try {
    await knex('rating').where({ ratingID: id }).update(ratingData);
    res.json({ message: 'Rating updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating rating' });
  }
}

async function deleteRating(req, res) {
  const id = req.params.id;
  try {
    await knex('rating').where({ ratingID: id }).del();
    res.json({ message: 'Rating deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting rating' });
  }
}

module.exports = {
  getAllRatings,
  getRatingById,
  createRating,
  updateRating,
  deleteRating
};
