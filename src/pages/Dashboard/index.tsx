import React, { FC, useState, useEffect, useCallback } from "react";
import Widget from "../../components/Widget";
import Graph from "../../components/Graph";
import Announcement from "../../components/Announcement";
import DashboardAnnouncement from "../../components/Announcement/Dashboard-Announcements";
import axios from "../../axios";
import Cookies from "universal-cookie";
import useLogOut from "hooks/useLogOut";
import Attendance from "../Attendance";
import AttendanceSheet from "../Attendance-Sheet";
import useCheckProfile from "hooks/useCheckProfile";
import {
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CRow,
  CCol,
  CSpinner,
} from "@coreui/react";
import {
  AnnouncementDate,
  AnnouncementItems,
  AnnouncementTitle,
  Container,
  FlexDiv,
  P,
  SpinnerDiv,
} from "./style";
import ResolutionCenter from "pages/Resolution-Center";
import EmployeeStuff from "pages/EmployeeStuff";

const cookies = new Cookies();
const token = cookies.get("token");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};
const Dashboard: FC = () => {
  const [isLoading, isAdmin] = useCheckProfile();
  const [announcements, setAnnouncements] = useState<any>([]);
  const [refreshkey, setRefreshKey] = useState(0);
  const [setLogOut, setErrMessage] = useLogOut(false);
  const fetchAnnouncement = useCallback(
    async () => {
      await axios
        .get("/dashboard/announcement", config)
        .then((res3) => {
          setAnnouncements(res3.data.data);
        })
        .catch((error : any) => {
          if (error.response.data.status === 401) {
            setErrMessage(error.response.data.error);
            setLogOut(true);
          }
          console.log(error.response.data.message);
        });
    },
    [setLogOut, setErrMessage],
  )

  const handleRefreshKey = useCallback(() => {
    setRefreshKey((refresh) => refresh + 1);
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => fetchAnnouncement(), 500);
    return () => {
      clearTimeout(timer);
    };
  }, [refreshkey,fetchAnnouncement]);
  return (
    <>
      <main className="c-name">
        <Container fluid>
          <CTabs activeTab="dashboard">
            <CNav variant="tabs">
              <CNavItem>
                <CNavLink data-tab="dashboard">Dashboard</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="announcements" onClick={handleRefreshKey}>
                  Announcements
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane data-tab="dashboard">
                <Widget />
                <CRow>
                  <CCol xs="12" lg="6">
                    <Graph />
                  </CCol>
                  <CCol xs="12" lg="6">
                    <Announcement onclick={handleRefreshKey} />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" lg="12">
                    <div>
                      {isLoading ? (
                        <SpinnerDiv>
                          <CSpinner size="lg" />
                        </SpinnerDiv>
                      ) : isAdmin ? (
                        <AttendanceSheet />
                      ) : (
                        <Attendance />
                      )}
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  {isAdmin ? null : (
                    <CCol xs="12" lg="12">
                      {isLoading ? (
                        <SpinnerDiv>
                          <CSpinner size="lg" />
                        </SpinnerDiv>
                      ) : (
                        <EmployeeStuff />
                      )}
                    </CCol>
                  )}
                </CRow>
                <CRow>
                  <CCol xs="12">
                    {isLoading ? (
                      <SpinnerDiv>
                        <CSpinner size="lg" />
                      </SpinnerDiv>
                    ) : (
                      <ResolutionCenter />
                    )}
                  </CCol>
                </CRow>
              </CTabPane>
              <CTabPane data-tab="announcements">
                <DashboardAnnouncement
                  allAnnouncements={announcements.map(
                    (items: any, idx: any) => {
                      const timestamp = items.createdDt;
                      const timeFiled = new Date(timestamp).toLocaleString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      );
                      return (
                        <AnnouncementItems key={idx}>
                          <FlexDiv>
                            <AnnouncementTitle>{items.title}</AnnouncementTitle>
                            <AnnouncementDate>{timeFiled}</AnnouncementDate>
                          </FlexDiv>
                          <P>{items.description}</P>
                        </AnnouncementItems>
                      );
                    }
                  )}
                />
              </CTabPane>
            </CTabContent>
          </CTabs>
        </Container>
      </main>
    </>
  );
};

export default Dashboard;
