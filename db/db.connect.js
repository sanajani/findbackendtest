
import mongoose from "mongoose";

const DB_CONNECTION = async () => {
    try {
        // 
        await mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@chock.6utk4eg.mongodb.net/?retryWrites=true&w=majority`, {
        });
        console.log('Connected successfully to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default DB_CONNECTION;
