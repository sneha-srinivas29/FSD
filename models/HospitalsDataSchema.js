const mongoose = require('mongoose');

const react_3 = new mongoose.Schema({
    userid1: {
        type: String,
        required: true
    },
    hospitalname:{ 
        type: String,
        required: true
    },
    idproof:{ 
        type: String,
        required: true
    }
});
const Hospitals=mongoose.model('Hospitals',react_3);

module.exports=Hospitals;