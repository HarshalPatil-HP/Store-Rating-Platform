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


app.use("/api/healthcheck",(req,res)=>{
    res.json({ success: true, message: 'Server is running' });
});

export {app};