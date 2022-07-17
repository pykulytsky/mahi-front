import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
})


const getAuthToken = () => {
    let token =  localStorage.getItem('token')
    if (token) {
        token = 'Bearer ' + token
    }

    return token
}

http.interceptors.request.use(config => {
    config.headers['Authorization'] = getAuthToken()
    return config
})


export default http;
