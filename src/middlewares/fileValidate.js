import converter from "converter-mb";
import path from "path"
import { ClientError, globalError } from "shokhijakhon-error-handler"


export const fileValidator = (req,res,next)=>{
    try {
        let allowedAvatarFormats = [".jpg",".png","jpeg"];
        let maxSizeFile=3;
        let filename= req.files.avatar.name;
        let extname = path.extname(filename);
        console.log(extname);
        if (!allowedAvatarFormats.includes(extname.toLocaleLowerCase()))throw new ClientError("Unsupported avatar type",415);
        let currentFileSize=converter.byte(req.files.avatar.size)
        if(currentFileSize>maxSizeFile)throw new ClientError("File is very big",413)
        req.filename=Date.now()+filename
        return next();
    } catch (err) {
        return globalError(err,res);
    }
}