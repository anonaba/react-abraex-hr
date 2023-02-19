import React, { FC, useState, useEffect,useCallback } from "react";
import axios from "../../axios";
import swal from "sweetalert2";
import Cookies from "universal-cookie";
import styled from 'styled-components';
import {
    CContainer,
    CButton,
    CDataTable,
} from '@coreui/react';
import useLogOut from "hooks/useLogOut";

interface timeInProps {
  istimeInBtnDisplay: boolean;
}

interface lunchProps {
  isLunchBtnDisplay: boolean;
}

interface timeOutProps {
  isTimeOutBtn: boolean;
}

interface backBtnProps {
  isBackBtnDisplay: boolean;
}

const Container = styled(CContainer)`
    margin-top: 5rem;
    padding: 1rem;
    width: 60%;
    background: #FFF;
`;

const TimeDiv = styled.div`
    padding: 1rem;
    border: 3px solid #929292;
    text-align: center;
`;

const H1 = styled.h1`
    font-size: 40px;
`;

const P = styled.p`
    font-size: 25px;
    margin-bottom: 1rem;
`;

const TimeInDiv = styled.div<timeInProps>`
    display: ${({ istimeInBtnDisplay }) => (istimeInBtnDisplay ? "none" : "block")};
`;

const TimeInBtn = styled(CButton)`
    margin: 0 auto;
    width: 50%;
    background: #20FE00;
    color: #FFF;
`;

const LunchDiv = styled.div<lunchProps>`
    display: ${({ isLunchBtnDisplay }) => (isLunchBtnDisplay ? "block" : "none")};
`;

const LunchBtn = styled(CButton)`
    margin: 0.5rem auto;
    width: 50%;
    background: #D433FF;
    color: #FFF;
`;

const BackDiv = styled.div<backBtnProps>`
    display: ${({ isBackBtnDisplay }) => (isBackBtnDisplay ? "block" : "none")};
`;

const BackBtn = styled(CButton)`
    margin: 0.5rem auto;
    width: 50%;
    background: #3354FF;
    color: #FFF;
`;

const TimeOutDiv = styled.div<timeOutProps>`
    display: ${({ isTimeOutBtn }) => (isTimeOutBtn ? "block" : "none")};
`;

const TimeOutBtn = styled(CButton)`
    margin: 0.5rem auto;
    width: 50%;
    background: #FF3933;
    color: #FFF;
`;

const fields = ['date','timeIn','lunch', 'back', 'timeOut']

const cookies = new Cookies();
const accessToken = cookies.get("token");
const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
    },
};
const EmployeeAttendance: FC = () => {
    const [timeInBtn, setTimeInBtn] = useState<boolean>(false);
    const [timeOutBtn, setTimeOutBtn] = useState<boolean>(false);
    const [lunchBtn, setLunchBtn] = useState<boolean>(false);
    const [backBtn, setBackBtn] = useState<boolean>(false);
    const [details, setDetails] = useState<string[]>([]);
    const [setLogOut, setErrMessage] = useLogOut(false);

    const fetchData = useCallback(
        async () => {
            await axios.get("/team/attendance", config )
            .then((response) => {
                // If request is good...
                setDetails(response.data.data);
            })
            .catch((error: any) => {
                if (error.response.data.status === 401) {
                    setErrMessage(error.response.data.error);
                    setLogOut(true);
                    }
                console.log("error " + error.response.data.message);
            });
        },
        [setLogOut, setErrMessage],
    )
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleClick = async () => {
        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
        };

        await axios
          .post("/team/time-in", null, config )
          .then((response) => {
            swal.fire({
                icon: "success",
                text: response.data.message,
                showConfirmButton: false,
                timer: 2500,
              });
          })
          .catch((error) => {
            swal.fire({
                icon: "warning",
                text: error,
              });
          });

        setTimeInBtn(!timeInBtn);
        setLunchBtn(!lunchBtn);
        setTimeOutBtn(!timeOutBtn);
    };

    const secondhandleClick = () => {
        setTimeInBtn(true);
        setLunchBtn(false);
        setBackBtn(true);
        setTimeOutBtn(true);
    }

    const thirdhandleClick = () => {
        setTimeInBtn(true);
        setLunchBtn(false);
        setBackBtn(false);
        setTimeOutBtn(true);
    }

    const fourthhandleClick = async () => {
        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
        };

        await axios
          .post("/team/time-out", null, config )
          .then((response) => {
            swal.fire({
                icon: "success",
                text: response.data.message,
                showConfirmButton: false,
                timer: 2500,
              });
          })
          .catch((error) => {
            swal.fire({
                icon: "warning",
                text: error,
              });
          });

        setTimeInBtn(false);
        setLunchBtn(false);
        setBackBtn(false);
        setTimeOutBtn(false);
    }

    const[clock, setClock] = useState("");
    useEffect(() => {
        setInterval(() => {
            const date = new Date();
            setClock(date.toLocaleTimeString( 'en-GB' ))
        }, 1000)
    })

    const[date, setDate] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    })

    return (
        <>
            <Container>
                <TimeDiv>
                    <form>
                        <H1>{clock}</H1>
                        <P>{date.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</P>
                        <TimeInDiv istimeInBtnDisplay={timeInBtn}>
                            <TimeInBtn block variant="outline" onClick={handleClick}>
                                Time In
                            </TimeInBtn>
                        </TimeInDiv>
                        <LunchDiv isLunchBtnDisplay={lunchBtn}>
                            <LunchBtn block variant="outline" onClick={secondhandleClick}>Lunch</LunchBtn>
                        </LunchDiv>
                        <BackDiv isBackBtnDisplay={backBtn}>
                            <BackBtn block variant="outline" onClick={thirdhandleClick}>Back</BackBtn>
                        </BackDiv>
                        <TimeOutDiv isTimeOutBtn={timeOutBtn}>
                            <TimeOutBtn block variant="outline" onClick={fourthhandleClick}>Time Out</TimeOutBtn>
                        </TimeOutDiv>
                    </form>
                </TimeDiv>
                <CDataTable
                  items={details}
                  fields={fields}
                  itemsPerPage={5}
                  pagination
                />
            </Container>
        </>
    );
}

export default EmployeeAttendance;
