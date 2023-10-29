import styled from "styled-components"
import { CRow, CCol, CRowStyle } from "../Containers.style"
import { EditPen } from "../../../assets/editPen"
import { useContext } from "react"
import IncluirClienteContext from "../../../contexts/IncluirClienteContext"
import IncluirAnimalModal from "../../IncluirClienteModal/IncluirAnimais/IncluirAnimalModal"

const AnimalCardContainer = styled(CRowStyle)`
    min-width: 15rem;
    max-width: 20rem;
    width: auto;
    color: var(--light);
    border-radius: .8em;
    padding: 1.5em;
    justify-content: space-between;
    cursor: pointer;
    
    
    background-color: var(--roxo03);
`


export default function AnimalCard({id, ativo, toggleModal, ...props}) {

    const { cliente } = useContext(IncluirClienteContext);
    const animal = cliente.animais.find(animal => animal.id === id);

    const editAnimal = () => {
        toggleModal(id)
    }

    return (
        <AnimalCardContainer style={ativo ? { background: 'var(--magenta)' } : {}}>
            <CCol alignContent="baseline" alignItens="center" gap=".4em">
                <CRow gap=".5em">
                    <h3>{animal.nome}</h3>
                    <span>{animal.especie}</span>
                </CRow>
                <span>{animal.rga ? animal.rga : '0.000.000'}</span>
            </CCol>
            <span onClick={() => editAnimal()}>
                <EditPen />
            </span>
        </AnimalCardContainer>
    )
}

export const AddAnimal = ({toggleModal, ...props}) => (
    <AnimalCardContainer onClick={() => toggleModal('')} style={{ border: '.3rem dashed  var(--roxo)' }}>
        Adicionar Animal
    </AnimalCardContainer>
)