const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    category: {
        type: String,
        enum: ["Camisetas", "Pantalones", "Zapatos", "Accesorios"]
    },
    size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL"]
    },
    price: {
        type: Number,
        required: true
    }
    
 
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;