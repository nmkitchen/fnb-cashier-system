const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Load orders from a JSON file
const ordersFilePath = 'orders.json';
let orders = [];

if (fs.existsSync(ordersFilePath)) {
    const ordersData = fs.readFileSync(ordersFilePath);
    orders = JSON.parse(ordersData);
}

// Endpoint to get orders
app.get('/orders', (req, res) => {
    res.json(orders);
});

// Endpoint to add a new order
app.post('/orders', (req, res) => {
    const order = req.body;
    orders.push(order);
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
    res.status(201).json(order);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
