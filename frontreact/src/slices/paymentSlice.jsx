import axiosUrl from "../components/url/Axiosurl";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPayment = createAsyncThunk("paymentInformation",async()=>{
    const response = await axiosUrl.get("/response");
    return response.json();
})

const paymentSlice = createSlice({
     name:"payment",
     initialState:{
        isLoading:false,
        data:null,
        isError:false
     },
     reducers:{},
     extraReducers:(builder) => {
        builder.addCase( fetchPayment.pending, (state,action)=>{
             state.isLoading = true;
        });
        builder.addCase( fetchPayment.fulfilled, (state,action)=>{
             state.isLoading = false;
             state.data = action.payload;
        });
        builder.addCase( fetchPayment.fulfilled, (state,action)=>{
            console.log("error",action.payload)
            state.isError = true
       });
        
     }
})

export default paymentSlice.reducer