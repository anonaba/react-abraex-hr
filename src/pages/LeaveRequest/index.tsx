import { CCardHeader, CInput, CSelect, CSpinner } from "@coreui/react";
import React, { useEffect, useState } from "react";
import useLogOut from "hooks/useLogOut";
import {
  Col,
  Container,
  Span,
  FormText,
  Label,
  Row,
  TextArea,
  // Heading,
  Form,
  Div,
  Button,
} from "./style";
import Cookies from "universal-cookie";
import axios from "../../axios";
import { formatLeaveDate } from "../../utils/utils";
import { formatLeaveDateUntil } from "../../utils/utils";
import Swal from "sweetalert2";

const LeaveRequest = () => {
  const [data, setData] = useState<any>([]);
  const [leaveDate, setLeaveDate] = useState<string>("");
  const [leaveDateUntil, setLeaveDateUntil] = useState("");
  const [leaveType, setLeaveType] = useState<any>(null);
  const [leaveReason, setLeaveReason] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [setLogOut, setErrMessage] = useLogOut(false);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    const fetchData = async () => {
      await axios
        .get("/user/profile", {
          headers: {
            Authorization: "Bearer ".concat(token ? token : undefined),
          },
        })
        .then((response) => {
          setTimeout(() => {
            setLoading(true);
            setData(response.data.data);
          }, 300);
        })
        .catch((error : any) => {
          if (error.response.data.status === 401) {
            setErrMessage(error.response.data.error);
            setLogOut(true);
          }
          console.log(error.response.data.message);
        });
    };
    fetchData();
  }, [setErrMessage,setLogOut]);

  // console.log(data);

  const handleSubmit = async (e: any) => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    e.preventDefault();

    const submitData = {
      startDate: formatLeaveDate(leaveDate),
      endDate: formatLeaveDateUntil(leaveDateUntil),
      reason: leaveReason,
      type: leaveType,
    };

    if (leaveDateUntil < leaveDate) {
      Swal.fire({
        icon: "error",
        text: "Invalid date",
      });
    } else {
      await axios
        .post("/team/leave", submitData, {
          headers: {
            Authorization: "Bearer ".concat(token ? token : undefined),
          },
        })
        .then((response) => {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
          Swal.fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
            timer: 2500,
          });
          setLeaveDate("");
          setLeaveDateUntil("");
          setLeaveType("");
          setLeaveReason("");
          //add alert for success
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Something is wrong",
            text: error.response.data.message,
          });
          console.log("error " + error);
          //add alert for error(show error)
        });
    }
  };

  return (
    <>
      <Container>
        <CCardHeader className="d-flex align-items-center justify-content-between">
          Leave Request Form
        </CCardHeader>
        {loading ? (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col sm="3">
                <Label htmlFor="name">
                  Name<Span>*</Span>
                </Label>
              </Col>
              <Col sm="3">
                <CInput
                  type="text"
                  id="firstName"
                  value={data.firstName}
                  readOnly
                />
                <FormText className="help-block">First Name</FormText>
              </Col>

              <Col sm="3">
                <CInput
                  type="text"
                  id="middleName"
                  value={data.middleName}
                  readOnly
                />
                <FormText className="help-block">Middle Name</FormText>
              </Col>

              <Col sm="3">
                <CInput
                  type="text"
                  id="lastName"
                  value={data.lastName}
                  readOnly
                />
                <FormText className="help-block">Last Name</FormText>
              </Col>

              <Col sm="4">
                <Label htmlFor="email-ad">
                  E-mail<Span>*</Span>
                </Label>
              </Col>
              <Col sm="8">
                <CInput
                  type="email"
                  id="email-ad"
                  value={data.email}
                  readOnly
                />
                <FormText className="help-block">
                  ex: myname@example.com
                </FormText>
              </Col>

              <Col sm="4">
                <Label htmlFor="phone-number">Phone Number</Label>
              </Col>

              <Col sm="8">
                <CInput
                  type="text"
                  id="phone-number"
                  value={data.mobile}
                  readOnly
                />
                <FormText className="help-block">Phone Number</FormText>
              </Col>

              <Col sm="4">
                <Label htmlFor="leave-start">
                  Leave Date from<Span>*</Span>
                </Label>
              </Col>

              <Col sm="8">
                <CInput
                  value={leaveDate}
                  onChange={(e: any) => setLeaveDate(e.target.value)}
                  type="date"
                  id="leave-start"
                  required
                />
              </Col>

              <Col sm="4">
                <Label htmlFor="leave-until">
                  Leave Date until<Span>*</Span>
                </Label>
              </Col>

              <Col sm="8">
                <CInput
                  value={leaveDateUntil}
                  onChange={(e: any) => setLeaveDateUntil(e.target.value)}
                  type="date"
                  id="leave-until"
                  required
                />
              </Col>

              <Col sm="4">
                <Label htmlFor="leave-type">
                  Leave Type<Span>*</Span>
                </Label>
              </Col>
              <Col sm="8">
                <CSelect
                  value={leaveType}
                  onChange={(e: any) => setLeaveType(e.target.value)}
                  required
                >
                  <option value="" disabled selected>
                    Select Leave Type
                  </option>
                  <option value="0">LWP</option>
                  <option value="1">PAID</option>
                </CSelect>
              </Col>

              <Label htmlFor="leave">
                Reasons For Leave<Span>*</Span>
              </Label>
              <TextArea
                value={leaveReason}
                onChange={(e: any) => setLeaveReason(e.target.value)}
                id="leave"
                placeholder="Type here.."
                required
              />
            </Row>
            {/* <Submit onClick={handleSubmit} type="submit" value="Submit" /> */}
            <Div>
              <Button
                color="primary"
                type="submit"
                className="mx-2"
                disabled={isLoading ? true : false}
              >
                {isLoading ? <CSpinner size="sm" /> : "Submit"}
              </Button>
            </Div>
          </Form>
        ) : (
          <CSpinner color="primary" style={{ margin: "15% auto" }} />
        )}
      </Container>
    </>
  );
};

export default LeaveRequest;
