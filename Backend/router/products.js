const {Product}=require('../models/products')
const express =require("express");
const router =express.Router();
const { Category } = require('../models/category');
const mongoose = require('mongoose');


router.get(`/`,async (req,res)=>{

    // let filter = {};
    // if(req.query.categories)
    // {
    //      filter = {category: req.query.categories.split(',')}
    // }

    const productList =await Product.find().populate('category');
    if(!productList){
        res.status(500).json({sucess:false})
    }
    res.send(productList);
})

router.get(`/:id`,async (req,res)=>{
    const product =await Product.findById(req.params.id).populate('category');//using populate getting details from category
    if(!product){
        res.status(500).json({sucess:false})
    }
    res.send(product);
})

router.post(`/`,async (req,res)=>{
    const category =await Category.findById(req.body.category)
    if(!category) return res.status(400).send('invalid category')
    
   let product = new Product({
    name :req.body.name,
    image:req.body.image,
    countInStock:req.body.countInStock,
    description:req.body.description,
    richDescription:req.body.richDescription,
    Images:req.body.Images,
    brand:req.body.brand,
    price:req.body.price,
    category:req.body.category,
    review:req.body.review,
    numReview:req.body.numReview,
    isFeatured:req.body.isFeatured,
    dateCreate:req.body.dateCreate
   });

   product =await product.save()

   if(!product){
    res.status(400).send("Product was not created");
   }
   res.send(product);
});

router.put('/:id',async (req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('invalid product id')
    }

    const category =await Category.findById(req.body.category)
    if(!category) return res.status(400).send('invalid category')

    const product = await Product.findByIdAndUpdate(req.params.id,{
        name :req.body.name,
        image:req.body.image,
        countInStock:req.body.countInStock,
        description:req.body.description,
        richDescription:req.body.richDescription,
        Images:req.body.Images,
        brand:req.body.brand,
        price:req.body.price,
        category:req.body.category,
        review:req.body.review,
        numReview:req.body.numReview,
       isFeatured:req.body.isFeatured,
       dateCreate:req.body.dateCreate
    },{new:true})
   

    if(!product)
    return res.status(400).send('the product cannot be created!')

    res.send(product);
})

router.delete("/:id",(req,res)=>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product){
            res.status(200).json({sucess:true,message:'the product is deleted'});
        }else{
            res.status(200).json({sucess:false,message:'the product is not found'});
        }
    }).catch(err =>{
       return res.status(400).json({sucess:false,error:err})

    })
})

router.get(`/get/count`, async (req, res) =>{
    const productCount = await Product.countDocuments()
    .then(count => {
      return count
    })
    .catch(error => {
      console.log("Error count")
    });

    if(!productCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        productCount: productCount
    });
});

router.get(`/get/featured`, async (req, res) =>{
    const productFeature = await Product.find({isFeatured:true})

    if(!productFeature) {
        res.status(500).json({success: false})
    } 
    res.send(productFeature);
})



module.exports=router;