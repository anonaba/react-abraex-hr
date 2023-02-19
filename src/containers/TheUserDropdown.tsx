import React, { FC } from "react";
// import { useHistory } from "react-router-dom";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "../axios";
import swal from "sweetalert2";
import Cookies from "universal-cookie";
import { User } from "./types";

const cookies = new Cookies();
const accessToken = cookies.get("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
};

const TheUserDropdown: FC<User> = ({ profilePic, firstName, lastName }) => {
  // const history = useHistory();
  const LogoutFunc = async () => {
    await axios
      .post("/auth/logout", null, config)
      .then((response) => {
        swal
          .fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
            timer: 700,
          })
          .then(() => {
            cookies.remove("token", { path: "/" });
            window.location.href = "/login";
          });
      })
      .catch((error) => {
        swal.fire({
          icon: "error",
          text: error,
        });
      });
  };

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={`/avatars/${profilePic}`}
            className="c-avatar-img"
            alt={`${firstName} ${lastName}`}
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem to="/profile">
          <CIcon name="cil-user" className="mfe-2" />
          My Profile
        </CDropdownItem>
        <CDropdownItem to="/resolution-center">
          <CIcon name="cil-check-circle" className="mfe-2" />
          Resolution Center
        </CDropdownItem>
        <CDropdownItem to="/FAQs">
          <CIcon name="cilInfo" className="mfe-2" />
          FAQs
        </CDropdownItem>
        <CDropdownItem to="/reset-password">
          <CIcon name="cil-pencil" className="mfe-2" />
          Change Password
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={LogoutFunc}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheUserDropdown;
