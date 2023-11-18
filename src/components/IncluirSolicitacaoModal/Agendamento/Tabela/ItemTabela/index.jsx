import SelectColaborador from "./SelectColaborador";
import { useState } from "react";
import Horarios from "../../Horarios";
import { Button } from "../../../../common/Button.style";
import desagendar from "../../../../../utils/desagendar";


function ItemTabela({
    execucao,
    colaboradores,
    solicitacao,
    setSolicitacao,
    setColaboradores,
    servicos, 
}) {



    const [colaboradorSelecionado, setColaboradorSelecionado] = useState();

    const [horariosIsOpen, setHorariosIsOpen] = useState(false);
    function openHorarios() { setHorariosIsOpen(true) }
    function closeHorarios() { setHorariosIsOpen(false) }

    function renderSelectColaborador() {
        if (!!colaboradores) {
            return <SelectColaborador
                execucao={execucao}
                colaboradores={colaboradores}
                idServico={execucao.idServico}
                selecionarHorario={selecionarHorario}
            />
        }
    }

    function renderHorarios() {
        if (!!colaboradorSelecionado) {
            return <Button onClick={openHorarios}>Selecione um horário</Button>
        }
    }

    function selecionarHorario(idColaborador, idServicos) {
        const colaborador = colaboradores.find((colab) => {
            return colab.idColaborador == idColaborador
        })
        setColaboradorSelecionado(colaborador);
        
        desagendar(execucao.idExecucao, setSolicitacao, setColaboradores, colaboradores, solicitacao);

        //idEspecialidade
        const especialidade = colaborador.especialidades.find((esp) => esp.idServicos === idServicos);

        setSolicitacao((prevSolicitacao) => {
            const newSolicitacao = {...prevSolicitacao};
            const indexExecucao = newSolicitacao.execucoes.findIndex((exec) => exec.idExecucao === execucao.idExecucao);
            newSolicitacao.execucoes[indexExecucao].nomeColaborador = colaborador.nomeColaborador;
            newSolicitacao.execucoes[indexExecucao].idColaborador = colaborador.idColaborador;
            newSolicitacao.execucoes[indexExecucao].idEspecialidade = especialidade.idEspecialidade;
            
            console.log(newSolicitacao)
            return newSolicitacao;
        })


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
            <td></td>
            <td></td>
            <td></td>

            <Horarios
                isOpen={horariosIsOpen}
                closeModal={closeHorarios}
                solicitacao={solicitacao}
                setSolicitacao={setSolicitacao}
                colaborador={colaboradorSelecionado}
                colaboradores={colaboradores}
                setColaboradores={setColaboradores}
                execucoes={solicitacao.execucoes}
                execucao={execucao}
            />
        </tr>
    );
}

export default ItemTabela;