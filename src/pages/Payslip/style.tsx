import { CCard, CImg } from "@coreui/react";
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
  }
`;
export const Logo = styled(CImg)`
  display: block;
  margin: 1rem auto 1rem;
`;

export const PayslipCard = styled(CCard)`
  margin: 1rem;
  border: 2px solid rgb(128, 128, 128);
`;

export const H5 = styled.h5`
  font-size: 14px;
  font-weight: 600;
  color: #696969;
  color: gray;
`;
export const SwitchDiv = styled.div`
  display: flex;
  justify-items: center;
`;
export const H3 = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #696969;
  text-align: center;
  margin-bottom: 3rem;
`;

export const InfoDivRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const InfoDivColumn = styled.div`
  margin: 0 1rem 0;
  width: 46%;
  display: flex;
  flex-direction: column;
`;
export const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const Hr = styled.hr`
  height: 2px;
  border-width: 0;
  color: gray;
  background-color: gray;
`;
export const P = styled.p`
  font-size: 12px;
  color: #696969;
  margin: 0.5rem 0 0.5rem;
  font-weight: 400;
`;

export const Div = styled.div`
  padding: 3rem;
  text-align: center;
`;

export const H1 = styled.h1`
  font-weight: 500;
  font-size: 20px;
`;
