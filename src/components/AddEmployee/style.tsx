import { CButton } from "@coreui/react";
import styled from "styled-components";

export const Button = styled(CButton)`
  /* margin-left: 1rem; */

  @media only screen and (max-width: 30em) {
    display: block;
    width: 100%;
    margin: 0.3rem 0.5rem;
  }
`;
