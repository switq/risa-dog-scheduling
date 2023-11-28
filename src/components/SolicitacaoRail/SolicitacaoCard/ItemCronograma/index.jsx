import SolicitacaoCard from '..';
import style from './ItemCronograma.module.scss'

function ItemCronograma({
    agenda,
    openResumo,
}) {

    return (
        <li className={style.trilho}>
            <div className={style.labelTrilho}>{agenda.horario}</div>
            <section className={style.cardContainer}>
                {agenda.solicitacoes.map(sol => {
                    return (
                        <SolicitacaoCard
                            solicitacao={sol}
                            openResumo={openResumo}
                        />
                    )
                })}
            </section>
        </li>
    );
}

export default ItemCronograma;