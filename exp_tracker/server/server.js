const express = require('express');
const path =require('path')
const app = express();
const cors=require('cors');
// require('dotenv').config({path:"./config.env"});
// const port=process.env.PORT || 5000 ;

const port=5000;
app.use(cors());
app.use(express.json());
require("./db/connection");
//using routes
app.use(require('./routes/route'))
app.use(express.static(path.join(__dirname,'../client/build')))
app.use("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'))
})
app.listen(port,()=>{
  console.log(`Server is running on port ${port}`)
})