import { 
  CBadge,
    CButton,
    CInput,
    CModal,
    CSelect,
    CTextarea,
} from "@coreui/react";
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
  }
`;
export const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const P = styled.p`
    margin-bottom: 0.5rem;
`;

export const CenterDiv = styled.div`
    width: 100%;
    text-align:center;
`;

export const ButtonText = styled.p`
  font-size: 15px;
`;

export const Button = styled(CButton)`
  margin: 0 1rem !important;
  padding: 0.5rem;
  font-size: 15px;
  width: 20%;
`;

export const Modal = styled(CModal)`
  margin-top: 5rem !important;
`;

export const Input = styled(CInput)`
  margin-top: 0.3rem !important;
`;

export const Select = styled(CSelect)`
  margin-top: 0.3rem !important;
`;

export const InputDescription = styled(CTextarea)`
  margin-top: 0.5rem;
  height: 150px !important;
`;

export const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media only screen and (max-width: 1080px) {
    display: block;
  }
`;

export const Badge = styled(CBadge)`
  margin-bottom: 0 !important;

  @media only screen and (max-width: 1080px) {
    margin-bottom: 0.5rem !important;
  }
`;

export const Div = styled.div`
  padding: 3rem;
  text-align: center;
`;

export const H1 = styled.h1`
  font-weight: 500;
  font-size: 20px;
`;

export const ScrollableDiv = styled.div`
  height: 20rem !important;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 8px;
    height: 7px;
  }

  ::-webkit-scrollbar-thumb {
    background: lightgray;
    border-radius: 0;
  }
`;