import axiosUrl from "../components/url/Axiosurl";

export const fetchPayment = createAsyncThunk("paymentInformation",async()=>{
    const response = await axiosUrl.get("/response");
    return response.json();
})

const paymentSlice = createSlice({
    
})