import style from './Agendamento.module.scss';
import Tabela from './Tabela';
import SelecionarServicos from './SelecionarServicos';
import Horarios from './Horarios'

function Agendamento() {
    return (
        <div>
            <p>{"Guilherme R."} | {"Lolla - Cão - P"}</p>
            <hr />
            <Tabela></Tabela>
            <SelecionarServicos />
            {/* <Horarios /> */}
        </div>
    );
}

export default Agendamento;