import React from "react";

import styled from "styled-components";

const Loading = () => {
  return (
    <Wrapper>
      <div className="container">
        <div className="loading">
          <div className="ball one"></div>
          <div className="ball two"></div>
          <div className="ball three"></div>
          <div className="ball four"></div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .container {
    width: 100%;
    height: 100vh;
    display: grid;
    place-items: center;
  }

  .loading {
    display: flex;
    transform: scale(4);
  }

  .loading .ball {
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 0.5rem;
    transition: transform 0.3s infinite;
  }

  .ball + .ball {
    margin-left: 0.4rem;
  }

  .loading .ball.one {
    animation: loadingBall 0.5s infinite alternate;
    background: #ff592930;
  }
  .loading .ball.two {
    animation: loadingBall2 0.5s infinite 0.2s alternate;
    background: #fc065130;
  }
  .loading .ball.three {
    animation: loadingBall3 0.5s infinite 0.35s alternate;
    background: #6cb94430;
  }
  .loading .ball.four {
    animation: loadingBall4 0.5s infinite 0.5s alternate;
    background: #2de2fa30;
  }

  @keyframes loadingBall {
    0% {
      transform: translateY(-10px) scale(1.2);
      background: #ff5929;
      box-shadow: 0 0 2px #ff5929aa;
    }
    100% {
      transform: translateY(5px);
    }
  }

  @keyframes loadingBall2 {
    0% {
      transform: translateY(-10px) scale(1.2);
      background: #fc0651;
      box-shadow: 0 0 2px #fc0651aa;
    }
    100% {
      transform: translateY(5px);
    }
  }

  @keyframes loadingBall3 {
    0% {
      transform: translateY(-10px) scale(1.2);
      background: #6cb944;
      box-shadow: 0 0 2px #6cb944aa;
    }
    100% {
      transform: translateY(5px);
    }
  }

  @keyframes loadingBall4 {
    0% {
      transform: translateY(-10px) scale(1.2);
      background: #2de2fa;
      box-shadow: 0 0 2px #2de2faaa;
    }
    100% {
      transform: translateY(5px);
    }
  }
`;
export default Loading;
