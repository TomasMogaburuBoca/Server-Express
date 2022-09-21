const express = require('express');
const random = require ('random');

const app = express();

const Container = require('./index');
const products = new Container ('product.txt');
console.log(products);

const PORT = process.env.port || 8080;



app.get('/', (req, res) => {
    res.send(`Root`);
})

app.get('/products', async (req, res) =>{
    let getProducts = await products.getAll();
    res.send([...getProducts]);
        console.log('Show te products')
})
app.get('/productsRandom', async (req, res) =>{
    const total = await products.getAll();
    const product = await products.getById(Math.floor(Math.random() * total.length));
    res.send(product);
    console.log('Show random products')
})





const server = app.listen (PORT, () => console.log(`Server running in PORT ${PORT}`));
server.on('error',error=>console.log(`Error ${error}`));