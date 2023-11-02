import AnimalCard, { AddAnimal } from "../../common/AnimalCard";
import IncluirAnimalModal from "./IncluirAnimalModal";
import { useContext, useState } from "react";
import IncluirClienteContext from "../../../contexts/IncluirClienteContext";
import style from './IncluirAnimais.module.scss';


function IncluirAnimais({ cliente, setCliente, selecionado='', setSelecionado='', ...props}) {

    const [isOpenAnimal, setIsOpenAnimal] = useState(false);
    const modalToggle = (id='') => {
        if ( id != '') setActiveId(id);
        else setActiveId('');
        setIsOpenAnimal(!isOpenAnimal);
    };

    const [activeId, setActiveId] = useState('');

    const animais = cliente.animais;

    return (
        <div>
            <div className={style.animaisContainer}>
                {animais.map((animal, index) => {
                    let isAtivo = false
                    if (setSelecionado === '') isAtivo = true
                    return (
                        <AnimalCard
                            setSelecionado={setSelecionado}
                            ativo={selecionado.id === animal.id || isAtivo}
                            cliente={cliente} 
                            key={animal.id} 
                            id={animal.id} 
                            toggleModal={modalToggle}
                        />
                    )
                })}
                <AddAnimal toggleModal={modalToggle} />
            </div>

            <IncluirAnimalModal cliente={cliente} setCliente={setCliente} id={activeId} closeModal={modalToggle} isOpen={isOpenAnimal} onRequestClose={modalToggle} />
        </div>
    )
}

export default IncluirAnimais;