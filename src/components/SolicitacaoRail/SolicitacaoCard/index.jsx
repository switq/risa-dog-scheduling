import styled from "styled-components";
import { Settings } from "../../../assets/icons/settings";
import style from './SolicitacaoCard.module.scss'


function SolicitacaoCard({solicitacaoo}) {
    const solicitacao = {
        cliente: 'Luana',
        animal:  'Marvin',
        servicos: ['banho', 'tosa'],
        horaInicio: '9:00',
        horaTermino: '9:30',
        status: 'T',
    }

    const {cliente, animal, servicos, horaInicio, horaTermino, status} = solicitacao;
    
    const CardContainer = styled.div`
        background-color: ${(props) => {
            if(props.status === 'P') return `var(--magenta)`;
            if(props.status === 'T') return `var(--verde)`;
            if(props.status === 'C') return `var(--vermelho)`;
        }};
    `

    return ( 
        <CardContainer status={status} className={style.cardContainer}>
            <div className={style.col}>
                <div>{horaInicio} - {horaTermino}</div>
                <div>
                    <h3>{cliente}</h3>
                    <p>{animal}</p>
                </div>
                <div>
                    {servicos.map((servico, index) => (
                        <>
                            {index !== 0 ? <span>{'+'}</span> : ''}
                            <span key={index}>{servico}</span>
                        </>
                    ))}
                </div>
            </div>
            
            <div className={style.col2}>
                <div>
                    <span><Settings /></span>
                </div>
            </div>
        </CardContainer>
     );
}

export default SolicitacaoCard;