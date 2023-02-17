import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { Alert } from "antd";

// ==> Actions
import {
  saveTypeVehicle,
  updateTypeVehicle,
} from "../../store/actions/type-vehicles.action";
import {
  TypeVehicleRequest,
  TypeVehicleResponse,
} from "../../interfaces/type-vehicle";

// ==> Helpers
import { onlyFloat } from "../../helpers/helper";

interface Props {
  isUpdate?: boolean;
  onClose: () => void;
  onOk: () => void;
  record?: TypeVehicleResponse | null;
}

const TypeVehicleDetails = (props: Props) => {
  const { isUpdate, onClose, onOk, record } = props;

  //* ==> STATES <== *//
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==> Form
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const initialState = () => {
    setLoading(false);
    setError("");

    setName("");
    setAmount("");
  };

  useEffect(() => {
    if (isUpdate && record) {
      setName(record?.name || "");
      setAmount((record?.amount).toString() || "");
    }
  }, [isUpdate]);

  const save = async () => {
    setLoading(true); //==> Show loading

    const body: TypeVehicleRequest = {
      name: name,
      amount: parseFloat(amount),
    };

    const { ok, msg } = await (!isUpdate
      ? saveTypeVehicle(body)
      : updateTypeVehicle(record?._id || "", body));

    if (ok) {
      initialState();
      onOk && onOk();
    } else {
      setError(
        typeof msg === "string" && msg
          ? msg
          : isUpdate
          ? "Error al modifcar información"
          : "Error al guardar información"
      );
    }

    setLoading(false); // ==> Hide loading
  };

  const validForm = () => {
    if (!name || !amount) {
      setError("Por favor, complete el formulario");
    } else {
      setError(""); // ==> Clear error
      save();
    }
  };

  return (
    <Wrapper>
      <div className="title">
        <h1>
          {isUpdate ? "Modificar tipo de vehiculo" : "Nuevo tipo de vehiculo"}
        </h1>
      </div>
      <div className="containBody">
        <div className="input-div">
          <label>Número de placa</label>
          <input
            placeholder="Ingrese número de placa"
            onChange={(e) => setName(e?.target?.value)}
            value={name}
          />
        </div>
        <div className="input-div">
          <label>Importe</label>
          <input
            placeholder="Ingrese importe"
            onChange={(e) => onlyFloat(e, setAmount)}
            value={amount}
          />
        </div>
        {error && (
          <div className="contain-error">
            <Alert
              description={error || ""}
              type="error"
              showIcon
              style={{
                width: "100%",
              }}
            />
          </div>
        )}
        <div className="contain-btns">
          <button
            type="button"
            className="btn-Secundary"
            onClick={() => onClose && onClose()}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn-Secundary"
            onClick={() => validForm()}
            disabled={loading}
          >
            Guardar
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 20px;
  width: 50%;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0 20px 0;

    h1 {
      font-size: 25px;
      font-weight: bold;
      text-align: center;
    }
  }

  .input-div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 20px 0;
  }

  label {
    color: ${(props) => props?.theme?.blue};
    font-weight: 400;
    font-size: 15px;
  }

  .contain-btns {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 20px;
  }

  .contain-error {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
  }
`;

export default TypeVehicleDetails;
