import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Tooltip } from "antd";

// ==> Components
import Loading from "../../components/Loading";
import CustomTable from "../../components/Table";
import Modal from "../../components/Modal";
import Details from "./type-vehicle-details";

// ==> Interfaces
import { TypeVehicleResponse } from "../../interfaces/type-vehicle";

// ==> Actions
import { getTypeVehicles } from "../../store/actions/type-vehicles.action";

// ==> Actions
import { decimalFormat } from "../../helpers/helper";
import { alertNotification } from "../../helpers/notifications";

const TypeVehicles = () => {
  //* ==> STATES <== *//
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const [selected, setSelected] = useState<TypeVehicleResponse | null>();

  // ==> For the storage of arrays
  const [records, setRecords] = useState<object[]>([]);

  const initialState = () => {
    setLoading(false);
    setShowModal(false);
    setIsUpdate(false);

    setSelected(null);
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      align: "center",
      with: 500,
    },
    {
      title: "Importe ($/m)",
      dataIndex: "amount",
      align: "center",
      with: 300,
      render: (txt: string) => <>{decimalFormat(txt)}</>,
    },
    {
      title: "Acciones",
      dataIndex: "_id",
      align: "center",
      with: 100,
      render: (txt: string, record: TypeVehicleResponse) => (
        <Tooltip title="Seleccione registro">
          <img
            src="src/assets/icons/edit.png"
            alt={txt}
            className="iconTable"
            onClick={() => {
              setSelected(record);
              setIsUpdate(true);
              setShowModal(true);
            }}
          />
        </Tooltip>
      ),
    },
  ];

  const get = async () => {
    setLoading(true); // ==> Show loading
    try {
      const records = await getTypeVehicles();
      setRecords(records || []);
    } catch (e) {
      console.error("||* ==> Error getTypeVehicles <== *||", e);
    }
    setLoading(false); // ==> Hide loading
  };

  useEffect(() => {
    console.clear();

    get();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Wrapper>
          <div className="title">
            <h1> Tipos de Vehiculos </h1>
          </div>
          <div className="header">
            <button
              type="button"
              className="btn-Secundary"
              onClick={() => setShowModal(true)}
            >
              Nuevo
            </button>
          </div>
          <CustomTable
            columns={columns}
            data={records}
            loading={false}
            scroll={{ x: 900 }}
          />
          <Modal show={showModal} onClose={() => initialState()}>
            <Details
              isUpdate={isUpdate}
              onClose={() => initialState()}
              onOk={() => {
                initialState();
                get();
                alertNotification({
                  msm: "Éxito",
                  description: !isUpdate
                    ? "Se ha ingresado correctamente"
                    : "Se ha modificado correctamente",
                  type: "info",
                });
              }}
              record={selected}
            />
          </Modal>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  margin: 20px;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0 20px 0;

    h1 {
      font-size: 32px;
      font-weight: bold;
      text-align: center;
    }
  }

  .header {
    display: flex;
    justify-content: end;
    align-items: center;
    margin: 10px;
  }
`;
export default TypeVehicles;
