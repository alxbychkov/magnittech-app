import axios from "axios";

const instance = axios.create({
    baseURL: 'https://magnit-tech-server.herokuapp.com/'
});

export default instance;