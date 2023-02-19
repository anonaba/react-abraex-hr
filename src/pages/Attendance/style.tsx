import styled from "styled-components";

import { CButton } from "@coreui/react";
import { NavLink } from "react-router-dom";

// interface timeInProps {
//   istimeInBtnDisplay: boolean;
// }

// interface lunchProps {
//   isLunchBtnDisplay: boolean;
// }

// interface timeOutProps {
//   isTimeOutBtn: boolean;
// }

// interface backBtnProps {
//   isBackBtnDisplay: boolean;
// }
export const DataTableWrapper = styled.div`
  .table th, .table td {
    font-size: 14px;
  };
  
`;

export const TimeDiv = styled.div`
  background-color: #3c4b64;
  color: #FFF;
  padding: 1rem;
  text-align: center;
`;

export const H1 = styled.h1`
  font-size: 40px;
`;

export const P = styled.p`
  font-size: 25px;
  margin-bottom: 1rem;
`;

export const TimeInDiv = styled.div``;

export const TimeInBtn = styled(CButton)`
  margin: 0 auto;
  width: 40%;
  background: #4169E1;
  color: #fff;
`;

export const LunchDiv = styled.div``;

export const LunchBtn = styled(CButton)`
  margin: 0.5rem auto;
  width: 40%;
  background: #F9B115;
  color: #fff;
`;

export const BackDiv = styled.div``;

export const BackBtn = styled(CButton)`
  margin: 0.5rem auto;
  width: 40%;
  background: #9ACD32;
  color: #fff;
`;

export const TimeOutDiv = styled.div``;

export const TimeOutBtn = styled(CButton)`
  margin: 0.5rem auto;
  width: 40%;
  background: #E55353;
  color: #fff;
`;

export const Div = styled.div`
  padding: 3rem;
  text-align: center;
`;

export const H2 = styled.h2`
  font-weight: 500;
  font-size: 20px;
`;

export const ViewMoreNavLink = styled(NavLink)`
  background-color: #321fdb;
  text-decoration: none;
  color: #fff !important;
  font-size: 10px;
  margin: 0 1.75rem 0;
  padding: 0.40rem 0.5rem;
  :hover {
    color: #fff;
    text-decoration: none;
    background-color: #2a1ab9;
  }
  float: right;
  box-shadow: 0 1px 1px 0 rgba(var(--elevation-base-color), .14),
              0 2px 1px -1px rgba(var(--elevation-base-color), .12),
              0 1px 3px 0 rgba(var(--elevation-base-color), .20);
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
              border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  `;