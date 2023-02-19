import styled from "styled-components";
import { CButton, CSelect } from "@coreui/react";

export const Button = styled(CButton)`
  font-size: 12px;
`;

export const ParentDiv = styled.div`
  display:flex;
  align-items: center;
`;

export const ChildrenDiv = styled.div`
  margin-right: 0.5rem;
`;

export const Select = styled(CSelect)`
  font-size: 12px !important;
  padding: 0;
  width: 100% !important;
`;