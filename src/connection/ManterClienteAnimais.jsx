import axios from "axios";

export function incluirCliente(values) {
    return axios.post('https://risa-dog.onrender.com/agendas/nova-solicitacao', values);
}

export function alterarCliente(values) {
    return axios.put(`https://risa-dog.onrender.com/agendas/cliente/${values.id}`, values);
}

export function getClientesFiltrados(textoBusca) {
    return axios.get(`https://risa-dog.onrender.com/agendas/cliente?valor=${textoBusca}`);
}

export function getAnimaisCliente(idCliente) {
    return axios.get(`https://risa-dog.onrender.com/agendas/cliente/animais/${idCliente}`);
    
}