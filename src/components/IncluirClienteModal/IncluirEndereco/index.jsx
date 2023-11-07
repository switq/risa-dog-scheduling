import { BasicInput } from "../../common/Inputs/BasicInput";
import { CRow, CCol } from "../../common/Containers.style";
import { Form, Formik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";

function IncluirEndereco({ values, setFieldValue }) {

    async function puxaCep(cep) {
        const cepFormatado = cep.replace(/\D/g, '');
        if (cepFormatado != "") {
            axios.get(`https://viacep.com.br/ws/${cepFormatado}/json/`)
                .then((response) => response.data)
                .then((obj) => {
                    if ('erro' in obj) {
                        throw new Error('O CEP informado é inválido');
                    }
                    return obj;
                })
                .then((endereco) => {
                    setFieldValue('cep', endereco.cep);
                    setFieldValue('logradouro', endereco.logradouro);
                    setFieldValue('bairro', endereco.bairro)
                    setFieldValue('localidade', endereco.localidade);
                    setFieldValue('numeroRes', '');
                    setFieldValue('complemento', '');
                    setFieldValue('uf', endereco.uf);
                })
                .catch((error) => {
                    setFieldValue('logradouro', '');
                    setFieldValue('bairro', '')
                    setFieldValue('localidade', '');
                    setFieldValue('uf', '');
                    toast.warning('O CEP informado é inválido')
                })
        }
    }

    return (
        <CCol>
            <BasicInput name="cep" label={"CEP"} required 
                onBlur={() => puxaCep(values.cep)}
                onFocus={() => {
                    setFieldValue('cep', '')
                    setFieldValue('logradouro', '');
                    setFieldValue('bairro', '')
                    setFieldValue('localidade', '');
                    setFieldValue('uf', '');
                }}
            />
            <CRow>
                <BasicInput values={values} name="logradouro" label={"Endereço"} />
                <BasicInput name="numeroRes" label={"Número"} type="number" required />
            </CRow>
            <CRow>
                <BasicInput values={values} name="bairro" />
                <BasicInput name="complemento" />
            </CRow>
            <CRow>
                <BasicInput values={values} name="localidade" label={"Cidade"} />
                <BasicInput values={values} name="uf" label={"Estado"} />
            </CRow>
        </CCol>

    )
}

export default IncluirEndereco;