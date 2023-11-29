import styled from "styled-components";
import { CCol, CColStyle } from "./Containers.style";

const ModalTittleStyled = styled(CColStyle)`
    gap: .5rem;
    margin-bottom: 1rem;
`

export const ModalTittle = ({ ...props }) => (
    <ModalTittleStyled {...props}>
        <h2>{props.children}</h2>
        <hr />
    </ModalTittleStyled>
)