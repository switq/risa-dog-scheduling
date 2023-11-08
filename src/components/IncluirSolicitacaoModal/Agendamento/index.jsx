import style from './Agendamento.module.scss';
import Tabela from './Tabela';
import SelecionarServicos from './SelecionarServicos';
import Horarios from './Horarios'
import { InputDate } from '../../common/Inputs/InputDate'

function Agendamento({
    cliente,
    animalSelecionado,
    solicitacao,
    setSolicitacao,
    colaboradores,
    setColaboradores,
    servicos, ...props }) {


    function atualizarData(novaData) {
        const newSolicitacao = {...solicitacao};
        newSolicitacao.data = novaData;

        // Reset de atributos
        newSolicitacao.horaInicio = '';
        newSolicitacao.horaTermino = '';

        setSolicitacao(newSolicitacao);

        
    }


    return (
        <div>
            <p>{cliente.nome} | {animalSelecionado.nome} - {animalSelecionado.especie} - {animalSelecionado.porte}</p>
            <hr />
            <div>
                <InputDate
                    label={'Data:'}
                    value={solicitacao.data}
                    onChange={e => atualizarData(e.target.value)}
                />
            </div>
            <Tabela />
            <SelecionarServicos />
            {/* <Horarios /> */}
        </div>
    );
}

export default Agendamento;