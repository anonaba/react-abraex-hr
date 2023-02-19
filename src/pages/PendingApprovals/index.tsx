import {
  CButton,
  CCardBody,
  CCollapse,
  CDataTable,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CSpinner,
  CCardHeader,
  CCard,
  CBadge,
} from "@coreui/react";
import { FaCheck, FaTimes } from "react-icons/fa";
import React, { useEffect, useState , useCallback} from "react";
import {
  Button,
  Info,
  Info1,
  Info2,
  InfoSection,
  InfoSection1,
  Modal,
  Name,
  Status,
  Status1,
  Sub,
  Div,
  H1,
  DataTableWrapper,
} from "./style";
import axios from "../../axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import useLogOut from "hooks/useLogOut";

import { getLeaveApprovalBadge } from "../../utils/utils";

const cookies = new Cookies();
const token = cookies.get("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const PendingApproval: React.FC = () => {
  const fields = [
    {
      key: "startDate",
      _style: { width: "20%", color: "#fff", background: "#3f72af" },
    },
    {
      key: "endDate",
      _style: { width: "20%", color: "#fff", background: "#3f72af" },
    },
    {
      key: "employee",
      _style: { width: "30%", color: "#fff", background: "#3f72af" },
    },
    {
      key: "type",
      _style: { width: "10%", color: "#fff", background: "#3f72af" },
    },
    {
      key: "status",
      _style: { width: "10%", color: "#fff", background: "#3f72af" },
    },
    {
      key: "show_details",
      label: "Action",
      _style: { width: "15%", color: "#fff", background: "#3f72af" },
      sorter: false,
      filter: false,
    },
  ];

  // const [member, setMember] = useState<any>([]);
  const [requests, setRequests] = useState<string[]>([]);
  const [details, setDetails] = useState(requests);
  const [submitButton, setSubmitButton] = useState<number>();
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [display, setDisplay] = useState<boolean>();
  const [setLogOut, setErrMessage] = useLogOut(false);

  //MODAL
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);

  const toggleDetails = (index: any) => {
    const position = details.indexOf(index);
    var newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  //   MODAL
  const toggle = () => {
    setModal(!modal);
  };

  const toggle1 = () => {
    setModal1(!modal1);
  };

  const fetchAllData = useCallback(async () => {
      try {
        const { data: response } = await axios.get("/team/members", config);
        const { data: response1 } = await axios.get("/team/leave", config);
        const newData = response1.data.map((item: any) => {
          let employee = "N/A",
            firstName = "N/A",
            lastName = "N/A",
            type = "N/A",
            status = "N/A";
  
          // Combined FirstName and LastName
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].userName === item.userName) {
              firstName = response.data[i].firstName;
              lastName = response.data[i].lastName;
              employee = firstName + " " + lastName;
            }
          }
  
          if (item.type) type = item.type.toUpperCase();
          if (item.approved === 1) status = "Approved";
          if (item.rejected === 1) status = "Rejected";
          if (item.approved === 0 && item.rejected === 0) status = "Pending";
  
          return { ...item, employee, type, status };
        });
        setRequests(newData);
        if (newData.length === 0) {
          setDisplay(true);
        } else {
          setDisplay(false);
        }
      } catch (error : any) {
        if (error.response.data.status === 401) {
          setErrMessage(error.response.data.error);
          setLogOut(true);
        }
        console.log(error.response.data.message);
      }
    },
    [setErrMessage,setLogOut],
  )

  useEffect(() => {
    let timer = setTimeout(() => fetchAllData(), 500);
    return () => {
      clearTimeout(timer);
    };
  }, [refreshKey, fetchAllData]);

  const handleSubmit = async (e: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const submitData = {
      id: e.target.id,
      approve: submitButton,
    };

    e.preventDefault();
    await axios
      .post("/team/leave-approve", submitData, config)
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: response.data.message,
          showConfirmButton: false,
          timer: 2500,
        });
        //add alert for success
        setRefreshKey((refresh) => refresh + 1);
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
  };
  // console.log(requests);
  return (
    <CCard>
      <CCardHeader className="d-flex align-items-center justify-content-between">
        Pending Approvals
      </CCardHeader>

      <CCardBody>
        <DataTableWrapper>
          <CDataTable
            items={requests}
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
            tableFilter={{ placeholder: "Type here...", label: "Search:" }}
            itemsPerPageSelect
            itemsPerPage={10}
            hover
            sorter
            outlined
            pagination
            scopedSlots={{
              status: (item: any) => (
                <td className="py-2">
                  <CBadge style={{ padding: '0.5rem' }} color={getLeaveApprovalBadge(item.status)}>
                    {item.status}
                  </CBadge>
                </td>
              ),
              show_details: (item: any, index: any) => {
                return (
                  <td className="py-2">
                    <CButton
                      color={details.includes(index) ? "danger" : "primary"}
                      shape="square"
                      size="md"
                      onClick={() => {
                        toggleDetails(index);
                      }}
                    >
                      {details.includes(index) ? "Hide" : "View more"}
                    </CButton>
                  </td>
                );
              },
              details: (item: any, index: any) => {
                const timestamp = item.createdDt;
                const timeFiled = new Date(timestamp).toLocaleString("en-US");
                const key = item.id;
                // if(item.approved === 1) {
                //   r
                // }

                return (
                  <form onSubmit={handleSubmit} id={key}>
                    <CCollapse
                      style={{
                        textAlign: "justify",
                        width: "70%",
                        margin: "auto",
                      }}
                      show={details.includes(index)}
                    >
                      <CCardBody style={{ padding: "2rem 2rem 1rem" }}>
                        <Name>{item.employee}</Name>
                        <InfoSection>
                          <div>
                            <Status>Leave Type</Status>
                            <Info>Leave Date from</Info>
                            <Info>Leave Date until</Info>
                          </div>
                          <div>
                            <Info className="text-muted">
                              {`${item.type}`.toUpperCase()}
                            </Info>
                            <Info className="text-muted">{item.startDate}</Info>
                            <Info className="text-muted">{item.endDate}</Info>
                          </div>
                        </InfoSection>
                        <InfoSection1>
                          <Status1>Date Filed: </Status1>
                          <Info2 className="text-muted">{timeFiled}</Info2>
                          <Sub>Reasons for Leave:</Sub>
                          <Info1 className="text-muted">{item.reason}</Info1>
                          {item.approved === 1 || item.rejected === 1 ? (
                            <Sub>
                              {item.approved === 1
                                ? "Approved"
                                : "" || item.rejected === 1
                                ? "Rejected"
                                : ""}
                            </Sub>
                          ) : (
                            <div>
                              <Button onClick={toggle} size="sm" color="success">
                                <FaCheck />
                              </Button>
                              <Button
                                onClick={toggle1}
                                size="sm"
                                color="danger"
                                className="ml-1"
                              >
                                <FaTimes />
                              </Button>
                            </div>
                          )}
                        </InfoSection1>
                      </CCardBody>

                      <Modal show={modal}>
                        <CModalHeader>Approve?</CModalHeader>
                        <CModalBody>
                          Do you want to approve this request?
                        </CModalBody>
                        <CModalFooter>
                          <CButton
                            type="submit"
                            color="primary"
                            key={1}
                            onClick={() => {
                              setSubmitButton(1);
                              setModal(!modal);
                            }}
                          >
                            Confirm
                          </CButton>
                          <CButton color="secondary" onClick={toggle}>
                            Cancel
                          </CButton>
                        </CModalFooter>
                      </Modal>
                      <Modal show={modal1}>
                        <CModalHeader>Reject?</CModalHeader>
                        <CModalBody>
                          Do you want to reject this request?
                        </CModalBody>
                        <CModalFooter>
                          <CButton
                            type="submit"
                            color="primary"
                            key={0}
                            onClick={() => {
                              setSubmitButton(0);
                              setModal1(!modal1);
                            }}
                          >
                            Confirm
                          </CButton>
                          <CButton color="secondary" onClick={toggle1}>
                            Cancel
                          </CButton>
                        </CModalFooter>
                      </Modal>
                    </CCollapse>
                  </form>
                );
              },
            }}
          />
        </DataTableWrapper>
      </CCardBody>
    </CCard>
  );
};

export default PendingApproval;
