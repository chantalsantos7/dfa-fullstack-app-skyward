import express from "express";
import placesControllers from "../controllers/places.controller.js";

const placesRouter = express.Router();
const { getPoIForLocationController } = placesControllers;

placesRouter.get("/get-places/:location", [], getPoIForLocationController);

export default placesRouter;