const mongoose=require('mongoose');

const MessageSchema=mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    Message:{
        type:String,
        required:[true,'Please Provide the description']
    },
    date: {
        type: Date,
        default: Date.now
    },
    createdby:{
        type:mongoose.Types.ObjectId,
        requierd:true,
        ref:'User'
    }
})

module.exports=mongoose.model('Messages',MessageSchema);