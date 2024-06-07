const express = require('express');
const app = express();
const PORT = 8080;
const { dbConnection } = require('./src/config/db');
const productRoutes = require('./src/routes/productRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/', productRoutes);

dbConnection();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));