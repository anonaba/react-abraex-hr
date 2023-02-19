import {
  CForm,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupText,
} from "@coreui/react";
import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Button, Div, FormText, Heading, Label } from "./style";
import Swal from "sweetalert2";
import axios from "../../axios";
import Cookies from "universal-cookie";

const ResetPassword = () => {
  const [password1, setPassword1] = useState(false);
  const [password2, setPassword2] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClick1 = () => {
    setPassword1(!password1);
  };

  const handleClick2 = () => {
    setPassword2(!password2);
  };

  const handleSubmit = async (e: any) => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    e.preventDefault();

    const submitData = {
      password: newPassword,
    };

    await axios
      .post("/auth/change-password", submitData, {
        headers: {
          Authorization: "Bearer ".concat(token ? token : undefined),
        },
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: response.data.message,
          showConfirmButton: true,
        });
        // console.log(response.data.message);
        setNewPassword("");
        setConfirmPassword("");
        //add alert for success
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
        });
        console.log("error " + error);
        //add alert for error(show error)
      });
  };

  return (
    <Div>
      <Heading>Reset Password</Heading>
      <CForm onSubmit={handleSubmit}>
        <Label htmlFor="newPassword">New Password</Label>
        <CInputGroup>
          <CInput
            type={!password1 ? "password" : "text"}
            id="newpassword"
            name="newpassword"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.currentTarget.value);
            }}
            required
          />
          <CInputGroupAppend>
            <CInputGroupText
              onClick={handleClick1}
              className={"bg-primary text-white"}
            >
              {!password1 ? <BiShow /> : <BiHide />}
            </CInputGroupText>
          </CInputGroupAppend>
        </CInputGroup>
        <FormText className="help-block">
          Password must have a length of 8-12 characters
        </FormText>
        <Label htmlFor="new-password">Confirm Password</Label>
        <CInputGroup>
          <CInput
            type={!password2 ? "password" : "text"}
            id="confirmpassword"
            name="confirmpassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            required
          />
          <CInputGroupAppend>
            <CInputGroupText
              onClick={handleClick2}
              className={"bg-primary text-white"}
            >
              {!password2 ? <BiShow /> : <BiHide />}
            </CInputGroupText>
          </CInputGroupAppend>
        </CInputGroup>
        <FormText
          color="danger"
          style={{
            visibility:
              newPassword && confirmPassword === null ? "hidden" : "visible",
          }}
          className="help-block"
        >
          {newPassword === confirmPassword ? "" : "Passwords don't match"}
        </FormText>
        <Button
          onClick={handleSubmit}
          color="primary"
          type="button"
          disabled={
            !confirmPassword || !newPassword || confirmPassword !== newPassword
              ? true
              : false
          }
        >
          Submit
        </Button>
      </CForm>
    </Div>
  );
};

export default ResetPassword;
