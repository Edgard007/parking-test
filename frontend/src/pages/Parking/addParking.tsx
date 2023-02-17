import React, { useState } from "react";

import styled from "styled-components";
import { Alert } from "antd";
import moment from "moment";

// ==> Actions
import { saveParking } from "../../store/actions/parking.action";
import { ParkingRequest } from "../../interfaces/parking.interface";

interface Props {
  onClose: () => void;
  onOk: () => void;
}

const AddParkings = (props: Props) => {
  const { onClose, onOk } = props;

  //* ==> STATES <== *//
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==> Form
  const [num, setNum] = useState("");

  const initialState = () => {
    setLoading(false);
    setError("");

    setNum("");
  };

  const save = async () => {
    setLoading(true); //==> Show loading

    const body: ParkingRequest = {
      numPlaca: num,
      startDate: moment().format("DD/MM/YYYY HH:mm").toString(),
    };

    const { ok, msg } = await saveParking(body);

    if (ok) {
      initialState();
      onOk && onOk();
    } else
      setError(
        typeof msg === "string" && msg ? msg : "Error al guardar información"
      );

    setLoading(false); // ==> Hide loading
  };

  const validForm = () => {
    if (!num) {
      setError("Por favor, complete el formulario");
    } else {
      setError(""); // ==> Clear error
      save();
    }
  };

  return (
    <Wrapper>
      <div className="title">
        <h1>Add new parking</h1>
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
            Cancel
          </button>
          <button
            type="button"
            className="btn-Secundary"
            onClick={() => validForm()}
            disabled={loading}
          >
            Save
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

export default AddParkings;
