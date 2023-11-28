import style from './BotaoStatus.module.scss'
import { Close } from '../../../assets/icons/close';
import { Check } from '../../../assets/icons/check';

function BotaoStatus({
    status,
    onclick,
    ...props
}) {
    return (
        <button onClick={e => onclick(status)} className={`${style.botao} ${status === 'F' ? style.verde : style.vermelho}`}>
            <span>{status === 'F' ? <Check className={style.icon} /> : <Close className={style.icon}/>}</span>
            <p>{status === 'F' ? 'Concluir' : 'Cancelar'}</p>
        </button>
    );
}

export default BotaoStatus;