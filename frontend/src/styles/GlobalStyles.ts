import { createGlobalStyle } from "styled-components";
import Variables from "./Variables";

export const GlobalStyles = createGlobalStyle`
    ${Variables};

    * {
        margin: 0px;
        padding: 0px;
        font-family: var(--font-main);
    }

    .marginTop30 {
        margin-top: 30px;
    }

    button {
        border-radius: 34px;
        padding: 7px 25px;
        font-weight: var(--semiBold-weight);
        border: 0;
        cursor: pointer;
        outline: 0;
    }

    .btn-Secundary {
        background: var(--color-gray);
        color: var(--color-secundary-gray);
        padding: 5px 25px;
        border: 2px solid;
        border-color: var(--color-secundary-gray);
    }

    .btn-Secundary:hover {
        background: var(--color-secundary-gray) !important;
        color: var(--color-primary) !important;
        font-weight: var(--semiBold-weight);
    }
`;
