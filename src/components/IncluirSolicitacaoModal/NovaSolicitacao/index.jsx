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

    useEffect(() => {
        console.log(animalSelecionado)
    }, [animalSelecionado])

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
                // inclusao={true}
                />

        }
    }

    function changeIncluirReset() {
        switch (clienteIsSetted) {
            case 0:
                return <span
                    className={style.addPerson}
                    onClick={openIncluirCliente}
                ><PersonAdd /></span>
            case 1:
                return <span
                    className={style.addPerson}
                    onClick={searchReset}
                >X</span>
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
        const idCliente = user.idCliente;
        setBusca(user.nome)
        getAnimaisCliente(idCliente)
            .then((response) => JSON.parse(response.request.response))
            .then((json) => {
                const clienteNovo = { ...user, animais: [...json] };
                console.log(clienteNovo);
                setCliente(clienteNovo)
                setClienteIsSetted(1);
            })
            .catch((erro) => console.log(erro))

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