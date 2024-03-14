import dotenv from 'dotenv';

const configDotenvPath = () => {
    dotenv.config({
        path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``}`
    });
}

export default configDotenvPath;