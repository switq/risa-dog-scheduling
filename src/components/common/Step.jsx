import styled from "styled-components"
import { CRowStyle } from "./Containers.style";

export const Step = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    justify-items: baseline;

    background: #999;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    min-width: 10rem;
    height: 3em;
    

    ${props => {
        const cor = props.$ativo ? {bc: "var(--magenta)", bch: "var(--magenta02)", c: "var(--light)"} : {bc: "var(--roxo03)", bch: "var(--roxo04)", c: "var(--dark)"} ;
        
        return `
            background-color: ${cor.bc};
            color: ${cor.c};
            &:hover {
                background-color: ${cor.bch};
            }
        `
    }}
`

export const Foward = styled.span`
    font-size: 2.25rem;
    text-align: center
`

export const StepContainer = styled(CRowStyle)`
    justify-content: space-between;
    align-itens: flex-start;
    margin-bottom: 1rem;
`

export const BackFowardWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`