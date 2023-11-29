import AnimalCard, { AddAnimal } from "../../common/AnimalCard";
import IncluirAnimalModal from "./IncluirAnimalModal";
import { useContext, useState } from "react";
import style from './IncluirAnimais.module.scss';


function IncluirAnimais({ cliente, setCliente, selecionado = '', setSelecionado = '', inclusao = false, setAnimalSelecionado = false, ...props }) {

    const [isOpenAnimal, setIsOpenAnimal] = useState(false);

    const modalToggle = (idAnimal = '') => {
        if (idAnimal != '') setActiveId(idAnimal);
        else setActiveId('');
        setIsOpenAnimal(!isOpenAnimal);
    };

    const [activeId, setActiveId] = useState('');

    const animais = cliente.animais;

    return (
        <div>
            <div className={style.animaisContainer}>
                {
                    
                    animais.map((animal, index) => {
                        let isAtivo = false
                        if (setSelecionado === '') isAtivo = true
                        return (
                            <AnimalCard
                                setSelecionado={setSelecionado}
                                ativo={selecionado.idAnimal === animal.idAnimal || isAtivo}
                                cliente={cliente}
                                key={animal.idAnimal}
                                idAnimal={animal.idAnimal}
                                toggleModal={modalToggle}
                            />
                        )
                    })
                }
                <AddAnimal toggleModal={modalToggle} />
            </div>

            <IncluirAnimalModal
                setAnimalSelecionado={setAnimalSelecionado}
                inclusao={inclusao}
                cliente={cliente}
                setCliente={setCliente}
                idAnimal={activeId}
                closeModal={modalToggle}
                isOpen={isOpenAnimal}
                onRequestClose={modalToggle}
            />
        </div>
    )
}

export default IncluirAnimais;