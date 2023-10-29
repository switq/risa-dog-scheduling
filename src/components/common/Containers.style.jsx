import styled from "styled-components";

export const CRowStyle = styled.div`
    display: flex;
    align-itens: center;
    justify-content: center;
    justify-itens: center;
    gap: 1em;
`
export const CRow = ({...props}) => (
    <CRowStyle style={ {...props}}>
        {props.children}
    </CRowStyle>
)

export const CColStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-itens: center;
    justify-content: center;
    justify-itens: center;
    gap: 1em;
`
export const CCol = ({ ...props }) => (
    <CColStyle style={{...props}}>
        {props.children}
    </CColStyle>
)

