const mongoose = require('mongoose');

const react3 = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    bg: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    SH:{
        type: String,
        required: true  
    },
    yod: {
        type: String,
        required: true
    },
    file1: {
        type: String,
        required: true
    },
    file2:{
        type: String,
        required: true  
    },
    hlav:{
        type:String,
        required:true
    }

  

});

const Patients = mongoose.model('Patients', react3);


module.exports = Patients;