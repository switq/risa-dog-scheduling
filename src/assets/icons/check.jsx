import styled from "styled-components"

const SvgStyled = styled.svg`
    cursor: pointer;
`

export const Check = ({...props}) => (
    <SvgStyled {...props} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" /></SvgStyled>
)