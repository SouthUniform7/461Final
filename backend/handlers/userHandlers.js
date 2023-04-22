const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key'; // Replace this with a strong secret key

async function signUp(req, res) {
    const { username, password } = req.body;
  
    try {
      const existingUser = await knex('user').where({ username }).first();
  
      if (existingUser) {
        res.status(400).json({ error: 'Username already exists' });
        return;
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = {
        username,
        password: hashedPassword,
      };
  
      await knex('user').insert(newUser);
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error(err); // Add this line to log the error
      res.status(500).json({ error: 'Error creating user' });
    }
  }
  

async function signIn(req, res) {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await knex('user').where({ username }).first();
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Sign and generate a token
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '4h' });

    // Return success message and token
    res.json({ message: 'Sign in successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Error signing in' });
  }
}
  

module.exports = {
  signUp,
  signIn,
};
