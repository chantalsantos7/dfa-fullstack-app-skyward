import configDotenvPath from "../helpers/dotenv-config.js";
import axios from "axios";

configDotenvPath();

export const getPoIForLocationService = async (location) => {
    
    
    try {
        // const response = await axios.get();
        console.log(`Hi hello places of interest in ${location}`);
        // return response;
    }
    catch (err) {
        throw err;
    }
}