import mongoose from 'mongoose';

const excelDataSchema = new mongoose.Schema({
    fileName:{type:String},
    createdAt:{
        type:Date,
        default:Date.now
    },
     createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
},
    data:[mongoose.Schema.Types.Mixed]
},{timestamps:true})

export const excelDataModel = mongoose.model('excelData',excelDataSchema);