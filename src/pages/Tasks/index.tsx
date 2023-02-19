import React, { useState } from "react";
import {
  CCardHeader,
  CCardBody,
  CButton,
  CModalBody,
  CDataTable,
  CCard,
  CSpinner,
  CInput,
} from "@coreui/react";
import {
  P,
  Badge,
  CardBody,
  FlexChildren,
  Collapse,
  Preview,
  PreviewSlide,
  Image,
  ImageModal,
  DivFlex,
  Div,
  ModalHeader,
  H2,
  UploadContainer,
  InputLabelButton,
  DataTableWrapper,
  MImg,
  ImgWrapper,
  ThreeButtonDiv,
  ScrollableDiv,
} from "./style";
import axios from "../../axios";
import Cookies from "universal-cookie";
import { useForm, SubmitHandler } from "react-hook-form";
import swal from "sweetalert2";
import { FormInputs } from "./type";
import { formatBirthdate } from "../../utils/utils";
import FormData from "form-data";
import useDisplayAllTask from "hooks/useDisplayAllTasks";
import CreateNewTask from "components/CreateNewTask";
import { FaPaperclip } from "react-icons/fa";
import ChangePersonInCharge from "components/ChangePersonInCharge";
import ViewDetailStatusButton from "components/ViewDetailStatusButton";
import CommentForm from "components/ResolutionCommentForm";

const fields = [
  {
    key: "priority",
    _style: { width: "5%", color: "#fff", background: "#3f72af" },
  },
  {
    key: "branch",
    _style: { width: "10%", color: "#fff", background: "#3f72af" },
  },
  {
    key: "taskName",
    _style: { width: "20%", color: "#fff", background: "#3f72af" },
  },
  {
    key: "taskDetails",
    _style: { width: "20%", color: "#fff", background: "#3f72af" },
  },
  {
    label: "Assigned Person",
    key: "assignee",
    _style: { width: "15%", color: "#fff", background: "#3f72af" },
  },
  {
    key: "attachment",
    _style: { width: "5%", color: "#fff", background: "#3f72af" },
  },
  {
    key: "status",
    _style: { width: "5%", color: "#fff", background: "#3f72af" },
  },
  {
    key: "show_details",
    label: "Action",
    _style: { width: "11.2%", color: "#fff", background: "#3f72af" },
    sorter: false,
    filter: false,
  },
];

const getBadge = (status: any) => {
  switch (status) {
    case "Done":
      return "success";
    case "Backlog":
      return "secondary";
    case "In Progress":
      return "info";
    case "QA Review":
      return "warning";
    default:
      return "info";
  }
};

const priorityBadge = (priority: any) => {
  switch (priority) {
    case "High":
      return "danger";
    case "Medium":
      return "warning";
    case "Low":
      return "secondary";
    default:
      return "primary";
  }
};

const defaultInput = {
  startDate: "",
  endDate: "",
  branch: "",
  name: "",
  description: "",
  userId: "",
  priority: "",
};

