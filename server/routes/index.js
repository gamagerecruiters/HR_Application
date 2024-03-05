import express from "express";
import authRoute from "./authRoute.js"; // Imported the authRoute from the routes folder

const router = express.Router();

const path = "/api-v1/";

router.use(`${path}auth`, authRoute); //api-v1/auth/
// router.use(`${path}user`);

export default router;
