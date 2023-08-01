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
    const { q }: any = req.query;

    const matches: {}[] = [];

    database.dbReader((err: Error, data: { files: {}[][] }) => {
        if (err){
            res.status(500).json({
                status: 500,
                message: "Error reading db"
            })
        }
        const { files } = data;

        for (const file of files){
            for (const data of file){
                for (const [_, value] of Object.entries(data)){
                    if ((value as string).toLowerCase().includes(q.toLowerCase())){
                        matches.push(data);
                    }
                }
            }
        }
        res.status(200).json({
            status: 200,
            data: matches
        });
    })
}

export default {
    storeCsv,
    searchOnCsv
}