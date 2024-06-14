const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const { dbConnection } = require('./src/config/db');

const session = require('express-session');
const admins = require('./src/admins/admins.js')
const hashedSecret = require('./src/controllers/authController.js') 

const productRoutes = require('./src/routes/productRoutes');
const authRoutes = require('./src/routes/authRoutes') 

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use(
    session({
      secret: hashedSecret,
      resave: false,
      saveUninitialized: true, 
      cookie: { secure: false },
    })
  );


app.use('/', authRoutes)
app.use('/', productRoutes);

dbConnection();

app.listen(PORT, () => console.log(`Server started on port ${process.env.PORT}`));