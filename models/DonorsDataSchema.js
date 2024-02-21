const mongoose = require('mongoose');

const react_6 = new mongoose.Schema({
    userid: {
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
    dob: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    }, 
    allergy: {
        type: String,
        required: true
    }
});
const Donors = mongoose.model('Donors', react_6);


module.exports = Donors;