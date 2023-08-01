import fs from "fs"

const rawDb = fs.readFileSync(__dirname + "\\db.json", { encoding: "utf-8" });
const DB = JSON.parse(rawDb);


export default DB;
