import { app } from "./app.ts";
import dotenv from "dotenv";
import { connectDB } from "./db/connection.ts";
dotenv.config();

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
