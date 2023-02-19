import {
  CButton,
  CCard,
  CCol,
  CForm,
  CFormText,
  CInput,
  CRow,
  CTextarea,
} from "@coreui/react";
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

export const Form = styled(CForm)`
  padding: 1rem 2.2rem;
`;

export const Heading = styled.h1`
  font-size: 18px;
  margin: 1rem 0;
  @media only screen and (max-width: 650px) {
    font-size: 18px;
    font-weight: 500;
  }
`;

export const Row = styled(CRow)`
  align-items: center;
`;

export const Label = styled.label`
  font-size: 15px;
  padding-top: 0.8rem;
  margin-bottom: 1.5rem;
`;

export const Span = styled.span`
  margin-left: 5px;
  color: red;
`;

export const FormText = styled(CFormText)`
  font-size: 11px;
  padding: 0 10px;
`;

export const Col = styled(CCol)`
  padding: 0.5rem 0.2rem;
`;

export const TextArea = styled(CTextarea)`
  border: 1px lightgray solid;
  padding: 5px 8px;
  margin: 5px;
  width: 100%;
  word-wrap: break-word;
  word-break: break-all;
`;

export const Div = styled.div`
  text-align: center;
`;

export const Button = styled(CButton)`
  margin: 2rem;
  width: 40%;
  padding: 0.5rem 1rem;
`;

export const Submit = styled(CInput)`
  width: 40%;
  margin: 2rem auto;
  border: 2px solid #4169e1;
  &:hover {
    color: #fff;
    background: #4169e1;
  }
  @media only screen and (max-width: 540px) {
    width: 100%;
  }
`;
