import React, {useState } from 'react'
import Layout from '../../Comonents/Layouts/Layout'
import {excel_data, upload_file } from '../../Services/api'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useSelector ,useDispatch } from 'react-redux';
import {setExcelData} from '../../Redux/excelDataSlice';
import {setAxis} from '../../Redux/chartSlice';

import DataPreviewTable from '../../Comonents/DataPreviewTable';



const UploadFile = () => {

const dispatch = useDispatch()
//useSelector for user
const user = useSelector(state=> state.user)
const token = user.token

//useSelector for user
const excelData = useSelector(state=>state.excelData)

const [dragOver,setDragOver] = useState(false)
const [file,setFile] = useState(null)
const [selectedValueXaxis,setselectedValueXaxis] = useState('')
const [selectedValueYaxis,setselectedValueYaxis] = useState('')


const headers = Object.keys(excelData?.excelData[0])

const Navigate =useNavigate()

//handle drap over
const handleDragOver =(e)=>{
  e.preventDefault()
  setDragOver(true)
}
//handle drag leave
const handleDragLeave =(e)=>{
  e.preventDefault()
  setDragOver(false)
}

//handling droped file
const handleDrop =(e)=>{
  e.preventDefault()
  setDragOver(false)

  const droppedFile = e.dataTransfer.files[0]
  setFile(droppedFile);
}

//handle file change 
const handleFileChange = (e)=>{
const selectedFile = e.target.files[0]
setFile(selectedFile);
}

//handle file upload 
const handleUploadFile = async ()=>{

 
const formData = new FormData();
    formData.append('file', file);

  
const res = await upload_file(formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization':  `Bearer ${token}`
        }})
    
 console.log(res.data.excelData)

 const fileId = res.data.excelData._id;
  
    toast.success('File Uploaded  successfully')
        

         const excelResponse = await excel_data(fileId);
         if(excelResponse){
     console.log(excelResponse)
        //storing excel data in localstorage
       localStorage.setItem('excel',JSON.stringify(excelResponse.data))
        //storing in redux
         dispatch(setExcelData(excelResponse?.data?.data))
         }
     
        }

//handleChange in x axis
const handleChangeXaxis = (e) =>{
  console.log(e.target.value)
  setselectedValueXaxis(e.target.value)
}

//handleChange in y axis
const handleChangeYaxis = (e) =>{
  console.log(e.target.value)
    setselectedValueYaxis(e.target.value)
}

//handleCreate
const handleCreate = () =>{

  if(!selectedValueXaxis || !selectedValueYaxis){
   return toast.error('Please select X & Y axis')
  }else{
     //setting data in localstorage.
    localStorage.setItem('selectedX',selectedValueXaxis)
    localStorage.setItem('selectedY',selectedValueYaxis)

    //dispatch data in setChart
    dispatch(setAxis({
      x:selectedValueXaxis,
      y:selectedValueYaxis
    }))

    //navigate to visualization page.
    Navigate('/dashboard/user/visualization')

  }
    
}


  return (
    <>
    <Layout/>

{/* show the excel data table if the excel data is present */}
{excelData?.excelData?.length > 0 ? (

//data preview table & axis configuration
<>
<div className='border-red-400 border-2'>
<DataPreviewTable data={excelData?.excelData}/>
</div>
{/* axis selection config.*/}
<div>
<h1>Chart configuration</h1>
<div>

{/* x axis */}
  <p>Select X-axis</p>
  <select id='x-axis-dropdown' value={selectedValueXaxis} onChange={handleChangeXaxis}>
  <option value='' >please select</option>
  {headers?.map((header)=>(
 <option key={`x-${header}`} value={header} >{header}</option>
  ))}
  </select>

  {/* y axis */}
    <p>Select Y-axis</p>
  
     <select id='y-axis-dropdown' value={selectedValueYaxis} onChange={handleChangeYaxis}>
        <option  value='' >please select</option>
  {headers?.map((header)=>(
 <option key={`y-${header}`} value={header} >{header}</option>
  ))}
  </select>
</div>

{/* create button */}
<div>
  <button  onClick={handleCreate} className="bg-red-700 p-4 m-4" >Create Charts</button></div>

</div>

</>

) : (

<div className='text-center'>
         <h1 className="font-bold" >UploadFile</h1>
         <p>  Upload your excel file to vizvalize & analyze your data</p>
         
         {/* /div for file upload using drag & drop,browse file on system */}
         <div
         className={`border-2 border-red-200 border-dashed p-6 rounded-xl cursor-pointer transition-colors ${
        dragOver ? 'border-red-500 bg-red-50' : 'border-gray-300'
      }`}
          onDragOver={handleDragOver} 
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={()=>{document.getElementById('inputFile').click()}}
          >
              <p>📂 </p>
              <p>{file ? `selected: ${file?.name}` :' Drag and drop your file here' }</p>
   
        <input type='file' id='inputFile' onChange={handleFileChange} className='hidden' />
 
         </div>
         <div className='p-2'>

         {/* show upload & cancle buttons if file selected */}
 {file ? <button className="bg-green-700 p-4 m-4"  onClick={handleUploadFile} >Upload file</button> :'' }
              {file ?  <button className="bg-red-700 p-4 m-4" onClick={()=>setFile('')}>cancle file</button> :'' }

         </div>
             </div>
    

  
)} 

             <Toaster/>
    </>

  )
}

export default UploadFile