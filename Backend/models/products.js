const mongoose =require('mongoose');


const productSchema =mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    richDescription :{
        type:String,
        require:false
    },
    Image:{
        type:String,
        require:true
    },
    Images:[{
        type:String,
        
    }],
    brand:{
        type:String,
        require:true
    },
    price :{
        type:Number,
        default:0        
    },
    category : {
        type :mongoose.Schema.Types.ObjectId,
        ref:'Category',
        require:true
    },
    countInStock: {
        type:Number,
        require:true
    },
    review : {
        type:Number,
        require:true
    },
    numReview :{
        type:Number,
        default:0 
    },
    isFeatured :{
        type:Boolean,
        default:false
    },
    dateCreate :{
        type :Date,
        default:Date.now,
    }

});

exports.Product =mongoose.model('Product',productSchema);