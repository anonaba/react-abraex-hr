import React, { useEffect, useState , useCallback} from "react";
import Cookies from "universal-cookie";
import axios from "../../axios";
import Swal from "sweetalert2";
import FormData from "form-data";
import useLogOut from "hooks/useLogOut";
import {
  Card,
  CardInfo,
  ColumnInfo,
  Div,
  ImageInput,
  Input,
  Label,
  ProfileImg,
  Row,
} from "./style";
import { CSpinner } from "@coreui/react";

const cookies = new Cookies();
const token = cookies.get("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const Profile: React.FC = () => {
  //   const [authorized, setAuthorized] = useState(auth);
  const [profile, setProfile] = useState<any>([null]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [setLogOut, setErrMessage] = useLogOut(false);
  // const [newImage, setNewImage] = useState<string>("");
  // const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
  const getProfileInfo = useCallback(async () => {
      await axios
        .get("/user/profile", config)
        .then((request) => {
          setTimeout(() => {
            setLoading(true);
            setProfile(request.data.data);
          }, 300);
        })
        .catch((error) => {
          if (error.response.data.status === 401) {
            setErrMessage(error.response.data.error);
            setLogOut(true);
          }
          console.log(error.response.data.message);
        });
    },
    [setLogOut,setErrMessage],
  )

  useEffect(() => {
    let timer = setTimeout(() => getProfileInfo(), 500);
    return () => {
      clearTimeout(timer);
    };
  }, [refreshKey, getProfileInfo]);

  // const handleImageUpload = (e: any) => {
  //   if (e.target.files && e.target.files[0]) {
  //     let reader = new FileReader();

  //     reader.onload = (e: any) => {
  //       setNewImage(e.target.result);
  //       setIsFileSelected(true);
  //       console.log(newImage);

  //     };

  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  const handleSubmit = async (e: any) => {
    let image = e.target.files[0];
    let newData = new FormData();
    newData.append("profile_pic", image, image.name);

    // console.log(image);
    // console.log(image.name);

    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .post("/user/profile-pic", newData, config)
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: response.data.message,
          timerProgressBar: true,
          showConfirmButton: false,
          timer: 1000,
        });
        setRefreshKey((refresh) => refresh + 1);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Something is wrong",
          text: error.response.data.message,
        });
        console.log("error " + error);
      });

    e.preventDefault();
  };

  return (
    <>
      <main className="c-name">
        <Card>
          {loading ? (
            <Row>
              <Div>
                <form>
                  <ProfileImg src={`/avatars/${profile.profilePic}`} />
                  <ImageInput
                    color={"primary"}
                    type="file"
                    onChange={handleSubmit}
                  />
                </form>
              </Div>
              <CardInfo>
                <div>
                  <Row>
                    <ColumnInfo>
                      <Label>First Name</Label>
                      <Input
                        id="first name"
                        value={profile.firstName}
                        readOnly
                      />
                    </ColumnInfo>
                    <ColumnInfo>
                      <Label>Middle Name</Label>
                      <Input
                        id="middle name"
                        value={profile.middleName}
                        readOnly
                      />
                    </ColumnInfo>
                    <ColumnInfo>
                      <Label>Last Name</Label>
                      <Input id="last name" value={profile.lastName} readOnly />
                    </ColumnInfo>
                  </Row>
                  <Row>
                    <ColumnInfo>
                      <Label>Employee ID</Label>
                      <Input
                        id="employeeId"
                        value={profile.employeeId}
                        readOnly
                      />
                    </ColumnInfo>
                    <ColumnInfo>
                      <Label>Birth date</Label>
                      <Input
                        id="birthDate"
                        value={profile.birthDate}
                        readOnly
                      />
                    </ColumnInfo>
                    <ColumnInfo>
                      <Label>Position</Label>
                      <Input id="position" value={profile.position} readOnly />
                    </ColumnInfo>
                  </Row>
                </div>
              </CardInfo>
            </Row>
          ) : (
            <div style={{ margin: "auto", paddingBottom: "2rem" }}>
              <CSpinner
                color="primary"
                className="d-flex justify-content-center my-5"
                style={{ margin: "auto" }}
              />
            </div>
          )}
        </Card>
      </main>
    </>
  );
};

export default Profile;
