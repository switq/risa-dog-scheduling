import styled from "styled-components";

const InputStyled = styled.input`
    width: 8rem;
    height: 2.5rem;
    padding: .4em;
    text-align: center;
    border-radius: .4em;
    outline: none;
    border: 3px solid var(--roxo04);
    background-color: var(--roxo03);
`

const SpanStyled = styled.span`
    margin-right: 1em;
`

function InputDesconto({value, onChange}) {
    return (
        <div>
            <SpanStyled>Desconto:</SpanStyled>
            <InputStyled 
                value={parseInt(value * 100)} 
                onChange={e => onChange(e.target.value / 100)} 
            />

        </div>
     );
}

export default InputDesconto;