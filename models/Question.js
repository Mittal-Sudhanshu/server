const mongoose = require('mongoose')

const questionModel = mongoose.Schema({
    heading : {
        type:String,
        required:true
    },
    description : {
        type:String,
        required : true
    },
    category:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    image:{
        type:String,
        default:'',
    }
},{timestamps: true })

const Question = mongoose.model("Question",questionModel);

module.exports = Question