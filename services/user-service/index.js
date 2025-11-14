const express = require('express');
const User = require('./models/User');
const auth = require('./middleware/auth');

const app = express();
app.use(express.json());

// Routes
app.post('/register', async (req, res) => {
  try {
    console.log('Creating user with data:', req.body);
    const user = new User(req.body);
    console.log('User before save:', user);
    await user.save();
    console.log('User saved successfully:', user._id);
    console.log('Database name:', user.db.name);
    const token = user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = user.generateAuthToken();
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/profile', auth, async (req, res) => {
  res.json(req.user);
});

app.patch('/profile', auth, async (req, res) => {
  try {
    Object.assign(req.user, req.body);
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/profile', auth, async (req, res) => {
  try {
    await req.user.deleteOne();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Debug endpoint
app.get('/debug/count', async (req, res) => {
  try {
    const count = await User.countDocuments();
    const users = await User.find({}, 'name email createdAt');
    res.json({ count, users, dbName: User.db.name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;