import style from './Agendamento.module.scss';
import Tabela from './Tabela';
import SelecionarServicos from './SelecionarServicos';
import Horarios from './Horarios'
import { InputDate } from '../../common/Inputs/InputDate'
import { Button } from '../../common/Button.style'
import { useState } from 'react';
import { getAgendasColaboradores } from '../../../connection/ManterSolicitacoes';

function Agendamento({
    cliente,
    animalSelecionado,
    solicitacao,
    setSolicitacao,
    colaboradores,
    setColaboradores,
    servicos, ...props }) {

    

    const [selecionarServicosIsOpen, setSelecionarServicosIsOpen] = useState(false);
    function closeSelecionarServicos() {
        setSelecionarServicosIsOpen(false);
    }
    function openSelecionarServicos() {
        setSelecionarServicosIsOpen(true);
    }

    function atualizarData(novaData) {
        const newSolicitacao = {...solicitacao};
        newSolicitacao.data = novaData;

        // Reset de atributos
        newSolicitacao.horaInicio = '';
        newSolicitacao.horaTermino = '';

        // get colaboradores
        getAgendasColaboradores(novaData)
            .then((res) => res.data)
            .then((data) => setColaboradores([...data.colaboradores]))
            .catch((error) => console.log(error));

        setSolicitacao(newSolicitacao); 
    }

    function selecionaServicos() {
        openSelecionarServicos();
    }

    return (
        <div>
            <p>{cliente.nome} | {animalSelecionado.nome} - {animalSelecionado.especie} - {animalSelecionado.porte}</p>
            <hr />
            <div className={style.row}>
                <InputDate
                    label={'Data:'}
                    value={solicitacao.data}
                    onChange={e => atualizarData(e.target.value)}
                />
                <Button onClick={selecionaServicos}>Selecionar serviços</Button>
            </div>
            <Tabela 
                solicitacao={solicitacao}
                setSolicitacao={setSolicitacao}
                colaboradores={colaboradores}
                setColaboradores={setColaboradores}
            />
            <SelecionarServicos 
                isOpen={selecionarServicosIsOpen}
                closeModal={closeSelecionarServicos}
                setSolicitacao={setSolicitacao}
                solicitacao={solicitacao}
                execucoes={solicitacao.execucoes}
                colaboradores={colaboradores}
                setColaboradores={setColaboradores}
            />
            {/* <Horarios /> */}
        </div>
    );
}

export default Agendamento;