import axios from "axios";

const url = 'https://risa-dog.onrender.com'

export function getServicos() {
    return axios.get(`${url}/servicos/`);
}

export function getAgendasColaboradores(data) {
    return axios.get(`${url}/agendas/colaboradores?data=${data}`);
}

export function postSolicitacao(values) {
    return axios.post(`${url}/solicitacao/`, values);
}