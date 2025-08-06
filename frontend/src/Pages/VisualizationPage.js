import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import Layout from '../Comonents/Layouts/Layout'
import DataPreviewTable from '../Comonents/DataPreviewTable.js'


const VisualizationPage = () => {

  const [visualizationButton,setVisualizationButton]  = useState(true)
  const [DataPreviewButton,setDataPreviewButton]  = useState(false)

  const {selectedX, selectedY } = useSelector(state=>state.chart)
  const excelData = useSelector(state=>state.excelData)

//array of chart type
  const types = ['Bar','line','pie','donut','3D pie','3D column','3D donut'];
//handling visualization button
const handleVisualization = ()=>{
  setDataPreviewButton(false)
  setVisualizationButton(true)
}


//handling data preview button
const handleDataPreview = ()=>{
  setVisualizationButton(false)
  setDataPreviewButton(true)
}




  return (
    <>
    <Layout>
    <div className='text-center'>
    <button className='bg-red-500 m-4' onClick={handleVisualization}>VisualizationPage</button>
    <button className='bg-red-500' onClick={handleDataPreview}>Data Preview</button>
    <p>Chart for {selectedX} vs {selectedY}.</p>

      {/*visualization part  */}
    {visualizationButton ? (<>
      <p>visualization part</p> 
       {types.map((type)=>(
        <button  className='bg-red-500 m-4'>{type}</button>
    ))}
    </>)
    : ""}

    {/* data preview part */}
    {DataPreviewButton ? (<>
     <DataPreviewTable data={excelData?.excelData}/>
    </>
    )
     : ""}
    </div>

    </Layout>

    </>
  )
}

export default VisualizationPage