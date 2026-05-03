const express = require('express')
const app = express();
require('dotenv').config();
const main =  require('./config/db')
const cookieParser =  require('cookie-parser');
const authRouter = require("./routes/userAuth");
const redisClient = require('./config/redis');
const problemRouter = require("./routes/problemCreator");
const submitRouter = require("./routes/submit")
const aiRouter = require("./routes/aiChatting")
const videoRouter = require("./routes/videoCreator");
const cors = require('cors')

// console.log("Hello")

app.use(cors({
    origin: true,
    credentials: true 
}))

app.use(express.json());
app.use(cookieParser());

app.use('/user',authRouter);
app.use('/problem',problemRouter);
app.use('/submission',submitRouter);
app.use('/ai',aiRouter);
app.use("/video",videoRouter);

app.get("/", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "CodeArena Backend is running 🚀"
    });
});


const InitalizeConnection = async ()=>{
    try{
        if (!process.env.DB_CONNECT_STRING) {
            throw new Error("DB_CONNECT_STRING is not defined in .env file");
        }
        await main();
        console.log("DB Connected Successfully");
    } catch(err) {
        console.error("Critical Database Error: " + err.message);
        process.exit(1);
    }

    try {
        await redisClient.connect();
        console.log("Redis Connected");
    } catch(err) {
        console.error("Redis Connection Error (Redis features will be disabled): " + err);
    }

   const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("Server listening at port number: " + PORT);
})
}


InitalizeConnection();

