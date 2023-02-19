import React from "react";
import styled from "styled-components";

import { CCard, CCardBody, CCardHeader } from "@coreui/react";

const AnnouncementDiv = styled.div`
  padding: 1rem;

  @media only screen and (max-width: 600px) {
    display: block;
    padding: 0;
    margin-top: 1rem;
  }
`;

const CardBody = styled(CCardBody)`
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

type Props = {
  allAnnouncements: any;
};
const DashboardAnnouncement: React.FC<Props> = ({
  allAnnouncements,
}: Props) => {
  return (
    <AnnouncementDiv>
      <CCard>
        <CCardHeader>Latest Announcement</CCardHeader>
        <CardBody>{allAnnouncements}</CardBody>
      </CCard>
    </AnnouncementDiv>
  );
};

export default DashboardAnnouncement;
