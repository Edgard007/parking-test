import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { Modal as ModalANTD, Tooltip } from "antd";

// ==> Components
import Loading from "../../components/Loading";
import CustomTable from "../../components/Table";
import Modal from "../../components/Modal";
import Details from "./vehicle-details";

// ==> Interfaces
import { VehiclesResponse } from "../../interfaces/vehicles.interface";
import { TypeVehicleResponse } from "../../interfaces/type-vehicle";

// ==> Actions
import {
  getVehicles,
  deleteVehicle,
} from "../../store/actions/vehicles.action";
import { getTypeVehicles } from "../../store/actions/type-vehicles.action";

// ==> Helpers
import { alertNotification } from "../../helpers/notifications";

const { useModal } = ModalANTD;

const Vehicles = () => {
  const [modal, contextHolder] = useModal();

  //* ==> STATES <== *//
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const [selected, setSelected] = useState<VehiclesResponse | null>();

  // ==> For the storage of arrays
  const [records, setRecords] = useState<object[]>([]);
  const [typeVehicles, setTypeVehicles] = useState<TypeVehicleResponse[]>([]);

  const initialState = () => {
    setLoading(false);
    setShowModal(false);
    setIsUpdate(false);

    setSelected(null);
  };

  const columns = [
    {
      title: "Número Placa",
      dataIndex: "numPlaca",
      align: "center",
      with: 300,
    },
    {
      title: "Fecha de ingreso",
      dataIndex: "entryDate",
      align: "center",
      with: 300,
      sorter: {
        compare: (a: VehiclesResponse, b: VehiclesResponse) =>
          moment(a.entryDate, "DD/MM/YYYY HH:mm").valueOf() -
          moment(b.entryDate, "DD/MM/YYYY HH:mm").valueOf(),
      },
      defaultSortOrder: "descend",
    },
    {
      title: "Tipo de vehiculo",
      dataIndex: "type",
      align: "center",
      with: 300,
      render: (txt: string) => <>{getType(txt)}</>,
    },
    {
      title: "Acciones",
      dataIndex: "_id",
      align: "center",
      with: 100,
      render: (txt: string, record: VehiclesResponse) => (
        <>
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
          <Tooltip title="Seleccione registro">
            <img
              src="src/assets/icons/delete.png"
              alt={txt}
              className="iconTable secouns-icon"
              onClick={() => checkDelete(txt)}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const get = async () => {
    setLoading(true); // ==> Show loading
    try {
      const vehicles = await getVehicles();
      setRecords(vehicles || []);
    } catch (e) {
      console.error("||* ==> Error getVehicles <== *||", e);
    }
    setLoading(false); // ==> Hide loading
  };

  const getTypeVeh = async () => {
    setLoading(true); // ==> Show loading
    try {
      const records = await getTypeVehicles();
      setTypeVehicles(records);
    } catch (e) {
      console.error("||* ==> Error getTypeVehicles <== *||", e);
    }
    setLoading(false); // ==> Hide loading
  };

  const getType = (_id: string) => {
    if (!_id) return "";
    else {
      const find = (typeVehicles || []).find((t) => t?._id === _id);
      return find?.name || "";
    }
  };

  useEffect(() => {
    console.clear();

    get();
    getTypeVeh();
  }, []);

  const checkDelete = (_id: string) => {
    modal.confirm({
      title: "¿Esta seguro que desea eliminar este vehiculo?",
      onOk: () => deleteV(_id),
    });
  };

  const deleteV = async (_id: string) => {
    setLoading(true); // ==> Show loading
    try {
      await deleteVehicle(_id);
      get();
      getTypeVeh();
    } catch (e) {
      console.error("||* ==> Error getTypeVehicles <== *||", e);
    }
    setLoading(false); // ==> Hide loading
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Wrapper>
          {contextHolder}
          <div className="title">
            <h1> Vehiculos </h1>
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
            scroll={{ x: 1000 }}
          />
          <Modal show={showModal} onClose={() => initialState()}>
            <Details
              isUpdate={isUpdate}
              onClose={() => initialState()}
              onOk={() => {
                initialState();
                get();
                getTypeVeh();
                alertNotification({
                  msm: "Éxito",
                  description: !isUpdate
                    ? "Se ha ingresado correctamente"
                    : "Se ha modificado correctamente",
                  type: "info",
                });
              }}
              typeVehicles={typeVehicles}
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

  .secouns-icon {
    margin-left: 10px;
  }
`;
export default Vehicles;
