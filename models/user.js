var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    age: {type: Number},
    image: {Type: String}
}, {
    collection: 'users'
}); //overrides default collection name auto created

module.exports = mongoose.model('User', UserSchema);