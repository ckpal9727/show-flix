const jwt=require('jsonwebtoken');



 async function verify(req,res,next){


  
    const Header=req.cookies.token

    // console.log(req.header)
    // console.log(JSON.stringify(Header));
    if(!Header){
        console.log("Header is not found");
        res.json({message:"You are not a use"});
    }else{
        jwt.verify(Header,process.env.SECRET_KEY,(err,regUser)=>
        {
            if(err) res.status(403).json("Token is not found"); 
            req.user=regUser;
            // console.log(req.user)
            // console.log("User is verified");
            next();
        })
    }
}

module.exports=verify;