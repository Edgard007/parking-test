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

    .iconTable {
      width: 20px;
      height: 20px;
      cursor: pointer;
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

    /* Custom modals */
  .ant-modal-content {
    border-radius: 15px !important;
    box-shadow: 0 0 20px 0 var(--color-black) !important;
  }

  .ant-modal-close {
    border-radius: 15px !important;
    background: var(--color-primary) !important;
    background-color: var(--color-primary) !important;
    color: var(--color-blue) !important;
    border: none !important;
    padding: 0 !important;
  }

  .ant-modal-close:hover {
    color: var(--color-primary) !important;
  }

  .ant-modal-close {
    position: absolute !important;
    right: -30px !important;
    top: -15px !important;
    box-shadow: 0 0 20px 0 var(--color-black) !important;
  }

  .ant-modal-close:hover {
    background: var(--color-secundary-gray) !important;
  }

  .ant-modal-close-x {
    width: 22px !important;
    height: 16px !important;
  }

  .ant-modal-close-x > .anticon {
    vertical-align: 0.7em !important;
  }

  @media (max-width: 700px) {
    .ant-modal-close {
      position: absolute !important;
      right: 10px !important;
      top: 10px !important;
    }
  }
`;
