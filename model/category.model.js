const mongoose = require('mongoose');
const catSchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    categoryImageUrl: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, { timestamps: true });

module.exports = mongoose.model("categories", catSchema);