import { useState } from "react";

function SelectColaborador({ 
    idServico, 
    colaboradores, 
    selecionarHorario, 
    setColaboradores 
}) {

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
            defaultValue=""
            value={colaboradorSelecionado}
            onChange={e => {
                const idColaborador = e.target.value;
                setColaboradorSelecionado(idColaborador)
                
                selecionarHorario(idColaborador, idServico);
            }
            }>
            <option value="" disabled hidden>Selecione um colaborador</option>
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