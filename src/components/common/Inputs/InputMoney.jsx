import styled from "styled-components";

const InputStyled = styled.input`
    width: 6.3rem;
    height: 2rem;
    padding: .4em;
    text-align: right;
    border-radius: .4em;
    outline: none;
    border: 1px solid var(--dark02);
`

function InputMoney({value, onChange}) {
    return (
        <InputStyled 
            value={value} 
            onChange={e => onChange(e.target.value)} 
        />
     );
}

export default InputMoney;