import { InputSearch } from "../../common/Inputs/Input";
import { PersonAdd } from "../../../assets/icons/personAdd";
import { useState } from "react";
import style from "./NovaSolicitacao.module.scss";
import SearchList from "./SearchList";

const clientes = [
    { nome: "Guilherme Rodrigo", cpf: '00000000007' },
    { nome: "Luan Limão", cpf: '00000000003' },
    { nome: "Luana Beluga", cpf: '00000000001' },
    { nome: "Wanderlay Mosquinha", cpf: '00000000002' },
    { nome: "Diogo Suado", cpf: '00000000009' },
]

function NovaSolicitacao() {
    
    const [busca, setBusca] = useState('');
    const users = clientes.filter(user => user.nome.toLowerCase().includes(busca.toLowerCase()))

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

            <SearchList users={users} setBusca={setBusca}/>
        </div>
    );
}

export default NovaSolicitacao;