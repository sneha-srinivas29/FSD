const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ReactFormDataSchema = new mongoose.Schema({
  ID:{type:String,required:true,index:true},
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    cpass:{
        type: String,
        required: true  
    }
}
);
ReactFormDataSchema.index({ID:1})
ReactFormDataSchema.pre('save', async function(next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.pass, salt);
      console.log(hashedPassword)
      this.pass = hashedPassword;
      this.cpass = hashedPassword;

      next();
    } catch (error) {
      next(error);
    }
  });
const Registers = mongoose.model('Registers', ReactFormDataSchema);


module.exports = Registers;