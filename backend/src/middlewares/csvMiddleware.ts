import { NextFunction, Request, Response } from "express";
import { FileArray, UploadedFile } from "express-fileupload";

async function fileValidation(req: Request, res: Response, next: NextFunction){
    const files = req.files as FileArray;
    const badRequest = 400;

    if (files === null){
        return res.status(badRequest).json({
            status: badRequest,
            message: "You must include 1 file before you can proceed"
        })
    }

    const fileKeys = Object.keys(files);

    if (fileKeys.length > 1){
        return res.status(badRequest).json({
            status: badRequest,
            message: "It's allowed to upload 1 file at time"
        })
    }

    const file = files[fileKeys[0]] as UploadedFile;

    if (!file.name.includes("csv")){
        return res.status(badRequest).json({
            status: badRequest,
            message: "Only CSV files are allowed"
        })
    }
    next();
}

export default {
    fileValidation
}