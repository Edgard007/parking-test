import React from "react";
import styled from "styled-components";
import { Modal } from "antd";

interface Props {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * Custom modal component
 * @property {boolean} show Modal Control Flag (Mostar/Hide)
 * @property {fuction} onClose Function to be executed when closing modal
 * @property {<></>} children Wrapper
 */
const CustomModal = ({ show, onClose, children }: Props) => {
  return (
    <>
      <Modal
        title={false}
        open={show}
        onCancel={onClose}
        footer={null}
        bodyStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
        destroyOnClose={true}
        width={800}
      >
        {children}
      </Modal>
    </>
  );
};

const Wrapper = styled.div`
  
`;

export default CustomModal;
