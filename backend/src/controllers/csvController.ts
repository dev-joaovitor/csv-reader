import { Request, Response } from "express";
import { FileArray, UploadedFile } from "express-fileupload";
import { parse } from "csv";
import DB from "../../src/database/database";

console.log(DB);

async function storeCsv(req: Request, res: Response) {
    const files = req.files as FileArray;
    const fileKeys = Object.keys(files);
    const file = files[fileKeys[0]] as UploadedFile;

    const data: any = [];

    parse(file.data, { delimiter: ",", columns: true })
        .on("data", (row) => {
            DB.person.push(row);
            console.log(DB);
        })
        .on("end", () => {


            res.status(200).json({
                status: 200,
                data,
            })
        })
        .on("error", (err) => {
            if (err) throw err;
            res.status(400).json({ status: 400 })
        })
}


export default {
    storeCsv
}