const mongoose = require('mongoose')

const solutionModel = mongoose.Schema({
    solution : {
        type : String,
        required : true
    },
    count : {
        type : Number,
        default :0
    },
    question:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Question"
    },
    sender : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    image : {
        type:String,
        default:''
    }
},{timestamps : true})

const Solution = mongoose.model("Solution",solutionModel);

module.exports = Solution