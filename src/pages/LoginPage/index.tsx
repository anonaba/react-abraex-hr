import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "../../axios";
import swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  CRow,
  CButton,
  CCardBody,
  CContainer,
  CForm,
  CLabel,
  CInput,
  CCol,
  CCard,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInputCheckbox,
  CInvalidFeedback,
  CInputGroupAppend,
  CImg,
  CSpinner
} from "@coreui/react";
import Cookies from "universal-cookie";
import useButtonLoading from "hooks/useButtonLoading";
import { BiHide, BiShow } from "react-icons/bi";
const ImgDiv = styled.div`
  text-align: center;
  padding: 1rem;
`;

const Img = styled(CImg)`
  height: 80px;
  width: 100px;
  transform: scale(1.6);
`;

type Profile = {
  email: string;
  password: string;
  token: string;
};
const validationSchema = Yup.object().shape({
  //email validation...
  email: Yup.string().email(
    "Your email is invalid! Please Enter your valid email address"
  ),
});

const Login: React.FC = () => {
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [user, setUSer] = useState<Profile>();
  const [password, setPassword] = useState(false);
  const [loading, setLoading] = useButtonLoading(false);
  const [remember, setRemember] = useState(false);

  const handleClick = () => {
    setPassword(!password);
  };

  const history = useHistory();

  const handleChange = () => {
    setRemember(!remember);
  }

  const onSubmit = handleSubmit(async (data: Profile) => {
    setLoading(true);
    const cookies = new Cookies();
    const email = data.email;
    const Password = data.password;
    const credentials = btoa(email + ":" + Password);
    const basicAuth = "Basic ".concat(credentials);
    await axios
      .post("/auth/login", null, { headers: { Authorization: basicAuth } })
      .then((response) => {
        // If request is good...
        // set the state of the user
        setTimeout(() => {
          setLoading(false);
          setUSer(response.data);
          if(remember === true) {
            cookies.set("token", response.data.token, { path: "/" });
          } else {
            let date = new Date();
            // one day
            date.setTime(date.getTime() + (86400000));
            cookies.set("token", response.data.token, { path: "/", expires: date });
          }
          history.push("/dashboard");
          swal.fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
            timer: 3000,
          });
        }, 1500);
        clearTimeout();
      })
      //catch errors...
      .catch((error) => {
        setTimeout(() => {
          if (error.response.data.message === "Invalid Email Address") {
            setLoading(false);
            swal.fire({
              icon: "info",
              text: "Please Enter your Email and Password",
            });
          } else {
            setLoading(false);
            swal.fire({
              icon: "error",
              text: error.response.data.message,
            });
          }
        }, 1500);
        clearTimeout();
      });
  });

  const routeChange = () => {
    const path = `/forgot-password`;
    history.push(path);
  };

  const cookies = new Cookies();
  const token = cookies.get("token");
  if (user || token) {
    const dashboard = `/dashboard`;
    return <Redirect to={dashboard} />;
  }
  return (
    <>
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCard
              className="p-4 col-lg-5 col-md-10 col-sm-10"
              color="gradient-secondary"
            >
              <ImgDiv>
              <Img
                src="https://hr.abrasoft.com:3000/img/home-logo.png"
                fluid
                className="mb-2"
              />
              </ImgDiv>
              <CCardBody>
                <h6 className="text-muted small">Sign In to your account</h6>
                <CForm onSubmit={onSubmit} className="mt-2">
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <FaUser />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      {...register("email")}
                      id="email"
                      name="email"
                      placeholder="email"
                      type="text"
                      autoComplete="off"
                      className={`${errors.email ? "is-invalid" : ""}`}
                    />
                    <CInvalidFeedback>{errors.email?.message}</CInvalidFeedback>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <FaLock />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      {...register("password")}
                      id="password"
                      name="password"
                      placeholder="password"
                      type={!password ? "password" : "text"}
                      autoComplete="off"
                    />
                    <CInputGroupAppend>
                      <CInputGroupText
                        onClick={handleClick}
                        className={"bg-white text-black"}
                      >
                        {!password ? <BiShow /> : <BiHide />}
                      </CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                  <CInputGroup className="align-items-center mb-5 mx-4">
                    <CInputCheckbox
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      value="rememberMe"
                      onChange={handleChange}
                    />
                    <CLabel htmlFor="rememberMe" className="text-muted">
                      Remember me
                    </CLabel>
                  </CInputGroup>
                  <CRow>
                    <CCol xs="6">
                      <CButton disabled={loading ? true : false} color="primary" className="px-4" type="submit">
                        {loading ? <CSpinner size="sm"/> : "Login"}
                      </CButton>
                    </CCol>
                    <CCol xs="6" className="text-right">
                      <CButton
                        color="link"
                        className="px-0"
                        onClick={routeChange}
                      >
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};

export default Login;
