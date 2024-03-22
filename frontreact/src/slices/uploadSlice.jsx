import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUpload = createAsyncThunk("fetchUpload", async () => {
    const response = await fetch("http://localhost:8000/upload")
    return  response.json();
    
  })


  const postsSlice = createSlice({
    name: 'posts',
    initialState:[],
    reducers: {},
      extraReducers: (builder) => {
    //     builder.addCase(fetchUpload.pending, (state, action) => {
    //         state.isLoading = true;
    //       // Add user to the state array
    //     })
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchUpload.fulfilled, (state, action) => {
          state = action.payload;
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