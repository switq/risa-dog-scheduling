import SelectColaborador from "./SelectColaborador";
import { useState } from "react";
import Horarios from "../../Horarios";
import { Button } from "../../../../common/Button.style";
import _ from 'lodash'

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

    function buscarIdEspecialidade(colaborador, idServico){
        const especialidade = colaborador.especialidades.find(
            esp => esp.idServicos === idServico
        )
        return especialidade.idEspecialidade;
    }

    function agendarHorarios(newAgenda) {
        const newExecucao = _.cloneDeep(execucao);
        const indexExecucao = buscarIndexExecucao(newExecucao.idExecucao);
        newExecucao.agendaExecucao = newAgenda;

        const newSolicitacao = _.cloneDeep(solicitacao);
        newSolicitacao.execucoes[indexExecucao] = newExecucao;
        
        setSolicitacao(newSolicitacao);
    }

    function renderHorarios() {
        if (!colaboradorSelecionado) return;

        return <Button onClick={openHorarios}>Selecione um horário</Button>

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
        const servico = servicos.find(serv => serv.idServicos === execucao.idServico);
        console.log(servico)
        let preco;
        if (porte == 'P') preco = servico.preco_p;
        if (porte == 'M') preco = servico.preco_m;
        if (porte == 'G') preco = servico.preco_g;

        preco = parseInt(preco).toFixed(2);
        console.log(preco)

        return `${preco}`;
    }

    return (
        <tr>
            <td>{execucao.nomeServico}</td>
            <td>
                {renderSelectColaborador()}
            </td>
            <td>
                {renderHorarios()}
            </td>
            <td>
                {renderPreco()}
            </td>
            <td></td>
            <td></td>

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