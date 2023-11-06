import { InputSearch } from "../../common/Inputs/InputSearch";
import { PersonAdd } from "../../../assets/icons/personAdd";
import { useState } from "react";
import style from "./NovaSolicitacao.module.scss";
import SearchList from "./SearchList";
import IncluirAnimais from "../../IncluirClienteModal/IncluirAnimais";
import IncluirClienteModal from "../../IncluirClienteModal";
import { getClientesFiltrados } from "../../../connection/ManterClienteAnimais";


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
    const clientesFiltrados = listaClientes.filter(user => user.nome.toLowerCase().includes(busca.toLowerCase()));

    async function requisitarClientes(textoBusca) {
        const response = await getClientesFiltrados(textoBusca);
        setListaClientes(response);
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
                    label={"Consultar cliente"}
                    onChange={e => {
                        const textoBusca = e.target.value;
                        setBusca(textoBusca);
                        if (textoBusca.length > 1) {
                            requisitarClientes(textoBusca);
                        } else {
                            setListaClientes([]);
                        }
                    }}
                />
                <span 
                    className={style.addPerson}
                    onClick={openIncluirCliente}
                ><PersonAdd /></span>
            </div>

            <hr className={style.divisao}/>

            <SearchList users={clientesFiltrados} setBusca={setBusca}/>

            {/* <IncluirAnimais
                selecionado={animalSelecionado}
                setSelecionado={setAnimalSelecionado} 
                cliente={cliente} 
                setCliente={setCliente}
            /> */}
        </div>
    );
}

export default NovaSolicitacao;