import styled from "styled-components"
import { CRow, CCol, CRowStyle } from "../Containers.style"
import { EditPen } from "../../../assets/icons/editPen"
import { useContext } from "react"
import IncluirClienteContext from "../../../contexts/IncluirClienteContext"
import IncluirAnimalModal from "../../IncluirClienteModal/IncluirAnimais/IncluirAnimalModal"
import style from "./AnimalCard.module.scss"

const AnimalCardContainer = styled(CRowStyle)`
    width: 100%;
    color: var(--light);
    border-radius: .8em;
    padding: 1em 1.5em;
    justify-content: space-between;
    cursor: pointer;
    max-height: 6em;
    background-color: var(--roxo03);
    align-items: center;
`

export default function AnimalCard({ id, ativo, toggleModal, ...props }) {

    const { cliente } = useContext(IncluirClienteContext);
    const animal = cliente.animais.find(animal => animal.id === id);

    const editAnimal = () => {
        toggleModal(id)
    }

    return (
        <AnimalCardContainer style={ativo ? { background: 'var(--magenta)', cursor: 'default' } : {}}>
            <CCol alignContent="baseline" alignItens="center" gap=".4em">
                <CRow gap=".5em">
                    <h3 className={style.nome}>{animal.nome}</h3>
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

export const AddAnimal = ({ toggleModal, ...props }) => (
    <div className={style.addAnimal} onClick={() => toggleModal('')}>
        <span className={style.mais}>+</span>
        <span className={style.roxo}>Adicionar Animal</span>
    </div>
)