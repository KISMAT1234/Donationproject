import axios from "axios";

const token = localStorage.getItem("token") ?? "";
const axiosUrl = axios.create({
    baseURL: "http://localhost:8000",
    headers:{
        authorization: `Bearer ${token}`
       }
});

export default axiosUrl;