const cookies = new Cookies();
const token = cookies.get("token");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const Tasks: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [details, setDetails] = useState<any>([]);
  const { handleSubmit, reset, control } = useForm<FormInputs>();
  const [modalImg, setModalImg] = useState<string>("");
  const [members, data, display, setRefreshKey, profileID, fetchTaskData] =
    useDisplayAllTask("/team/task", "/team/members", "/user/profile", config);

  const addNewTask: SubmitHandler<FormInputs> = async (newTaskData) => {
    const { startDate } = newTaskData;
    const { endDate } = newTaskData;

    const formatData = {
      ...newTaskData,
      startDate: formatBirthdate(startDate),
      endDate: formatBirthdate(endDate),
    };

    if (endDate < startDate) {
      swal.fire({
        icon: "error",
        text: "invalid date",
      });
    } else {
      try {
        const { data: teamTask } = await axios.post(
          "/team/task",
          formatData,
          config
        );
        swal.fire({
          icon: "success",
          text: teamTask.message,
          showConfirmButton: false,
          timer: 2500,
        });
        reset(defaultInput);
        setModal(false);
        setRefreshKey((refresh) => refresh + 1);
      } catch (error: any) {
        swal.fire({
          icon: "error",
          text: error.teamTask.data.message,
        });
        setModal(false);
        reset(defaultInput);
      }
    }
  };

  // toggle view button
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
  // toggle in progress button
  const toggleInProgress = async (item: any) => {
    const { data: teamTask } = await axios.post(
      "/team/task-update",
      {
        id: item.id,
        status: "1",
      },
      config
    );
    swal.fire({
      icon: "success",
      text: teamTask.message,
      showConfirmButton: false,
      timer: 2500,
    });
    setRefreshKey((refresh) => refresh + 1);
  };
  // toggle QA Review Button
  const toggleQaReview = async (item: any) => {
    const { data: teamTask } = await axios.post(
      "/team/task-update",
      {
        id: item.id,
        status: "2",
      },
      config
    );
    swal.fire({
      icon: "success",
      text: teamTask.message,
      showConfirmButton: false,
      timer: 2500,
    });
    setRefreshKey((refresh) => refresh + 1);
  };
  // toggle Done Button
  const toggleDone = async (item: any) => {
    const { data: teamTask } = await axios.post(
      "/team/task-update",
      {
        id: item.id,
        status: "3",
      },
      config
    );
    swal.fire({
      icon: "success",
      text: teamTask.message,
      showConfirmButton: false,
      timer: 2500,
    });
    setRefreshKey((refresh) => refresh + 1);
  };
  // toggle Backlog Button
  const toggleBackLog = async (item: any) => {
    const { data: teamTask } = await axios.post(
      "/team/task-update",
      {
        id: item.id,
        status: "0",
      },
      config
    );
    swal.fire({
      icon: "success",
      text: teamTask.message,
      showConfirmButton: false,
      timer: 2500,
    });
    setRefreshKey((refresh) => refresh + 1);
  };

  const handleAttachment = async (e: any) => {
    let image = e.target.files[0];
    // console.log(image);
    let newFile = new FormData();
    // var blob = new Blob([image], { type: "image/png"});
    newFile.append("attachment", image, image.name);
    newFile.append("id", e.target.id);

    const configFormData = {
      headers: {
        accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .post("/team/attachment", newFile, configFormData)
      .then((res) => {
        swal.fire({
          icon: "success",
          text: res.data.message,
          timerProgressBar: true,
          showConfirmButton: false,
          timer: 1000,
        });
        setRefreshKey((refresh) => refresh + 1);
      })
      .catch((err) => {
        swal.fire({
          icon: "error",
          title: "Something is wrong",
          text: err.response.data.message,
        });
        console.log("error " + err);
        e.preventDefault();
      });
  };

  const toggle = (img: string) => {
    setModal1(!modal1);
    setModalImg(img);
  };

  return (
    <CCard>
      <CCardHeader className="d-flex align-items-center justify-content-between">
        Tasks
        <div className="card-header-actions d-flex flex-wrap ">
          <CreateNewTask
            add={addNewTask}
            submit={handleSubmit}
            control={control}
            members={members}
            reset={reset}
            modal={modal}
            setModal={setModal}
          />
        </div>
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
            pagination
            outlined
            noItemsViewSlot={
              display ? (
                <Div>
                  <H2>No data yet</H2>
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
              status: (item: any) => (
                <>
                  <td className="py-2">
                    <div>
                      <Badge color={getBadge(item.status)}>{item.status}</Badge>
                    </div>
                  </td>
                </>
              ),
              priority: (item: any) => (
                <td className="py-2">
                  <div>
                    <Badge color={priorityBadge(item.priority)}>
                      {item.priority}
                    </Badge>
                  </div>
                </td>
              ),
              show_details: (item: any, index: any) => {
                return (
                  <td className="py-2">
                    <ThreeButtonDiv>
                      <div>
                        <CButton
                          color={details.includes(index) ? "danger" : "primary"}
                          shape="square"
                          size="sm"
                          onClick={() => {
                            toggleDetails(index);
                          }}
                          style={{ minWidth: "5rem" }}
                        >
                          {details.includes(index) ? "Hide" : "View more"}
                        </CButton>
                      </div>
                      <div>
                        <ViewDetailStatusButton
                          status={item.status}
                          owner={item.owner}
                          id={profileID}
                          inProgress={() => {
                            toggleInProgress(item);
                          }}
                          qaReview={() => {
                            toggleQaReview(item);
                          }}
                          done={() => {
                            toggleDone(item);
                          }}
                          backLog={() => {
                            toggleBackLog(item);
                          }}
                        />
                      </div>
                      <UploadContainer>
                        <InputLabelButton htmlFor={item.id}>
                          <FaPaperclip />
                        </InputLabelButton>
                        <CInput
                          id={item.id}
                          type="file"
                          color={"primary"}
                          onChange={handleAttachment}
                        />
                      </UploadContainer>
                    </ThreeButtonDiv>
                  </td>
                );
              },
              details: (item: any, index: any) => {
                return (
                  <Collapse show={details.includes(index)}>
                    <CardBody>
                      <FlexChildren style={{ width: "60%" }}>
                        <P className="text-muted">Branch: {item.branch}</P>
                        <P className="text-muted">Task Name: {item.taskName}</P>
                        <P className="text-muted">
                          Created By: {item.createdBy}
                        </P>
                        <P className="text-muted">
                          Assignee:{" "}
                          {item.userId === item.ownerId ? (
                            <ChangePersonInCharge
                              assignee={item.assignee}
                              ownerID={item.owner}
                              members={members}
                              taskID={item.id}
                              profileID={profileID}
                              rerenderData={fetchTaskData}
                            />
                          ) : (
                            item.assignee
                          )}
                        </P>
                      </FlexChildren>
                      <FlexChildren style={{ width: "60%" }}>
                        <P className="text-muted">
                          Description: {item.taskDetails}
                        </P>
                        <P className="text-muted">
                          Start Date: {item.startDate}
                        </P>
                        <P className="text-muted">End Date: {item.endDate}</P>
                        <P className="text-muted">
                          Attachment/s:{" "}
                          {item.attachments.length === 0
                            ? "None"
                            : item.attachments.length < 2
                            ? item.attachments.length + " file"
                            : item.attachments.length + " files"}
                        </P>
                      </FlexChildren>
                      <FlexChildren>
                        <DivFlex>
                          <PreviewSlide>
                            {item.attachments.map((att: any) => {
                              return (
                                <Preview>
                                  <Image
                                    src={`/attachments/${att}`}
                                    alt="img-uploaded"
                                    width="500"
                                    onClick={() => toggle(att)}
                                  />
                                </Preview>
                              );
                            })}
                          </PreviewSlide>
                          <CommentForm
                            getComments={() =>
                              setRefreshKey((refresh) => refresh + 1)
                            }
                            tId={item.id}
                          />
                          <p className="mt-5 mb-4">Comments</p>
                          <ScrollableDiv>
                            <li className="comment-item">
                              <div className="comment-container">
                                <img
                                  className="profile-img"
                                  src="/avatars/default_male.jpg"
                                  alt="Profile Pic"
                                  width="35"
                                  height="35"
                                />
                                <div className="username-time-comment-container">
                                  <div className="username-time-container">
                                    <div className="d-flex align-items-center">
                                      <p className="username">Name</p>
                                    </div>
                                    <div>
                                      <p className="time">
                                        yesterday at 7:53 PM
                                      </p>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <p className="comment p-2">Comment</p>
                                  </div>
                                </div>
                              </div>
                              <hr className="lineBreak" />
                            </li>
                          </ScrollableDiv>
                        </DivFlex>
                      </FlexChildren>
                    </CardBody>
                    <ImageModal show={modal1} size="lg" onClose={toggle}>
                      <ModalHeader closeButton>{item.taskName}</ModalHeader>
                      <CModalBody style={{ padding: 0 }}>
                        <ImgWrapper>
                          <MImg
                            fluid
                            src={`/attachments/${modalImg}`}
                            alt="attachment"
                          />
                        </ImgWrapper>
                      </CModalBody>
                    </ImageModal>
                  </Collapse>
                );
              },
            }}
          />
        </DataTableWrapper>
      </CCardBody>
    </CCard>
  );
};

export default Tasks;
