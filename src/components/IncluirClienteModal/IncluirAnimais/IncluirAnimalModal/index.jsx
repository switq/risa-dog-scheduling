import Modal from "react-modal"
import { ModalTittle } from "../../../common/Modal.style";
import { Formik, Form } from "formik";
import { BasicInput } from "../../../common/Inputs/BasicInput";
import { CRow, CCol } from "../../../common/Containers.style";
import * as Yup from "yup"
import { Button } from "../../../common/Button.style";
import IncluirClienteContext from "../../../../contexts/IncluirClienteContext";
import { useContext } from "react";
import { v4 as uuid4 } from 'uuid';
import style from './IncluirAnimalModal.module.scss';
import { Trash } from '../../../../assets/icons/trash';
import { InputSelect } from "../../../common/Inputs/InputSelect";

const incluirAnimalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '550px',
        height: '600px',
        borderRadius: '15px',
        padding: '3rem'
    },
}

export default function IncluirAnimalModal({ id = '', closeModal, cliente, setCliente, ...props }) {

    let initialValues = {
        nome: 'normal',
        rga: '',
        porte: '',
        especie: '',
        raca: '',
        obs: '',
        status: '',
    };

    if (id != '') {
        const animal = cliente.animais.find(animal => animal.id == id);
        initialValues = { ...initialValues, ...animal };
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
            const newCliente = { ...prevCliente };

            if (id != '') {
                const animalIndex = newCliente.animais.findIndex(animal => animal.id == id);
                newCliente.animais[animalIndex] = { ...newCliente.animais[animalIndex], ...values };
            } else {
                newCliente.animais.push({ id: uuid4(), ...values });
            }

            return newCliente;
        })
    }

    const deletarAnimal = () => {
        if (id != '') {
            const animalIndex = cliente.animais.findIndex(animal => animal.id == id);
            setCliente(prevCliente => {
                const newCliente = { ...prevCliente };
                newCliente.animais.splice(animalIndex, 1);
                return newCliente;
            })
        }
        closeModal();
    }

    return (
        <Modal {...props} style={incluirAnimalStyle}>
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
                className={style.formik}
            >
                {({ values, isSubimitting }) => (
                    <Form key={uuid4} className={style.form}>
                        <div>
                            <ModalTittle>Incluir animal</ModalTittle>
                            <CCol>
                                <BasicInput name="nome" required />
                                <CRow>
                                    <BasicInput name="rga" label={"RGA"} />
                                    <InputSelect name="porte" required options={[{ value: 'P', label: 'Pequeno' }, { value: 'M', label: 'Médio' }, { value: 'G', label: 'Grande' },]}/>
                                </CRow>
                                <CRow>
                                    <BasicInput name="especie" label={"Espécie"} required />
                                    <BasicInput name="raca" label={"Raça"} />
                                </CRow>
                                <BasicInput name="obs" label={"Observações"} className={style.obs} />
                            </CCol>
                        </div>
                        <span onClick={deletarAnimal} className={style.trash}>
                            <Trash />
                        </span>
                        <CRow justifyContent={"space-between"}>
                            <Button type="button" onClick={closeModal} >Cancelar</Button>
                            <Button $roxo type="submit">Salvar</Button>
                        </CRow>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}
