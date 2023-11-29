import axios from "axios";

const url = 'https://risa-dog.onrender.com'

export function getServicos() {
    return axios.get(`${url}/servicos/`);
}

export function getAgendasColaboradores(data) {
    return axios.get(`${url}/agendas/colaboradores?data=${data}`);
}
export function getAgendasColaboradoresComId(id, data) {
    return axios.get(`${url}/agendas/colaboradores/${id}?data=${data}`);
}

export function postSolicitacao(values) {
    return axios.post(`${url}/solicitacao/`, values);
}

export function getListaSolicitacao(data) {
    return axios.get(`${url}/execucoes?data=${data}`);
}

export function putSolicitacao(id, values) {
    return axios.put(`${url}/solicitacao/${id}`, values)
}