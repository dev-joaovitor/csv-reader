import fs from "fs"

const db_path = __dirname + "/db.json";

function dbReader(cb: Function){
    fs.readFile(db_path, "utf-8", (err, data) => {
        if (err){
            return cb(err)
        }
        try {
            const object = JSON.parse(data); 
            return cb(null, object)
        } catch (err) {
            return cb(err)
        }
    });
}

function dbUpdater(data: any[]){
    dbReader((err: Error, dbData: { files: any[] }) => {
        if (err){
            console.log("Error reading db:", err);
        }

        dbData.files.push(data);

        fs.writeFile(db_path, JSON.stringify(dbData, null, 2), err => {
            if (err) console.log("Error writing db:", err);
        })
    })
}

export default {
    dbReader,
    dbUpdater,
}
