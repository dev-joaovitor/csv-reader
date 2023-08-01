import express, { Router } from "express";
import fileUpload from "express-fileupload";
import csvController from "../controllers/csvController";
import csvMiddleware from "../middlewares/csvMiddleware";

const router: Router = express.Router();

router.post('/uploadFile',
    fileUpload(),
    csvMiddleware.fileValidation,
    csvController.storeCsv
)

export default router;