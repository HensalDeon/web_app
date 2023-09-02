import mongoose from "mongoose";
import ENV from "../config.js";

async function connect() {

    mongoose.set('strictQuery', true)
    const db = await mongoose.connect(ENV.URI, {
        useNewUrlParser: true,
    });
    console.log("Connected to MongoDB");
    return db;
}

export default connect;
