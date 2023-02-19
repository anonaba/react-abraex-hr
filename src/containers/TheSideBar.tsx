import React, { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useLogOut from "hooks/useLogOut";

import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg,
} from "@coreui/react";
import Cookies from "universal-cookie";

// sidebar nav config
import { _nav } from "./_nav";
import { Store } from "../ducks/store";

import Axios from "../axios";
// import { Icon, Img } from "./style";
import { Icon } from "./style";

const cookies = new Cookies();
const accessToken = cookies.get("token");

const TheSidebar: FC = () => {
  const dispatch = useDispatch();
  const show = useSelector((state: Store) => state.sidebarShow);
  const [userData, setUserdata] = useState<string[]>([]);
  const [ setLogOut,setErrMessage] = useLogOut(false);


  const getNavElement = () => {
    let items = [];
    for (const feature of userData) {
      if (_nav[feature]) items.push(_nav[feature]);
    }
    return (
      <CCreateElement
        items={items}
        components={{
          CSidebarNavDivider,
          CSidebarNavDropdown,
          CSidebarNavItem,
          CSidebarNavTitle,
        }}
      />
    );
  };

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      
    };
    const getProfileData = async () => {
      try {
        const { data } = await Axios.get("/user/profile", config);
        const features = data.data.features;
        setUserdata(features);
      } catch (errors: any) {
        if (errors.response.data.status === 401) {
          setErrMessage(errors.response.data.error);
          setLogOut(true);
        }
        console.log(errors.response.data.message);
      }
    };

    getProfileData();
  }, [setLogOut,setErrMessage]);

  return (
    <CSidebar
      show={show}
      unfoldable
      onShowChange={(val: string) =>
        dispatch({ type: "set", sidebarShow: val })
      }
    >
      <CSidebarBrand
        className="d-md-down-none"
        style={{ background: "#fff" }}
        to="/"
      >
        {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        /> */}
        <CImg
          className="c-sidebar-brand-full"
          src="img/dashboard-logo.png"
          alt="Abraex Inc"
          height={45}
        />
        <Icon
          className="c-sidebar-brand-minimized"
          name="abraex-logo-mobile.js"
          height={45}
        />
      </CSidebarBrand>
      <CSidebarNav>
        {getNavElement()}
        <CSidebarNavDivider />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
