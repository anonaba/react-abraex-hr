
import CIcon from "@coreui/icons-react";
import { CCard } from "@coreui/react";
import styled from "styled-components";

export const Div = styled(CCard)`
  width: 90%;
  height: 100%;
  margin: auto;
`;

export const Header = styled.header`
  padding: 1rem;
`;

export const H1 = styled.h1`
  font-size: 18.5px;
  font-weight: 600;
  text-align: center;
  margin: 2rem auto 0rem;
`;

export const Section = styled.div`
  padding: 1rem 0.5rem;
  margin: 0.2rem 1rem;
`;

export const QSection = styled.div`
display: flex;
justify-content: space-between;
border-bottom: 0.5px solid #ebebeb;
&:hover {
  cursor: pointer;
  color: #3f72af;
} 
`;

export const Div1 = styled.div`
  padding: 0.8rem 2.5rem 1.5rem;
  @media screen and (max-width: 1520px) {
    padding: 0.8rem 1rem 1.5rem;
  }
`;

export const Question = styled.h3`
  font-weight: 400;
  font-size: 15px;
  margin-bottom: 0.5rem;
`;

export const Answer = styled.p`
  font-size: 14px;
  line-height: 18px;
  padding: 0.5rem;
`;

export const Icon = styled(CIcon)`
transform: scale(0.8);
`;