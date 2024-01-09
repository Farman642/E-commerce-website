const express =require("express");
require('dotenv').config();
const bodyParser =require('body-parser');
//Express body-parser is an npm module used to process data sent in an HTTP request body.
const morgan =require('morgan');
//morgan is a Node. js and Express middleware to log HTTP requests and errors, and simplifies the process
const mongoose =require('mongoose');
const cors =require('cors');
//Cross-Origin Resource Sharing in Node. js is a mechanism by which a front-end client can make requests for resources to an external back-end server
const productsRouter =require('./router/products')
const CategoryRouter =require('./router/category')
const OrderRouter =require('./router/order')
const UserRouter =require('./router/user')

const app =express();

app.use(cors());
app.options('*',cors())

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'))


const port =process.env.PORT || 3000;

const api =process.env.API_URL;

app.use(`${api}/product`,productsRouter);
app.use(`${api}/order`,OrderRouter);
app.use(`${api}/category`,CategoryRouter);
app.use(`${api}/user`,UserRouter);

const Product=require('./models/products');
const Category=require('./models/category');
const Order=require('./models/order');
const User=require('./models/user');


mongoose.connect(process.env.db_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:'Amazon'
})
.then(()=>{
    console.log("database connect");
}).catch((err)=>{
    console.log("error");
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})