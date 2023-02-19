import { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "../axios";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  // CButton,
  // CModal,
  // CModalHeader,
  // CModalBody,
  CDropdown,
  CDropdownToggle,
  CBadge,
  CDropdownMenu,
  CDropdownItem,
  CProgress,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Cookies from "universal-cookie";
import { User } from "./types";

// routes config
// import { routes } from "../Routes";

import { Store } from "../ducks/store";

import { TheUserDropdown } from "./index";
import { Icon, Img } from "./style";

const cookies = new Cookies();
const accessToken = cookies.get("token");

const user = {
  firstName: "",
  lastName: "",
  profilePic: "",
};

const TheHeader: FC = () => {
  const dispatch = useDispatch();

  const [userProfile, setUserProfile] = useState<User>(user);
  const darkMode = useSelector((state) => state.darkMode);
  const sidebarShow = useSelector((state: Store) => state.sidebarShow);
  // const [modal, setModal] = useState(false);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const getProfile = async () => {
      try {
        const { data } = await Axios.get("/user/profile", config);

        const { profilePic, firstName, lastName } = data.data;
        setUserProfile({ profilePic, firstName, lastName });
      } catch (errors: any) {
        console.log(errors.response.data.message);
      }
    };
    getProfile();
  }, []);

  // const handleClick = () => {
  //   setModal(!modal);
  // };

  return (
    <>
      <CHeader withSubheader>
        <CToggler
          inHeader
          className="ml-md-3 d-lg-none"
          onClick={toggleSidebarMobile}
        />
        <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={toggleSidebar}
        />
        <CHeaderBrand className="mx-auto d-lg-none" to="/">
          {/* <CIcon name="logo" height="48" alt="Logo" /> */}
          <Img
            className="c-sidebar-brand-full"
            src="img/dashboard-logo.png"
            alt="Abraex Inc"
            height={45}
          />
          <Icon
            className="c-sidebar-brand-minimized"
            name="abraex-logo-mobile"
            height={45}
          />
        </CHeaderBrand>

        <CHeaderNav className="d-md-down-none mr-auto">
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink to="/dashboard">Employee Dashboard</CHeaderNavLink>
          </CHeaderNavItem>
        </CHeaderNav>

        <CHeaderNav className="px-3">
          {/* notification bell */}
          {/* <CButton onClick={handleClick} variant="ghost">
            <CIcon name="cil-bell" />
          </CButton> */}
          <CToggler
            inHeader
            className="ml-3 d-md-down-none c-d-legacy-none"
            onClick={() => dispatch({ type: "set", darkMode: !darkMode })}
            title="Toggle Light/Dark Mode"
          >
            <CIcon
              name="cil-moon"
              className="c-d-dark-none"
              alt="CoreUI Icons Moon"
            />
            <CIcon
              name="cil-sun"
              className="c-d-default-none"
              alt="CoreUI Icons Sun"
            />
          </CToggler>

          <CDropdown inNav className="c-header-nav-item mx-2">
            <CDropdownToggle className="c-header-nav-link" caret={false}>
              <CIcon name="cil-bell" />
              <CBadge shape="pill" color="danger">
                5
              </CBadge>
            </CDropdownToggle>
            <CDropdownMenu placement="bottom-end" className="pt-0">
              <CDropdownItem
                header
                tag="div"
                className="text-center"
                color="light"
              >
                <strong>You have 5 notifications</strong>
              </CDropdownItem>
              <CDropdownItem>
                <CIcon name="cil-user-follow" className="mr-2 text-success" />{" "}
                New user registered
              </CDropdownItem>
              <CDropdownItem>
                <CIcon name="cil-user-unfollow" className="mr-2 text-danger" />{" "}
                User deleted
              </CDropdownItem>
              <CDropdownItem>
                <CIcon name="cil-chart-pie" className="mr-2 text-info" /> Sales
                report is ready
              </CDropdownItem>
              <CDropdownItem>
                <CIcon name="cil-basket" className="mr-2 text-primary" /> New
                client
              </CDropdownItem>
              <CDropdownItem>
                <CIcon name="cil-speedometer" className="mr-2 text-warning" />{" "}
                Server overloaded
              </CDropdownItem>
              <CDropdownItem header tag="div" color="light">
                <strong>Server</strong>
              </CDropdownItem>
              <CDropdownItem className="d-block">
                <div className="text-uppercase mb-1">
                  <small>
                    <b>CPU Usage</b>
                  </small>
                </div>
                <CProgress size="xs" color="info" value={25} />
                <small className="text-muted">348 Processes. 1/4 Cores.</small>
              </CDropdownItem>
              <CDropdownItem className="d-block">
                <div className="text-uppercase mb-1">
                  <small>
                    <b>Memory Usage</b>
                  </small>
                </div>
                <CProgress size="xs" color="warning" value={70} />
                <small className="text-muted">11444GB/16384MB</small>
              </CDropdownItem>
              <CDropdownItem className="d-block">
                <div className="text-uppercase mb-1">
                  <small>
                    <b>SSD 1 Usage</b>
                  </small>
                </div>
                <CProgress size="xs" color="danger" value={90} />
                <small className="text-muted">243GB/256GB</small>
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          
          <TheUserDropdown {...userProfile} />
        </CHeaderNav>

        {/* <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader> */}
      </CHeader>
      {/* <CModal
        show={modal}
        onClose={handleClick}
        style={{ margin: "10rem auto" }}
      >
        <CModalHeader closeButton>Notifications</CModalHeader>
        <CModalBody>Lorem ipsum dolor...</CModalBody>
      </CModal> */}
    </>
  );
};

export default TheHeader;
