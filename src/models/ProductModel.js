const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        isDelete: { type: Boolean, default: false },
        order: { type: Number, required: true },
        category_k:[{
            type: mongoose.Schema.ObjectId,
            ref: 'category'
        }]
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
