import {createSlice} from '@reduxjs/toolkit';


//initial state
const initialState = {
    selectedX: localStorage.getItem('selectedX') || '',
    selectedY: localStorage.getItem('selectedY') || ''
}

//create slice
const chartSlice = createSlice({
    name:'chart',
    initialState,
    reducers:{
        setAxis:(state,action)=>{
            state.selectedX = action.payload.x
            state.selectedY = action.payload.y
        },
        resetAxis:(state)=>{
            state.selectedX = ''
            state.selectedY = ''

    }}
})


export const {setAxis,resetAxis} = chartSlice.actions;
export default chartSlice.reducer;


 