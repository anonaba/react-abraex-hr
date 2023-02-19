import { CButton, CCard } from "@coreui/react";
import styled from "styled-components";

export const Button = styled(CButton)`
  /* margin-left: 1rem; */
  @media only screen and (min-width: 30em) {
    margin-left: 1rem;
  }

  @media only screen and (max-width: 30em) {
    display: block;
    width: 100%;
    margin: 0.3rem 0.5rem;
  }
`;

export const Div = styled(CCard)`
  font-family: sans-serif;
  font-size: 0.9rem;
  border: 2px solid #e1e5ee;
  height: 50vh;
  overflow: auto;

  height: 30rem !important;
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

export const Table = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  text-align: center;
`;

export const Th = styled.th`
  padding: 1rem 3rem;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
`;

export const TdEmployee = styled.td`
  padding: 1rem 0.8rem;
  vertical-align: middle;
`;

export const Td = styled.td`
  padding: 1rem;
  text-align: center;
  vertical-align: middle;
  text-align: center;
`;

export const Time = styled.input`
  padding: 0.3rem;
  text-align: center;
  width: 60%;
`;
