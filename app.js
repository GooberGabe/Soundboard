const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/*.mp3', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', req.path));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/new-sound', (req, res) => {
  const { name, url } = req.body;
  // TODO: Save sounds to the database!
  res.json({ success: true, name, url });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});