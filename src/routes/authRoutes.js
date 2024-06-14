const express = require('express');
const admins = require('../admins/admins')
const session = require('express-session');
const router = express.Router();
const {generateToken, verifyToken} = require('../controllers/authController')

router.get('/admins', (req, res) => {
    if(!req.session.token) {
        res.send(`
            <form action="/dashboard/login" method="post">
                <label for="username">Usuario:</label>
                <input type="text" id="username" name="username" required><br>
            
                <label for="password">Contraseña:</label>
                <input type="password" id="password" name="password" required><br>
        
                <button type="submit">Iniciar sesión</button>
            </form>
            
        
        `)
    }else {
        res.send(`<form action="/logout" method="post"> <button type="submit">Cerrar sesión</button> </form>`)
    }
    
})

router.post('/dashboard/login', (req, res) => {
    const { username, password } = req.body;
    const admin = admins.find(
      (ad) => ad.username === username && ad.password === password
    );
  
    if (admin) {
      const token = generateToken(admin);
      req.session.token = token;
      console.log(req.session.token)
      res.redirect('/dashboard');
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  });



router.get('/dashboard', verifyToken, async (req, res) => {
    try {
        const adminId = req.admin;

        const admin = admins.find((ad) => ad.id === adminId);
    
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