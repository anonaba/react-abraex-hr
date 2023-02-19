import React, { useState, useEffect } from "react";
import axios from "../../axios";
import Cookies from "universal-cookie";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FormInputs } from "./type";
import swal from "sweetalert2";
import {
  CButton,
  CCardFooter,
  CCardHeader,
  CFormGroup,
  CLabel,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from "@coreui/react";
import {
  AnnouncementCard,
  AnnouncementDate,
  AnnouncementItems,
  AnnouncementTitle,
  CardBody,
  FlexDiv,
  InputDescription,
  InputTitle,
  Modal,
  P,
  SpinnerDiv,
  ViewMoreAnchor,
} from "./style";

const defaultInput = {
  title: "",
  description: "",
};

const cookies = new Cookies();
const token = cookies.get("token");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

type props = {
  onclick: any;
};
const Announcement: React.FC<props> = ({ onclick }: props) => {
  const [modal, setModal] = useState(false);
  const [announcements, setAnnouncements] = useState<any>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const { handleSubmit, reset, control } = useForm<FormInputs>();
  const [loading, setLoading] = useState<boolean>(false);
  const [track, setTrack] = useState<boolean>(false);
  const [showAnnouncementButton, setShowAnnouncementButton] =
    useState<boolean>(false);

  const getAllAnnouncements = async () => {
    setLoading(true);
    await axios
      .get("/dashboard/announcement", config)
      .then((res3) => {
        /**
         * * adding slice method with 0 and 5 value
         * * parameters makes announcement limit to 5
         */
        setAnnouncements(res3.data.data.slice(0, 5));
      })
      .catch((error) => {
        console.log("error " + error);
      });

    await axios
      .get("/user/profile", config)
      .then((res2) => {
        for (let i = 0; i < res2.data.data.features.length; i++) {
          if (res2.data.data.features[i] === "reports-employees") {
            setIsAdmin(false);
            setLoading(false);
          }
          if (res2.data.data.features[i] === "reports") {
            setIsAdmin(true);
            setLoading(false);
            setShowAnnouncementButton(true);
          }
        }
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };

  const addNewAnnouncement: SubmitHandler<FormInputs> = async (
    newAnnouncementData
  ) => {
    const formatData = {
      ...newAnnouncementData,
    };

    await axios
      .post("/dashboard/announcement", formatData, config)
      .then((response) => {
        swal.fire({
          icon: "success",
          text: response.data.message,
          showConfirmButton: false,
          timer: 2500,
        });
        reset(defaultInput);
        setModal(false);
        setTrack(true);
      })
      .catch((error) => {
        swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
        setModal(false);
        reset(defaultInput);
      });
  };

  useEffect(() => {
    // fetching all announcements data
    getAllAnnouncements();
    if (track) {
      getAllAnnouncements();
      setTrack(!track);
    }
  }, [track]);
  return (
    <>
      {loading ? (
        <SpinnerDiv>
          <CSpinner size="lg" />
        </SpinnerDiv>
      ) : (
        <>
          <AnnouncementCard>
            <CCardHeader>Latest Announcement</CCardHeader>
            <CardBody smaller={isAdmin}>
              {announcements.map((items: any, idx: any) => {
                const timestamp = items.createdDt;
                const timeFiled = new Date(timestamp).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                return (
                  <AnnouncementItems key={idx}>
                    <FlexDiv>
                      <AnnouncementTitle>{items.title}</AnnouncementTitle>
                      <AnnouncementDate>{timeFiled}</AnnouncementDate>
                    </FlexDiv>
                    <P>{items.description}</P>
                  </AnnouncementItems>
                );
              })}
            </CardBody>
            <CCardFooter className="d-flex align-items-center justify-content-between">
              <ViewMoreAnchor data-tab="announcements" onClick={onclick}>
                View more
              </ViewMoreAnchor>
              <div className="card-header-actions d-flex flex-wrap ">
                {showAnnouncementButton ? (
                  <CButton color="primary" onClick={() => setModal(!modal)}>
                    Create New Announcement
                  </CButton>
                ) : null}
              </div>
            </CCardFooter>
          </AnnouncementCard>
        </>
      )}

      <form onSubmit={handleSubmit(addNewAnnouncement)}>
        <Modal show={modal} onClose={setModal}>
          <CModalHeader>
            <CModalTitle>Create New Announcement</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormGroup>
              <CLabel htmlFor="title">Title</CLabel>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <InputTitle
                    {...field}
                    value={field.value || ""}
                    type="text"
                    id="title"
                    placeholder="Enter announcement title"
                    required
                  />
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
                    id="description"
                    placeholder="Announcement.."
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
      </form>
    </>
  );
};

export default Announcement;
