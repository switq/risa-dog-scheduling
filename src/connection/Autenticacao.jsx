import axios from "axios"

export function loginPost(values) {
    return axios.post(`https://risa-dog.onrender.com/login`, values);
}