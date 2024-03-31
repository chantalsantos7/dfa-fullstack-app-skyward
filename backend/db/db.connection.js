import mongoose from 'mongoose';
import config from './db.config.js';

const { uri } = config.db;

export const connectDb = async () => {
    try {
        await mongoose.connect(uri);
        console.log(`Connected to Skyward DB`);
    }
    catch (e) {
        console.log(`Failed to connect to DB: ${e.message}`);   
    }
};