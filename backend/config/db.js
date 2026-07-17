
console.log("db.js loaded");

const mongoose= require("mongoose");

const connectDB = async ()=>{
    try{
          await mongoose.connect(process.env.DATABASE_URL);
  console.log("✅ MongoDB Connected");
    }catch(error){
        console.log("database connection failed")
            console.log(error.message);

        process.exit(1);
    }
};
module.exports = connectDB;