
import axios from "axios";

const axiosClient = axios.create({
    baseURL : "https://leetclone-backend-12q5.onrender.com",
    withCredentials: true,
    headers :{
        'Content-Type' : "application/json"
    }
});

export default axiosClient;
