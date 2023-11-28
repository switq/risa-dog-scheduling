import styled from "styled-components";

const inputStyled = styled.input`
    width: 2rem;
`

function InputMoney({value, onChange}) {
    return (
        <input 
            value={value} 
            onChange={e => onChange(e.target.value)} 

            
        />
     );
}

export default InputMoney;