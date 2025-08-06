import {createSlice} from '@reduxjs/toolkit';

//initial state
const initialState = {
    excelData:null
};


//create excelSlice
const excelSlice = createSlice({
    name:'excelData',
    initialState,
    reducers:{
        setExcelData:(state,action)=>{
            state.excelData = action.payload
        },
        clearExcelData:(state)=>{
            state.excelData = null
        }
    }
})

export const {setExcelData,clearExcelData} = excelSlice.actions;
export default excelSlice.reducer