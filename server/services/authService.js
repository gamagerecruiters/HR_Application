import UserModel from "../models/user.model.js"; //* Import the UserModel from the models folder


export const isAuthorizedUserAccess = (user) => {
    if(!user){
      return false
    }
    return true
}



export const isAuthorizedAdminAccess = (user,isAdmin) => {
    if(!isAuthorizedUserAccess(user) || !isAdmin){
        return false
    }
    return true
}