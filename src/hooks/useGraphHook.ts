import { useState, useEffect } from "react";
import Axios from "../axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

const useGraphHook = () => {
  const [present, setPresent] = useState<any>([]);
  const [absent, setAbsent] = useState<any>([]);
  const [late, setLate] = useState<any>([]);
  const [onLeave, setOnLeave] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fethPresentData = async () => {
      setLoading(true);
      try {
        const { data: attendanceGraph } = await Axios.get(
          "/dashboard/attendance-graph",
          config
        );
        // console.log(attendanceGraph.data);
        const presentData: any = [];
        const absentData: any = [];
        const lateData: any = [];
        const onLeaveData: any = [];

        for (const month of months) {
          presentData.push(attendanceGraph.data[month][0] === undefined ? "0" : attendanceGraph.data[month][0]);
          absentData.push(attendanceGraph.data[month][1] === undefined ? "0" : attendanceGraph.data[month][1]);
          lateData.push(attendanceGraph.data[month][2] === undefined ? "0" : attendanceGraph.data[month][2]);
          onLeaveData.push(attendanceGraph.data[month][3] === undefined ? "0" : attendanceGraph.data[month][3]);
        }

        // setPresent(presentData.filter((present: any) => present !== undefined));
        // setAbsent(absentData.filter((absent: any) => absent !== undefined));
        // setLate(lateData.filter((late: any) => late !== undefined));
        // setOnLeave(onLeaveData.filter((leave: any) => leave !== undefined));
        setPresent(presentData);
        setAbsent(absentData);
        setLate(lateData);
        setOnLeave(onLeaveData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fethPresentData();
  }, []);

  return [present, absent, late, onLeave, loading] as const;
};

export default useGraphHook;
