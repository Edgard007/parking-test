import React, { useEffect, useState } from "react";
import styled from "styled-components";

// ==> Components
import Loading from "../components/Loading";
import CustomTable from "../components/Table";

// ==> Interfaces
import { OfficialVehiclesResponse } from "../interfaces/officialVehicles.interface";

// ==> Actions
import { getOfficialVehicles } from "../store/actions/officialVehicles.action";

const OfficialVehicles = () => {
  //* ==> STATES <== *//
  const [loading, setLoading] = useState(false);

  // ==> For the storage of arrays
  const [records, setRecords] = useState<OfficialVehiclesResponse[]>();

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
      const officialVehicles = await getOfficialVehicles();
      setRecords(officialVehicles || []);
    } catch (e) {
      console.error("||* ==> Error getOfficialVehicles <== *||", e);
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
          <CustomTable columns={columns} data={[]} loading={false} />
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
export default OfficialVehicles;
