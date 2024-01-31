import axios from "axios";

const axiosUrl = axios.create({
    baseURL: "http://localhost:8000"
});

export default axiosUrl;