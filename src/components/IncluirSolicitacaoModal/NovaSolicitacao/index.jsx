import { InputSearch } from "../../common/Inputs/InputSearch";
import { PersonAdd } from "../../../assets/icons/personAdd";
import { PersonEdit } from "../../../assets/icons/personEdit";
import { Close } from "../../../assets/icons/close";
import { useEffect, useState } from "react";
import style from "./NovaSolicitacao.module.scss";
import SearchList from "./SearchList";
import IncluirAnimais from "../../IncluirClienteModal/IncluirAnimais";
import IncluirClienteModal from "../../IncluirClienteModal";
import { getAnimaisCliente, getClientesFiltrados } from "../../../connection/ManterClienteAnimais";
import _ from 'lodash'


let clienteAtivo;

function NovaSolicitacao({ cliente, setCliente, animalSelecionado, setAnimalSelecionado, isOpen,}) {

    const [incluirClienteIsOpen, setIncluirClienteIsOpen] = useState(false);
    const openIncluirCliente = () => {
        setIncluirClienteIsOpen(true);
    }
    const closeIncluirCliente = () => {
        setIncluirClienteIsOpen(false);
    }

    const [busca, setBusca] = useState('');
    const [listaClientes, setListaClientes] = useState([]);
    const [clienteIsSetted, setClienteIsSetted] = useState(0);

    const [isLoading, setIsLoading] = useState();

    function changeCampoCliente() {
        switch (clienteIsSetted) {
            case 0:
                return <SearchList
                    users={listaClientes}
                    setCliente={selecionarCliente}
                />;
            case 1:
                console.log(cliente)
                return <IncluirAnimais
                    selecionado={animalSelecionado}
                    setSelecionado={setAnimalSelecionado}
                    cliente={cliente}
                    setCliente={setCliente}
                    inclusao={true}
                    setAnimalSelecionado={setAnimalSelecionado}
                />

        }
    }

    function changeIncluirReset() {
        switch (clienteIsSetted) {
            case 0:
                return <span
                    className={style.addPerson}
                    onClick={openIncluirCliente}
                >
                    <PersonAdd />
                </span>
            case 1:
                return (
                    <>
                        <span
                            className={style.addPerson}
                            onClick={searchReset}
                        >
                            <Close />
                        </span>
                        <span
                            className={style.addPerson}
                            onClick={openIncluirCliente}
                        >
                            <PersonEdit />
                        </span>
                    </>
                )
        }
    }

    function searchReset() {
        setBusca('');
        setListaClientes([]);
        setAnimalSelecionado('');
        setCliente('');
        setClienteIsSetted(0);
    }

    function selecionarCliente(user) {
        searchReset();
        const idCliente = user.idCliente;

        setBusca(user.nome)
        getAnimaisCliente(idCliente)
            .then((response) => JSON.parse(response.request.response))
            .then((json) => {
                const clienteNovo = { ...user, animais: [...json] };
                setCliente(clienteNovo)
                setClienteIsSetted(1);
            })
            .catch((erro) => console.log(erro))

        clienteAtivo = { ...cliente }
    }

    const handleChange = (value) => {
        setBusca(value);
        

        getClientesFiltrados(value)
            .then((response) => JSON.parse(response.request.response))
            .then((json) => {
                const results = json.filter((user) => {
                    if (isNaN(busca)) {
                        return (
                            value &&
                            user &&
                            user.nome &&
                            user.nome.toLowerCase().includes(value.toLowerCase())
                        )
                    } else {
                        return (
                            value &&
                            user &&
                            user.cpf &&
                            user.cpf.includes(value)
                        )
                    };
                })
                setListaClientes(results);
            })
            .catch((erro) => '')
    }

    return (
        <div>

            <IncluirClienteModal
                isOpen={incluirClienteIsOpen}
                closeModal={closeIncluirCliente}
                dados={
                    clienteIsSetted === 1 ?
                        { ...cliente } :
                        {
                            idCliente: '',
                            nome: "",
                            email: "",
                            cpf: "",
                            dtNasc: "",
                            tel1: "",
                            tel2: "",
                            cep: "",
                            logradouro: "",
                            numeroRes: null,
                            bairro: "",
                            localidade: "",
                            uf: "",
                            complemento: '',
                            animais: [],
                        }
                }
            />

            <div className={style.busca}>
                <InputSearch
                    value={busca}
                    label={"Consultar cliente (nome ou cpf)"}
                    onChange={e => {
                        const textoBusca = e.target.value;
                        handleChange(textoBusca);
                    }}
                />

                {changeIncluirReset()}

            </div>

            <hr className={style.divisao} />

            {changeCampoCliente()}

        </div>
    );
}

export default NovaSolicitacao;