import express from "express";
import { body, check } from "express-validator";
import weatherControllers from "../controllers/weather.controller.js";

const weatherRouter = express.Router();

const { getWeatherController } = weatherControllers;

weatherRouter.get('/get-location-weather/:location', [
], getWeatherController);

export default weatherRouter;