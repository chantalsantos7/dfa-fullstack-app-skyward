import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Need an email address"],
        unique: true,
        match: [/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address']
    },

    password: {
        type: String,
        required: [true, "Need a password"]
    }
})

const User = mongoose.model(`User`, userSchema);
export default User;