const mongoose = require('mongoose')
const User = require('./User');

const employeSchema = new mongoose.Schema({

    f_Name:{
        type:String,
        required:true,
        trim: true
    },
    f_Email:{
        type:String,
        unique: true,
        required:true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"]
    },
    f_Mobile:{
        type:Number,
        required:true,
        validate: {
            validator: function (v) {
              return /^\d{10}$/.test(v); // Validates 10-digit mobile numbers
            },
            message: (props) => `${props.value} is not a valid mobile number!`,
          },
    },
    f_Designation:{
        type:String,
        required:true
    },
    f_gender:{
        type:String,
        enum:['Male','Female','Other'],
        required:true
    },
    f_Course:{
        type:[String],
        default:[]
    },
    f_Createdate:{
        type:Date,
        default:Date.now
    },
    f_Image:{
        type:String,
        default:'',
    },
     // Reference to the user who created this employee
  employeeId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'t_User',

  }

})

User.schema.pre('remove',async function (next) {
    try {
        await Emp.deleteMany({employeeId: this._id});
        next()
    } catch (error) {
        next(error)
    }
})

const Emp = mongoose.model('t_employes',employeSchema);

module.exports = Emp;