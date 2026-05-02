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

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true 
}))

app.use(express.json());
app.use(cookieParser());

app.use('/user',authRouter);
app.use('/problem',problemRouter);
app.use('/submission',submitRouter);
app.use('/ai',aiRouter);
app.use("/video",videoRouter);


const InitalizeConnection = async ()=>{
    try{
        await main();
        console.log("DB Connected");
    } catch(err) {
        console.error("DB Connection Error: " + err);
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

