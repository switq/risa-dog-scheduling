import Modal from "react-modal"
import { ModalTittle } from "../../../common/Modal.style";
import { Formik, Form } from "formik";
import { BasicInput } from "../../../common/BasicInput";
import { CRow, CCol } from "../../../common/Containers.style";
import * as Yup from "yup"
import { Button } from "../../../common/Button.style";
import IncluirClienteContext from "../../../../contexts/IncluirClienteContext";
import { useContext } from "react";
import { v4 as uuid4 } from 'uuid';

export default function IncluirAnimalModal({ id='', closeModal, ...props}) {


    let initialValues = {
        nome: 'normal',
        rga: '',
        especie: '',
        raca: '',
        obs: '',
    };

    const { cliente, setCliente } = useContext(IncluirClienteContext);

    if (id != '') {
        const animal = cliente.animais.find(animal => animal.id == id);
        initialValues = {...initialValues, ...animal};
    }


    const validationSchema = Yup.object({
        nome: Yup.string()
            .required("Campo obrigatório"),
        rga: Yup.string()
            .min(11, "O RGA deve possuir 11 caracteres")
            .max(11, "O RGA deve possuir 11 caracteres"),
        especie: Yup.string()
            .required("Campo obrigatório"),
    })

    const handleSubmit = (values, { setSubmitting }) => {
        closeModal();

        setCliente(prevCliente => {
            const newCliente = {...prevCliente};
            
            if ( id != '') {
                let animalIndex = newCliente.animais.findIndex(animal => animal.id == id);
                newCliente.animais[animalIndex] = { ...newCliente.animais[animalIndex], ...values};
            } else {
                newCliente.animais.push({id: uuid4(), ...values});
            }
                
            return newCliente;
        })
        
    }

    return (
        <Modal {...props}>
            <ModalTittle>Incluir animal</ModalTittle>
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {({ values, isSubimitting }) => (
                    <Form>
                        <CCol>
                            <BasicInput name="nome" required />
                            <BasicInput name="rga" label={"RGA"} />
                            <CRow>
                                <BasicInput name="especie" label={"Espécie"} required />
                                <BasicInput name="raca" label={"Raça"} />
                            </CRow>
                            <BasicInput name="obs" label={"Observações"} type="text-area" />
                            <CRow justify-content={"space-between"}>
                                <Button type="button" onClick={closeModal} >Cancelar</Button>
                                <Button $roxo type="submit">Salvar</Button>
                            </CRow>
                        </CCol>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}
