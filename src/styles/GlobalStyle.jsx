import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`    
    :root {
        --magenta: #AF55A9;
        --magenta02: #BA61B4;
        --pink: #B984BB;
        --pink02: #A973AB;
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
        --verde02: #82BCA3;
        --vermelho: #9E3232;
        --vermelho02: #A83F3F;
        --gray: #D8D8D8;
        --gray02: #CCC;

        --fontPadrao: 'Poppins', sans-serif;
    }

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: var(--fontPadrao);
        font-weigth: 500;
        font-size: 16px;
    }

    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration { display: none; }
`