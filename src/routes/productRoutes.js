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


     <form action="/products/" method="get">
                    <select name="category" id="product_category">
                        <option value="Camisetas">Camisetas</option>
                        <option value="Pantalones">Pantalones</option>
                        <option value="Zapatos">Zapatos</option>
                        <option value="Accesorios">Accesorios</option>
                    </select>
                    <button type="submit">Ver Categoria</button>
                </form>
*/
const express = require('express')
const router = express.Router()
const Product = require("../models/Product");
const { getProductById, getAllProducts, getAllProductsDashboard, modifyDeleteForm } = require('../controllers/productController')
const methodOverride = require('method-override')

router.use(methodOverride('_method'))

router.get('/products', async (req, res) => {
    try {
        const productList = await Product.find({})
        const productsCards = getAllProducts(productList, `products`)
        res.send(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <h1>Catálogo</h1>
               <a href="/products/Camisetas">Camisetas</a>
               <a href="/products/Pantalones">Pantalones</a>
               <a href="/products/Accesorios">Accesorios</a>
               <a href="/products/Zapatos">Zapatos</a>

                ${productsCards}
                
                </body>
            </html>`)
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to get the products" });
    }
    
})

router.get('/products/:category', async (req, res) => {
    try {
        console.log(req.params)
        console.log(req.params.category)
        const productCategory = req.params.category
        const products = await Product.find(req.params)
        const productsCards = getAllProducts(products, `products/${productCategory}`)
        res.send(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <h1>${productCategory}</h1>
                ${productsCards}

            </body>
            </html>`)
    }catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to get the products by category" });
    }
})

router.get('/products/:productId', async (req, res) => {
    try{
        const productId = req.params.productId
        const product = await Product.findById(productId);
        res.send(getProductById(product))
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to get the product by ID" });
    }
})


router.get('/dashboard', async (req, res) => {
    try {
        const productList = await Product.find({})
        const productsCards = getAllProductsDashboard(productList, `dashboard`)
        res.send(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <header>
                <a href="/dashboard/new">Añadir producto</a>
               
                </header>
                <h1>Catálogo</h1>${productsCards}
                </body>
            </html>`)
    } catch (error){
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying get dashboard" });
    }
    
})
router.post('/dashboard', async (req, res) => {
    try {
        console.log(req.body)
        const newProduct = await Product.create(req.body);
        res.status(201).redirect('/dashboard');
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
                <input type="submit" name="submit" id="submit" value="Añadir Producto">
            </form>
        </body>
        </html>`)
    }catch (error){
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying get form" });
    }
})

router.get('/dashboard/:productId', async (req, res) => {
    try {
        const productId = req.params.productId
        const product = await Product.findById(productId);
        res.send(getProductById(product))
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to get the product by ID" })
    }
    
})

router.get('/dashboard/modifydelete/:productId', async (req, res) => {
    try {
        const productId = req.params.productId
        const product = await Product.findById(productId);
        res.send(modifyDeleteForm(product))
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying get form" });
    }
    
})





router.put('/dashboard/:productId', async (req, res) => {
    try{
        const productId = req.params.productId
        await Product.findByIdAndUpdate(productId, req.body);
        res.redirect('/dashboard')
    }catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem modifying the product" })
    }
    
})
/*
Añadir pop up de confirmacion
*/
router.delete('/dashboard/:productId/delete', async (req, res) => {
    try {
        const productId = req.params.productId
        await Product.findByIdAndDelete(productId);    
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem deleting the product" });
    }
    
})
module.exports = router