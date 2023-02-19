import { CButton, CCard, CModal } from "@coreui/react";
import styled from "styled-components";

export const DataTableWrapper = styled.div`
  .table th, .table td {
  font-size: 13px;
  };
  .c-datatable-filter {
    font-size: 14px;
  };
  .c-datatable-items-per-page {
    font-size: 14px;
  };
  .btn {
    font-size: 10px;
  };
`;


export const Div1 = styled(CCard)`
  background: #fff;
  border-radius: 5px;
  margin: 2rem auto;
  width: 75%;
`;

export const Title = styled.p`
  font-size: 18px;
  font-weight: 500;
  padding: 0;
  text-align: center;
  margin: 0.8rem;
`;

export const Button = styled(CButton)`
  border-radius: 50%;
  margin: 0.5rem 3rem 1rem;
  height: 3.5rem;
  width: 3.5rem;
`;

export const Name = styled.h3`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const Status = styled.p`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const Status1 = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const InfoSection = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.6rem;
`;

export const Info = styled.p`
  font-size: 14px;
  margin-bottom: 0.5rem;
`;

export const InfoSection1 = styled.div`
  text-align: center;
  padding: 0.5rem 0 0.5rem;
  align-items: justify;
`;

export const Info1 = styled.p`
  font-size: 14px;
  margin: 0.5rem 0 1rem;
`;

export const Info2 = styled.p`
  font-size: 14px;
  margin-bottom: 1.5rem;
`;

export const Sub = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;

export const Modal = styled(CModal)`
  margin: 10% auto;
`;


export const Div = styled.div`
  padding: 3rem;
  text-align: center;
`;

export const H1 = styled.h1`
  font-weight: 500;
  font-size: 20px;
`;