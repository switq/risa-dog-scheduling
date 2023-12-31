import styled from 'styled-components';
import style from './HoraCard.module.scss'

const HoraContainer = styled.div`
    ${(props) => {
        if (props.$desativado)
            return `background-color: var(--gray); color: var(--dark); &:hover{background-color: var(--gray02);}`
        
        if (props.$ativo)
            return `background-color: var(--magenta); color: var(--light); &:hover{background-color: var(--magenta02);}`
        
        if (props.$meio)
            return `background-color: var(--pink); color: var(--light); &:hover{background-color: var(--pink02);}`

        return `background-color: var(--roxo03); color: var(--dark); &:hover{background-color: var(--roxo04);}`
    }}    
`

function HoraCard({ 
    hora, 
    $ativo = false, 
    $desativado = false, 
    $meio = false, 
    ...props 
}) {
    return (
        <HoraContainer
            className={style.horaContainer}
            $ativo={$ativo}
            $meio={$meio}
            $desativado = { $desativado }
    {...props }
        >
        { hora }
        </HoraContainer >
    );
}

export default HoraCard;