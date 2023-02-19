import React, { useState, useEffect } from "react";
import axios from "../../axios";
import swal from "sweetalert2";
import Cookies from "universal-cookie";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CDataTable,
  CSpinner,
} from "@coreui/react";
import {
  TimeDiv,
  H1,
  P,
  TimeInDiv,
  TimeInBtn,
  LunchDiv,
  LunchBtn,
  BackDiv,
  BackBtn,
  TimeOutDiv,
  TimeOutBtn,
  Div,
  H2,
  DataTableWrapper,
  ViewMoreNavLink,
} from "./style";
import useButtonLoading from "hooks/useButtonLoading";
import useFetchAttendance from "hooks/useFetchAttendance";

const fields = [
  {
    key: "employee",
    _style: { color: "#fff", background: "#3f72af" },
  },
  {
    key: "date",
    _style: { color: "#fff", background: "#3f72af" },
  },
  {
    key: "timeIn",
    _style: { color: "#fff", background: "#3f72af" },
  },
  {
    key: "lunch",
    _style: { color: "#fff", background: "#3f72af" },
  },
  {
    key: "back",
    _style: { color: "#fff", background: "#3f72af" },
  },
  {
    key: "timeOut",
    _style: { color: "#fff", background: "#3f72af" },
  },
  {
    key: "late",
    _style: { color: "#fff", background: "#3f72af" },
  },
  {
    key: "overTime",
    _style: { color: "#fff", background: "#3f72af" },
  },
  {
    key: "leave",
    _style: { color: "#fff", background: "#3f72af" },
  },
  {
    key: "absent",
    _style: { color: "#fff", background: "#3f72af" },
  }
];

const cookies = new Cookies();
const accessToken = cookies.get("token");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
};

