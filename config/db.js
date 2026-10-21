const mongoose=require("mongoose");
const { log, error } = require("node:console");
module.exports=()=>{
    try{
        mongoose.connect(process.env.MONGO_DB);
        console.log("Connected to database succesfully");
        
    }
    catch{
        console.log("Could not connect to the database!",error.mesage);
        
    }
}