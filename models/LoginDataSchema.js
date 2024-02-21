const mongoose = require('mongoose');

const react_4 = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    
    pass: {
        type: String,
        required: true
    }
    
});

react_4.methods.comparePassword = async function(candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.pass);
    } catch (error) {
      throw new Error(error);
    }
  };
const Logins = mongoose.model('Logins', react_4);

module.exports = Logins;