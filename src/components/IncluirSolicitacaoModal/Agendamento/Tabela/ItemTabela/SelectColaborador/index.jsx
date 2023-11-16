import { useState } from "react";

function SelectColaborador({ idServico, colaboradores, selecionarHorario, setColaboradores }) {

    const [colaboradorSelecionado, setColaboradorSelecionado] = useState();

    function colaboradorExecuteServico(colaborador, idServico) {
        let flag = false
        colaborador.especialidades.forEach((esp) => {
            if (esp.idServicos == idServico) {
                flag = true;
            };
        })
        return flag;
    }

    return (
        <select
            value={colaboradorSelecionado}
            onChange={e => {
                setColaboradorSelecionado(e.target.value)
                selecionarHorario(e.target.value, idServico);
            }
            }>
            <option value="" selected disabled hidden>Selecione um colaborador</option>
            {colaboradores.map((colaborador, index) => {
                if (colaboradorExecuteServico(colaborador, idServico))
                    return (
                        <option
                            key={index}
                            value={colaborador.idColaborador}
                        >
                            {colaborador.nomeColaborador}
                        </option>
                    )
            })}
        </select>
    );
}

export default SelectColaborador;