const getProductById = product => 
    `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>${product.name}</h1>
            <img src="${product.image}" height="200">
            <h3>Categoría: ${product.category}</h3>
            <p>${product.description}</p>
            <h3>Talla: ${product.size}</h3>
            <h3>Precio: ${product.price}€</h3>
        </body>
        </html>`


const getAllProducts = (productArr, path) => {
    const htmlProducts = productArr.map(element => 
        `<div class="product_card">
        <h2>${element.name}</h2>
        <a href="/${path}/${element._id}"><img src="${element.image}" height="200"></a>
        <h3>Categoría: ${element.category}</h3>
        <p>${element.description}</p>
        <h3>Talla: ${element.size}</h3>
        <h3>Precio: ${element.price}€</h3>
        </div>`
    )
    return htmlProducts.join('')
}
const getAllProductsDashboard = (productArr, path) => {
    const htmlProducts = productArr.map(element => 
        `<div class="product_card">
        <h2>${element.name}</h2>
        <a href="/${path}/${element._id}"><img src="${element.image}" height="200"></a>
        <h3>Categoría: ${element.category}</h3>
        <p>${element.description}</p>
        <h3>Talla: ${element.size}</h3>
        <h3>Precio: ${element.price}€</h3>
        <a href="/dashboard/modifydelete/${element._id}"><button>Modificar o eliminar</button></a>
        </div>`
    )
    return htmlProducts.join('')
}

const modifyDeleteForm = product => {
    return `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>Modificar o Eliminar Producto</h1>
        <form action="/dashboard" method="post" name="new_product">
            <ul>
                <li>
                    <label for="name">Nombre del producto</label>
                    <input type="text" name="name" id="name" value="${product.name}">
                </li>
                <li>
                    <label for="description">Descripción del producto</label>
                    <input type="text" name="description" id="description" value="${product.description}">
                </li>
                <li>
                    <label for="image">URL de la imagen del producto</label>
                    <input type="text" name="image" id="image" value="${product.image}">
                </li>
                <li>
                    <label for="category">Tipo de producto</label>
                    <input type="text" name="category" id="category" value="${product.category}">
                </li>
                <li>
                    <label for="size">Talla</label>
                    <input type="text" name="size" id="size" value="${product.size}">
                </li>
                <li>
                    <label for="price">Precio del producto</label>
                    <input type="number" name="price" id="price" value="${product.price}">
                </li>
            <ul>
            <input type="submit" name="submit" id="submit" value="Modificar">
        </form>
        <form action="/dashboard/:productId/delete?_method=DELETE" method="post">
            <input type="submit" name="submit" id="submit" value="Eliminar">
        </form>
    </body>
    </html>`
}

module.exports = { getProductById, getAllProducts, getAllProductsDashboard, modifyDeleteForm }