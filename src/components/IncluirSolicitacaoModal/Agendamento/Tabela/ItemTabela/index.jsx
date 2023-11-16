import SelectColaborador from "./SelectColaborador";
import { useState } from "react";
import Horarios from "../../Horarios";
import { Button } from "../../../../common/Button.style";


function ItemTabela({
    execucao,
    colaboradores,
    solicitacao,
    servicos,
    selecionarHorario }) {



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

    function selecionarHorario(idColaborador, idServico) {
        const colaborador = colaboradores.find((colab) => {
            return colab.idColaborador == idColaborador
        })
        setColaboradorSelecionado(colaborador)
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
                colaborador={colaboradorSelecionado}
                execucoes={solicitacao.execucoes}
            />
        </tr>
    );
}

export default ItemTabela;