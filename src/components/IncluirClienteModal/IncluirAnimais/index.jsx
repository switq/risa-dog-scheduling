import AnimalCard, { AddAnimal } from "../../common/AnimalCard";
import IncluirAnimalModal from "./IncluirAnimalModal";
import { useContext, useState } from "react";
import IncluirClienteContext from "../../../contexts/IncluirClienteContext";
import style from './IncluirAnimais.module.scss';


function IncluirAnimais() {
    const [isOpenAnimal, setIsOpenAnimal] = useState(false);
    const modalToggle = (id='') => {
        if ( id != '') setActiveId(id);
        else setActiveId('');
        setIsOpenAnimal(!isOpenAnimal);
    };

    const [activeId, setActiveId] = useState('');

    const animais = useContext(IncluirClienteContext).cliente.animais;

    return (
        <div>
            <div className={style.animaisContainer}>
                {animais.map(animal => (
                    <AnimalCard key={animal.id} id={animal.id} ativo={true} toggleModal={modalToggle}/>
                ))}
                <AddAnimal toggleModal={modalToggle} />
            </div>
            <IncluirAnimalModal id={activeId} closeModal={modalToggle} isOpen={isOpenAnimal} onRequestClose={modalToggle} />
        </div>
    )
}

export default IncluirAnimais;