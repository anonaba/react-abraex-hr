import CIcon from "@coreui/icons-react";
import { CImg } from "@coreui/react";
import styled from "styled-components";

export const Img = styled(CImg)`
margin: 0.5rem auto;
@media screen and (max-width: 360px) {
    display: none;
  }
  @media screen and (max-width: 360px) {
    display: none;
  }
`;

export const Icon = styled(CIcon)`
  display: none !important;
  @media screen and (max-width: 360px) {
    margin-left: 1rem;
    display: inline !important;
  }
`;
