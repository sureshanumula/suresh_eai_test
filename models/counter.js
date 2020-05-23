let mongoose = require('mongoose');

var CounterSchema = mongoose.Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 0 }
});
let Counter = module.exports = mongoose.model('counter', CounterSchema);