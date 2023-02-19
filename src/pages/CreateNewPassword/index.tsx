import { FC, useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { FaLock } from "react-icons/fa";
import Axios from "../../axios";
import swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// import Cookies from "universal-cookie";
import useButtonLoading from "hooks/useButtonLoading";
import { BiHide, BiShow } from "react-icons/bi";
import usePasswordToggle from "hooks/usePasswordToggle";

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
  CInputGroupAppend,
  CImg,
  CSpinner,
  CInvalidFeedback,
} from "@coreui/react";

const ImgDiv = styled.div`
  text-align: center;
  padding: 1rem;
`;

const Img = styled(CImg)`
  height: 80px;
  width: 100px;
  transform: scale(1.6);
`;

type Password = {
  password: string;
  cPassword: string;
};

const validationSchema = Yup.object().shape({
  //password..
  password: Yup.string()
    .min(8, "Password must have length of 8")
    .required("Password is required"),
  cPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password did not match")
    .required("Confirm Password is required"),
});

const CreateNewPassword: FC = ({ location }: any) => {
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Password>(formOptions);

  const [isloading, resetButtonLoading] = useButtonLoading(false);
  let history = useHistory();

  const [
    showPwd,
    showConfirmPwd,
    togglePwdVisiblity,
    toggleConfirmPwdVisiblity,
  ] = usePasswordToggle();

  // console.log("password: " + showPwd);
  // console.log("confirm: " + showConfirmPwd);

  // const [showPwd, togglePwdVisiblity] = usePasswordToggle();
  // const [showConfirmPwd, toggleConfirmPwdVisiblity] = usePasswordToggle();

  // const onSubmit = handleSubmit(async (data: Profile) => {
  //   setLoading(true);
  // });

  const handleNewPassword: SubmitHandler<Password> = useCallback(
    async (newPassword) => {
      resetButtonLoading(true);
      const { password } = newPassword;

      const query = new URLSearchParams(location.search);

      const tokenValue = query.get("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenValue}`,
        },
      };

      try {
        const { data } = await Axios.post(
          "/auth/change-password",
          { password },
          config
        );
        swal
          .fire({
            icon: "success",
            text: data.message,
            showConfirmButton: false,
            timer: 2500,
          })
          .then(() => {
            resetButtonLoading(false);
            history.push("/home");
          });
      } catch (error: any) {
        swal
          .fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
          })
          .then(() => {
            resetButtonLoading(false);
          });
      }
    },
    [location, resetButtonLoading, history]
  );

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
                <CForm
                  onSubmit={handleSubmit(handleNewPassword)}
                  className="mt-2"
                >
                  <CLabel
                    style={{ margin: "0.2rem auto 0.8rem" }}
                    htmlFor="nf-email"
                  >
                    New Password
                  </CLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <FaLock />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <Controller
                      control={control}
                      name="password"
                      render={({ field }) => (
                        <CInput
                          {...field}
                          value={field.value || ""}
                          type={showPwd ? "text" : "password"}
                          className={`form-control ${
                            errors.password ? "is-invalid" : ""
                          }`}
                        />
                      )}
                    />

                    <CInputGroupAppend>
                      <CInputGroupText
                        onClick={togglePwdVisiblity}
                        className={"bg-white text-black"}
                      >
                        {showPwd ? <BiShow /> : <BiHide />}
                      </CInputGroupText>
                    </CInputGroupAppend>
                    <CInvalidFeedback>
                      {errors.password?.message}
                    </CInvalidFeedback>
                  </CInputGroup>
                  <CLabel
                    style={{ margin: "0.2rem auto 0.8rem" }}
                    htmlFor="nf-email"
                  >
                    Confirm Password
                  </CLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <FaLock />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <Controller
                      control={control}
                      name="cPassword"
                      render={({ field }) => (
                        <CInput
                          {...field}
                          value={field.value || ""}
                          type={showConfirmPwd ? "text" : "password"}
                          className={`form-control ${
                            errors.cPassword ? "is-invalid" : ""
                          }`}
                        />
                      )}
                    />

                    <CInputGroupAppend>
                      <CInputGroupText
                        onClick={toggleConfirmPwdVisiblity}
                        className={"bg-white text-black"}
                      >
                        {showConfirmPwd ? <BiShow /> : <BiHide />}
                      </CInputGroupText>
                    </CInputGroupAppend>
                    <CInvalidFeedback>
                      {errors.cPassword?.message}
                    </CInvalidFeedback>
                  </CInputGroup>
                  <CRow>
                    <CCol xs="6">
                      <CButton
                        disabled={isloading ? true : false}
                        color="primary"
                        className="px-4"
                        type="submit"
                      >
                        {isloading ? <CSpinner size="sm" /> : "Submit"}
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

export default CreateNewPassword;
