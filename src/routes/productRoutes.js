/*
    GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
    GET /products/:productId: Devuelve el detalle de un producto.
    GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. 
        Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
    GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
    POST /dashboard: Crea un nuevo producto.
    GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
    GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.
    PUT /dashboard/:productId: Actualiza un producto.
    DELETE /dashboard/:productId/delete: Elimina un producto.
*/
const express = require('express')
const router = express.Router()
const Product = require("../models/Product");

router.get('/products', async (req, res) => {
    const productList = await Product.find({})
    const htmlProducts = productList.map(element => 
        `<h2>${element.name}</h2>
        <img src="${element.image}">
        <h3>Categoría: ${element.category}</h3>
        <p>${element.description}</p>
        <h3>Talla: ${element.size}</h3>
        <h3>Precio: ${element.price}€</h3>`
    )
    console.log(htmlProducts.join(''))
    res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Catálogo</h1>${htmlProducts.join('')}
            </body>
        </html>`)
})

router.get('/products/:productId', async (req, res) => {
    const productId = req.params.productId
    const product = await Product.findById(productId);
    res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>${product.name}</h1>
            <img src="${product.image}">
            <h3>Categoría: ${product.category}</h3>
            <p>${product.description}</p>
            <h3>Talla: ${product.size}</h3>
            <h3>Precio: ${product.price}€</h3>
        </body>
        </html>`)
})
router.get('/dashboard', async (req, res) => {
    res.json(await Product.find())
})
router.post('/dashboard', async (req, res) => {
    try {
        console.log(req.body)
        const newProduct = await Product.create(req.body);
        res.status(201).send(newProduct);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a product" });
    }

})
router.get('/dashboard/new', (req, res) => {
    try{
        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Nuevo Producto</h1>
            <form action="/dashboard" method="post" name="new_product">
                <ul>
                    <li>
                        <label for="name">Nombre del producto</label>
                        <input type="text" name="name" id="name">
                    </li>
                    <li>
                        <label for="description">Descripción del producto</label>
                        <input type="text" name="description" id="description">
                    </li>
                    <li>
                        <label for="image">URL de la imagen del producto</label>
                        <input type="text" name="image" id="image">
                    </li>
                    <li>
                        <label for="category">Tipo de producto</label>
                        <input type="text" name="category" id="category">
                    </li>
                    <li>
                        <label for="size">Talla</label>
                        <input type="text" name="size" id="size">
                    </li>
                    <li>
                        <label for="price">Precio del producto</label>
                        <input type="number" name="price" id="price">
                    </li>
                <ul>
                <input type="submit" name="submit" id="submit">
            </form>
        </body>
        </html>`)
    }catch{
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying get form" });
    }
})
/*
router.put('/dashboard/:productId', async (req, res) => {
    const productId = req.params
    const product = await Product.findOne({ 'id': `${productId.id}` }, 'title completed');
    product.completed = true;
    product.save()
    res.json(product)
})

router.put('/id/:id', async (req, res) => {
    const taskId = req.params
    const task = await Task.findOne({ 'id': `${taskId.id}` }, 'title completed');
    task.title = req.body.title;
    task.save()
    res.json(task)
})
*/
router.delete('/dashboard/:productId/delete', async (req, res) => {
    const productId = req.params.productId
    await Product.findByIdAndDelete(productId);    
    res.json({"product": "deleted"})
})
module.exports = router