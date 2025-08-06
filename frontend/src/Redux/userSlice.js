import {createSlice} from '@reduxjs/toolkit'


//initial State
const initialState = {
    user: null,
    token: ''
}

//userSlice
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload.user;   
            state.token = action.payload.token;
        },
        logoutUser:(state)=>{
            state.user = null
            state.token = ''
        }
    }
});


export const {setUser,logoutUser} = userSlice.actions
export default userSlice.reducer;