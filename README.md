## Tienda online

Catálogo de tienda online con interfaz para conseguir detalles de un sólo producto o selección por categorias.
Interfaz para administradores para añadir, modificar o eliminar productos.
Endpoints:
GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
GET /products/:productId: Devuelve el detalle de un producto.
GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. 
        Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
POST /dashboard: Crea un nuevo producto.
GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
GET /dashboard/modifydelete/:productId: Devuelve el formulario para editar o eliminar un producto
PUT /dashboard/:productId: Actualiza un producto.
DELETE /dashboard/:productId/delete: Elimina un producto.

## Instalación

Instala dependencias con:

```bash
  npm install
```

## Despliegue

Para desplegar el proyecto:

```bash
  npm start
```
## Enviroment

Para este proyecto necesitas en tu archivo env las siguientes variables

`MONGO_URI`

`PORT` (OPCIONAL)
