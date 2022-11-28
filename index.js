const express=require('express');
const app=express();
const port=process.env.PORT || 3000
require('dotenv').config();
const bodyParser=require('body-parser');
const cookieParser = require("cookie-parser");


const movieRoute=require('./route/movieRoute');
const userRoute=require('./route/userRoute');
const connection=require('./connection/connection');


app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/movies',movieRoute);
app.use('/users',userRoute);

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})