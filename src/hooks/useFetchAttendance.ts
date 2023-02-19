import { useState, useEffect, useCallback } from "react";
import Axios from "../axios";
import Cookies from "universal-cookie";
import useLogOut from "hooks/useLogOut";


import { convertTo24Hours } from "utils/utils";

const cookies = new Cookies();
const accessToken = cookies.get("token");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
};

const useFetchAttendance = (
  membersAPI: string,
  attendanceAPI: string,
  profileAPI: string,
  date: any
) => {
  const [employeesData, setEmployeesData] = useState<string[]>([]);
  const [profileUserName, setProfileUserName] = useState<string[]>([]);
  const [attendance, setAttendance] = useState<any>([]);

  const [ setLogOut,setErrMessage] = useLogOut(false);

  const [isSpinnerBtn, setIsSpinnerBtn] = useState<boolean>(false);
  const [isLeave, setIsLeave] = useState<boolean>(false);
  const [hideTimeInBtn, setHideTimeInBtn] = useState<boolean>(true);
  const [showEmployeeData, setShowEmployeeData] = useState<boolean>();

  const [isTimeIn, setIsTimeIn] = useState<boolean>(false);
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [isLunch, setIsLunch] = useState<boolean>(false);
  const [isBack, setIsBack] = useState<boolean>(false);

  const [refreshKey, setRefreshKey] = useState<number>(0);

  const currentDate = date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const fetchAttendanceData = useCallback(async () => {
    try {
      const { data: members } = await Axios.get(membersAPI, config);
      const { data: attendance } = await Axios.get(attendanceAPI, config);
      const { data: profile } = await Axios.get(profileAPI, config);

      /*
       * For disabling time in button if current employee doesnt have schedule
       */

      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let currentDay = weekdays[new Date().getDay()];

      /*
       * if employee take a leave isLeave state will set to true
       * and the timein button will disappear
       */
      for (const person of attendance.data) {
        const { leave, userName } = person;

        if (leave === currentDate && userName === profile.data.userName) {
          setIsLeave(true);
        }
      }

      if (profile.data.Mon === 1 && currentDay === "Mon") {
        setHideTimeInBtn(false);
      } else if (profile.data.Tue === 1 && currentDay === "Tue") {
        setHideTimeInBtn(false);
      } else if (profile.data.Wed === 1 && currentDay === "Wed") {
        setHideTimeInBtn(false);
      } else if (profile.data.Thu === 1 && currentDay === "Thu") {
        setHideTimeInBtn(false);
      } else if (profile.data.Fri === 1 && currentDay === "Fri") {
        setHideTimeInBtn(false);
      } else if (profile.data.Sat === 1 && currentDay === "Sat") {
        setHideTimeInBtn(false);
      } else if (profile.data.Sun === 1 && currentDay === "Sun") {
        setHideTimeInBtn(false);
      }

      setIsSpinnerBtn(false);
      setIsTimeIn(true);
      setProfileUserName(profile.data.userName);

      const getPersonAttendance = attendance.data.map((person: any) => {
        let absent = "N/A",
          lunch = "N/A",
          back = "N/A",
          leave = "N/A",
          employee = "N/A",
          personName = "N/A",
          personLastName = "N/A",
          late: any = "N/A",
          overTime: any = "N/A";

        for (const member of members.data) {
          const { userName, timeIn, timeOut, firstName, lastName } = member;

          if (userName === person.userName) {
            personName = firstName;
            personLastName = lastName;
            employee = `${personName} ${personLastName}`;

            if (person.late === 0) late = "N/A";

            const workingHours = convertTo24Hours(timeIn, person.timeIn);
            const overTimeHours = convertTo24Hours(timeOut, person.timeOut);

            if (person.late === 1) late = workingHours;
            if (overTimeHours !== undefined) overTime = overTimeHours;
          }
        }

        if (person.leave) leave = person.leave;
        if (person.lunchBreak) lunch = person.lunchBreak;
        if (person.lunchBack) back = person.lunchBack;

        return {
          ...person,
          personName,
          personLastName,
          absent,
          leave,
          employee,
          late,
          lunch,
          back,
          overTime,
        };
      });

      // setIsSpinnerBtn(true);
      let filteredEmployeeAttendance: any = getPersonAttendance.filter(
        (filterEmployee: any) =>
          filterEmployee.date === currentDate ||
          filterEmployee.absent === currentDate ||
          filterEmployee.leave === currentDate
      );
      setEmployeesData(filteredEmployeeAttendance);
      
      if (getPersonAttendance.length === 0 || filteredEmployeeAttendance.length === 0) {
        setShowEmployeeData(true);
      } else {
        setShowEmployeeData(false);
      }

      for (let i = 0; i < attendance.data.length; i++) {
        if (
          attendance.data[i].date === currentDate &&
          attendance.data[i].userName === profile.data.userName &&
          attendance.data[i].timeIn !== "N/A"
        ) {
          setIsTimeIn(false);
          setIsLunch(true);
          setIsBack(false);
          setIsTimeOut(true);
        }
        if (
          attendance.data[i].date === currentDate &&
          attendance.data[i].userName === profile.data.userName &&
          attendance.data[i].timeOut !== "N/A"
        ) {
          setIsTimeIn(true);
          setIsLunch(false);
          setIsBack(false);
          setIsTimeOut(false);
        }
        if (
          attendance.data[i].date === currentDate &&
          attendance.data[i].userName === profile.data.userName &&
          attendance.data[i].lunchBreak !== "N/A" &&
          attendance.data[i].lunchBack === "N/A"
        ) {
          setIsTimeIn(false);
          setIsLunch(false);
          setIsBack(true);
          setIsTimeOut(false);
        }
        if (
          attendance.data[i].date === currentDate &&
          attendance.data[i].userName === profile.data.userName &&
          attendance.data[i].lunchBreak !== "N/A" &&
          attendance.data[i].lunchBack !== "N/A"
        ) {
          setIsTimeIn(false);
          setIsLunch(false);
          setIsBack(false);
          setIsTimeOut(true);
        }
        if (
          attendance.data[i].date === currentDate &&
          attendance.data[i].userName === profile.data.userName &&
          attendance.data[i].lunchBack !== "N/A" &&
          attendance.data[i].timeOut !== "N/A"
        ) {
          setIsTimeIn(true);
          setIsLunch(false);
          setIsBack(false);
          setIsTimeOut(false);
        }
        if (
          attendance.data[i].date === currentDate &&
          attendance.data[i].userName === profile.data.userName
        ) {
          setAttendance(attendance.data[i]);
        }
      }
    } catch (error: any) {
      if (error.response.data.status === 401) {
        setErrMessage(error.response.data.error);
        setLogOut(true);
      }
      console.log(error.response.data.message);
    } finally {
      setIsSpinnerBtn(true);
    }
  }, [attendanceAPI, currentDate, membersAPI, profileAPI , setLogOut, setErrMessage]);

  useEffect(() => {
    let timer = setTimeout(() => fetchAttendanceData(), 500);
    return () => {
      clearTimeout(timer);
    };
  }, [refreshKey, fetchAttendanceData]);

  return [
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
  ] as const;
};

export default useFetchAttendance;
