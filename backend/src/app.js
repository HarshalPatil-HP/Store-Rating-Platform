import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';

const app=express();

app.use(cors());
app.use(express.json({
    limit: '16kb',
}));

app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}));
app.use(cookieParser());

//import routes
import healthcheck from "./routes/healthcheck.route.js";

//i mean we can define routes here
app.use("/api/healthcheck",healthcheck);


//for server error things (global)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    return res.status(statusCode).json({
        success: false,
        message: message,
        errors: err.errors || []
    });
});

export {app};