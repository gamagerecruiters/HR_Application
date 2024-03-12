import path from "path";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cloudinary from "cloudinary";
import expressLayouts from "express-ejs-layouts";

import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import "express-async-errors";
import cookieParser from "cookie-parser";
// import swaggerUi from "swagger-ui-express";
// import swaggerDoc from "swagger-jsdoc";
//Security Packages
import helmet from "helmet";
import xss from "xss-clean";
import bodyParser from "body-parser";
import mongoSanitize from "express-mongo-sanitize";
//Files Import
import router from "./routes/index.js";
import fileUpload from "express-fileupload";
import dbConnection from "./config/dbConnection.js"; //MongoDB Connection File from config folder
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config();

const app = express(); //Rest object

//Cloudinary Configuration
const cloudinaryDB = cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinaryDB;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 8800;

// MONGODB CONNECTION
dbConnection();

// middlenames
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["*"], //Enabled Cross-Origin Resource Sharing (CORS) with all origins and allowed all headers.
  })
);
app.use(xss());
app.use(helmet());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" })); //File Upload Middleware

app.use(morgan("dev"));

// app.use(`/api-doc`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(router);
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); //Serving static files in Express
// app.use("/docs", express.static(path.join(__dirname, "docs"))); //Serving static files in Express for PDF

//error middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Dev Server running on port: ${PORT}`);
});
