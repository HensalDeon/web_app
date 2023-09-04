import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connection.js";
import userRouter from "./routes/userRouter.js";
import adminRouter from "./routes/adminRouter.js";
import bodyParser from "body-parser";
import ENV from "./config.js";

const app = express();

/** middlewears */
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json({ limit: '5mb' }));
app.disable("x-powered-by"); //less hackers know about our stack


/** HTTP GET request */
app.get("/", (req, res) => {
    res.status(201).json("Home GET request");
});

/** api routes */
app.use('/', userRouter);
app.use('/admin', adminRouter);

/** start server when only we have a valid connection*/
connect().then(() => {
    try {
        app.listen(ENV.PORT, () => {
            console.log(`Server connected to http://localhost:${ENV.PORT}`);
        });
    } catch (error) {
        console.log("Cannot connect to the server");
    }
}).catch(error =>{
    console.log("Inavlid database connection");
})
