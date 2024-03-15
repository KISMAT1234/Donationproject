import { createSlice } from '@reduxjs/toolkit'

const initialState = [];
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers:{
     Star:(state,action)=>{
        // console.log(action.payload);
       state.push(action.payload[0]);
     }
    }
});

export const { Star} = counterSlice.actions

export default counterSlice.reducer

