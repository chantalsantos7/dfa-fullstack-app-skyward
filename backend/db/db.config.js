import dotenv from 'dotenv';

dotenv.config({
    path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``}`
});

// console.log(`Environment: ${process.env.NODE_ENV}`);

const { DBURI } = process.env;
// console.log(`DBURI: ${DBURI}`);

const config = {
    db: {
        uri: DBURI
    },
};

export default config;