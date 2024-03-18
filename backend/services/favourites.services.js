import User_Favourite from "../models/user_favourite.model.js"

export const addFavouritesService = async (req) => {
    const { userId, favourites } = req.body;
    try {
        const newFavourites = new User_Favourite({
            userId, favourites
        });
        return await newFavourites.save();
    }
    catch (err) {
        throw err;
    }
}