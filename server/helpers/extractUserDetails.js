import UserModel from "../models/user.model.js";

export const showUserOutput = (user) => {
   
    const userOutput = {
        _id : user._id,
        firstName : user.firstName,
        lastName : user.lastName,
        email : user.email,
        designation : user.designation,
        employmentType : user.employmentType,
        userType : user.userType,
        status : user.status,
        phone : user.phone,
        company : user.company

    }
    return userOutput
}