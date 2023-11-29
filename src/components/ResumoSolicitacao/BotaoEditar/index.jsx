import { Pen } from '../../../assets/icons/pen';
import style from './BotaoEditar.module.scss'

function BotaoEditar({
    onclick,
    ...props
}) {
    return (
        <button onClick={onclick} className={`${style.botao}`}>
            <span cla>{<Pen className={style.icon}/>}</span>
            <p>Editar</p>
        </button>
    );
}

export default BotaoEditar;