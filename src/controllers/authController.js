const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt')
const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');
const hashedSecret = bcrypt.hashSync(secret, 10);


function generateToken(admin) {
    return jwt.sign({ admin: admin.id }, 'tu_secreto_secreto', { expiresIn: '1h' });
}

function verifyToken(req, res, next) {
    const token = req.session.token;
    console.log(req.session.token)
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }
    
    jwt.verify(token, 'tu_secreto_secreto', (err, decoded) => {
    if (err) {
        return res.status(401).json({ message: 'Token inválido', error: err.message });
    }
    
    req.admin = decoded.admin;
    next();
    
    });
}
module.exports = {generateToken, verifyToken, hashedSecret}