import axios from "axios";

export function incluirCliente(values) {
    return axios.post('https://risa-dog.onrender.com/agendas/nova-solicitacao', values);
}

export function alterarCliente(values) {
    return axios.put(`https://risa-dog.onrender.com/agendas/cliente/${values.id}`, values);
}

export async function getClientesFiltrados(textoBusca) {
    try {
        const response = await axios.get(`https://risa-dog.onrender.com/agendas/cliente?valor=${textoBusca}`);
        return await JSON.parse(response.request.response);
    } catch (error) {
        console.log(error);
        
        return false;
    }


}