import {
  CCard,
  CCardBody,
  CInput,
  CModal,
  CNavLink,
  CTextarea,
} from "@coreui/react";
import styled from "styled-components";

interface isSmaller {
  smaller: any;
}

export const AnnouncementCard = styled(CCard)`
  /* height: 100%;
  width: 100%; */
  /* margin: 0 !important; */
`;

export const H1 = styled.h1`
  font-size: 18px;
`;

export const ViewMoreAnchor = styled(CNavLink)`
background-color: #321fdb;
  text-decoration: none;
  color: #fff !important;
  font-size: 10px;
  padding: 0.40rem 0.5rem;
  :hover {
    color: #fff;
    text-decoration: none;
    background-color: #2a1ab9;
  }
  box-shadow: 0 1px 1px 0 rgba(var(--elevation-base-color), .14),
              0 2px 1px -1px rgba(var(--elevation-base-color), .12),
              0 1px 3px 0 rgba(var(--elevation-base-color), .20);
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
              border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}`;


export const AnnouncementItems = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #c8c8c8;
  background: #E4E4E4;
`;

export const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const AnnouncementTitle = styled.h1`
  font-weight: 600;
  font-size: 18px;
  color: #000;
`;

export const AnnouncementDate = styled.p`
  color: #000;
`;

export const P = styled.p`
  line-height: 2;
  text-align: justify;
  color: #000;
`;

export const Modal = styled(CModal)`
  margin-top: 5rem !important;
`;

export const InputTitle = styled(CInput)`
  margin-top: 0.5rem;
`;

export const InputDescription = styled(CTextarea)`
  margin-top: 0.5rem;
  height: 150px !important;
`;

export const CardBody = styled(CCardBody)<isSmaller>`
  height: ${({ smaller }) => (smaller ? "22rem !important" : "23rem !important")};
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

export const SpinnerDiv = styled.div`
  padding: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
