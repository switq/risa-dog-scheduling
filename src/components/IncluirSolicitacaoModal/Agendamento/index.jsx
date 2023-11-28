import style from './Agendamento.module.scss';
import Tabela from './Tabela';
import SelecionarServicos from './SelecionarServicos';
import { v4 as uuid4 } from 'uuid';
import { InputDate } from '../../common/Inputs/InputDate'
import { Button } from '../../common/Button.style'
import { useState } from 'react';
import { getAgendasColaboradores } from '../../../connection/ManterSolicitacoes';
import _ from 'lodash'


const execucaoBase = {
    idServico: '',
    nomeServico: '',
    idExecucao: '',
    idColaborador: '',
    nomeColaborador: '',
    idEspecialidade: '',
    agendaExecucao: '00000000000000000000000000000000000000000000',
    preco: 0,
    adicional: 0,
}

const agendaZerada = '00000000000000000000000000000000000000000000'

function Agendamento({
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

    async function atualizarData(novaData) {
        // get colaboradores
        getAgendasColaboradores(novaData)
            .then((res) => res.data)
            .then((data) => {
                console.log(data); 
                setColaboradores([...data.colaboradores])
            })
            .catch((error) => console.log(error));

        const newSolicitacao = _.cloneDeep(solicitacao);
        newSolicitacao.data = novaData;

        // Reset de atributos
        newSolicitacao.horaInicio = '';
        newSolicitacao.horaTermino = '';
        const listaServicos = newSolicitacao.execucoes.map(
            exec => exec.idServico
        )
        newSolicitacao.execucoes = [];
        await setSolicitacao(newSolicitacao);
        newSolicitacao.execucoes = [...adicionarExecucoes(listaServicos)];
        await setSolicitacao(newSolicitacao);
    }

    function selecionaServicos() {
        openSelecionarServicos();
    }

    function alterarServicos(listaServicos) {
        const servicosJaAdicionados = solicitacao.execucoes.map((exec) => exec.idServico);
        const interseccao = listaServicos.filter((serv) => servicosJaAdicionados.includes(serv));
        const servicosNovos = listaServicos.filter(serv => !interseccao.includes(serv));
        const servicosRemover = servicosJaAdicionados.filter(serv => !interseccao.includes(serv));
        
        const execucoesServicosRemovidos = removerExecucoes(servicosRemover);
        const newExecucoes = [...execucoesServicosRemovidos, ...adicionarExecucoes(servicosNovos)];

        const newSolicitacao = _.cloneDeep(solicitacao);
        newSolicitacao.execucoes = [...newExecucoes]

        console.log(newSolicitacao.execucoes)
        setSolicitacao(newSolicitacao);
    }

    function removerExecucoes(listaServicos) {
        const execucoes = _.cloneDeep(solicitacao.execucoes);
        const newExecucoes = execucoes.filter(exec => !listaServicos.includes(exec.idServico))
        console.log(newExecucoes);

        return [...newExecucoes];
    }

    function adicionarExecucoes(listaServicos) {
        const informacoesServicos = servicos.filter(
            serv => listaServicos.includes(serv.idServicos)
        )
        const newExecucoes = informacoesServicos.map(infoS => {return {
            ...execucaoBase,
            idServico: infoS.idServicos,
            nomeServico: infoS.nome,
            idExecucao: uuid4()
        }})

        return [...newExecucoes];
    }

    return (
        <div>
            <p>{solicitacao.nomeCliente} | {solicitacao.nomeAnimal} - {solicitacao.especie} - {solicitacao.porte}</p>
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
                servicos={servicos}
            />
            <SelecionarServicos 
                isOpen={selecionarServicosIsOpen}
                closeModal={closeSelecionarServicos}
                alterarServicos={alterarServicos}
                execucoes={solicitacao.execucoes}
            />
        </div>
    );
}

export default Agendamento;