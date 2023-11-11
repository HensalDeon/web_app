import express from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import connect from "./database/connection.js";
import userRouter from "./routes/userRouter.js";
import adminRouter from "./routes/adminRouter.js";
import bodyParser from "body-parser";
import ENV from "./config.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/** middlewears */
app.use(express.json());
app.use(express.static(path.join(__dirname, "./build")));
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json({ limit: "5mb" }));
app.disable("x-powered-by"); //less hackers know about our stack

/** HTTP GET request */
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname,"./build/index.html"))
});

/** api routes */
app.use("/api/", userRouter);
app.use("/api/admin", adminRouter);

/** start server when only we have a valid connection*/
connect()
    .then(() => {
        try {
            app.listen(ENV.PORT, () => {
                console.log(`Server connected to http://localhost:${ENV.PORT}`);
            });
        } catch (error) {
            console.log("Cannot connect to the server");
        }
    })
    .catch((error) => {
        console.log("Inavlid database connection");
    });
