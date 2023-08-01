import express from "express";
import cors from "cors";

import csvRoutes from "./routes/csvRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.use("/api/v1/", csvRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));