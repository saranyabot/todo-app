const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET = 'supersecret';
const PORT = 5000;

// Dummy user
const user = { email: 'user@example.com', password: 'P@ssword1234' };

// In-memory todos
let todos = [];
let idCounter = 1;

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === user.email && password === user.password) {
    const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

// Middleware to verify token
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Todos endpoints
app.get('/todos', authMiddleware, (req, res) => res.json(todos));

app.post('/todos', authMiddleware, (req, res) => {
  const newTodo = { id: idCounter++, text: req.body.text };
  todos.push(newTodo);
  res.json(newTodo);
});

app.put('/todos/:id', authMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index !== -1) {
    todos[index].text = req.body.text;
    return res.json(todos[index]);
  }
  res.status(404).json({ message: 'Not found' });
});

app.delete('/todos/:id', authMiddleware, (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.json({ message: 'Deleted' });
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
