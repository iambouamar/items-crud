// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

let items = [
  {
    id: 1,
    name: "Sample Item 1",
    description: "This is a sample item.",
    imageUrl: "https://via.placeholder.com/150",
    price: 29.99,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Sample Item 2",
    description: "This is another sample item.",
    imageUrl: "https://via.placeholder.com/150",
    price: 49.99,
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "Sample Item 3",
    description: "This is another sample item.",
    imageUrl: "https://via.placeholder.com/150",
    price: 69.99,
    createdAt: new Date(),
  },
  {
    id: 4,
    name: "Sample Item 4",
    description: "This is another sample item.",
    imageUrl: "https://via.placeholder.com/150",
    price: 89.99,
    createdAt: new Date(),
  },
  {
    id: 5,
    name: "Sample Item 5",
    description: "This is another sample item.",
    imageUrl: "https://via.placeholder.com/150",
    price: 109.99,
    createdAt: new Date(),
  },
  {
    id: 6,
    name: "Sample Item 6",
    description: "This is another sample item.",
    imageUrl: "https://via.placeholder.com/150",
    price: 129.99,
    createdAt: new Date(),
  },
];

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    createdAt: new Date()
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});