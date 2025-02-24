const express = require('express');
const app = express();
app.use(express.json());

const products=[
    {id:1, name:'laptop', price:1000, description:'Dell Laptop'},
    {id:2, name:'mobile', price:500, description:'Samsung Mobile'},
]

app.get('/', (req, res) => {
  res.send('Hello World!');
}); 

app.get('/products', (req, res) => {
    res.json(products);
    res.status(200).send('Products list');
    });

    app.get('/products/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const product = products.find((product) => product.id === id);
    
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    });
    

app.post('/products', (req, res) => {
    const {id,name,price,description} = req.body;
    if(!id || !name || !price || !description){
        res.status(400).send('Please provide all details');
    }
    else{
    const newProduct = {id, name, price, description};
    products.push(newProduct);
    res.status(201).send('Product added');
    }
});

app.patch('/products/:id', (req, res) => {
    const id = req.params.id;
    const {name, price, description} = req.body;
    const product = products.find((product) => product.id === parseInt(id));
    if(product){
        if(name) product.name = name;
        if(price) product.price = price;
        if(description) product.description = description;
        res.status(200).send('Product updated');
        }
        else{
            res.status(404).send('Product not found');
        }
    }
);

app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    const productIndex = products.findIndex((product) => product.id === parseInt(id));
    if(productIndex !== -1){
        products.splice(productIndex, 1);
        res.status(200).send('Product deleted');
    }
    else{
        res.status(404).send('Product not found');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    }
);