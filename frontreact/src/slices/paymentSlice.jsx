import axiosUrl from "../components/url/Axiosurl";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPayment = createAsyncThunk("paymentInformation",async(id)=>{
    const response = await axiosUrl.get(`/donate/${id}`);
//     console.log(response,'response in asyncthunk')
    return response.data;
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
        builder.addCase( fetchPayment.pending, (state)=>{
             state.isLoading = true;
        });
        builder.addCase( fetchPayment.fulfilled, (state,action)=>{
          //    console.log(action.payload,'payload value')
             state.isLoading = false;
             state.data = action.payload
          // state.data.push(action.payload)
        });
        builder.addCase( fetchPayment.rejected, (state,action)=>{
            console.log("error",action.payload)
            state.isError = true
       });
        
     }
})

export default paymentSlice.reducer