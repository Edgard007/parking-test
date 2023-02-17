import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { Modal as ModalANTD, Tooltip } from "antd";

// ==> Components
import Loading from "../../components/Loading";
import CustomTable from "../../components/Table";
import Modal from "../../components/Modal";
import AddParkings from "./addParking";

// ==> Interfaces
import {
  ParkingResponse,
  ParkingRequest,
} from "../../interfaces/parking.interface";

// ==> Actions
import { getParking, updateParking } from "../../store/actions/parking.action";

// ==> Helpers
import { alertNotification } from "../../helpers/notifications";

const { useModal } = ModalANTD;

const Parking = () => {
  const [modal, contextHolder] = useModal();

  //* ==> STATES <== *//
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // ==> For the storage of arrays
  const [records, setRecords] = useState<object[]>([]);

  const columns = [
    {
      title: "Número Placa",
      dataIndex: "numPlaca",
      align: "center",
      with: 300,
    },
    {
      title: "Fecha de ingreso",
      dataIndex: "startDate",
      align: "center",
      with: 300,
      sorter: {
        compare: (a: ParkingResponse, b: ParkingResponse) =>
          moment(a.startDate, "DD/MM/YYYY HH:mm").valueOf() -
          moment(b.startDate, "DD/MM/YYYY HH:mm").valueOf(),
      },
      defaultSortOrder: "descend",
    },
    {
      title: "Fecha de salida",
      dataIndex: "endDate",
      align: "center",
      with: 300,
      render: (txt: string) => <> {txt || "SIN SALIDA"} </>,
    },
    {
      title: "Registra salida",
      dataIndex: "endDate",
      align: "center",
      with: 100,
      render: (txt: string, record: ParkingResponse) => (
        <>
          {!txt && (
            <Tooltip title="Seleccione registro">
              <img
                src="src/assets/icons/back.png"
                alt={txt}
                className="iconTable"
                onClick={() => checkUpdate(record)}
              />
            </Tooltip>
          )}
        </>
      ),
    },
  ];

  const get = async () => {
    setLoading(true); // ==> Show loading
    try {
      const parking = await getParking();
      setRecords(parking || []);
    } catch (e) {
      console.error("||* ==> Error getParking <== *||", e);
    }
    setLoading(false); // ==> Hide loading
  };

  const checkUpdate = (record: ParkingResponse) => {
    modal.confirm({
      title: "¿Esta seguro que desea dar salida a vehiculo?",
      onOk: () => update(record),
    });
  };

  const update = async (record: ParkingResponse) => {
    setLoading(true); //==> Show loading

    const _id = record?._id;

    const body: ParkingRequest = {
      numPlaca: record?.numPlaca,
      startDate: record?.startDate,
      endDate: moment().format("DD/MM/YYYY HH:mm").toString(),
    };

    const { ok, msg } = await updateParking(_id, body);

    if (ok) {
      get();
      alertNotification({
        msm: "Éxito",
        description: "Se ha dado salida a vehiculo correctamente",
        type: "info",
      });
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
          {contextHolder}
          <div className="title">
            <h1> Registros de ingreso </h1>
          </div>
          <div className="header">
            <button
              type="button"
              className="btn-Secundary"
              onClick={() => setShowModal(true)}
            >
              Registra entrada
            </button>
          </div>
          <CustomTable
            columns={columns}
            data={records}
            loading={false}
            scroll={{ x: 1000 }}
          />
          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <AddParkings
              onClose={() => setShowModal(false)}
              onOk={() => {
                setShowModal(false); // ==> Hide modal
                get();
                alertNotification({
                  msm: "Éxito",
                  description: "Se ha ingresado correctamente",
                  type: "info",
                });
              }}
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
export default Parking;
