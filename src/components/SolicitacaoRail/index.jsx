import { useState, useEffect } from "react";
import ItemCronograma from "./SolicitacaoCard/ItemCronograma";
import style from './SolicitacaoRail.module.scss'



function SolicitacaoRail({
    listaSolicitacoes = [],
    openResumo,
}) {

    const [cronograma, setCronograma] = useState();

    function gerarCronogramaBase(listaSol) {
    const cronogramaBase = []
    for (let i = 9; i < 20; i++) {
        cronogramaBase.push({
            horario: i < 10 ? `0${i}:00` : `${i}:00`,
            solicitacoes: [],
        })
    }
    console.log(listaSol)

    cronogramaBase.forEach(cron => {
        cron.solicitacoes = listaSol.filter(soli => {
            let dtInicio = `${soli.horaInicio}`;
            dtInicio = dtInicio.slice(0,5);
            return dtInicio === cron.horario;
        })
    })

    return [...cronogramaBase];
}

    useEffect(() => {
        const newCronograma = gerarCronogramaBase(listaSolicitacoes);
        console.log('crono');
        console.log(newCronograma);

        setCronograma(newCronograma);
    }, [listaSolicitacoes]);

    function renderCronograma() {
        if(!cronograma) return '';
        return (
            cronograma.map((cron => {
                return (
                    <ItemCronograma
                        agenda={cron}
                        openResumo={openResumo}
                    />
                )
            }))
        )
    }

    return (
        <ul className={style.lista}>
            {renderCronograma()}
        </ul>
    );
}

export default SolicitacaoRail;