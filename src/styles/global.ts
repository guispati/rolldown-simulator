import { createGlobalStyle } from "styled-components";
import bg from '../assets/bg.jpg';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        cursor: default;
    }

    :focus {
        outline: 0;
    }

    body {
        background: url(${bg});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: bottom;
        height: 100vh;
        width: 100vw;
        color: ${props => props.theme.white};
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: 'Friz Quadrata Std', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }
`;