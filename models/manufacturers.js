var mongoose = require('mongoose');

var Manufacturers = mongoose.model('Manufacturers', {
    Manufacturers: [{type: String, default: null}]
});

module.exports = {Manufacturers};