import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
//API Documentation
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
//Security Packages
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import bodyParser from "body-parser";
//Files Import
import dbConnection from "./config/dbConnection.js"; //MongoDB Connection File from config folder
import router from "./routes/index.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express(); //Rest object

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 8800;

// MONGODB CONNECTION
dbConnection();

//Swagger Documentation api config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal APP",
      version: "1.0.0",
      description: "Node ExpressJs Job Application",
    },
    servers: [
      {
        url: "http://localhost:8800",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerDoc(options);

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(`/api-doc`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(router);
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); //Serving static files in Express
app.use("/docs", express.static(path.join(__dirname, "docs"))); //Serving static files in Express for PDF

//error middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Dev Server running on port: ${PORT}`);
});
