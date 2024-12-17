const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
        unique: true
    },

    password:{
        type:String,
         required: true
    },
    profile:{
        type: String,
        default: "",
    },
    mobileNumber:{
        type: String,
        default: "",
        validate: {
          validator: function (v) {
            return /\d{10}/.test(v);
          },
          message: (props) => `${props.value} is not a valid mobile number!`,
        },
      },


},{
    timestamps: true,
});

const User = mongoose.model('t_User',userSchema);

module.exports = User;