const {Category}= require('../models/category')
const express =require("express");
const router =express.Router();
//The express. Router() function is used to create a new router object. 
//This function is used when you want to create a new router object in your program to handle requests. 
//Multiple requests can be easily differentiated with the help of the Router() function in Express. js.


router.get(`/`,async (req,res)=>{
    const categoryList  =await Category.find();
    if(!categoryList){
        res.status(500).json({sucess:false})
    }
    res.send(categoryList);
})

router.get(`/:id`,async (req,res)=>{
    const category  =await Category.findById(req.params.id);
    if(!category){
        res.status(500).json({sucess:false,message:"category give by id is not found"})
    }
    res.status(200).send(category);
})

router.post('/', async (req,res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();

    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
})

router.put('/:id',async (req,res)=>{
    const category = await Category.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        icon:req.body.icon,
        color:req.body.color
    },{new:true})
   

    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
})

router.delete("/:id",(req,res)=>{
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category){
            res.status(200).json({sucess:true,message:'the category is deleted'});
        }else{
            res.status(200).json({sucess:false,message:'the category is not found'});
        }
    }).catch(err =>{
       return res.status(400).json({sucess:false,error:err})

    })
})

module.exports=router;