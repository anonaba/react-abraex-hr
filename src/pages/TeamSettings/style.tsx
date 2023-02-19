import { CButton, CCard, CForm, CInput, CLabel } from "@coreui/react";
import styled from "styled-components";

export const Div = styled(CCard)`
  width: 50%;
  margin: 2% auto;
  padding-bottom: 1rem;
  @media screen and (max-width: 1280px) {
    width: 90%;
  }

  @media screen and (max-width: 400px) {
    width: 100%;
  }
`;

export const Div1 = styled(CForm)`
  /* padding: 2.5rem 4rem 1rem; */
  padding: 1rem 2.2rem;
  width: 100%;

  @media screen and (max-width: 400px) {
    padding: 1rem 0.5rem;
  }
`;

export const Div2 = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
`;

export const Label = styled(CLabel)`
  font-size: 16px;
  width: 50%;
  line-height: 25px;
  @media screen and (max-width: 1280px) {
    width: 45%;
  }
`;

export const Input = styled(CInput)`
  height: 30px;
  width: 45%;
  @media screen and (max-width: 1280px) {
    width: 60%;
  }
`;

export const ButtonDiv = styled.div`
  width: 70%;
  margin: 3rem auto;
  text-align: center;
`;

export const ConfirmButton = styled(CButton)`
  /* width: 50%; */

  /* @media screen and (max-width: 1280px) {
    width: 300px;
  } */
`;

export const FlexDiv = styled.div`
  display: flex;
  padding: 10rem;
  justify-content: center;
`;