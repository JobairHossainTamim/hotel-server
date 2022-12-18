const mongoose=require('mongoose');


mongoose.connect(process.env.MONGO_URL);


let connectionObj=mongoose.connection;

connectionObj.on('connected',()=>{
    console.log(`Mongoose Connected`)
})
connectionObj.on('err',(err)=>{
    console.log(`Mongoose Connected failed `+err)
})

module.exports=mongoose;