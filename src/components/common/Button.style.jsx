import styled from "styled-components";


export const Button = styled.button`
    background: #999;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    padding: 0.5em 1em;
    color: #fff;
    min-width: 8rem;
    
    ${props => {
        let cor = props.$roxo ?  {bc: "var(--roxo)", bch: "var(--roxo02)"} : {bc: "var(--magenta)", bch: "var(--magenta02)"};
        
        return `
            background-color: ${cor.bc};
            &:hover {
                background-color: ${cor.bch};
            }
        `
    }}
`