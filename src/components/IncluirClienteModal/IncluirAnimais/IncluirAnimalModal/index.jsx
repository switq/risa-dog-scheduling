import Modal from "react-modal"
import { ModalTittle } from "../../../common/Modal.style";
import { Formik, Form } from "formik";
import { BasicInput } from "../../../common/Inputs/BasicInput";
import { CRow, CCol } from "../../../common/Containers.style";
import * as Yup from "yup"
import { Button } from "../../../common/Button.style";
import { v4 as uuid4 } from 'uuid';
import style from './IncluirAnimalModal.module.scss';
import { Trash } from '../../../../assets/icons/trash';
import { InputSelect } from "../../../common/Inputs/InputSelect";
import { postAnimal } from "../../../../connection/ManterClienteAnimais";

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

export default function IncluirAnimalModal({ idAnimal = '', closeModal, cliente, setCliente, inclusao = false, ...props }) {

    let initialValues = {
        nome: 'normal',
        rga: '',
        porte: 'P',
        genero: '',
        especie: 'Cachorro',
        raca: '',
        obs: '',
        status: '',
    };

    const especies = [
        { value: 'Cachorro', label: 'Cachorro' },
        { value: 'Gato', label: 'Gato' },
        { value: 'Ave', label: 'Ave' },
        { value: 'Cobra', label: 'Cobra' },
    ]

    if (idAnimal != '') {
        const animal = cliente.animais.find(animal => animal.idAnimal == idAnimal);
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

        setCliente(prevCliente => {
            const newCliente = { ...prevCliente };
            console.log(idAnimal)
            
            if (idAnimal != '') {
                const animalIndex = newCliente.animais.findIndex(animal => animal.idAnimal == idAnimal);
                newCliente.animais[animalIndex] = { ...newCliente.animais[animalIndex], ...values };
                console.log('handleSubmit')
                console.log(newCliente)
            } else {
                newCliente.animais.push({ idAnimal: uuid4(), ...values });
            }

            
            return newCliente;
        })
        
        console.log(cliente)
        closeModal();
    }

    const deletarAnimal = () => {
        if (idAnimal != '') {
            const animalIndex = cliente.animais.findIndex(animal => animal.idAnimal == idAnimal);
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
                                <CRow>
                                    <BasicInput name="nome" required />
                                    <InputSelect name="genero" label="Gênero" required options={[{ value: 'F', label: 'Fêmea' }, { value: 'M', label: 'Macho' },]} />
                                </CRow>
                                <CRow>
                                    <BasicInput name="rga" label={"RGA"} />
                                    <InputSelect name="porte" required options={[{ value: 'P', label: 'Pequeno' }, { value: 'M', label: 'Médio' }, { value: 'G', label: 'Grande' },]} />
                                </CRow>
                                <CRow>
                                    <InputSelect name="especie" label={"Espécie"} options={especies} required />
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
