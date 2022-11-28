const { Timestamp } = require('bson');
const mongoose=require('mongoose');

const User=mongoose.Schema({
    u_fname:{type:String,require:true},
    u_lname:{type:String},
    u_email:{type:String,require:true,unique:true},
    u_password:{type:String,require:true},
    u_mobile:{type:String,require:true},
    u_isAdmin:{type:Boolean,default:false}
},{timestamps:true});
module.exports=mongoose.model('userRegistration',User);