import axios from "axios";

export const api = axios.create({
baseURL:'https://nlwe-server.vercel.app'
});
