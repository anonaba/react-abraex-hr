import styled from "styled-components";
import { CButton } from "@coreui/react";

export const CheckIconButton = styled(CButton)`
  margin-left: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  @media only screen and (max-width: 800px) {
    margin-left: 0;
  }
`;