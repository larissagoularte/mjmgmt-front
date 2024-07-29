import axios from 'axios';


const instance = axios.create({
    //baseURL: 'http://192.168.1.157:9000/',
    baseURL: 'https://mjmgmt-back.onrender.com/',
    //baseURL: 'https://mjmgmt-api.vercel.app/',
    withCredentials: true,
});

export default instance;