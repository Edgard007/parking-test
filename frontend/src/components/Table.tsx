import React from "react";

import styled from "styled-components";

import { Table } from "antd";

interface Props {
  columns: object[];
  data: object[];
  scroll?: object;
  loading?: boolean;
}

/**
 * Custom table component
 * @property {array} columns Table columns
 * @property {array} data Data to display
 * @property {object} scroll Scroll settings
 * @property {boolean} loading Flag to control action "loading".
 */
const CustomTable = ({
  columns = [],
  data = [],
  scroll = {},
  loading = false,
}: Props) => {
  return (
    <Wrapper>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        scroll={scroll}
        pagination={
          data.length > 10
            ? {
                size: "small",
                showSizeChanger: false,
                responsive: true,
              }
            : false
        }
        rowKey={(record: any) => record?.id || ""}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .ant-table-thead > tr > th:first-child {
    border-top-left-radius: 10px !important;
  }

  .ant-table-thead > tr > th:last-child {
    border-top-right-radius: 10px !important;
  }

  .ant-table-thead > tr > th {
    padding: 4px !important;
  }

  .ant-table-thead .ant-table-cell {
    background: var(--color-blue) !important;
    color: var(--color-primary);
    font-weight: bold;
  }

  .ant-table-thead > tr > th::before {
    background-color: var(--color-primary) !important;
  }

  .ant-table-thead > tr > th:last-child {
    border-bottom-right-radius: 10px !important;
  }

  .ant-table-thead > tr > th:first-child {
    border-bottom-left-radius: 10px !important;
  }

  .ant-table-tbody {
    color: var(--color-blue) !important;
    background-color: var(--color-secundary) !important;
    border-radius: 10px !important;
  }

  .ant-table-body > tr > td:last-child {
    border-bottom-right-radius: 10px !important;
  }

  .ant-table-tbody > tr.ant-table-row-selected > td {
    background: var(--color-secundary) !important;
  }

  .ant-table-content {
    border-bottom-right-radius: 10px !important;
    border-bottom-left-radius: 10px !important;
  }

  .ant-table-pagination {
    /* Centrar la paginación */
    display: flex !important;
    justify-content: center !important;
  }

  .ant-pagination-item-active {
    background: var(--color-secundary-gray) !important;
    margin: 0px !important;
  }

  .ant-pagination-item-link {
    margin: 0px !important;
  }

  .ant-pagination-item:not(.ant-pagination-item-active),
  .ant-pagination-prev,
  .ant-pagination-next,
  .custom-item-paginator {
    background: var(--color-gray) !important;
    color: var(--color-blue) !important;
    margin: 0px !important;
  }
  .ant-pagination.mini > li,
  .custom-item-paginator {
    border: 1px solid var(--color-gray) !important;
  }
`;

export default CustomTable;
