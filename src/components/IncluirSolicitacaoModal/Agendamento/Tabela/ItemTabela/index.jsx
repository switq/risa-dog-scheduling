import SelectColaborador from "./SelectColaborador";
import { useState, useEffect } from "react";
import Horarios from "../../Horarios";
import { Button } from "../../../../common/Button.style";
import _ from 'lodash'
import { rangeAgenda } from "../../../../../utils/conversoesAgenda";
import InputMoney from "../../../../common/Inputs/InputMoney";
import style from './ItemTabela.module.scss'
import { onChangeMoney } from "../../../../../utils/onChangeInputs";


const agendaZerada = '00000000000000000000000000000000000000000000';

function ItemTabela({
    execucao,
    colaboradores,
    solicitacao,
    setSolicitacao,
    servicos,
}) {

    const [colaboradorSelecionado, setColaboradorSelecionado] = useState();
    const [horariosIsOpen, setHorariosIsOpen] = useState(false);



    function openHorarios() {
        setHorariosIsOpen(true)
    }

    function closeHorarios() { setHorariosIsOpen(false) }

    function selecionarColaborador(idColaborador) {
        const idColaboradorConvertido = parseInt(idColaborador);
        const indexColaborador = colaboradores.findIndex((colab) => colab.idColaborador === idColaboradorConvertido);
        const colaborador = _.cloneDeep(colaboradores[indexColaborador]);

        if (indexColaborador === -1) return;

        const newExecucao = _.cloneDeep(execucao);

        newExecucao.idColaborador = idColaborador;
        newExecucao.nomeColaborador = colaborador.nomeColaborador;
        newExecucao.idEspecialidade = buscarIdEspecialidade(colaborador, execucao.idServico);
        newExecucao.agendaExecucao = agendaZerada;

        const newSolicitacao = _.cloneDeep(solicitacao);
        const indexExecucao = buscarIndexExecucao(newExecucao.idExecucao);
        newSolicitacao.execucoes[indexExecucao] = newExecucao;

        setSolicitacao(newSolicitacao);
        setColaboradorSelecionado(colaborador);
    }

    function buscarIndexExecucao(idExecucao) {
        const indexExecucao = solicitacao.execucoes.findIndex(
            exec => exec.idExecucao === idExecucao
        )
        return indexExecucao;
    }

    function buscarIdEspecialidade(colaborador, idServico) {
        const especialidade = colaborador.especialidades.find(
            esp => esp.idServicos === idServico
        )
        return especialidade.idEspecialidade;
    }

    function agendarHorarios(newAgenda, horaInicio, horaTermino) {
        const newExecucao = _.cloneDeep(execucao);
        const indexExecucao = buscarIndexExecucao(newExecucao.idExecucao);
        newExecucao.agendaExecucao = newAgenda;

        const newSolicitacao = _.cloneDeep(solicitacao);
        newSolicitacao.execucoes[indexExecucao] = newExecucao;

        setSolicitacao(newSolicitacao);
    }

    function renderHorarios() {
        if (!colaboradorSelecionado && !execucao.idColaborador) return;

        return (
            <Button
                onClick={openHorarios}
                className={`${style.buttonSelect} ${verificarAgenda() ? '' : `${style.buttonSelectMarcado}`}`}
                $roxo={!verificarAgenda()}
            >
                {gerarInicioTermino()}
                
            </Button>
        )

    }

    const verificarAgenda = () => execucao.agendaExecucao === agendaZerada

    function gerarInicioTermino() {
        if (execucao.agendaExecucao === agendaZerada)
            return 'Selecione um horário';
        const {inicio, termino} = rangeAgenda(execucao.agendaExecucao);
        return `${inicio.slice(0, 5)} - ${termino.slice(0, 5)}`
    }

    function renderSelectColaborador() {
        if (!!colaboradores) {
            return <SelectColaborador
                execucao={execucao}
                colaboradores={colaboradores}
                selecionarColaborador={selecionarColaborador}
            />
        }
    }

    function renderPreco() {
        const porte = solicitacao.porte;
        let preco = precoServico(porte);
        totalFirstRender(preco);

        return `${preco.toFixed(2)}`;
    }

    function precoServico(porte) {
        const servico = servicos.find(serv => serv.idServicos === execucao.idServico);
        let preco;
        if (porte == 'P') preco = servico.preco_p;
        if (porte == 'M') preco = servico.preco_m;
        if (porte == 'G') preco = servico.preco_g;

        preco = parseFloat(preco);

        return preco;
    }

    function onChangeAdicional(valor) {
        let preco = onChangeMoney(valor);

        if (preco > 9999.99 || preco < 0) return;

        const newExecucao = _.cloneDeep(execucao);
        const indexExecucao = buscarIndexExecucao(newExecucao.idExecucao);
        newExecucao.adicional = preco;

        const newSolicitacao = _.cloneDeep(solicitacao);
        newSolicitacao.execucoes[indexExecucao] = newExecucao;

        setSolicitacao(newSolicitacao);
    }

    function renderTotal() {
        const newExecucao = _.cloneDeep(execucao);
        const indexExecucao = buscarIndexExecucao(newExecucao.idExecucao);

        const vlrServico = precoServico(solicitacao.porte);
        const vlrAdicional = newExecucao.adicional;
        const vlrTotal = (vlrServico ? vlrServico : 0) + (vlrAdicional ? vlrAdicional : 0)

        newExecucao.total = vlrTotal;

        const newSolicitacao = _.cloneDeep(solicitacao);
        newSolicitacao.execucoes[indexExecucao] = newExecucao;

        setSolicitacao(newSolicitacao);
    }

    function totalFirstRender(valor) {
        if (!!execucao.total) return;

        const newExecucao = _.cloneDeep(execucao);
        const indexExecucao = buscarIndexExecucao(newExecucao.idExecucao);

        newExecucao.total = valor;
        newExecucao.preco = valor;

        const newSolicitacao = _.cloneDeep(solicitacao);
        newSolicitacao.execucoes[indexExecucao] = newExecucao;

        setSolicitacao(newSolicitacao);
    }

    function montarAgenda() {
        const execucoes = _.cloneDeep(solicitacao.execucoes);
        const agendas = execucoes.map(exec => exec.agendaExecucao);

        let agenda = '';

        for (let i = 0; i < 44; i++) {
            const hors = agendas.map(ag => ag[i]);
            if (hors.includes('1'))
                agenda += '1';
            else
                agenda += '0';
        }

        return agenda;
    }

    function atualizarHorariosSolicitacao() {
        const agendaGeral = montarAgenda();
        const { inicio, termino } = rangeAgenda(agendaGeral);

        const newSolicitacao = _.cloneDeep(solicitacao);
        newSolicitacao.horaInicio = inicio;
        newSolicitacao.horaTermino = termino;

        setSolicitacao(newSolicitacao)
    }

    useEffect(() => {
        atualizarHorariosSolicitacao();
    }, [execucao.agendaExecucao])

    useEffect(() => {
        renderTotal();
    }, [execucao.adicional]);

    
    return (
        <tr className={style.itemTabela}>
            <td>{execucao.nomeServico}</td>
            <td>
                {renderSelectColaborador()}
            </td>
            <td>
                {renderHorarios()}
            </td>
            <td className={`${style.campoPreco}`}>
                {renderPreco()}
            </td>
            <td>
                <InputMoney
                    value={execucao.adicional ? execucao.adicional.toFixed(2) : '0.00'}
                    onChange={onChangeAdicional}
                />
            </td>
            <td className={`${style.campoPreco}`}>
                {execucao.total ? parseFloat(execucao.total).toFixed(2) : '0.00'}
            </td>

            <Horarios
                isOpen={horariosIsOpen}
                closeModal={closeHorarios}
                execucao={execucao}
                execucoes={solicitacao.execucoes}
                agendarHorarios={agendarHorarios}
                colaboradores={colaboradores}
            />
        </tr>
    );
}

export default ItemTabela;