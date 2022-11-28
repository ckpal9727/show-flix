const mongoose=require('mongoose');

// 
 async function connection()
{
    const url=process.env.DB
    const urlParams={
        useNewUrlParser: true,
        useUnifiedTopology: true  
    }
    try {
        const connection=await mongoose.connect(url,urlParams);
        console.log("Connected");
    } catch (error) {
        console.log(error)
    }
}
connection();