import styled from "styled-components"

const SvgStyled = styled.svg`
    cursor: pointer;
`

export const Close = ({...props}) => (
    <SvgStyled {...props} xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></SvgStyled>
)