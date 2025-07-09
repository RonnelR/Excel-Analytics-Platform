import express , {json} from 'express'
import dotenv from 'dotenv'
import colors from "colors"
import mongoose from "mongoose"

//dotenv
dotenv.config({ debug: true });


//mongodb connection
const databaseConn =async ()=>{
    try {
     const conn = await mongoose.connect(process.env.MONGODB_CONN_STRING)
console.log(`Database connected sucessfuly ${mongoose.connection.host} `.bgCyan.white)
    } catch (error) {
        console.log("error in mongodb Connection!")
    }
}
databaseConn()



//rest object
const app = express()



//middleware
colors.enable();
app.use(express.json())  

//rest api
app.get('/',(req,res)=>{
    res.send('hello World')
})

//port
const PORT = process.env.SERVER_PORT;

//server
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`.bgMagenta.white)
})