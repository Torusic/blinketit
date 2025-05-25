import mongoose  from "mongoose";
import dotenv from "dotenv";
dotenv.config()
if(!process.env.MONGODB_URI){
    throw new Error(
        "Please Provide MONGODB URI on the .env file"
    )
}
async function connectDb(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDb connected');

    }catch(error){
        console.log('MongoDb connection error:',error);
        process.exit(1)
    }
}
export default connectDb;