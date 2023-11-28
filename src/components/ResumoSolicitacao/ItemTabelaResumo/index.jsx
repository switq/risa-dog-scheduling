import { rangeAgenda } from '../../../utils/conversoesAgenda';
import style from './ItemTabelaResumo.module.scss'

function ItemTabelaResumo({
    execucao,
}) {
    const {
        nomeServico: servico,
        nomeColaborador: colaborador,
        agendaExecucao: agenda,
        total
    } = execucao;

    const renderHora = () => {
        const { inicio, termino } = rangeAgenda(agenda);
        return `${inicio} - ${termino}`
    }

    return (
        <tr className={style.itemTabela}>
            <td>{servico}</td>
            <td>{colaborador}</td>
            <td className={style.hora}>{renderHora()}</td>
            <td className={style.campoPreco}>{total.toFixed(2)}</td>
        </tr>
    );
}

export default ItemTabelaResumo;