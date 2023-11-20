import { useState } from "react"
import style from './SelectColaborador.module.scss'

function SelectColaborador({
    execucao,
    colaboradores,
    selecionarColaborador,
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

    function handleChange(idColaborador) {
        setColaboradorSelecionado(idColaborador);
        selecionarColaborador(idColaborador);
    }

    return (
        <select
            defaultValue=""
            value={colaboradorSelecionado}
            onChange={e => handleChange(e.target.value)}
            className={style.select}
        >
            <option value="" disabled hidden>Selecione um colaborador</option>
            
            {colaboradores.map((colaborador, index) => {
                if (colaboradorExecuteServico(colaborador, execucao.idServico))
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