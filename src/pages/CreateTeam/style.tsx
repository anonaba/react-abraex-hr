import { CButton, CCard, CCol, CFormText, CRow } from "@coreui/react";
import styled from "styled-components";

export const Container = styled(CCard)`
  margin: 1rem auto;
  border: 1px solid black;
  min-height: 500px;
  @media screen and (min-width: 1520px) {
    width: 100%;
    max-width: 820px;
  }
`;

export const Heading = styled.h1`
  font-size: 18px;
  margin: 1rem 0;
  @media only screen and (max-width: 650px) {
    font-size: 18px;
    font-weight: 500;
  }
`;

export const Form = styled.form`
  padding: 1rem 2.2rem;
`;

export const Row = styled(CRow)`
  align-items: center;
`;

export const Col = styled(CCol)`
  padding: 0.5rem 0.2rem;
`;

export const Label = styled.label`
  font-size: 15px;
`;

export const Span = styled.span`
  margin-left: 5px;
  color: red;
`;

export const FormText = styled(CFormText)`
  font-size: 11px;
  padding: 0 10px;
`;

export const Div = styled.div`
  text-align: center;
`;

export const Button = styled(CButton)`
  margin: 2rem;
  width: 40%;
  padding: 0.5rem 1rem;
`;
