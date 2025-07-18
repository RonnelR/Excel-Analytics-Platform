import express , {json} from 'express'
import dotenv from 'dotenv'
import colors from "colors"
import { databaseConn } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors'

//dotenv
dotenv.config({ debug: true });

//database Connection
databaseConn()

//rest object
const app = express()

//middleware
colors.enable();
app.use(express.json());
app.use(cors({
                origin: 'http://localhost:3000'
            }));


//Routes
app.use('/api/auth',authRoutes);


//rest api
app.get('/',(req,res)=>{
    res.json('hello World')
})

//port
const PORT = process.env.SERVER_PORT;

//server
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`.bgMagenta.white)
})