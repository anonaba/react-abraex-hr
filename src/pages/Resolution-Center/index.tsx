import React, { useState, useEffect, useCallback } from "react";
import axios from "../../axios";
import Cookies from "universal-cookie";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import swal from "sweetalert2";
import { FormInputs } from "./type";
import styled from "styled-components";
import CommentItem from "components/CommentItem";
import CommentForm from "components/ResolutionCommentForm";
import Moment from "moment";
import useLogOut from "hooks/useLogOut";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CDataTable,
  CFormGroup,
  CLabel,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from "@coreui/react";
import {
  Badge,
  FlexDiv,
  HeaderDiv,
  Input,
  InputDescription,
  Modal,
  P,
  Select,
  Div,
  H1,
  ScrollableDiv,
  DataTableWrapper,
} from "./style";

const getBadge = (status: any) => {
  switch (status) {
    case "Resolved":
      return "success";
    case "Unresolved":
      return "danger";
    default:
      return "primary";
  }
};

const getPriotiy = (priority: any) => {
  switch (priority) {
    case "Critical":
      return "danger";
    case "High Priority":
      return "warning";
    case "Low Priority":
      return "secondary";
    default:
      return "primary";
  }
};

const fields = [
  {
    key: "subject",
    _style: { width: "25%", color: "#fff", background: "#3f72af" },
  },
  {
    key: "createdBy",
    _style: { width: "20%", color: "#fff", background: "#3f72af" },
  },

  {
    key: "priority",
    _style: { width: "20%", color: "#fff", background: "#3f72af" },
  },
  {
    key: "status",
    _style: { width: "20%", color: "#fff", background: "#3f72af" },
  },
  {
    key: "show_details",
    label: "Action",
    _style: { width: "10%", color: "#fff", background: "#3f72af" },
    sorter: false,
    filter: false,
  },
];

const priorityOption = [
  { id: 1, type: "Critical" },
  { id: 2, type: "High Priority" },
  { id: 3, type: "Low Priority" },
];

const cookies = new Cookies();
const token = cookies.get("token");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const DetailsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const defaultInput = {
  subject: "",
  description: "",
  priority: "",
};

