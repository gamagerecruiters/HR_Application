import express from "express";
import validateToken from "../middlewares/jwtValidation.js"; //* Import the validateToken middleware from the middlewares folder
import { updateUserController , deleteUserController , getAllUsersController , getUserController, updateStatusController} from "../controllers/userController.js"; //* Import the updateUserController from the controllers folder

const router = express.Router();

//Routes
// GET USERS || GET /api-v1/user
router.get("/get-all-users", getAllUsersController);

router.get("/get-user/:userId", getUserController);


// CREATE USERS || POST /api-v1/add-user

// router.post("/add-user", validateToken, addUserController);
// router.post("/add-user", validateToken , addUserController);



// UPDATE USERS || PATCH /api-v1/user/:id
router.patch("/update-user/:userId", validateToken, updateUserController); 

// UPDATE USER STATUS || PATCH /api-v1/update-user/:userId
router.patch("/update-user-status/:userId", validateToken, updateStatusController); 


// DELETE USERS || DELETE /api-v1/user/:id
router.delete("/delete-user/:userId", validateToken ,deleteUserController )

export default router;
