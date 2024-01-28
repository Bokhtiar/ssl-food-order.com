import axios from "axios";
import { getToken } from "../utils/helper";

const apiUrl = "http://localhost:8000/api/";

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

const publicRequest = axios.create({
    baseURL: apiUrl,
});

const privateRequest = axios.create({
    baseURL: apiUrl,
});

/* Public request config */
publicRequest.interceptors.request.use(
    async (config) => {
        if (config.headers === undefined) {
            config.headers = {};
        }
        return config;
    },
    (err) => {
        console.log(err);
        Promise.reject(err);
    }
);

/* Private request config */
privateRequest.interceptors.request.use(
    async (config) => {
        const token = getToken();
        if (config.headers === undefined) {
            config.headers = {};
        }
        if (token) {
            config.headers["Authorization"] = "Bearer " + token || "";
        }

       
            //config.headers['Content-Type'] = 'multipart/form-data';
 

        

        return config;
    },
    (err) => {
        console.log(err);
        Promise.reject(err);
    }
);

export { publicRequest, privateRequest };
