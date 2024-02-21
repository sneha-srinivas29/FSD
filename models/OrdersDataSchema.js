const mongoose = require('mongoose');

const react_5 = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true  
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    }
  

});

const Orders = mongoose.model('Orders', react_5);
module.exports = Orders;