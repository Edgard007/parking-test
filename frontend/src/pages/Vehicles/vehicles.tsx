import React, { useEffect, useState } from "react";
import styled from "styled-components";

// ==> Components
import Loading from "../../components/Loading";
import CustomTable from "../../components/Table";

// ==> Interfaces
import { VehiclesResponse } from "../../interfaces/vehicles.interface";

// ==> Actions
import { getVehicles } from "../../store/actions/vehicles.action";

const Vehicles = () => {
  //* ==> STATES <== *//
  const [loading, setLoading] = useState(false);

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
      dataIndex: "entryDate",
      align: "center",
      with: 300,
    },
    {
      title: "Actions",
      dataIndex: "status",
      align: "center",
      with: 100,
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
            <h1> Vehiculos oficiales </h1>
          </div>
          <CustomTable columns={columns} data={records} loading={false} />
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
`;
export default Vehicles;
