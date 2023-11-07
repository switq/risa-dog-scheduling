import { InputSearch } from "../../common/Inputs/InputSearch";
import { PersonAdd } from "../../../assets/icons/personAdd";
import { useEffect, useState } from "react";
import style from "./NovaSolicitacao.module.scss";
import SearchList from "./SearchList";
import IncluirAnimais from "../../IncluirClienteModal/IncluirAnimais";
import IncluirClienteModal from "../../IncluirClienteModal";
import { getAnimais, getAnimaisCliente, getClientesFiltrados } from "../../../connection/ManterClienteAnimais";


function NovaSolicitacao() {
    const [incluirClienteIsOpen, setIncluirClienteIsOpen] = useState(false);
    const openIncluirCliente = () => {
        setIncluirClienteIsOpen(true);
    }
    const closeIncluirCliente = () => {
        setIncluirClienteIsOpen(false);
    }

    const [busca, setBusca] = useState('');
    const [listaClientes, setListaClientes] = useState([]);
    const [cliente, setCliente] = useState();
    const [clienteIsSetted, setClienteIsSetted] = useState(0);
    const [animalSelecionado, setAnimalSelecionado] = useState();

  
    function changeClienteSelect() {
        switch (clienteIsSetted) {
            case 0:
                return <SearchList users={listaClientes} setCliente={selecionarCliente} />;
            case 1:
                console.log(cliente)
                return <IncluirAnimais
                    selecionado={animalSelecionado}
                    setSelecionado={setAnimalSelecionado}
                    cliente={cliente}
                    setCliente={selecionarCliente}
                />

        }
    }
    

    function selecionarCliente(user) {
        // setClienteIsSetted(1);
        const idCliente = user.idCliente
        getAnimaisCliente(idCliente)
            .then((response) => JSON.parse(response.request.response))
            .then((json) => {
                console.log(json);
            })
    }

    const handleChange = (value) => {
        setBusca(value);
        getClientesFiltrados(value)
            .then((response) => JSON.parse(response.request.response))
            .then((json) => {
                const results = json.filter((user) => {
                    return (
                        value &&
                        user &&
                        user.nome &&
                        user.nome.toLowerCase().includes(value.toLowerCase())
                    );
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
                <span
                    className={style.addPerson}
                    onClick={openIncluirCliente}
                ><PersonAdd /></span>
            </div>

            <hr className={style.divisao} />

            {changeClienteSelect()}


        </div>
    );
}

export default NovaSolicitacao;