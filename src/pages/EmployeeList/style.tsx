import { CModal } from "@coreui/react";
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
  .btn-sm, .btn-group-sm > .btn {
    font-size: 10px;
  };
`;

export const Modal = styled(CModal)`
  margin: 30vh auto;
`;

export const Div = styled.div`
  padding: 3rem;
  text-align: center;
`;

export const H1 = styled.h1`
  font-weight: 500;
  font-size: 20px;
`;
