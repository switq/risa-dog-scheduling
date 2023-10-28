import styled from "styled-components";

export const CRow = styled.div`
    display: flex;
    align-itens: center;
    justify-content: ${(props) => props.jContent? props.jContent : "center"};
    justify-itens: center;
    gap: 1.5em;
`
export const CCol = styled.div`
    display: flex;
    flex-direction: column;
    align-itens: center;
    justify-content: center;
    justify-itens: center;
    gap: 1em;
`
