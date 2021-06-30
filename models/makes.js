var mongoose = require('mongoose');

var Makes = mongoose.model('Makes', {
    Manufacturer: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    Makes: [{type: String, default: null}]
});

module.exports = { Makes };