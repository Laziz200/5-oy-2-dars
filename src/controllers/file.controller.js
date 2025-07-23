import path from "path";
import { globalError } from "shokhijakhon-error-handler"

export default {
    FILE_UPLOAD: async function(req,res) {
        try {
            req.files.avatar.mv(path.join(process.cwd(),"uploads",req.filename));
            return res.status(201).json({massage:"File successfully uploaded",status:201})
        } catch (err) {
            return globalError(err, res);
        }
    }
}