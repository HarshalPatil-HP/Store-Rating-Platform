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
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import ownerRouter from "./routes/owner.route.js";

//i mean we can define routes here
app.use("/api/healthcheck",healthcheck);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);

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