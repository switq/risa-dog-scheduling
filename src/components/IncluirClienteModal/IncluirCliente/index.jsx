import { BasicInput } from "../../common/Inputs/BasicInput";
import { CRow, CCol } from "../../common/Containers.style";
import { Form } from "formik";

function IncluirCliente() {

    return (

        <CCol>
            <BasicInput name="nome" required />
            <BasicInput name="email" />
            <CRow>
                <BasicInput name="cpf" label={"CPF"} required />
                <BasicInput name="dtNasc" label={"Data de Nascimento"} type={"date"} required />
            </CRow>
            <CRow>
                <BasicInput name="tel1" label={"Telefone"} required />
                <BasicInput name="tel2" label={"Telefone Residêncial"} />
            </CRow>
        </CCol>

    )
}

export default IncluirCliente;