const ResolutionCenter: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [details, setDetails] = useState<any>([]);
  const { handleSubmit, reset, control } = useForm<FormInputs>();

  const [data, setData] = useState<string[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [display, setDisplay] = useState<boolean>();
  const [itemID, setItemID] = useState<string>("");
  const [setLogOut, setErrMessage] = useLogOut(false);

  const addNewIssue: SubmitHandler<FormInputs> = async (newIssueData) => {
    const formatData = {
      ...newIssueData,
    };
    try {
      const { data: response } = await axios.post(
        "/team/resolution",
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
      setModal(false);
      setRefreshKey((refresh) => refresh + 1);
    } catch (error: any) {
      swal.fire({
        icon: "error",
        text: error.message,
      });
      setModal(false);
      reset(defaultInput);
    }
  };
  const fetchAllData = useCallback(async () => {
      try {
        const { data: response } = await axios.get("/team/resolution", config);
        const { data: response1 } = await axios.get("/team/members", config);
        const newData = response.data.map((item: any) => {
          let subject = "N/A",
            createdBy = "N/A",
            priority = "N/A",
            status = "N/A",
            firstName = "N/A",
            lastName = "N/A";
          if (item.subject) subject = item.subject;
          if (item.resolved === "0") status = "Unresolved";
          if (item.resolved === "1") status = "Resolved";
          if (item.priority === "1") priority = "Critical";
          if (item.priority === "2") priority = "High Priority";
          if (item.priority === "3") priority = "Low Priority";
          for (let i = 0; i < response1.data.length; i++) {
            if (response1.data[i].id === item.createdBy) {
              firstName = response1.data[i].firstName;
              lastName = response1.data[i].lastName;
              createdBy = firstName + " " + lastName;
            }
          }
          return {
            ...item,
            subject,
            createdBy,
            priority,
            status,
          };
        });
        setData(newData);
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
  }, [refreshKey,fetchAllData]);

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

  const handleResolved = async (id: any) => {
    const { data: resolved } = await axios.post(
      "/team/resolution-update",
      {
        id: id,
      },
      config
    );
    swal.fire({
      icon: "success",
      text: resolved.message,
      showConfirmButton: false,
      timer: 2500,
    });
    setRefreshKey((refresh) => refresh + 1);
  };

  return (
    <CCard>
      <CCardHeader>
        <HeaderDiv>
          <div>Resolution Center</div>
          <div>
            <CButton block color="primary" onClick={() => setModal(!modal)}>
              Create Ticket
            </CButton>
          </div>
        </HeaderDiv>
      </CCardHeader>
      <CCardBody>
        <DataTableWrapper>
          <CDataTable
            items={data}
            fields={fields}
            columnFilter
            tableFilter
            itemsPerPageSelect
            itemsPerPage={10}
            hover
            sorter
            outlined
            pagination
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
            scopedSlots={{
              priority: (item: any) => (
                <td className="py-2">
                  <FlexDiv>
                    <div style={{ marginTop: "0.2rem" }}>
                      <Badge color={getPriotiy(item.priority)}>
                        {item.priority}
                      </Badge>
                    </div>
                  </FlexDiv>
                </td>
              ),
              status: (item: any) => (
                <td className="py-2">
                  <FlexDiv>
                    <div>
                      <Badge color={getBadge(item.status)}>{item.status}</Badge>
                    </div>
                    <div>
                      <CButton
                        style={{
                          display:
                            item.status === "Unresolved" ? "block" : "none",
                        }}
                        color="success"
                        shape="square"
                        size="sm"
                        onClick={() => {
                          setConfirmation(!confirmation);
                          setItemID(item.id);
                        }}
                      >
                        Resolve
                      </CButton>
                    </div>
                  </FlexDiv>
                </td>
              ),
              show_details: (item: any, index: any) => {
                return (
                  <td className="py-2">
                    <CButton
                      color={details.includes(index) ? "danger" : "primary"}
                      shape="square"
                      size="sm"
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
                const tId = item.id;
                var fetchComment: Array<any> = [];
                    fetchComment = item.comments
                return (
                  <CCollapse show={details.includes(index)}>
                    <DetailsDiv>
                      <CCard className="col-sm-5">
                        <CCardBody>
                          <P className="text-muted">Subject: {item.subject}</P>
                          <P className="text-muted">
                            Created By: {item.createdBy}
                          </P>
                          <P className="text-muted">Priority: {item.priority}</P>
                          <P className="text-muted">
                            Description: {item.description}
                          </P>
                        </CCardBody>
                      </CCard>
                      <CCard className="col-sm-7">
                        <CCardBody>
                          <div className="col-sm-12">
                            <CommentForm
                              getComments={() =>
                                setRefreshKey((refresh) => refresh + 1)
                              }
                              tId={tId}
                            />
                            <p className="mt-5 mb-4">Comments</p>
                            <ScrollableDiv>
                              {fetchComment
                                .sort((a, b) =>
                                  a.timestamp < b.timestamp ? 1 : -1
                                )
                                .map((result, i) => {
                                  return (
                                    <CommentItem
                                      key={i}
                                      comments={result.comment}
                                      date={Moment(result.timestamp).toDate()}
                                      username={result.userName}
                                      profilePic={result.profilePic}
                                    />
                                  );
                                })}
                            </ScrollableDiv>
                          </div>
                        </CCardBody>
                      </CCard>
                    </DetailsDiv>
                  </CCollapse>
                );
              },
            }}
          />
        </DataTableWrapper>
      </CCardBody>

      <form onSubmit={handleSubmit(addNewIssue)}>
        <Modal show={modal} onClose={setModal}>
          <CModalHeader>
            <CModalTitle>Create Ticket</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormGroup>
              <CLabel htmlFor="subject">Subject</CLabel>
              <Controller
                control={control}
                name="subject"
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value || ""}
                    id="subject"
                    placeholder="Enter Subject"
                    required
                  />
                )}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="priority">Priority</CLabel>
              <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                  <Select id="priority" {...field} required>
                    <option value="" disabled selected>
                      Please select
                    </option>
                    {priorityOption.map((items: any) => {
                      return (
                        <>
                          <option value={items.id}>{items.type}</option>
                        </>
                      );
                    })}
                  </Select>
                )}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="description">Description</CLabel>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <InputDescription
                    {...field}
                    value={field.value || ""}
                    id="textarea-input"
                    placeholder="Description.."
                    required
                  />
                )}
              />
            </CFormGroup>
          </CModalBody>
          <CModalFooter>
            <CButton type="submit" color="primary">
              Submit
            </CButton>{" "}
            <CButton
              color="secondary"
              onClick={() => {
                setModal(false);
                reset(defaultInput);
              }}
            >
              Cancel
            </CButton>
          </CModalFooter>
        </Modal>

        <Modal
          show={confirmation}
          onClose={() => setConfirmation(!confirmation)}
          // color="primary"
        >
          <CModalHeader closeButton>
            <CModalTitle>Are you sure?</CModalTitle>
          </CModalHeader>
          <CModalBody>Do you want to resolve this issue?</CModalBody>
          <CModalFooter>
            <CButton
              color="primary"
              onClick={() => {
                handleResolved(itemID);
                setConfirmation(!confirmation);
              }}
            >
              Confirm
            </CButton>{" "}
            <CButton
              color="secondary"
              onClick={() => setConfirmation(!confirmation)}
            >
              Cancel
            </CButton>
          </CModalFooter>
        </Modal>
      </form>
    </CCard>
  );
};

export default ResolutionCenter;
