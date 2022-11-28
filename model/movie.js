const mongoose=require('mongoose');

const Movie=mongoose.Schema({
    m_title:{
        type:String
    },
    m_description:{
        type:String
    },
    m_poster:{
        data: Buffer,
        contentType: String
    },
    m_background:{
        type:String
    },
    m_releaseDate:{
        type:Date,
        default:Date.now()
    },
    m_rating:{
        type:Number,
        default:3
    },
   
    m_type:{
        type:String,
    },
    m_link:{
        type:String
    }
  },{timestamps:true});

module.exports=mongoose.model('movie',Movie)