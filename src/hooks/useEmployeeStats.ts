import { useState, useEffect } from "react";
import axios from "../axios";
import useLogOut from "hooks/useLogOut";

const useEmployeeStats = (
  attendanceAPI: string,
  profileAPI: string,
  settingsAPI: string,
  leaveAPI: string,
  config: object
) => {
  const [setLogOut, setErrMessage] = useLogOut(false);
  const [leave, setLeave] = useState<any>(0);
  const [overTime, setOverTime] = useState([]);
  const [underTime, setunderTime] = useState([]);
  const [late, setLate] = useState([]);

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        const { data: teamAttendance } = await axios.get(attendanceAPI, config);
        const { data: userProfile } = await axios.get(profileAPI, config);
        const { data: teamSettings } = await axios.get(settingsAPI, config);
        const { data: teamLeave } = await axios.get(leaveAPI, config);

        //for leave credits data
        const filteredOwnersLeaveArray: any = [];
        for (const leave of teamLeave.data) {
          leave.owner === userProfile.data.id &&
            leave.approved === 1 &&
            filteredOwnersLeaveArray.push(leave);
        }
        let totalLeaveCredit =
          parseInt(teamSettings.data.privilegeLeave) -
          filteredOwnersLeaveArray.length;
        setLeave(totalLeaveCredit ? totalLeaveCredit : "0");

        //for filtering undertime, overtime and late of specific account
        let filteredOverTimeArray: any = [];
        let filteredUnderTimeArray: any = [];
        let filteredLateArray: any = [];
        for (const attendance of teamAttendance.data) {
          if (
            userProfile.data.userName === attendance.userName &&
            attendance.timeOut !== "N/A"
          ) {
            const [attendanceTimeOut, modifier] = attendance.timeOut.split(" ");
            const [profileTimeOut] = userProfile.data.timeOut.split(" ");
            const [attendanceTimeIn, latemodifier] =
              attendance.timeIn.split(" ");
            const [profileTimeIn] = userProfile.data.timeIn.split(" ");
            let [attendanceHours, attendanceMinutes] =
              attendanceTimeOut.split(":");
            let [profileHours, profileMinutes] = profileTimeOut.split(":");
            let [attendanceTimeInHours, attendanceTimeInMinutes] =
              attendanceTimeIn.split(":");
            let [profileTimeInHours, profileTimeInMinutes] =
              profileTimeIn.split(":");

            attendanceHours === "12" && (attendanceHours = "00");
            modifier === "pm" &&
              (attendanceHours = parseInt(attendanceHours, 10) + 12);

            attendanceTimeInHours === "12" && (attendanceTimeInHours = "00");
            latemodifier === "pm" &&
              (attendanceTimeInHours =
                parseInt(attendanceTimeInHours, 10) + 12);

            let attendanceTime = `${attendanceHours}${attendanceMinutes}`;
            let profileTime = `${profileHours}${profileMinutes}`;
            parseInt(attendanceTime) > parseInt(profileTime) &&
              filteredOverTimeArray.push(attendance);
            parseInt(attendanceTime) < parseInt(profileTime) &&
              filteredUnderTimeArray.push(attendance);

            let attendanceTime1 = `${attendanceTimeInHours}${attendanceTimeInMinutes}`;
            let profileTime1 = `${profileTimeInHours}${profileTimeInMinutes}`;
            if (parseInt(attendanceTime1) > parseInt(profileTime1)) {
              filteredLateArray.push(attendance);
            }
          }
        }

        //for overtime
        const overTimeMap = filteredOverTimeArray.map((overTime: any) => {
          const computeOverTime = (
            attendanceOverTime: any,
            profileOverTime: any
          ) => {
            const [attendanceTime, modifier] = attendanceOverTime.split(" ");
            const [profileTime] = profileOverTime.split(" ");
            let [attendanceOverTimeHour, attendanceOverTimeMinutes] =
              attendanceTime.split(":");
            let [profileOverTimeHours, profileOverTimeMinutes] =
              profileTime.split(":");

            attendanceOverTimeHour === "12" && (attendanceOverTimeHour = "00");
            modifier === "pm" &&
              (attendanceOverTimeHour =
                parseInt(attendanceOverTimeHour, 10) + 12);

            let overTimeHourResult =
              attendanceOverTimeHour - profileOverTimeHours;
            let overTimeMinuteResult =
              attendanceOverTimeMinutes - profileOverTimeMinutes;
            let overTimeResult = [
              overTimeHourResult,
              Math.abs(overTimeMinuteResult),
            ];
            return overTimeResult;
          };
          let overTimeTotal = computeOverTime(
            overTime.timeOut,
            userProfile.data.timeOut
          );
          return overTimeTotal;
        });
        setOverTime(overTimeMap);

        //for undertime
        const underTimeMap = filteredUnderTimeArray.map((underTime: any) => {
          const computeUnderTime = (
            attendanceUnderTime: any,
            profileUnderTime: any
          ) => {
            const [attendanceTime, modifier] = attendanceUnderTime.split(" ");
            const [profileTime] = profileUnderTime.split(" ");
            let [attendanceUnderTimeHour, attendanceUnderTimeMinutes] =
              attendanceTime.split(":");
            let [profileUnderTimeHours, profileUnderTimeMinutes] =
              profileTime.split(":");

            attendanceUnderTimeHour === "12" &&
              (attendanceUnderTimeHour = "00");
            modifier === "pm" &&
              (attendanceUnderTimeHour =
                parseInt(attendanceUnderTimeHour, 10) + 12);

            let underTimeHourResult =
              attendanceUnderTimeHour - profileUnderTimeHours;
            let underTimeMinuteResult =
              attendanceUnderTimeMinutes - profileUnderTimeMinutes;

            let underTimeResult = [
              Math.abs(underTimeHourResult),
              Math.abs(underTimeMinuteResult),
            ];
            return underTimeResult;
          };
          let underTimeTotal = computeUnderTime(
            underTime.timeOut,
            userProfile.data.timeOut
          );
          return underTimeTotal;
        });
        setunderTime(underTimeMap);

        //for late
        const lateMap = filteredLateArray.map((late: any) => {
          const computeLate = (attendanceLate: any, profileLate: any) => {
            const [attendanceTime, modifier] = attendanceLate.split(" ");
            const [profileTime] = profileLate.split(" ");
            let [attendanceLateHour, attendanceLateMinutes] =
              attendanceTime.split(":");
            let [profileLateHours, profileLateMinutes] = profileTime.split(":");

            attendanceLateHour === "12" && (attendanceLateHour = "00");
            modifier === "pm" &&
              (attendanceLateHour = parseInt(attendanceLateHour, 10) + 12);

            let lateHourResult = attendanceLateHour - profileLateHours;
            let lateMinuteResult = attendanceLateMinutes - profileLateMinutes;

            let lateResult = [
              Math.abs(lateHourResult),
              Math.abs(lateMinuteResult),
            ];
            return lateResult;
          };
          let lateTotal = computeLate(late.timeIn, userProfile.data.timeIn);
          return lateTotal;
        });
        setLate(lateMap);
      } catch (error: any) {
        if (error.response.data.status === 401) {
          setErrMessage(error.response.data.error);
          setLogOut(true);
        }
      }
    };
    fetchAllStats();
  }, [
    attendanceAPI,
    config,
    leaveAPI,
    profileAPI,
    settingsAPI,
    setErrMessage,
    setLogOut,
  ]);

  //getting the total of overtime
  let overTimehours = 0;
  let overTimeminutes1 = 0;
  let totalHoursFromMinutes1 = 0;
  let overTimetotalMinutes1 = 0;
  let overTimetotalHours1 = 0;
  let totalDaysFromHours1 = 0;
  let resultHours1 = 0;
  for (let ctr = 0; ctr < overTime.length; ctr++) {
    overTimehours += overTime[ctr][0];
    overTimeminutes1 += overTime[ctr][1];
  }
  if (overTimehours > 24) {
    totalHoursFromMinutes1 = overTimeminutes1 / 60;
    overTimetotalMinutes1 =
      overTimeminutes1 - 60 * parseInt(totalHoursFromMinutes1.toString());
    overTimetotalHours1 =
      overTimehours + parseInt(totalHoursFromMinutes1.toString());
    totalDaysFromHours1 = overTimetotalHours1 / 24;
    resultHours1 =
      overTimetotalHours1 - 24 * parseInt(totalDaysFromHours1.toString());
  } else {
    totalHoursFromMinutes1 = overTimeminutes1 / 60;
    overTimetotalMinutes1 =
      overTimeminutes1 - 60 * parseInt(totalHoursFromMinutes1.toString());
    overTimetotalHours1 =
      overTimehours + parseInt(totalHoursFromMinutes1.toString());
  }

  //getting the total of underTime
  let underTimehours = 0;
  let underTimeminutes1 = 0;
  let totalHoursFromMinutes2 = 0;
  let underTimetotalMinutes1 = 0;
  let underTimetotalHours1 = 0;
  let totalDaysFromHours2 = 0;
  let resultHours2 = 0;
  for (let ctr1 = 0; ctr1 < underTime.length; ctr1++) {
    underTimehours += underTime[ctr1][0];
    underTimeminutes1 += underTime[ctr1][1];
  }

  if (underTimehours > 24) {
    totalHoursFromMinutes2 = underTimeminutes1 / 60;
    underTimetotalMinutes1 =
      underTimeminutes1 - 60 * parseInt(totalHoursFromMinutes2.toString());
    underTimetotalHours1 =
      underTimehours + parseInt(totalHoursFromMinutes2.toString());
    totalDaysFromHours2 = underTimetotalHours1 / 24;
    resultHours2 =
      underTimetotalHours1 - 24 * parseInt(totalDaysFromHours2.toString());
  } else {
    totalHoursFromMinutes2 = underTimeminutes1 / 60;
    underTimetotalMinutes1 =
      underTimeminutes1 - 60 * parseInt(totalHoursFromMinutes2.toString());
    underTimetotalHours1 =
      underTimehours + parseInt(totalHoursFromMinutes2.toString());
  }

  //getting the total of late
  let latehours = 0;
  let lateminutes = 0;
  let totalHoursFromMinutes3 = 0;
  let latetotalMinutes = 0;
  let latetotalHours = 0;
  let totalDaysFromHours3 = 0;
  let resultHours3 = 0;
  for (let ctr2 = 0; ctr2 < late.length; ctr2++) {
    latehours += late[ctr2][0];
    lateminutes += late[ctr2][1];
  }

  if (latehours > 24) {
    totalHoursFromMinutes3 = lateminutes / 60;
    latetotalMinutes =
      lateminutes - 60 * parseInt(totalHoursFromMinutes3.toString());
    latetotalHours = latehours + parseInt(totalHoursFromMinutes3.toString());
    totalDaysFromHours3 = latetotalHours / 24;
    resultHours3 =
      latetotalHours - 24 * parseInt(totalDaysFromHours3.toString());
  } else {
    totalHoursFromMinutes3 = lateminutes / 60;
    latetotalMinutes =
      lateminutes - 60 * parseInt(totalHoursFromMinutes3.toString());
    latetotalHours = latehours + parseInt(totalHoursFromMinutes3.toString());
  }

  return [
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
  ] as const;
};

export default useEmployeeStats;