const Attendance: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [clock, setClock] = useState("");
  // const [timeInBtn, setTimeInBtn] = useState<boolean>();

  const [isTimeBtnLoading, setIsTimeBtnLoading] = useButtonLoading(false);
  const [
    employeesData,
    profileUserName,
    attendance,
    isSpinnerBtn,
    isTimeIn,
    isTimeOut,
    isLunch,
    isBack,
    showEmployeeData,
    hideTimeInBtn,
    isLeave,
    currentDate,
    setIsTimeIn,
    setIsLunch,
    setIsBack,
    setIsTimeOut,
    setRefreshKey,
  ] = useFetchAttendance(
    "/team/members",
    "/team/attendance",
    "/user/profile",
    date
  );

  //useEffect for displaying time
  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClock(date.toLocaleTimeString());
    }, 1000);
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const handleTimeIn = () => {
    setIsTimeBtnLoading(true);
    if (
      attendance.date === currentDate &&
      attendance.userName === profileUserName &&
      attendance.timeIn !== "N/A" &&
      attendance.timeOut !== "N/A"
    ) {
      swal
        .fire({
          icon: "error",
          text: "You can login once per day",
        })
        .then(() => {
          setIsTimeBtnLoading(false);
        });
    } else {
      const postTimeinAPI = async () => {
        try {
          const { data: timeIn } = await axios.post(
            "/team/time-in",
            null,
            config
          );
          swal
            .fire({
              icon: "success",
              text: timeIn.message,
              showConfirmButton: false,
              timer: 2500,
            })
            .then(() => {
              setIsTimeBtnLoading(false);
            });
        } catch (error) {
          console.log(error);
        } finally {
          setIsTimeIn(false);
          setIsLunch(true);
          setIsBack(false);
          setIsTimeOut(true);

          /*
           * setRefreshKey calls the fetchAttendanceData reside in useEffect hook
           */
          setRefreshKey((refresh: number) => refresh + 1);
        }
      };
      postTimeinAPI();
    }
  };

  const handleLunchButton = () => {
    setIsTimeBtnLoading(true);
    const postBreakAPI = async () => {
      try {
        const { data: lunchBreak } = await axios.post(
          "/team/lunch-break",
          null,
          config
        );
        swal
          .fire({
            icon: "success",
            text: lunchBreak.message,
            showConfirmButton: false,
            timer: 2500,
          })
          .then(() => {
            setIsTimeBtnLoading(false);
          });
      } catch (error) {
        console.log(error);
      } finally {
        setIsTimeIn(false);
        setIsLunch(false);
        setIsBack(true);
        setIsTimeOut(false);

        /*
         * setRefreshKey calls the fetchAttendanceData reside in useEffect hook
         */
        setRefreshKey((refresh: number) => refresh + 1);
      }
    };
    postBreakAPI();
  };

  const handleBackButton = () => {
    setIsTimeBtnLoading(true);
    const postBackAPI = async () => {
      try {
        const { data: back } = await axios.post(
          "/team/lunch-back",
          null,
          config
        );
        swal
          .fire({
            icon: "success",
            text: back.message,
            showConfirmButton: false,
            timer: 2500,
          })
          .then(() => {
            setIsTimeBtnLoading(false);
          });
      } catch (error) {
        console.log(error);
      } finally {
        setIsTimeIn(false);
        setIsLunch(false);
        setIsBack(false);
        setIsTimeOut(true);

        /*
         * setRefreshKey calls the fetchAttendanceData reside in useEffect hook
         */
        setRefreshKey((refresh: number) => refresh + 1);
      }
    };
    postBackAPI();
  };

  const handleTimeOut = () => {
    setIsTimeBtnLoading(true);
    const postTimeOutAPI = async () => {
      try {
        const { data: timeOut } = await axios.post(
          "/team/time-out",
          null,
          config
        );
        swal
          .fire({
            icon: "success",
            text: timeOut.message,
            showConfirmButton: false,
            timer: 2500,
          })
          .then(() => {
            setIsTimeBtnLoading(false);
          });
      } catch (error) {
        console.log(error);
      } finally {
        setIsTimeIn(true);
        setIsLunch(false);
        setIsBack(false);
        setIsTimeOut(false);

        /*
         * setRefreshKey calls the fetchAttendanceData reside in useEffect hook
         */
        setRefreshKey((refresh: number) => refresh + 1);
      }
    };
    postTimeOutAPI();
  };

  return (
    <CCard style={{ height: "100%", width: "100%" }}>
      <CCardHeader>Attendance</CCardHeader>
      <CCardBody>
        <TimeDiv>
          <H1>{clock}</H1>
          <P>
            {date.toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </P>
          {isLeave ? (
            ""
          ) : (
            <>
              {hideTimeInBtn ? (
                ""
              ) : (
                <>
                  {isSpinnerBtn ? (
                    <>
                      {isTimeIn ? (
                        <TimeInDiv>
                          <TimeInBtn
                            disabled={isTimeBtnLoading ? true : false}
                            block
                            variant="outline"
                            onClick={handleTimeIn}
                          >
                            {isTimeBtnLoading ? (
                              <CSpinner size="sm" />
                            ) : (
                              "Time In"
                            )}
                          </TimeInBtn>
                        </TimeInDiv>
                      ) : null}
                      {isLunch ? (
                        <LunchDiv>
                          <LunchBtn
                            block
                            variant="outline"
                            onClick={handleLunchButton}
                          >
                            {isTimeBtnLoading ? (
                              <CSpinner size="sm" />
                            ) : (
                              "Lunch"
                            )}
                          </LunchBtn>
                        </LunchDiv>
                      ) : null}
                      {isBack ? (
                        <BackDiv>
                          <BackBtn
                            block
                            variant="outline"
                            onClick={handleBackButton}
                          >
                            {isTimeBtnLoading ? <CSpinner size="sm" /> : "Back"}
                          </BackBtn>
                        </BackDiv>
                      ) : null}
                      {isTimeOut ? (
                        <TimeOutDiv>
                          <TimeOutBtn
                            disabled={isTimeBtnLoading ? true : false}
                            block
                            variant="outline"
                            onClick={handleTimeOut}
                          >
                            {isTimeBtnLoading ? (
                              <CSpinner size="sm" />
                            ) : (
                              "Time Out"
                            )}
                          </TimeOutBtn>
                        </TimeOutDiv>
                      ) : null}
                    </>
                  ) : (
                    <CSpinner color="primary" style={{ margin: "auto" }} />
                  )}
                </>
              )}
            </>
          )}
        </TimeDiv>
        <DataTableWrapper>
          <CDataTable
            items={employeesData}
            fields={fields}
            itemsPerPage={5}
            pagination
            outlined
            noItemsViewSlot={
              showEmployeeData ? (
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
          />
        </DataTableWrapper>
      </CCardBody>
      <CCardFooter>
        <ViewMoreNavLink to="/attendance-sheet">View more</ViewMoreNavLink>
      </CCardFooter>
    </CCard>
  );
};

export default Attendance;
