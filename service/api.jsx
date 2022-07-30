import axios from "axios";

const api = axios.create({
  baseURL: 'https://api-desafio-aec1.fly.dev/api/'
});

export default api;