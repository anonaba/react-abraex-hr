import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useLocation } from 'react-router-dom';
import { useEmployeeData } from "hooks/useEmployeeData";
import useEmployeeStats from "hooks/useEmployeeStats";
import {
  CCard,
  CButton,
  CCardBody,
  CCollapse,
  CDataTable,
  CSpinner,
  CCardHeader,
  CBadge,
} from "@coreui/react";
import {
  Div,
  H1,
  H2,
  H3,
  P,
  PayslipCard,
  Table,
  Td,
  Th,
  Tr,
  DataTableWrapper,
  WrapperDiv,
  UserInfoDiv,
  LeaveCard,
  StatsCard,
  Icon,
  PendingRequestCardHeader,
} from "./style";

const cookies = new Cookies();
const accessToken = cookies.get("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
};

const EmployeeStuff: React.FC = () => {
  const location = useLocation();
  const [collapse, setCollapse] = useState(
    location.pathname === "/dashboard" ? false : true
  );
  const [employeeProfile, displayData, userInfo] = useEmployeeData(
    "/user/profile",
    "/team/members",
    "/team/leave",
    config
  );
  const [
    leave,
    overTimetotalHours1,
    overTimetotalMinutes1,
    totalDaysFromHours1,
    resultHours1,
    underTimetotalHours1,
    underTimetotalMinutes1,
    totalDaysFromHours2,
    resultHours2,
    latetotalHours,
    latetotalMinutes,
    totalDaysFromHours3,
    resultHours3,
  ] = useEmployeeStats(
    "/team/attendance",
    "/user/profile",
    "/team/settings",
    "/team/leave",
    config
  );
  const [details, setDetails] = useState(employeeProfile);

  const fields = [
    {
      key: "employeeId",
      _style: { width: "21.5%", color: "#fff", background: "#3f72af" },
    },
    {
      key: "firstName",
      _style: { width: "21.5%", color: "#fff", background: "#3f72af" },
    },
    {
      key: "lastName",
      _style: { width: "21.5%", color: "#fff", background: "#3f72af" },
    },
    {
      key: "position",
      _style: { width: "21.5%", color: "#fff", background: "#3f72af" },
    },
    {
      key: "show_details",
      label: "Action",
      _style: { width: "10%", color: "#fff", background: "#3f72af" },
      sorter: false,
      filter: false,
    },
  ];

  const toggleDetails = (index: any) => {
    const position = details.indexOf(index);
    var newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const toggle = (e: any) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  return (
    <CCard>
      <CCardHeader>Employee Stuff</CCardHeader>
      <CCardBody>
        <DataTableWrapper>
          <CDataTable
            items={employeeProfile}
            fields={fields}
            noItemsViewSlot={
              displayData ? (
                <Div>
                  <H2>No data yet</H2>
                </Div>
              ) : (
                <CSpinner
                  color="primary"
                  className="d-flex justify-content-center my-5"
                  style={{ margin: "auto" }}
                />
              )
            }
            hover
            outlined
            scopedSlots={{
              show_details: (item: any) => {
                return (
                  <td className="py-2">
                    <CButton
                      color={
                        location.pathname === "/dashboard"
                          ? details.includes(item.id)
                            ? "primary"
                            : "danger"
                          : details.includes(item.id)
                          ? "danger"
                          : "primary"
                      }
                      shape="square"
                      size="sm"
                      onClick={() => {
                        toggleDetails(item.id);
                      }}
                    >
                      {location.pathname === "/dashboard"
                        ? details.includes(item.id)
                          ? "View more"
                          : "Hide Details"
                        : details.includes(item.id)
                        ? "Hide Details"
                        : "View more"}
                    </CButton>
                  </td>
                );
              },
              details: (item: any) => {
                var pendingRequest: Array<any> = [];
                pendingRequest = item.pendingRequest;
                return (
                  <CCollapse
                    show={
                      location.pathname === "/dashboard"
                        ? !details.includes(item.id)
                        : details.includes(item.id)
                    }
                  >
                    {userInfo ? (
                      <>
                        <UserInfoDiv>
                          <H1>
                            {item.firstName} {item.lastName}
                          </H1>
                          <P>Position: {item.position}</P>
                        </UserInfoDiv>
                      </>
                    ) : null}
                    <WrapperDiv>
                      <PayslipCard>
                        <PendingRequestCardHeader onClick={toggle}>
                          <div>Pending Request</div>
                          <div>
                            {collapse ? (
                              <Icon size={"sm"} name="cil-caret-top" />
                            ) : (
                              <Icon size={"sm"} name="cil-caret-bottom" />
                            )}
                          </div>
                        </PendingRequestCardHeader>
                        <CCollapse show={collapse}>
                          <Table>
                            <tbody>
                              <Tr>
                                <Th>Reason</Th>
                                <Th>Created Date</Th>
                                <Th>Start Date</Th>
                                <Th>End Date</Th>
                                <Th>Status</Th>
                              </Tr>
                              {pendingRequest.map((requests, index) => {
                                const createdDt = new Date(requests.createdDt);
                                const startDate = new Date(requests.startDate);
                                const endDate = new Date(requests.endDate);
                                return (
                                  <Tr>
                                    <Td>{requests.reason}</Td>
                                    <Td>{createdDt.toDateString()}</Td>
                                    <Td>{startDate.toDateString()}</Td>
                                    <Td>{endDate.toDateString()}</Td>
                                    <Td>
                                      {(requests.approved === 1 && (
                                        <CBadge color="success">
                                          Approved
                                        </CBadge>
                                      )) ||
                                        (requests.rejected === 1 && (
                                          <CBadge color="danger">
                                            Rejected
                                          </CBadge>
                                        )) ||
                                        (requests.approved === 0 &&
                                          requests.rejected === 0 && (
                                            <CBadge color="secondary">
                                              Pending
                                            </CBadge>
                                          ))}
                                    </Td>
                                  </Tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </CCollapse>
                      </PayslipCard>
                      <LeaveCard>
                        <H3>Leave Credits</H3>
                        <Table>
                          <tbody>
                            <Tr>
                              <Td>All</Td>
                              <Td>{leave === null ? "0" : leave}</Td>
                            </Tr>
                          </tbody>
                        </Table>
                      </LeaveCard>
                      <StatsCard>
                        <H3>Stats</H3>
                        <Table>
                          <tbody>
                            <Tr>
                              <Th>Overtime</Th>
                              <Th>Undertime</Th>
                              <Th>Late</Th>
                            </Tr>
                            <Tr>
                              <Td>
                                {overTimetotalHours1 === 0 &&
                                overTimetotalMinutes1 === 0
                                  ? "N/A"
                                  : overTimetotalHours1 === 0 &&
                                    overTimetotalMinutes1 !== 0
                                  ? `${overTimetotalMinutes1} min(s)`
                                  : totalDaysFromHours1 !== 0
                                  ? `${parseInt(
                                      totalDaysFromHours1.toString()
                                    )} day(s), ${resultHours1} hr(s) and ${overTimetotalMinutes1} min(s)`
                                  : `${overTimetotalHours1} hr(s) and ${overTimetotalMinutes1} min(s)`}
                              </Td>
                              <Td>
                                {underTimetotalHours1 === 0 &&
                                underTimetotalMinutes1 === 0
                                  ? "N/A"
                                  : underTimetotalHours1 === 0 &&
                                    underTimetotalMinutes1 !== 0
                                  ? `${underTimetotalMinutes1} min(s)`
                                  : totalDaysFromHours2 !== 0
                                  ? `${parseInt(
                                      totalDaysFromHours2.toString()
                                    )} day(s), ${resultHours2} hr(s) and ${underTimetotalMinutes1} min(s)`
                                  : `${underTimetotalHours1} hr(s) and ${underTimetotalMinutes1} min(s)`}
                              </Td>
                              <Td>
                                {latetotalHours === 0 && latetotalMinutes === 0
                                  ? "N/A"
                                  : latetotalHours === 0 &&
                                    latetotalMinutes !== 0
                                  ? `${latetotalMinutes} min(s)`
                                  : totalDaysFromHours3 !== 0
                                  ? `${parseInt(
                                      totalDaysFromHours3.toString()
                                    )} day(s), ${resultHours3} hr(s) and ${latetotalMinutes} min(s)`
                                  : `${latetotalHours} hr(s) and ${latetotalMinutes} min(s)`}
                              </Td>
                            </Tr>
                          </tbody>
                        </Table>
                      </StatsCard>
                    </WrapperDiv>
                  </CCollapse>
                );
              },
            }}
          />
        </DataTableWrapper>
      </CCardBody>
    </CCard>
  );
};
export default EmployeeStuff;
