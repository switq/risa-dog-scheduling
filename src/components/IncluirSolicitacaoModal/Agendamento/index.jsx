import style from './Agendamento.module.scss';
import Tabela from './Tabela';
import SelecionarServicos from './SelecionarServicos';
import { v4 as uuid4 } from 'uuid';
import { InputDate } from '../../common/Inputs/InputDate'
import InputDesconto from '../../common/Inputs/InputDesconto';
import { HourDisplay } from '../../common/HourDisplay';
import { Button } from '../../common/Button.style'
import { useEffect, useState } from 'react';
import { getAgendasColaboradores, getAgendasColaboradoresComId } from '../../../connection/ManterSolicitacoes';
import _ from 'lodash';
import { rangeAgenda } from '../../../utils/conversoesAgenda';
import React from 'react';
import Spinner from '@atlaskit/spinner';


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
    
    const [isLoading, setIsLoading] = useState();

    const dtAtual = new Date();

    function closeSelecionarServicos() {
        setSelecionarServicosIsOpen(false);
    }

    function openSelecionarServicos() {
        setSelecionarServicosIsOpen(true);
    }

    async function atualizarData(novaData) {
        setIsLoading(true);
        // get colaboradores
        if (new Date(novaData) < dtAtual) {
            setIsLoading(false);
            return
        }

        if (!solicitacao.idSolicitacao) {
            getAgendasColaboradores(novaData)
                .then((res) => res.data)
                .then((data) => {
                    setColaboradores([...data.colaboradores])
                })
                .catch((error) => console.log(error));            
        } else {
            getAgendasColaboradoresComId(solicitacao.idSolicitacao, novaData)
                .then((res) => res.data)
                .then((data) => {
                    setColaboradores([...data.colaboradores])
                })
                .catch((error) => console.log(error));
        }


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
        setIsLoading(false);
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

        setSolicitacao(newSolicitacao);
    }

    function removerExecucoes(listaServicos) {
        const execucoes = _.cloneDeep(solicitacao.execucoes);
        const newExecucoes = execucoes.filter(exec => !listaServicos.includes(exec.idServico))

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

    function handleChangeDesconto(valor) {
        
        let desc = valor ? parseFloat(valor) : 0;

        if (desc > 1 || desc < 0) return;

        if (desc === NaN) return;

        const newSolicitacao = _.cloneDeep(solicitacao);
        newSolicitacao.desconto = desc;
        setSolicitacao(newSolicitacao);
    }


    return (
        <div className={style.container}>
            <p>{solicitacao.nomeCliente} | {solicitacao.nomeAnimal} - {solicitacao.especie} - {solicitacao.porte}</p>
            <hr />

            <div className={style.row}>
                <div className={style.dataSelector}>
                    <InputDate
                        label={'Data:'}
                        value={solicitacao.data}
                        onChange={e => atualizarData(e.target.value)}
                        min={`${dtAtual.getFullYear()}-${dtAtual.getMonth() + 1}-${dtAtual.getDate()}`}
                    />
                    {isLoading ? <Spinner className={style.spin} size={'medium'} /> : ''}
                </div>

                <HourDisplay 
                    label={'Hora inicio:'}
                    value={solicitacao.horaInicio}
                />

                <HourDisplay 
                    label={'Hora término:'}
                    value={solicitacao.horaTermino}
                />

                <Button onClick={selecionaServicos}>Selecionar serviços</Button>
            </div>

            <Tabela 
                solicitacao={solicitacao}
                setSolicitacao={setSolicitacao}
                colaboradores={colaboradores}
                servicos={servicos}
            />

            <div className={style.deconto}>
                <InputDesconto 
                    value={solicitacao.desconto}
                    onChange={handleChangeDesconto}
                />
            </div>

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