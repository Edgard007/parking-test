import React from "react";

import styled from "styled-components";

interface Routers {
  path: string;
  name: string;
}

const Navbar = () => {
  const routers: Routers[] = [
    {
      path: "/",
      name: "Estacionamiento",
    },
    {
      path: "/TypeVehicles",
      name: "Tipo de Vehiculos",
    },
    {
      path: "/Vehicles",
      name: "Vehiculos",
    },
  ];

  return (
    <Wrapper>
      <span className="nameApp">エドガード</span>
      <nav className="header__nav">
        <ul className="menu">
          {(routers || []).map((el, i) => (
            <li className="menu__item" key={i + 1}>
              <a className="menu__link" href={el?.path}>
                {el?.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 40px;
  background-color: #ffff;
  box-shadow: 0 2px 5px rgb(0 48 136 / 20%);
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 740px) {
    padding: 0 15px;
  }

  .nameApp {
    font-size: 20px;
    font-weight: bold;
  }

  .header__nav {
    width: 60%;
    @media (max-width: 740px) {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

  .menu {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    list-style: none;
    margin-top: 0;
    margin-bottom: 0;
    display: flex;
    flex-direction: row;

    @media (max-width: 740px) {
      display: none;
    }
  }

  .menu__item {
    position: relative;
  }

  .menu__link {
    position: relative;
    color: var(--color-blue);
    font-size: 15px;
    padding: 5px;

    &::before {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 0;
      height: 4px;
      background-color: var(--color-blue);
      transition: all 0.3s;
    }

    &:hover::before {
      width: 100%;
    }
  }

  li,
  ul {
    list-style: none !important;
    text-decoration: none !important;
  }
`;

export default Navbar;
