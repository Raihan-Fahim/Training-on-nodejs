const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 4002;
const SECRET_KEY = 'your-secret-key';

// Mock user data for simplicity
const users = [
  {
    id: 1,
    username: 'john',
    password: '$2b$10$bKJFKWnvliy/e02RXjAOYuHxOZKMNgFiFsmjDUujcymvj9RbZyK/q' // Encrypted password: '123'
  }
];

// Middleware to parse JSON bodies
app.use(express.json());

// Login API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({ error: 'Invalid 2 credentials' });
  }

  // Compare the provided password with the stored encrypted password
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Server error' });
    }

    if (!result) {
      return res.status(401).json({ error: 'Invalid 1 credentials' });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY);

    res.json({ token });
  });
});

// Protected route
app.get('/api/data', authenticateToken, (req, res) => {
  res.json({ message: 'Protected data' });
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
