import { Request, Response } from "express";
import { FileArray, UploadedFile } from "express-fileupload";
import { parse as CsvParse } from "csv";
import database from "../database/database";

function storeCsv(req: Request, res: Response) {
    const fileArray = req.files as FileArray;
    const fileKeys = Object.keys(fileArray);
    const file = fileArray[fileKeys[0]] as UploadedFile;

    const csvData: any[] = [];

    CsvParse(file.data, { delimiter: ",", columns: true })
        .on("data", (row: {}) => {
            csvData.push(row);
        })
        .on("end", () => {
            database.dbUpdater(csvData);

            res.status(200).json({
                status: 200,
                data: csvData,
            })
        })
        .on("error", (err) => {
            res.status(500).json({
                status: 500,
                message: "Error reading CSV file",
            })
        })
}


function searchOnCsv(req: Request, res: Response) {
    const { q } = req.query;

    res.status(200).json({
        status: 200,
        data: {}
    })
}

export default {
    storeCsv,
    searchOnCsv
}