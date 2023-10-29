import { createContext } from "react";

const IncluirClienteContext = createContext({
    nome: "gui",
    email: "",
    cpf: "11111111111",
    dtNasc: "",
    tel1: "33",
    tel2: "",
    cep: "111111111",
    logradouro: "",
    numeroRes: "4",
    bairro: "",
    localidade: "",
    uf: "",
    animais: [],
});

export default IncluirClienteContext;