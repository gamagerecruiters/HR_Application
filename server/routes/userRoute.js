import express from "express";
import validateToken from "../middlewares/jwtValidation.js"; //* Import the validateToken middleware from the middlewares folder
import { updateUserController , deleteUserController} from "../controllers/userController.js"; //* Import the updateUserController from the controllers folder

const router = express.Router();

//Routes
// GET USERS || GET /api-v1/user
// router.get("/get-users", getUsersController);

// CREATE USERS || POST /api-v1/add-user

// router.post("/add-user", validateToken, addUserController);
// router.post("/add-user", validateToken , addUserController);



// UPDATE USERS || PUT /api-v1/user/:id
router.put("/update-user", validateToken, updateUserController); 

// DELETE USERS || DELETE /api-v1/user/:id
router.delete("/delete-user", validateToken ,deleteUserController )

export default router;