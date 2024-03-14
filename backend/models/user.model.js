import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Invalid email address"],
        unique: true,
        match: [/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address']
    },

    password: String
})

const User = mongoose.model(`User`, userSchema);
export default User;