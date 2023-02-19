import React, { useState, useEffect, useCallback } from "react";
import Cookies from "universal-cookie";
import axios from "../../axios";
import swal from "sweetalert2";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import { Button, Div, Table, Td, TdEmployee, Th, Thead, Time } from "./style";

const cookies = new Cookies();
const token = cookies.get("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Scheduling = () => {
  const [modal, setModal] = useState(false);
  const [members, setMembers] = useState<any>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchAllMembers = async () => {
    try {
      const { data: response } = await axios.get("/team/members", config);
      setMembers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  let refs: any[][];
  refs = [];
  let inputTimeIn: any[];
  inputTimeIn = [];
  let inputTimeOut: any[];
  inputTimeOut = [];

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let data = [];
    let finalRes = [];

    for (var i = 0; i < members.length; i++) {
      let days: string[] = [];
      let time1: string[] = [];
      let time2: string[] = [];
      data[i] = {
        userId: members[i].id,
        days: days,
        timeIn: time1,
        timeOut: time2,
      };

      for (var j = 0; j < day.length; j++) {
        if (refs[i][j].current.checked) {
          data[i].days.push(day[j]);
        }
      }
      data[i].timeIn.push(inputTimeIn[i].current.value);
      data[i].timeOut.push(inputTimeOut[i].current.value);
    }

    //final output
    for (let k = 0; k < data.length; k++) {
      let Sun = "";
      let Mon = "";
      let Tue = "";
      let Wed = "";
      let Thu = "";
      let Fri = "";
      let Sat = "";
      let time1 = "";
      let time2 = "";
      finalRes[k] = {
        userId: data[k].userId,
        Sun: Sun,
        Mon: Mon,
        Tue: Tue,
        Wed: Wed,
        Thu: Thu,
        Fri: Fri,
        Sat: Sat,
        timeIn: time1,
        timeOut: time2,
      };

      if (
        data[k].days.length !== 0 &&
        data[k].timeIn[0] === "" &&
        data[k].timeOut[0] === ""
      ) {
        finalRes[k].Sun = "0";
        finalRes[k].Mon = "0";
        finalRes[k].Tue = "0";
        finalRes[k].Wed = "0";
        finalRes[k].Thu = "0";
        finalRes[k].Fri = "0";
        finalRes[k].Sat = "0";
        finalRes[k].timeIn = "";
        finalRes[k].timeOut = "";
      } else if (
        data[k].days.length === 0 &&
        data[k].timeIn[0] !== "" &&
        data[k].timeOut[0] !== ""
      ) {
        finalRes[k].Sun = "0";
        finalRes[k].Mon = "0";
        finalRes[k].Tue = "0";
        finalRes[k].Wed = "0";
        finalRes[k].Thu = "0";
        finalRes[k].Fri = "0";
        finalRes[k].Sat = "0";
        finalRes[k].timeIn = "";
        finalRes[k].timeOut = "";
      } else if (
        data[k].days.length !== 0 &&
        data[k].timeIn[0] !== "" &&
        data[k].timeOut[0] === ""
      ) {
        finalRes[k].Sun = "0";
        finalRes[k].Mon = "0";
        finalRes[k].Tue = "0";
        finalRes[k].Wed = "0";
        finalRes[k].Thu = "0";
        finalRes[k].Fri = "0";
        finalRes[k].Sat = "0";
        finalRes[k].timeIn = "";
        finalRes[k].timeOut = "";
      } else if (
        data[k].days.length !== 0 &&
        data[k].timeIn[0] === "" &&
        data[k].timeOut[0] !== ""
      ) {
        finalRes[k].Sun = "0";
        finalRes[k].Mon = "0";
        finalRes[k].Tue = "0";
        finalRes[k].Wed = "0";
        finalRes[k].Thu = "0";
        finalRes[k].Fri = "0";
        finalRes[k].Sat = "0";
        finalRes[k].timeIn = "";
        finalRes[k].timeOut = "";
      } else {
        if (data[k].days.length === 0) {
          finalRes[k].Sun = "0";
          finalRes[k].Mon = "0";
          finalRes[k].Tue = "0";
          finalRes[k].Wed = "0";
          finalRes[k].Thu = "0";
          finalRes[k].Fri = "0";
          finalRes[k].Sat = "0";
        } else {
          for (let l = 0; l < data[k].days.length; l++) {
            if (data[k].days[l] === "Sun") finalRes[k].Sun = "1";
            if (data[k].days[l] === "Mon") finalRes[k].Mon = "1";
            if (data[k].days[l] === "Tue") finalRes[k].Tue = "1";
            if (data[k].days[l] === "Wed") finalRes[k].Wed = "1";
            if (data[k].days[l] === "Thu") finalRes[k].Thu = "1";
            if (data[k].days[l] === "Fri") finalRes[k].Fri = "1";
            if (data[k].days[l] === "Sat") finalRes[k].Sat = "1";
            if (data[k].timeIn[0] !== "")
              finalRes[k].timeIn = inputTimeIn[k].current.value;
            if (data[k].timeOut[0] !== "")
              finalRes[k].timeOut = inputTimeOut[k].current.value;

            if (data[k].days.indexOf("Sun") === -1) finalRes[k].Sun = "0";
            if (data[k].days.indexOf("Mon") === -1) finalRes[k].Mon = "0";
            if (data[k].days.indexOf("Tue") === -1) finalRes[k].Tue = "0";
            if (data[k].days.indexOf("Wed") === -1) finalRes[k].Wed = "0";
            if (data[k].days.indexOf("Thu") === -1) finalRes[k].Thu = "0";
            if (data[k].days.indexOf("Fri") === -1) finalRes[k].Fri = "0";
            if (data[k].days.indexOf("Sat") === -1) finalRes[k].Sat = "0";
          }
        }
      }
    }
    // console.log(finalRes);
    const submitData = {
      schedules: finalRes,
    };

    // console.log(submitData);

    try {
      const { data: response1 } = await axios.post(
        "/team/attendance",
        submitData,
        config
      );
      swal.fire({
        icon: "success",
        text: response1.message,
        showConfirmButton: false,
        timer: 2500,
      });
      setModal(false);
    } catch (error: any) {
      swal.fire({
        icon: "error",
        text: error.message,
      });
      setModal(false);
    }
  };

  const handleRefreshKey = useCallback(() => {
    setRefreshKey((refresh) => refresh + 1);
    setModal(!modal);
  }, [modal]);

  useEffect(() => {
    let timer = setTimeout(() => fetchAllMembers(), 100);
    return () => {
      clearTimeout(timer);
    };
  }, [refreshKey]);

  return (
    <>
      <Button color="primary" onClick={handleRefreshKey}>
        Scheduling
      </Button>
      <CModal
        show={modal}
        onClose={setModal}
        size="xl"
        position-static
        centered
      >
        <form onSubmit={handleSubmit}>
          <CModalHeader>
            <CModalTitle>Scheduling</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <Div>
              <Table>
                <Thead>
                  <tr>
                    <Th>Employee</Th>
                    <Th>Sunday</Th>
                    <Th>Monday</Th>
                    <Th>Tuesday</Th>
                    <Th>Wednesday</Th>
                    <Th>Thursday</Th>
                    <Th>Friday</Th>
                    <Th>Saturday</Th>
                    <Th>Time In</Th>
                    <Th>Time Out</Th>
                  </tr>
                </Thead>
                <tbody>
                  {members.map((items: any, idx: any) => {
                    refs[idx] = [];
                    inputTimeIn[idx] = React.createRef<HTMLInputElement>();
                    inputTimeOut[idx] = React.createRef<HTMLInputElement>();
                    return (
                      <tr>
                        <TdEmployee key={items.id}>
                          {items.firstName} {items.lastName}
                        </TdEmployee>
                        {day.map((days: any, idx2) => {
                          refs[idx][idx2] = React.createRef<HTMLInputElement>();
                          return (
                            <Td>
                              <input
                                type="checkbox"
                                ref={refs[idx][idx2]}
                                name=""
                                defaultChecked={items[days] === "1"}
                                value={days}
                              />
                            </Td>
                          );
                        })}
                        <Td>
                          <Time
                            type="text"
                            ref={inputTimeIn[idx]}
                            name=""
                            placeholder="00:00"
                            pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
                            title="24 hours format"
                            defaultValue={items.timeIn}
                          />
                        </Td>
                        <Td>
                          <Time
                            type="text"
                            ref={inputTimeOut[idx]}
                            name=""
                            placeholder="00:00"
                            pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
                            title="24 hours format"
                            defaultValue={items.timeOut}
                          />
                        </Td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Div>
          </CModalBody>
          <CModalFooter>
            <CButton type="submit" color="primary">
              Submit
            </CButton>
            <CButton color="secondary" onClick={() => setModal(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </form>
      </CModal>
    </>
  );
};

export default Scheduling;
