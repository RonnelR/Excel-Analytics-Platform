import React from 'react'

const DataPreviewTable = ({data}) => {

    if (!data || data.length === 0) {
return <p>No Data to be preview!</p>
    }

//dynamically get column headers
    const headers = Object.keys(data[0]);

  return (
    <>
    <div >
    <p>Data Preview</p>
        <table className='text-center'>
            <thead>
            
                <tr className='border-b border-red-400'>
                    {headers.map((header)=>(
                        <th key={header}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
            {data.map((row,index)=>(
                <tr className='border-b border-red-200'  key={index}>
                    {headers.map((header)=>(
                    <td key={header}>{row[header]}</td>

                    ))}
                </tr>
            ))}
                
            </tbody>
        </table>
        </div>    
    </>
  )
}

export default DataPreviewTable;