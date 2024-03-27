import cors from 'cors';
import cron from 'node-cron';
import express from 'express';
import { connectDb } from './db/db.connection.js';
import configDotenvPath from './helpers/dotenv-config.js';
import authRouter from './routes/auth.routes.js';
import morgan from 'morgan';
import favouriteLocationsRouter from './routes/favouriteLocations.routes.js';
import weatherRouter from './routes/weather.routes.js';
import placesRouter from './routes/places.routes.js';

const app = express();
configDotenvPath();

app.use(cors());
app.use(express.json());
app.use(morgan(`combined`));
app.use(express.urlencoded({ extended: true }));
connectDb();

//Routers
app.use(`/auth`, authRouter);
app.use(`/favourite-locations`, favouriteLocationsRouter);
app.use(`/weather`, weatherRouter);
app.use("/places", placesRouter);


const { PORT } = process.env; 
const server = app.listen(PORT, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;
    console.log(`Server is listening at: http://${SERVERHOST}:${SERVERPORT}`);
});

// cron.schedule('*/10 * * * *', () => {
//     console.log("running a function every 10 minutes")
// })

export default server;