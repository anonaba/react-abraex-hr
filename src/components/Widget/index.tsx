import { useState, useEffect } from "react";
import axios from "../../axios";
import Cookies from "universal-cookie";
import { CWidgetDropdown, CRow, CCol, CSpinner } from "@coreui/react";
import { Chart, ParentDiv } from "./style";
import useGraphHook from "hooks/useGraphHook";

const cookies = new Cookies();
const token = cookies.get("token");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};
const Widget = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [widget, setWidget] = useState<any>([]);
  const [present, setPresent] = useState<any>("");
  const [absent, setAbsent] = useState<any>("");
  const [leave, setLeave] = useState<any>("");
  const [late, setLate] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [backlog, setBacklog] = useState<any>("");
  const [progress, setProgress] = useState<any>("");
  const [review, setReview] = useState<any>("");
  const [done, setDone] = useState<any>("");
  const [presentGraph, absentGraph, lateGrap, onLeavegrap] = useGraphHook();

  useEffect(() => {
    const awaitfunction = async () => {
      setLoading(true);
      await axios
        .get("/user/profile", config)
        .then((res2) => {
          for (let i = 0; i < res2.data.data.features.length; i++) {
            if (res2.data.data.features[i] === "reports") {
              const arr1 = [
                "Present Employee",
                "Absent Employee",
                "Late Employee",
                "On Leave Employee",
              ];
              setWidget(arr1);
              setIsAdmin(true);
            } else if (res2.data.data.features[i] === "reports-employees") {
              const arr = ["In Progress", "QA Review", "Done", "Backlog"];
              setWidget(arr);
              setIsAdmin(false);
            }
          }
        })
        .catch((error) => {
          console.log("error " + error);
        });

      await axios
        .get("/team/attendance", config)
        .then((res1) => {
          const presentEmp: any = [];
          const absentEmp: any = [];
          const lateEmp: any = [];
          const leaveEmp: any = [];
          const date = new Date();
          const date1 = date.toLocaleDateString("en-us", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          });
          const newData = res1.data.data.map((item: any) => {
            let absent = "N/A",
              leave = "N/A",
              late = "N/A";
            if (item.absent) absent = item.absent;
            if (item.leave) leave = item.leave;
            if (item.late === 1) late = "1";
            return { ...item, absent, leave, late };
          });
          for (let i = 0; i < newData.length; i++) {
            if (newData[i].absent === "N/A" && newData[i].date === date1) {
              presentEmp.push(newData[i]);
            }
            if (newData[i].absent === date1) {
              absentEmp.push(newData[i]);
            }
            if (newData[i].late === "1" && newData[i].date === date1) {
              lateEmp.push(newData[i]);
            }
            if (newData[i].leave === date1) {
              leaveEmp.push(newData[i]);
            }
          }
          setLoading(false);
          setPresent(presentEmp.length === 0 ? "0" : presentEmp.length);
          setAbsent(absentEmp.length === 0 ? "0" : absentEmp.length);
          setLate(lateEmp.length === 0 ? "0" : lateEmp.length);
          setLeave(leaveEmp.length === 0 ? "0" : leaveEmp.length);
        })
        .catch((error) => {
          console.log("error " + error);
        });
    };
    awaitfunction();
  }, []);

  //Connect API to task Dashboard
  useEffect(() => {
    const awaitFunction = async () => {
      try {
        const { data: response } = await axios.get("/user/profile", config);
        const { data: response1 } = await axios.get("/team/task", config);
        
        let taskInProgress: any = [],
          taskReview: any = [],
          taskDone: any = [],
          taskBacklog: any = [];
        for (let i = 0; i < response1.data.length; i++) {
          if (response.data.id === response1.data[i].owner) {
            if (response1.data[i].status === "0") {
              taskBacklog.push(response1.data[i].owner);
            }
            if (response1.data[i].status === "1") {
              taskInProgress.push(response1.data[i].owner);
            }
            if (response1.data[i].status === "2") {
              taskReview.push(response1.data[i].owner);
            }
            if (response1.data[i].status === "3") {
              taskDone.push(response1.data[i].owner);
            }
          }
        }
        setBacklog(taskBacklog.length === 0 ? "0" : taskBacklog.length);
        setProgress(taskInProgress.length === 0 ? "0" : taskInProgress.length);
        setReview(taskReview.length === 0 ? "0" : taskReview.length);
        setDone(taskDone.length === 0 ? "0" : taskDone.length);
      } catch (error) {
        console.log(error);
      }
    };
    awaitFunction();
  }, []);

  return (
    <>
      <ParentDiv>
        <CRow>
          <CCol sm="6" lg="3">
            <CWidgetDropdown
              color="primary"
              header={
                loading ? <CSpinner size="sm" /> : isAdmin ? present : progress
              }
              text={widget[0]}
              footerSlot={
                <Chart
                  pointed
                  className="c-chart-wrapper mt-3 mx-3"
                  dataPoints={presentGraph}
                  pointHoverBackgroundColor="primary"
                  label="Present Employees"
                  //labels="months"
                />
              }
            />
          </CCol>
          <CCol sm="6" lg="3">
            <CWidgetDropdown
              color={isAdmin ? "danger" : "warning"}
              header={
                loading ? <CSpinner size="sm" /> : isAdmin ? absent : review
              }
              text={widget[1]}
              footerSlot={
                <Chart
                  pointed
                  className="c-chart-wrapper mt-3 mx-3"
                  dataPoints={absentGraph}
                  pointHoverBackgroundColor={isAdmin ? "danger" : "warning"}
                  label="Absent Employees"
                  //labels="months"
                />
              }
            />
          </CCol>
          <CCol sm="6" lg="3">
            <CWidgetDropdown
              color={isAdmin ? "warning" : "success"}
              header={
                loading ? (
                  <CSpinner style={{ margin: "0 auto" }} size="sm" />
                ) : isAdmin ? (
                  late
                ) : (
                  done
                )
              }
              text={widget[2]}
              footerSlot={
                <Chart
                  pointed
                  className="c-chart-wrapper mt-3 mx-3"
                  dataPoints={lateGrap}
                  pointHoverBackgroundColor={isAdmin ? "warning" : "success"}
                  label="Late Employees"
                  //labels="months"
                />
              }
            />
          </CCol>
          <CCol sm="6" lg="3">
            <CWidgetDropdown
              color="secondary"
              header={
                loading ? <CSpinner size="sm" /> : isAdmin ? leave : backlog
              }
              text={widget[3]}
              footerSlot={
                <Chart
                  pointed
                  className="c-chart-wrapper mt-3 mx-3"
                  dataPoints={onLeavegrap}
                  pointHoverBackgroundColor="secondary"
                  label="On Leave Employees"
                  //labels="months"
                />
              }
            />
          </CCol>
        </CRow>
      </ParentDiv>
    </>
  );
};

export default Widget;
