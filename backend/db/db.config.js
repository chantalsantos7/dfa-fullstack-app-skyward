import configDotenvPath from '../helpers/dotenv-config.js';

configDotenvPath()

const { DBURI } = process.env;

const config = {
    db: {
        uri: DBURI
    },
};

export default config;