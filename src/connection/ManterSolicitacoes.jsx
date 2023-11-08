import axios from "axios";

export function getServicos() {
    return axios.get("https://risa-dog.onrender.com/servicos/");
}

export function getAgendasColaboradores(data) {
    return axios.get(``)
}