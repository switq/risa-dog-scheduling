import { InputSearch } from "../../common/Inputs/InputSearch";
import { PersonAdd } from "../../../assets/icons/personAdd";
import { useState } from "react";
import style from "./NovaSolicitacao.module.scss";
import SearchList from "./SearchList";
import IncluirAnimais from "../../IncluirClienteModal/IncluirAnimais";

const clientes = [
    { nome: "Guilherme Rodrigo", cpf: '00000000007', animais: [
        {id: 1, nome: "Lolla", especie: 'Cão'},
        {id: 2, nome: "Mel", especie: "Cão"},
    ], },
    { nome: "Luan Limão", cpf: '00000000003' },
    { nome: "Luana Beluga", cpf: '00000000001' },
    { nome: "Wanderlay Mosquinha", cpf: '00000000002' },
    { nome: "Diogo Suado", cpf: '00000000009' },
]

function NovaSolicitacao() {
    
    const [busca, setBusca] = useState('');
    const users = clientes.filter(user => user.nome.toLowerCase().includes(busca.toLowerCase()))

    const [cliente, setCliente] = useState(clientes[0]);

    const [animalSelecionado, setAnimalSelecionado] = useState({});

    return (
        <div>
            <div className={style.busca}>
                <InputSearch
                    value={busca}
                    label={"Consultar cliente"}
                    onChange={e => {
                        setBusca(e.target.value);
                    }}
                />
                <span className={style.addPerson}><PersonAdd /></span>
            </div>

            <hr className={style.divisao}/>

            {/* <SearchList users={users} setBusca={setBusca}/> */}
            <IncluirAnimais
                selecionado={animalSelecionado}
                setSelecionado={setAnimalSelecionado} 
                cliente={cliente} 
                setCliente={setCliente}
            />
        </div>
    );
}

export default NovaSolicitacao;