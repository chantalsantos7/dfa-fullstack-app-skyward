import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDb } from './db/db.connection.js';
import configDotenvPath from './helpers/dotenv-config.js';
import authRouter from './routes/auth.routes.js';
import morgan from 'morgan';

const app = express();
configDotenvPath();
console.log(`Node env: ${process.env.NODE_ENV}`);

app.use(cors());
app.use(express.json());
app.use(morgan(`tiny`));
app.use(express.urlencoded({ extended: true }));
connectDb();

//Routers
app.use(`/auth`, authRouter);


const { PORT } = process.env; 
const server = app.listen(PORT, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;
    console.log(`Server is listening at: http://${SERVERHOST}:${SERVERPORT}`);
});


export default server;