import React, { FC, useCallback ,useEffect} from "react";
import { CCardHeader, CInput, CInvalidFeedback } from "@coreui/react";
import { Button, Col, Container, Div, Form, Label, Row, Span } from "./style";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateTeamValidationSchema } from "../../utils/utils";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FormInputs } from "./type";
import { formatBirthdate } from "../../utils/utils";
import swal from "sweetalert2";
import Cookies from "universal-cookie";
import useLogOut from "hooks/useLogOut";
import axios from "../../axios";


const defaultInput = {
  userName: "",
  email: "",
  mobile: "",
  birthDate: "",
  firstName: "",
  middleName: "",
  lastName: "",
  position: "",
  employeeId: "",
  team: "",
};

const cookies = new Cookies();
const token = cookies.get("token");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const CreateTeam: FC = () => {
  const [setLogOut, setErrMessage] = useLogOut(false);
  const getProfile = useCallback(async () => {
      await axios.get("/user/profile", config)
        .then(() => {
      }).catch((error : any) => {
        if (error.response.data.status === 401) {
          setErrMessage(error.response.data.error);
          setLogOut(true);
        }
        console.log(error.response.data); 
      })
    },
    [setLogOut,setErrMessage],
  )
  useEffect(() => {
      getProfile();
  }, [getProfile])
  const formOptions = { resolver: yupResolver(CreateTeamValidationSchema) };
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormInputs>(formOptions);

  const addNewTeam: SubmitHandler<FormInputs> = useCallback(
    async (newDataTeam) => {
      const { birthDate } = newDataTeam;
      const { middleName } = newDataTeam;
      let mName = "";
      let bdate = "";

      const formatData = {
        ...newDataTeam,
        birthDate: birthDate ? formatBirthdate(birthDate) : bdate,
        middleName: middleName ? middleName : mName,
      };

      try {
        const { data: response } = await axios.post(
          "/team/create",
          formatData,
          config
        );
        swal.fire({
          icon: "success",
          text: response.message,
          showConfirmButton: false,
          timer: 2500,
        });
        reset(defaultInput);
      } catch (error: any) {
        if (error.response.data.status === 401) {
          setErrMessage(error.response.data.error);
          setLogOut(true);
        }
        console.log(error.response.data); 
        swal
          .fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
          })
          .then(() => {
            reset(defaultInput);
          });
      }
    },
    [reset,setLogOut,setErrMessage]
  );

  return (
    <Container>
      <CCardHeader className="d-flex align-items-center justify-content-between">
        Create Team Form
      </CCardHeader>
      <Form onSubmit={handleSubmit(addNewTeam)}>
        <Row>
          <Col sm="3">
            <Label htmlFor="name">
              Name<Span>*</Span>
            </Label>
          </Col>
          <Col sm="3">
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <CInput
                  {...field}
                  value={field.value || ""}
                  type="text"
                  id="firstName"
                  placeholder="First Name..."
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                />
              )}
            />
            <CInvalidFeedback>{errors.firstName?.message}</CInvalidFeedback>
          </Col>

          <Col sm="3">
            <Controller
              control={control}
              name="middleName"
              render={({ field }) => (
                <CInput
                  {...field}
                  value={field.value || ""}
                  type="text"
                  name="middleName"
                  placeholder="Middle Name..."
                />
              )}
            />
          </Col>

          <Col sm="3">
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <CInput
                  {...field}
                  value={field.value || ""}
                  type="text"
                  name="lastName"
                  placeholder="Last Name..."
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                />
              )}
            />

            <CInvalidFeedback>{errors.lastName?.message}</CInvalidFeedback>
          </Col>

          <Col sm="4">
            <Label htmlFor="userName">Username</Label>
            <Span>*</Span>
          </Col>
          <Col sm="8">
            <Controller
              control={control}
              name="userName"
              render={({ field }) => (
                <CInput
                  {...field}
                  value={field.value || ""}
                  placeholder="Username"
                  type="string"
                  className={`form-control ${
                    errors.userName ? "is-invalid" : ""
                  }`}
                />
              )}
            />
            <CInvalidFeedback className="help-block">
              {errors.userName?.message}
            </CInvalidFeedback>
          </Col>

          <Col sm="4">
            <Label htmlFor="email-ad">
              E-mail<Span>*</Span>
            </Label>
          </Col>
          <Col sm="8">
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <CInput
                  {...field}
                  value={field.value || ""}
                  name="email"
                  type="email"
                  placeholder="email..."
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                />
              )}
            />
            <CInvalidFeedback className="invalid-feedback">
              {errors.email?.message}
            </CInvalidFeedback>
          </Col>

          <Col sm="4">
            <Label htmlFor="phoneNumber">
              Phone Number<Span>*</Span>
            </Label>
          </Col>

          <Col sm="8">
            <Controller
              control={control}
              name="mobile"
              render={({ field }) => (
                <CInput
                  {...field}
                  value={field.value || ""}
                  name="mobile"
                  type="text"
                  placeholder="Phone Number..."
                  className={`form-control ${
                    errors.mobile ? "is-invalid" : ""
                  }`}
                />
              )}
            />
            <CInvalidFeedback>{errors.mobile?.message}</CInvalidFeedback>
          </Col>

          <Col sm="4">
            <Label htmlFor="birthDate">Birthdate</Label>
          </Col>

          <Col sm="8">
            <Controller
              control={control}
              name="birthDate"
              render={({ field }) => (
                <CInput
                  {...field}
                  value={field.value || ""}
                  type="date"
                  name="birthDate"
                />
              )}
            />
          </Col>

          <Col sm="4">
            <Label htmlFor="position">Position</Label>
            <Span>*</Span>
          </Col>
          <Col sm="8">
            <Controller
              control={control}
              name="position"
              render={({ field }) => (
                <CInput
                  {...field}
                  value={field.value || ""}
                  name="position"
                  type="text"
                  placeholder="Position"
                  className={`form-control ${
                    errors.position ? "is-invalid" : ""
                  }`}
                />
              )}
            />
            <CInvalidFeedback className="help-block">
              {errors.position?.message}
            </CInvalidFeedback>
          </Col>

          <Col sm="4">
            <Label htmlFor="empId">Employee Id</Label>
            <Span>*</Span>
          </Col>
          <Col sm="8">
            <Controller
              control={control}
              name="employeeId"
              render={({ field }) => (
                <CInput
                  {...field}
                  value={field.value || ""}
                  name="employeeId"
                  type="text"
                  placeholder="Employee ID"
                  className={`form-control ${
                    errors.employeeId ? "is-invalid" : ""
                  }`}
                />
              )}
            />
            <CInvalidFeedback className="help-block">
              {errors.employeeId?.message}
            </CInvalidFeedback>
          </Col>

          <Col sm="4">
            <Label htmlFor="team">Team</Label>
            <Span>*</Span>
          </Col>
          <Col sm="8">
            <Controller
              control={control}
              name="team"
              render={({ field }) => (
                <CInput
                  {...field}
                  value={field.value || ""}
                  name="team"
                  type="text"
                  placeholder="Team"
                  className={`form-control ${errors.team ? "is-invalid" : ""}`}
                />
              )}
            />
            <CInvalidFeedback className="help-block">
              {errors.team?.message}
            </CInvalidFeedback>
          </Col>
        </Row>
        <Div>
          <Button color="primary" type="submit" className="mx-2">
            Submit
          </Button>
        </Div>
      </Form>
    </Container>
  );
};

export default CreateTeam;
