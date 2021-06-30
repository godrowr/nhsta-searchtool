var mongoose = require('mongoose');

var Vehicle = mongoose.model('Vehicle', {
    VIN: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    Make: {
        type: String,
        default: null
    },
    Model: {
        type: String,
        default: null
    },
    Year: {
        type: Number,
        default: null
    }
});
module.exports = {Vehicle};