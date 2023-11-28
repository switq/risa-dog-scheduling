import styled from "styled-components";
import { Settings } from "../../../assets/icons/settings";
import style from './SolicitacaoCard.module.scss'

const CardContainer = styled.div`
        background-color: ${(props) => {
        if (props.status[0] === 'P') return `var(--magenta)`;
        if (props.status[0] === 'F') return `var(--verde)`;
        if (props.status[0] === 'C') return `var(--vermelho)`;
    }};
    `

function SolicitacaoCard({
    solicitacao,
    openResumo,
}) {
    

    const {nomeCliente, nomeAnimal, execucoes, horaInicio, horaTermino, status} = solicitacao;

    return ( 
        <CardContainer status={status} className={style.cardContainer}>
            <div className={style.col}>
                <div className={style.horario}>{horaInicio.slice(0, 5)} - {horaTermino.slice(0, 5)}</div>
            </div>
            
            <div className={style.row}>
                <div>
                    <h3>{nomeCliente.slice(0, 17)}</h3>
                    <p>{nomeAnimal.slice(0, 20)}</p>
                </div>
                <div>
                    <span onClick={e => openResumo(solicitacao)}><Settings /></span>
                </div>
            </div>
            <div>
                {execucoes.map((exec, index) => (
                    <>
                        {index !== 0 ? <span>{' + '}</span> : ''}
                        <span className={style.listaServ} key={index}>{exec.nomeServico}</span>
                    </>
                ))}
            </div>
            <div>

            </div>
        </CardContainer>
     );
}

export default SolicitacaoCard;