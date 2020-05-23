let mongoose = require('mongoose');
let CounterModel = require('./counter');
let userSchema = mongoose.Schema({
    _id: { type: Number, default: 0 },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }

}, { timestamps: true })

userSchema.pre('save', function (next) {
    var doc = this;
    CounterModel.findByIdAndUpdate({ _id: 'userid' }, { $inc: { sequence_value: 1 } }, function (error, counterResult) {
        if (error)
            return next(error);
        doc._id = counterResult.sequence_value;
        next();
    });
});

let User = module.exports = mongoose.model('User', userSchema);