import { BasicInput } from "../../common/BasicInput";
import { CRow, CCol } from "../../common/Containers.style";
import { Form } from "formik";

function IncluirEndereco() {

    return (
        <Form>
            <CCol>
                <BasicInput name="cep" label={"CEP"} required/>
                <CRow>
                    <BasicInput name="logradouro" label={"Endereço"} />
                    <BasicInput name="numeroRes" label={"Número"} type="number" required />
                </CRow>
                <CRow>
                    <BasicInput name="bairro" />
                    <BasicInput name="complemento" />
                </CRow>
                <CRow>
                    <BasicInput name="localidade" label={"Cidade"}/>
                    <BasicInput name="uf" label={"Estado"} />
                </CRow>
            </CCol>
        </Form>
    )
}

export default IncluirEndereco;