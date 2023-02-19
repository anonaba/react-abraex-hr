import {
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CDataTable,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
  CSpinner,
} from "@coreui/react";
import React, { useState, useEffect ,useCallback} from "react";
import {
  Button,
  ButtonDiv,
  Card,
  Card1,
  InfoDate,
  Info,
  Input,
  Label,
  MainCard,
  Reason,
  Section,
  Textarea,
  Modal,
  Badge,
  DataTableWrapper,
} from "./style";
import Cookies from "universal-cookie";
import axios from "../../axios";
import Swal from "sweetalert2";
import { FaCheck, FaTimes } from "react-icons/fa";
import useLogOut from "hooks/useLogOut";

const cookies = new Cookies();
const token = cookies.get("token");

const Resignation = () => {
  const [data, setData] = useState<any>([]);
  const [data1, setData1] = useState<any>([]);
  const [details, setDetails] = useState([""]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDisplay, setIsDisplay] = useState<boolean>(true);
  const [resDate, setResDate] = useState<any>(null);
  const [reason, setReason] = useState<any>("");
  const [submitButton, setSubmitButton] = useState("");
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [setLogOut, setErrMessage] = useLogOut(false);
  //MODAL
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const fetchData = useCallback(async () => {
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
          for (let i = 0; i < response.data.data.features.length; i++) {
            if (response.data.data.features[i] === "manage-employees") {
              setIsDisplay(true);
            }
            if (response.data.data.features[i] === "reports-employees") {
              setIsDisplay(false);
            }
          }
        })
        .catch((error : any) => {
          if (error.response.data.status === 401) {
            setErrMessage(error.response.data.error);
            setLogOut(true);
          }
          console.log(error.response.data.message);
        });
    },
    [setErrMessage,setLogOut],
  )
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchAllData = async () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data: response } = await axios.get("/team/members", config);
      const { data: response1 } = await axios.get("/team/resignation", config);
      const newData = response1.data.map((item: any) => {
        let firstName = "N/A",
          lastName = "N/A",
          name = "N/A",
          status = "N/A";

        // Combined FirstName and LastName
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].id === item.owner) {
            firstName = response.data[i].firstName;
            lastName = response.data[i].lastName;
            name = firstName + " " + lastName;
          }
        }

        if(item.status === "approved") status = "Approved"
        if(item.status === "rejected") status = "Rejected"
      if (item.status === "pending") status = "Pending";

        const timestamp = item.createdDt;
        const createdDate = new Date(timestamp).toLocaleString("en-US");

        return { ...item, name, createdDate, status };
      });
      setData1(newData);
    } catch (error) {}
  };

  useEffect(() => {
    let timer = setTimeout(() => fetchAllData(), 500);
    return () => {
      clearTimeout(timer);
    };
  }, [refreshKey]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const cookies = new Cookies();
    const token = cookies.get("token");
    const submitData = {
      id: e.target.id,
      status: submitButton,
      date: resDate,
      reason: reason,
    };

    await axios
      .post("/team/resignation", submitData, {
        headers: {
          Authorization: "Bearer ".concat(token ? token : undefined),
        },
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setRefreshKey((refresh) => refresh + 1);
        // console.log(response.data.message);
        setResDate("");
        setReason("");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Something is wrong",
          text: error.response.data.message,
          showConfirmButton: true,
        });
      });
  };

  const fields = [
    {
      key: "createdDate",
      _style: { width: "10%", color: "#fff", background: "#3f72af" },
    },
    {
      key: "name",
      _style: { width: "20%", color: "#fff", background: "#3f72af" },
    },
    {
      key: "date",
      _style: { width: "10%", color: "#fff", background: "#3f72af" },
    },
    {
      key: "status",
      _style: { width: "10%", color: "#fff", background: "#3f72af" },
    },
    {
      key: "show_details",
      label: "Action",
      _style: { width: "5%",  color: "#fff",background: "#3f72af" },
      sorter: false,
      filter: false,
    },
  ];

  const getBadge = (status: any) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Rejected":
        return "danger";
      default:
        return "secondary";
    }
  };

  const toggleDetails = (index: any) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
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

  return (
    <div>
      <MainCard>
        <CCardHeader className="d-flex align-items-center justify-content-between">
          Resignation
        </CCardHeader>
        {loading ? (
          <div>
            <Card>
              <form onSubmit={handleSubmit}>
                <CRow>
                  <CCol sm="2">
                    <Label htmlFor="">Name</Label>
                  </CCol>
                  <CCol sm="10">
                    <Input
                      value={
                        data.firstName +
                        " " +
                        (data.middleName === null
                          ? ""
                          : data.middleName + " ") +
                        data.lastName
                      }
                      type="text"
                      disabled
                    />
                  </CCol>
                  <CCol sm="2">
                    <Label htmlFor="">Position</Label>
                  </CCol>
                  <CCol sm="10">
                    <Input value={data.position} type="text" disabled />
                  </CCol>
                  <CCol sm="2">
                    <Label htmlFor="">Resignation Date</Label>
                  </CCol>
                  <CCol sm="10">
                    <InfoDate
                      type="date"
                      value={resDate}
                      onChange={(e: any) => setResDate(e.target.value)}
                      required
                    />
                  </CCol>
                  <CCol sm="2">
                    <Label htmlFor="">Reason for Resignation</Label>
                  </CCol>
                  <CCol sm="10">
                    <Textarea
                      type="text"
                      value={reason}
                      onChange={(e: any) => setReason(e.target.value)}
                      placeholder="Type here..."
                      required
                    />
                  </CCol>
                </CRow>

                <ButtonDiv>
                  <CButton type="submit" color="primary">
                    Confirm
                  </CButton>
                </ButtonDiv>
              </form>
            </Card>
            <Card1 isDisplay={isDisplay}>
              <DataTableWrapper>

              <CDataTable
                items={data1}
                fields={fields}
                columnFilter
                tableFilter={{ placeholder: "Type here...", label: "Search:" }}
                itemsPerPageSelect
                itemsPerPage={5}
                outlined
                hover
                sorter
                pagination
                scopedSlots={{
                  status: (item: any) => (
                    <td className="py-2">
                      <Badge color={getBadge(item.status)}>
                        {item.status}
                      </Badge>
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
                    const key = item.id;

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
                            <Section>
                              <Info>Reason for Resignation:</Info>
                              <Reason>{item.reason}</Reason>
                              <Button
                                size="sm"
                                color="success"
                                onClick={toggle}
                              >
                                <FaCheck />
                              </Button>
                              <Button
                                size="sm"
                                color="danger"
                                onClick={toggle1}
                                className="ml-1"
                              >
                                <FaTimes />
                              </Button>
                            </Section>
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
                                  setSubmitButton("approved");
                                  setModal(!modal);
                                  setResDate("");
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
                                  setSubmitButton("rejected");
                                  setModal1(!modal1);
                                  setResDate("");
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
            </Card1>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <CSpinner color="primary" style={{ margin: "12% auto" }} />
          </div>
        )}
      </MainCard>
    </div>
  );
};

export default Resignation;
