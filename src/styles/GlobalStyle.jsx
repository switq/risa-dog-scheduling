import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`    
    :root {
        --magenta: #AF55A9;
        --magenta02: #BA61B4;
        --roxo: #9b6cd9;
        --roxo02: #865ABF;
        --roxo03: #DAC9F1;
        --roxo04: #B69CD8;
        --roxo05: #F0E4FF;
        --light: #fff;
        --dark: #222;
        --dark02: #DAC9F150;
        --dark03: #DAC9F130;
        --gray: #ccc;
        --verde: #74B599;
        --vermelho: #9E3232;
    }

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: 'Poppins', sans-serif;
        font-weigth: 500;
        font-size: 16px;
    }
`