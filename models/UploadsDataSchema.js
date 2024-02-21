const mongoose = require('mongoose');


const react_2= new mongoose.Schema({
    user2: {
        type: String,
        required: true
    },
    phn: {
        type: String,
        required: true
    },
    certificate:{
        type: String,
        required: true  
    }
});
const Reports=mongoose.model('Reports',react_2);

module.exports=Reports;  