import Modal from "react-modal"
import { ModalTittle } from "../../../common/Modal.style";
import { Formik, Form } from "formik";
import { BasicInput } from "../../../common/BasicInput";
import { CRow, CCol } from "../../../common/Containers.style";
import * as Yup from "yup"
import { Button } from "../../../common/Button.style";

export default function IncluirAnimalModal({...props}) {
    const initialValues = {
        nome: '',
        rga: '',
        especie: '',
        raca: '',
        obs: '',
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
        console.log(values);
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
                                <Button>Cancelar</Button>
                                <Button $roxo>Salvar</Button>
                            </CRow>
                        </CCol>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}
