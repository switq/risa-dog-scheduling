import style from './HoraCard.module.scss'

function HoraCard({hora, ativo}) {
    return ( 
        <div className={style.horaContainer}>
            {hora}
        </div>
     );
}

export default HoraCard;