import express from "express";
import { isAuthorized } from "../middlewares/auth.js";
import {createEmployeeController, getAllEmployeeController, getEmployeeController, updateEmployeeController, deleteEmployeeController, generateEmployeeReport} from "../controllers/employeeController.js"


const employeeRouter = express.Router();


employeeRouter.post("/create-employee",isAuthorized,createEmployeeController);

employeeRouter.get("/all-employees", isAuthorized, getAllEmployeeController);

employeeRouter.get("/get-employee/:employeeId", isAuthorized, getEmployeeController);

employeeRouter.patch("/update-employee/:employeeId", isAuthorized,updateEmployeeController );

employeeRouter.delete("/delete-employee/:employeeId", isAuthorized, deleteEmployeeController)

employeeRouter.get("/employee-report", isAuthorized, generateEmployeeReport);



export default employeeRouter
