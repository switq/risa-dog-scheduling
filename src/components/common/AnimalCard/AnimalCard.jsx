import styled from "styled-components"
import { CRow, CCol, CRowStyle } from "../Containers.style"
import { EditPen } from "../../../assets/editPen"

const AnimalCardContainer = styled(CRowStyle)`
    min-width: 15rem;
    max-width: 20rem;
    width: auto;
    color: var(--light);
    border-radius: .8em;
    padding: 1.5em;
    justify-content: space-between;
    
    background-color: var(--roxo03);
    

`

export default function AnimalCard({ ativo, ...props}) {
    return (
        <AnimalCardContainer style={ativo ? { background: 'var(--magenta)' } : {}}>
            <CCol alignContent="baseline" alignItens="center" gap=".4em">
                <CRow gap=".5em">
                    <h3>Lolla</h3>
                    <span>Vira-lata</span>
                </CRow>
                <span>0.000.000</span>
            </CCol>
            <span>
                <EditPen />
            </span>
        </AnimalCardContainer>
    )
}