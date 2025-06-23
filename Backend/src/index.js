require('dotenv').config();

const express = require("express");
const app = new express();
const main = require("./config/db");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/userAuth");
const problemRouter = require("./routes/problemCreator");
const redisClient = require("./config/redis");
const submitRouter = require("./routes/submit");
const cors = require('cors');

app.use(cors({
    origin: 'https://leetclone-frontend.onrender.com',
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use("/user",authRouter);
app.use("/problem",problemRouter);
app.use("/submission",submitRouter);

const InitalizeConnection = async ()=>{
    try{
        await Promise.all([main(),redisClient.connect()]);
        console.log("DB Connected");
        app.listen(process.env.PORT, ()=>{
           console.log("Server listening at port number: " + process.env.PORT);
        })

    }catch(err){
        console.log("Error: " + err);
    }
}

InitalizeConnection();

