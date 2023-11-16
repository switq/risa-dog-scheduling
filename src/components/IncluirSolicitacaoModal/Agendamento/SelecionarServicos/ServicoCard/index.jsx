import styled from 'styled-components';
import style from './ServicoCard.module.scss'

const CardContainer = styled.div`
    ${(props) => {
        if(props.ativo) return `
            background-color: var(--magenta);
            color: var(--light);
            &:hover {
                background-color: var(--magenta02);
            }
            `
            else return `
            background-color: var(--roxo03);
            color: var(--dark);
            &:hover {
                background-color: var(--roxo04);
            }
        `
    }}
`

function ServicoCard({texto, path, ativo=false, ...props}) {
    return ( 
        <CardContainer
            ativo={ativo}
            className={style.cardContainer}
            {...props}
        >
            <img src={path} alt={texto} />
            <p>{texto}</p>
        </CardContainer>
     );
}

export default ServicoCard;