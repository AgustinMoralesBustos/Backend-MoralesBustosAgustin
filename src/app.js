const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const productManager = new ProductManager();

const products = [
    { id: '1', name: 'Producto 1', price: 10 },
    { id: '2', name: 'Producto 2', price: 20 },
    { id: '3', name: 'Producto 3', price: 30 },
    { id: '4', name: 'Producto 4', price: 40 },
    { id: '5', name: 'Producto 5', price: 50 },
    { id: '6', name: 'Producto 6', price: 60 },
    { id: '7', name: 'Producto 7', price: 70 },
    { id: '8', name: 'Producto 8', price: 80 },
    { id: '9', name: 'Producto 9', price: 90 },
    { id: '10', name: 'Producto 10', price: 100 }
];

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        let allProducts = products;
        if (limit) {
            allProducts = products.slice(0, parseInt(limit));
        }
        res.send(allProducts);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.get('/products/:pid', async (req, res) => {
    const productId = req.params.pid;
    try {
        const product = products.find(p => p.id === productId);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
