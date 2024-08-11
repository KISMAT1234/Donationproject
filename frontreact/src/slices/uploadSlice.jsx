import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosUrl from "../components/url/Axiosurl";


export const fetchUpload = createAsyncThunk("fetchUpload", async () => {
   return axiosUrl
   .get("/upload")
   .then((response)=> response.data)
  })


  const postsSlice = createSlice({
    name: 'posts',
    initialState:{
      users:[]
    },
      extraReducers: (builder) => {
    //     builder.addCase(fetchUpload.pending, (state, action) => {
    //         state.isLoading = true;
    //       // Add user to the state array
    //     })
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchUpload.fulfilled, (state, action) => {
          console.log(action.payload,'payload')
          state.users = action.payload;
          
        })
        // builder.addCase(fetchUpload.rejected, (state, action) => {
        //     state.isError = true;
        //     console.log("Error", action.payload)
        //   // Add user to the state array
        // })
        
      },
  });

  export const {addCase } = postsSlice.actions

export default postsSlice.reducer