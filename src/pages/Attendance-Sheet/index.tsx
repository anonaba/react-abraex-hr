import React, { useState, useEffect } from "react";
import axios from "../../axios";
import Cookies from "universal-cookie";
import useLogOut from "hooks/useLogOut";

import {
  CCard,
  CCardHeader,
  CCardBody,
  CDataTable,
  CSpinner,
} from "@coreui/react";

import {
  Div,
  H1,
  DataTableWrapper,
} from "./style";

const cookies = new Cookies();
const token = cookies.get("token");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const fields = [
  {
    key: "employee",
    _style: { color: "#fff", background: "#3f72af" },
  },
  {
    key: "timeIn",
    _style: { color: "#fff", background: "#3f72af" },
  },
  {
    key: "timeOut",
    _style: { color: "#fff", background: "#3f72af" },
  },
  {
    key: "date",
    _style: { color: "#fff", background: "#3f72af" },
  },
  {
    key: "absent",
    _style: { color: "#fff", background: "#3f72af" },
  },
  {
    key: "late",
    _style: { color: "#fff", background: "#3f72af" },
  },
  {
    key: "leave",
    _style: { color: "#fff", background: "#3f72af" },
  },
];

const AttendanceSheet: React.FC = () => {
  const [details, setDetails] = useState<string[]>([]);
  const [display, setDisplay] = useState<boolean>();
  const [ setLogOut,setErrMessage] = useLogOut(false);

  //useEffect for table
  useEffect(() => {
    const tableFunction = async () => {
      //fetching name
      try {
        const { data: response } = await axios.get("/team/members", config);
        const { data: response1 } = await axios.get("/team/attendance", config);
        const newData = response1.data.map((item: any) => {
          const convertTime12to24 = (endTime: any, startTime: any) => {
            const [time, modifier] = endTime.split(" ");
            const [time1] = startTime.split(" ");

            let [hours, minutes] = time.split(":");
            let [hours1, minutes1] = time1.split(":");

            if (hours === "12") {
              hours = "00";
            }

            if (modifier === "pm") {
              hours = parseInt(hours, 10) + 12;
            }

            let hoursResult = hours - hours1;
            let minutesResult = minutes - minutes1;

            if (hoursResult === 0) return `${minutesResult} min(s)`;
            if (hoursResult >= 1 && minutesResult >= 1)
              return `${hoursResult} hr(s) and ${minutesResult} min(s)`;
            if (hoursResult >= 1 && minutesResult === 0)
              return `${hoursResult} hr(s)`;
          };

          let absent = "N/A",
            leave = "N/A",
            timeIn = "N/A",
            timeOut = "N/A",
            employee = "N/A",
            firstName = "N/A",
            lastName = "N/A",
            lunch = "N/A",
            late: any = "N/A",
            back = "N/A";
          if (item.absent) absent = item.absent;
          for (let m = 0; m < response.data.length; m++) {
            if (response.data[m].userName === item.userName) {
              if (item.late === 0) late = "N/A";

              let result: any = convertTime12to24(
                item.timeIn,
                response.data[m].timeIn
              );
              if (item.late === 1) late = result;
            }
          }
          if (item.leave) leave = item.leave;
          if (item.timeIn) timeIn = item.timeIn;
          if (item.timeOut) timeOut = item.timeOut;
          if (item.lunchBreak) lunch = item.lunchBreak;
          if (item.lunchBack) back = item.lunchBack;
          // TODO get value of first name and lastname from members by userName
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].userName === item.userName) {
              firstName = response.data[i].firstName;
              lastName = response.data[i].lastName;
              employee = firstName + " " + lastName;
            }
          }
          return {
            ...item,
            timeIn,
            timeOut,
            absent,
            leave,
            employee,
            lunch,
            back,
            late,
          };
        });
        setDetails(newData);
        if (newData.length === 0) {
          setDisplay(true);
        } else {
          setDisplay(false);
        }
      } catch (error : any) {
        if (error.response.data.status === 401) {
          setErrMessage(error.response.data.error);
          setLogOut(true);
        }
        console.log(error.response.data);
      }
    };

    tableFunction();
  }, [setLogOut,setErrMessage]);

  return (
    <CCard style={{ height: "100%", width: "100%" }}>
      <CCardHeader>Attendance Sheet</CCardHeader>
      <CCardBody>
        <DataTableWrapper>
          <CDataTable
            items={details}
            fields={fields}
            striped
            itemsPerPage={5}
            itemsPerPageSelect
            pagination
            outlined
            sorter
            tableFilter
            columnFilter
            noItemsViewSlot={
              display ? (
                <Div>
                  <H1>No data yet</H1>
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
    </CCard>
  );
};

export default AttendanceSheet;
