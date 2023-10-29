import styled from "styled-components";
import { CRow } from "../../common/Containers.style";
import { AnimalCard } from "../../common/AnimalCard/AnimalCard";
import IncluirAnimalModal from "./IncluirAnimalModal";
import { useState } from "react";

function IncluirAnimais() {
    function click(e) {
        console.log(e);
    }

    const [isOpenAnimal, setIsOpenAnimal] = useState(false);
    const modalToggle = () => setIsOpenAnimal(!isOpenAnimal)

    return (
        <div>
            <IncluirAnimalModal isOpen={isOpenAnimal} onRequestClose={modalToggle} />
            
        </div>
    )
}

export default IncluirAnimais;