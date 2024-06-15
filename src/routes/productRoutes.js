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
            <header>
            <a href="/products">Catálogo</a>
            </header>
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



module.exports = router