import mongoose, { Schema } from "mongoose";

const user_favourite = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    favourites: [String]

})

const User_Favourite = mongoose.model('User_Favourite', user_favourite);
export default User_Favourite;