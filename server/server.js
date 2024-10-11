import cloudinary from "cloudinary";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
import morgan from "morgan";
// import swaggerUi from "swagger-ui-express";
// import swaggerDoc from "swagger-jsdoc";
//Security Packages
import bodyParser from "body-parser";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
//Files Import
import fileUpload from "express-fileupload";
import dbConnection from "./config/dbConnection.js"; //MongoDB Connection File from config folder
import { errorMiddleware } from "./middlewares/error.js";
import router from "./routes/index.js";

import ticketRoutes from "./routes/ticketRoutes.js";

dotenv.config();

const app = express(); //Rest object

//Cloudinary Configuration
const cloudinaryDB = cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

export default cloudinaryDB;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 8800;

// MONGODB CONNECTION
dbConnection();

// middlenames
// app.use(
//   cors({
//     origin: "http://localhost:5173", //Allowed Cross-Origin Resource Sharing (CORS) with the specified origin
//     allowedHeaders: ["Content-Type", "Authorization"], //Enabled Cross-Origin Resource Sharing (CORS) with all origins and allowed all headers.
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: "http://localhost:3000", // Adjust the origin to your frontend's origin
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
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
app.use(express.static(path.join(__dirname, "public"))); //Serving static files in Express
// app.use("/docs", express.static(path.join(__dirname, "docs"))); //Serving static files in Express for PDF

//error middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Dev Server running on port: ${PORT}`);
});
