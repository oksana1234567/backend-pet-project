import mongoose from "mongoose";
const db = require('./src/models');
import app from "./app";

const PORT: Number = 5050;

db.mongoose.connect(`mongodb://localhost:27017/JestDB`).then(() => {
    console.log(`mongodb://localhost:27017/JestDB`)
}).catch((err: Error) => console.log(`Failed connected to MongoDB: mongodb://localhost:27017/JestDB`, err));

app.listen(PORT, (): void => console.log(`running on port ${PORT}`));

export default app;