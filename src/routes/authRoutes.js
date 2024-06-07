const express = require('express');
const users = require('../admins/admins')
const session = require('express-session');
const router = express.Router();
const {generateToken, verifyToken} = require('../middlewares/authMiddleware')

router.use('/dashboard', verifyToken)