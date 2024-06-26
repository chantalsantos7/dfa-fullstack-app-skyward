import User_Favourite from "../models/user_favourite.model.js"

export const fetchFavouritesService = async (userId) => {

    const favourites = await User_Favourite.findOne({ userId: userId }).exec();
    if (!favourites) {
        throw new Error("Favourites not yet created");
    }
    //if there is no favourites, it's alright as it probably hasn't been added to yet, so call the POST rather than patch
    return favourites;
}

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

export const addNewLocationService = async (req) => {
    const { userId, location } = req.body;

    try {
        const updatedFavourites = await User_Favourite.findOneAndUpdate(
            { userId: userId },
            { $push: { favourites: location } },
            { new: true, useFindAndModify: false }
        );
        if (!updatedFavourites) {
            throw new Error(`Could not find a favourites entry for that user`);
        }

        return updatedFavourites;
    }
    catch (err) {
        throw err;
    }
}

export const deleteLocationService = async (req) => {
    const { userId, location } = req.body;

    try {
        const originalFavourites = await User_Favourite.findOne({ userId: userId }).exec();
        if (!originalFavourites) {
            throw new Error("No favourites entry found for that user id");
        }

        const updatedFavourites = await User_Favourite.findOneAndUpdate(
            { userId: userId },
            { $pull: { favourites: location } },
            { new: true, useFindAndModify: false }
        );

        if (originalFavourites.favourites.length === updatedFavourites.favourites.length) {
            throw new Error(`That location was not in the user's favourites`);
        }

        return updatedFavourites;
    } catch (err) {
        throw err;
    }
};