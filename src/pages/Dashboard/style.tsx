import styled from "styled-components";
import {
    CContainer,
} from "@coreui/react";

export const Container = styled(CContainer)`
  padding: 0rem;
`;

export const H1 = styled.h1`
  font-size: 18px;
`;

export const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const AnnouncementItems = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #c8c8c8;
  background: #e4e4e4;
`;

export const AnnouncementTitle = styled.h1`
  font-weight: 600;
  font-size: 18px;
`;

export const AnnouncementDate = styled.p`
  color: #9da5b1;
`;

export const P = styled.p`
  line-height: 2;
  text-align: justify;
`;

export const SpinnerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem
`;