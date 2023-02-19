import { CButton, CCard, CFormText, CLabel } from "@coreui/react";
import styled from "styled-components";

export const Div = styled(CCard)`
  border-radius: 10px;
  box-shadow: 1px 1px 5px 1px rgb(0 0 255/ 30%);
  padding: 2.5rem 3.2rem 2.5rem;
  width: 38%;
  margin: 0.5rem auto;
  @media only screen and (max-width: 2000px) {
    width: 35%;
  }
  @media only screen and (max-width: 1280px) {
    width: 43%;
  }
  @media only screen and (max-width: 1000px) {
    width: 45%;
  }
  @media only screen and (max-width: 770px) {
    width: 55%;
  }
  @media only screen and (max-width: 600px) {
    width: 75%;
  }
  @media only screen and (max-width: 500px) {
    width: 85%;
  }
`;

export const Heading = styled.p`
  font-size: 1.3rem;
  margin: 0.1rem 0 0.8rem;
`;

export const SubHeading = styled.p`
  font-size: 14px;
  margin-bottom: 0.8rem;
  text-align: center;
`;

export const Label = styled(CLabel)`
  font-size: 15px;
  margin: 1.3rem auto 0.8rem;
`;

export const Button = styled(CButton)`
  margin: 1rem 0;
  line-height: 22px;
  width: 100%;
`;

export const FormText = styled(CFormText)`
  font-size: 12px;
  font-style: italic;
  height: 0.8rem;
`;
