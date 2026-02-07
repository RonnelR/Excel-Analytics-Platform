import express from 'express'
import dotenv from 'dotenv'
import colors from "colors"
import { databaseConn } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import fileUploadRoute from './routes/fileUploadRoute.js'
import morgan from 'morgan';
import cors from 'cors'

//dotenv
dotenv.config({ debug: true });

//database Connection
databaseConn()

//rest object
const app = express()

const allowedOrigins = [
  "http://localhost:3000",        // local dev
  "https://redgraph.netlify.app"  // deployed frontend
];

//middleware
colors.enable();
app.use(express.json()); 
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(morgan('dev'))


//Routes
app.use('/api/auth',authRoutes);
app.use('/api/file',fileUploadRoute);

//rest api
app.get('/',(req,res)=>{
    res.json('hello World')
})

//port
const PORT = process.env.PORT;

//server
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`.bgMagenta.white)
})