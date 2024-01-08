const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        isDelete: { type: Boolean, default: false },
        order: { type: Number, require: true },
        product_k:[{
            type: mongoose.Schema.ObjectId,
            ref: 'product'
        }]
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Category', categorySchema);

module.exports = Product;
