import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

const Database = async() => {
try{
    await mongoose.connect(process.env.MONGODB);
    console.log('MongoDb connected');
} catch(err){
    console.log('connection failed');
    process.exit(1)
}
}

export default Database;

