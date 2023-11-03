import style from './ServicoCard.module.scss'

function ServicoCard({texto, path, ativo, onClick=''}) {
    return ( 
        <div className={style.cardContainer}>
            <img src={path} alt={texto} />
            <p>{texto}</p>
        </div>
     );
}

export default ServicoCard;