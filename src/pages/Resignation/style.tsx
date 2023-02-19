import { CBadge, CButton, CCard, CInput, CModal, CTextarea } from "@coreui/react";
import styled from "styled-components";

interface displayProps {
  isDisplay: boolean;
}
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
export const MainCard = styled(CCard)`
  padding: 0;
  min-height: 450px;
`;

export const Card = styled(CCard)`
  margin: 2rem 2rem 0 2rem;
  padding: 1.5rem 3rem;
  @media screen and (max-width: 400px) {
    padding: 1.5rem;
    margin: 2rem 1.2rem 0 1.2rem;
  }
`;

export const Card1 = styled(CCard)<displayProps>`
  display: ${({ isDisplay })=> (isDisplay ? "block" : "none")};
  margin: 2rem;
  padding: 1.5rem 3rem;
  @media screen and (max-width: 400px) {
    padding: 1.5rem;
    margin: 2rem 1.2rem 2rem 1.2rem;
  }
  
`;

export const Label = styled.label`
  font-size: 15px;
  margin: 1rem 0.5rem;
`;

export const Textarea = styled(CTextarea)`
  margin-top: 0.5rem;
  @media screen and (max-width: 660px) {
    margin-left: 1rem;
  }
  @media screen and (max-width: 500px) {
    margin-left: 0;
  }
`;

export const Input = styled(CInput)`
  width: 30%;
  @media screen and (max-width: 1150px) {
    width: 40% ;
  }
  @media screen and (max-width: 660px) {
    width: 50% ;
    margin-left: 1rem;
  }
  @media screen and (max-width: 500px) {
    width: 100% ;
    margin-left: 0;
  }
`;

export const InfoDate = styled(CInput)`
  width: 30%;
  @media screen and (max-width: 1150px) {
    width: 40% ;
  }
  @media screen and (max-width: 660px) {
    width: 50% ;
    margin-left: 1rem;
  }
  @media screen and (max-width: 500px) {
    width: 100% ;
    margin-left: 0;
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
  padding-right: 0;
`;

export const Section = styled.div`
  text-align: center;
  padding: 0.5rem 0 0.5rem;
  align-items: justify;
`;

export const Info = styled.h3`
  font-size: 18px;
  font-weight: 500;
`;

export const Reason = styled.p`
  padding: 1rem 0 2rem 0;
`;

export const Button = styled(CButton)`
  border-radius: 50%;
  margin: 0.5rem 3rem 1rem;
  height: 3.5rem;
  width: 3.5rem;
`;

export const Modal = styled(CModal)`
  margin: 10% auto;
`;

export const Badge = styled(CBadge)`
  padding: 0.5rem;
`;