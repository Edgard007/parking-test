import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

const Error403 = () => {
  const navigate = useNavigate();

  //* ==> STATES <== *//

  useEffect(() => {
    console.clear();
  }, []);

  const goBack = () => {
    navigate("/");
  };

  return (
    <Wrapper>
      <span className="containCode">403</span>
      <span className="conatinName"> Prohibido </span>
      <div>
        <span>
          Su cliente no tiene permiso para acceder a la URL de este servidor.
        </span>
        <span className="descrip">Eso es todo lo que sabemos.</span>
      </div>
      <div className="marginTop30">
        <button
          type="button"
          className="btn-Secundary"
          onClick={() => goBack()}
        >
          Regresar
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  .containCode {
    font-size: 75px !important;
  }

  .conatinName {
    font-size: 40px !important;
  }

  .descrip {
    color: var(--color-secundary-gray);
  }

  span {
    color: var(--color-blue);
    font-weight: var(--bold-weight);
    font-size: 16px;
    text-align: justify;
  }

  .marginTop30 {
    margin-top: 30px;
  }

  @media (max-width: 500px) {
    padding: 15px;
  }

  @media (max-width: 400px) {
    padding: 10px;
  }
`;

export default Error403;
