import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDb } from './db/db.connection.js';

const app = express();

dotenv.config({
    path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``}`
});


app.use(cors());
app.use(express.json());

connectDb();

const { PORT, HOST } = process.env; 

const server = app.listen(PORT, HOST, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;
    console.log(`Server is listening at: http://${SERVERHOST}:${SERVERPORT}`);
});

export default server;