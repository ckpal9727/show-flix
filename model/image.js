const mongoose=require('mongoose');

const Image=mongoose.Schema({
    m_title:{
        type:String
    },
    m_poster:{
        data: Buffer,
        contentType: String
    },
  
   
  },{timestamps:true});

module.exports=mongoose.model('Image',Image)