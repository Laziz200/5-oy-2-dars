import { ClientError, globalError } from "shokhijakhon-error-handler"

let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


export const userValidator = (req,res,next)=>{
    try {
        let newUser=req.body;
        if (!newUser.username) throw new ClientError("Username is required!", 400);
        if (!newUser.email) throw new ClientError("Email is required!", 400);
        if(!emailRegex.test(newUser.email))throw new ClientError("Email invalid!",400);
        if (!newUser.password) throw new ClientError("password is required!", 400);
        if(!req.files.avatar)throw new ClientError("Avatar is required!",400);
        return next();
    } catch (err) {
        return globalError(err,res);
    }
}