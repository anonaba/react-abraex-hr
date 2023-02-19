import { CButton, CForm, CInput, CLabel } from "@coreui/react";
import styled from "styled-components";

export const Button = styled(CButton)`
`;

export const Div1 = styled(CForm)`
    padding: 1rem;
    width: 100%;
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
