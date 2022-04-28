const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
    prodList: {type: Array, require: true},
    id: {type: String, require: true},
    time: {type: String, require: true}
})

module.exports = mongoose.model('products', CartSchema);