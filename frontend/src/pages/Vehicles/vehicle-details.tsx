import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { Alert } from "antd";
import moment from "moment";

// ==> Actions
import {
  saveVehicle,
  updateVehicle,
} from "../../store/actions/vehicles.action";

// ==> Interfaces
import {
  VehiclesRequest,
  VehiclesResponse,
} from "../../interfaces/vehicles.interface";
import { TypeVehicleResponse } from "../../interfaces/type-vehicle";

interface Props {
  isUpdate?: boolean;
  onClose: () => void;
  onOk: () => void;
  typeVehicles: TypeVehicleResponse[] | null;
  record?: VehiclesResponse | null;
}

const VehicleDetails = (props: Props) => {
  const { isUpdate, onClose, onOk, record, typeVehicles } = props;

  //* ==> STATES <== *//
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==> Form
  const [num, setNum] = useState("");
  const [type, setType] = useState("");

  const initialState = () => {
    setLoading(false);
    setError("");

    setNum("");
    setType("");
  };

  useEffect(() => {
    if (isUpdate && record) {
      setNum(record?.numPlaca || "");
      setType(record?.type || "");
    }
  }, [isUpdate]);

  const save = async () => {
    setLoading(true); //==> Show loading

    const body: VehiclesRequest = {
      numPlaca: num,
      entryDate: isUpdate
        ? record?.entryDate || ""
        : moment().format("DD/MM/YYYY HH:mm").toString(),
      type: type,
    };

    const { ok, msg } = await (!isUpdate
      ? saveVehicle(body)
      : updateVehicle(record?._id || "", body));

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
    if (!num || !type) {
      setError("Por favor, complete el formulario");
    } else {
      setError(""); // ==> Clear error
      save();
    }
  };

  return (
    <Wrapper>
      <div className="title">
        <h1>{isUpdate ? "Modificar vehiculo" : "Nuevo vehiculo"}</h1>
      </div>
      <div className="containBody">
        <div className="input-div">
          <label>Número de placa</label>
          <input
            placeholder="Ingrese número de placa"
            onChange={(e) => setNum(e?.target?.value)}
            value={num}
          />
        </div>
        <div className="input-div">
          <label>Número de placa</label>
          <select value={type} onChange={(e: any) => setType(e?.target?.value)}>
            <option value="" disabled>
              Seleccione una opción
            </option>

            {(typeVehicles || []).map(({ _id, name }, i) => (
              <option key={i + 1} value={_id}>
                {name}
              </option>
            ))}
          </select>
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

export default VehicleDetails;
