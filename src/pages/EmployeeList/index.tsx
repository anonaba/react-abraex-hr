import React, { useState, useCallback, useEffect } from "react";
import {
  CDataTable,
  CButton,
  CCollapse,
  CCardBody,
  CContainer,
  CSpinner,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCardHeader,
  CJumbotron,
  CCol,
  CRow,
  CCard,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import useButtonLoading from "hooks/useButtonLoading";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputs } from "components/AddEmployee/type";
import { formatBirthdate } from "../../utils/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddEmployeeValidationSchema } from "../../utils/utils";
import Axios from "../../axios";
import Cookies from "universal-cookie";
import AddEmployee from "components/AddEmployee";
import Permission from "components/Permission";
import swal from "sweetalert2";
import Scheduling from "../../components/Scheduling";
import EditMember from "components/EditMember";
import { Div, H1, Modal , DataTableWrapper} from "./style";
import useLogOut from "hooks/useLogOut";

const cookies = new Cookies();
const accessToken = cookies.get("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
};

const defaultInput = {
  userName: "",
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  mobile: "",
  birthDate: "",
  position: "",
  employeeId: "",
};

const EmployeeList: React.FC = () => {
  const [danger, setDanger] = useState(false);
  const [isloading, resetButtonLoading] = useButtonLoading(false);
  const formOptions = { resolver: yupResolver(AddEmployeeValidationSchema) };
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [users, setUsers] = useState<string[]>([]);
  const [details, setDetails] = useState(users);
  const [track, setTrack] = useState<Boolean>(false);
  const [itemID, setItemID] = useState<string>("");
  const [display, setDisplay] = useState<boolean>();
  const [ setLogOut,setErrMessage] = useLogOut(false);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormInputs>(formOptions);

  //get members
  const getUsers = useCallback(async () => {
    try {
      const { data: response } = await Axios.get("/team/members", config);
      setUsers(response.data);
      if (response.data.length === 0) {
        setDisplay(true);
      } else {
        setDisplay(false);
      }
    } catch (error: any) {
      if (error.response.data.status === 401) {
        setErrMessage(error.response.data.error);
        setLogOut(true);
      }
      console.log(error.response.data.message);
    }
  }, [setLogOut,setErrMessage]);

  //add members
  const addNewEmployee: SubmitHandler<FormInputs> = useCallback(
    async (newDataEmployee) => {
      resetButtonLoading(true);
      const { birthDate } = newDataEmployee;

      const formatData = {
        ...newDataEmployee,
        birthDate: formatBirthdate(birthDate),
      };

      try {
        const { data } = await Axios.post("/auth/register", formatData, config);
        swal
          .fire({
            icon: "success",
            text: data.message,
            showConfirmButton: false,
            timer: 2500,
          })
          .then(() => {
            setTrack(true);
            setIsOpenModal(false);
            reset(defaultInput);
            resetButtonLoading(false);
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
    [reset, resetButtonLoading]
  );

  //delete members
  const deleteUser = useCallback(async (id: string) => {
    try {
      await Axios.post("/auth/remove-account", { userId: id }, config).then(
        (response) => {
          swal.fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
            timer: 2500,
          });
          setTimeout(() => {
            setTrack(true);
          }, 1500);
        }
      );
      // console.log(data);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }, []);

  const toggleDetails = useCallback(
    (id) => {
      const position = details.indexOf(id);
      let newDetails = details.slice();

      if (position !== -1) {
        newDetails.splice(position, 1);
      } else {
        newDetails = [...details, id];
      }
      setDetails(newDetails);
    },
    [details]
  );
  useEffect(() => {
    getUsers();
    if (track) {
      getUsers();
      setTrack(!track);
    }
  }, [track, getUsers]);

  const fields = [
    {
      key: "firstName",
      _style: { width: "18%", color: "#fff", background: "#3f72af" },
    },
    {
      key: "lastName",
      _style: { width: "18%", color: "#fff", background: "#3f72af" },
    },
    {
      key: "position",
      _style: { width: "18%", color: "#fff", background: "#3f72af" },
    },
    {
      key: "email",
      _style: { width: "18%", color: "#fff", background: "#3f72af" },
    },
    {
      key: "show_details",
      label: "Action",
      _style: { width: "15%", color: "#fff", background: "#3f72af" },
      sorter: false,
      filter: false,
    },
  ];

  return (
    <CCard className="card">
      <CCardHeader className="d-flex flex-wrap align-items-center justify-content-between">
        <p className="my-3">Employee List</p>
        <div className="card-header-actions d-flex flex-wrap ">
          <AddEmployee
            add={addNewEmployee}
            isloading={isloading}
            control={control}
            submit={handleSubmit}
            reset={reset}
            errors={errors}
            setIsOpenModal={setIsOpenModal}
            isOpenModal={isOpenModal}
          />
          <Scheduling />
          <Permission />
          <Modal
            show={danger}
            onClose={() => setDanger(!danger)}
            color="danger"
          >
            <CModalHeader closeButton>
              <CModalTitle>Are you sure?</CModalTitle>
            </CModalHeader>
            <CModalBody>Do you want to delete this user?</CModalBody>
            <CModalFooter>
              <CButton
                color="danger"
                onClick={() => {
                  deleteUser(itemID);
                  setDanger(!danger);
                }}
              >
                Confirm
              </CButton>{" "}
              <CButton color="secondary" onClick={() => setDanger(!danger)}>
                Cancel
              </CButton>
            </CModalFooter>
          </Modal>
        </div>
      </CCardHeader>
      <CCardBody>
        <DataTableWrapper>
          <CDataTable
            items={users}
            fields={fields}
            noItemsViewSlot={
              display ? (
                <Div>
                  <H1>No data yet</H1>
                </Div>
              ) : (
                <CSpinner
                  color="primary"
                  className="d-flex justify-content-center my-5"
                  style={{ margin: "auto" }}
                />
              )
            }
            columnFilter
            tableFilter
            itemsPerPageSelect
            itemsPerPage={10}
            hover
            pagination
            outlined
            scopedSlots={{
              show_details: (item: any) => {
                return (
                  <>
                    <td className="py-2">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div>
                          <CButton
                            style={{ marginRight: "1rem" }}
                            color={
                              details.includes(item.id) ? "danger" : "primary"
                            }
                            shape="square"
                            size="sm"
                            onClick={() => toggleDetails(item.id)}
                          >
                            {details.includes(item.id) ? "Hide" : "View more"}
                          </CButton>
                        </div>
                        <div>
                          <CButton
                            color="danger"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              setItemID(item.id);
                              setDanger(!danger);
                            }}
                          >
                            Delete
                          </CButton>
                        </div>
                      </div>
                    </td>
                  </>
                );
              },
              details: (item: any, idx: any) => {
                return (
                  <>
                    <CCollapse show={details.includes(item.id)}>
                      <CCardBody>
                        <CRow>
                          <CCol lg="12">
                            <CJumbotron className="m-0">
                              <CContainer style={{ lineHeight: "1.5rem" }}>
                                <CCol
                                  lg="5"
                                  style={{ alignItems: "center" }}
                                  className="d-flex"
                                >
                                  <CIcon name="cil-user" />
                                  <h4 className="pl-3">
                                    {item.firstName} {item.lastName}
                                  </h4>
                                </CCol>
                              </CContainer>
                              <CContainer
                                style={{ lineHeight: "1.5rem" }}
                                className="d-flex pt-2"
                              >
                                <CCol
                                  lg="5"
                                  style={{ alignItems: "center" }}
                                  className="d-flex"
                                >
                                  <CIcon name="cil-calendar" />
                                  <h4 className="pl-3">{item.birthDate}</h4>
                                </CCol>
                              </CContainer>
                              <CContainer
                                style={{ lineHeight: "1.5rem" }}
                                className="d-flex pt-2"
                              >
                                <CCol
                                  lg="5"
                                  style={{ alignItems: "center" }}
                                  className="d-flex"
                                >
                                  <CIcon name="cil-code" />
                                  <h4 className="pl-3">{item.position}</h4>
                                </CCol>
                              </CContainer>
                              <CContainer
                                style={{ lineHeight: "1.5rem" }}
                                className="d-flex py-2"
                              >
                                <CCol
                                  lg="5"
                                  style={{ alignItems: "center" }}
                                  className="d-flex"
                                >
                                  <CIcon name="cil-phone" />
                                  <h4 className="pl-3">{item.mobile}</h4>
                                </CCol>
                              </CContainer>
                              <CContainer style={{ margin: "1.5rem 0 0 4.5rem" }}>
                                <EditMember
                                  idx={idx}
                                  userID={item.id}
                                  position={item.position}
                                  basicPay={item.basicPay}
                                  tds={item.tds}
                                  profTax={item.profTax}
                                  sss={item.sss}
                                  pagibig={item.pagibig}
                                  philhealth={item.philhealth}
                                />
                              </CContainer>
                            </CJumbotron>
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCollapse>
                  </>
                );
              },
            }}
          />
        </DataTableWrapper>
      </CCardBody>
    </CCard>
  );
};

export default EmployeeList;
