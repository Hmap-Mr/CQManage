const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/CQManager');

let userModel = mongoose.model('users',{userName:String,passWord:String});

module.exports = userModel;