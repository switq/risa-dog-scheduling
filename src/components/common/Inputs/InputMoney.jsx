import styled from "styled-components";

const inputStyled = styled.input`
    width: 2rem;
`

function InputMoney({value, onChange}) {
    return (
        <input 
            value={value} 
            onChange={e => onChange(e.target.value)} 
            type="number" 
            step="0.01" 
            min="0"
            max="9999"
        />
     );
}

export default InputMoney;