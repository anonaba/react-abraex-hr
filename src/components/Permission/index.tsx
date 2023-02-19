import React, { useEffect, useState, useCallback } from "react";
import {
  CButton,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CSpinner,
} from "@coreui/react";

import {
  Button,
  Div,
  Modal,
  Table,
  TdEmployee,
  Th,
  Thead,
  Tr,
  Td,
} from "./style";
import Cookies from "universal-cookie";
import axios from "../../axios";
import Swal from "sweetalert2";
import useButtonLoading from "hooks/useButtonLoading";

const cookies = new Cookies();
const token = cookies.get("token");

const Permission = () => {
  const [modal, setModal] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isloading, resetButtonLoading] = useButtonLoading(false);
  const [refreshKey, setRefreshKey] = useState(0);
  // const [data, setData] = useState<string[]>([]);

  // const toggle = () => {
  //   setModal(!modal);
  // };

  const fetchData = async () => {
    await axios
      .get("/team/members", {
        headers: {
          Authorization: "Bearer ".concat(token ? token : undefined),
        },
      })
      .then((response) => {
        // If request is good...
        setMembers(response.data.data);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };

  // console.log(members);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("/team/permissions", {
          headers: {
            Authorization: "Bearer ".concat(token ? token : undefined),
          },
        })
        .then((response) => {
          // If request is good...
          setPermissions(response.data.data);
        })
        .catch((error) => {
          console.log(error.data.error);
        });
    };
    fetchData();
  }, []);

  let refs: any[][];
  refs = [];

  const handleSubmit = async (e: any) => {
    resetButtonLoading(true);
    e.preventDefault();
    let data = [];
    for (var i = 0; i < members.length; i++) {
      let permissionsArray: string[] = [];
      data[i] = { userId: members[i].id, permissions: permissionsArray };
      for (var j = 0; j < permissions.length; j++) {
        if (refs[i][j].current.checked)
          data[i].permissions.push(permissions[j]);
      }
    }
    // console.log(data);
    const submitData = {
      roles: data,
    };

    console.log(submitData);
    await axios
      .post("/team/permissions", submitData, {
        headers: {
          Authorization: "Bearer ".concat(token ? token : undefined),
        },
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: response.data.message,
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          resetButtonLoading(false);
        });
        console.log(response.data.message);
        //add alert for success
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Something is wrong",
          text: error.response.data.message,
        }).then(() => {
          resetButtonLoading(false);
        });
        console.log("error " + error);
        //add alert for error(show error)
      });
  };

  const handleRefreshKey = useCallback(
    () => {
      setRefreshKey(refresh => refresh + 1);
      setModal(!modal);
    },
    [modal],
  )

  useEffect(() => {
    let timer = setTimeout(() => fetchData(), 100);
    return () => {
      clearTimeout(timer);
    };
  }, [refreshKey]);

  return (
    <>
      <Button color="primary" onClick={handleRefreshKey}>
        Permissions
      </Button>
      <Modal
        show={modal}
        onClose={() => setModal(!modal)}
        size="xl"
        position-static
        centered
      >
        <CModalHeader closeButton>Grant Permission</CModalHeader>
        <CModalBody>
          <form action="" onSubmit={handleSubmit}>
            <Div>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Members</Th>
                    {permissions.map((permission: any) => {
                      return <Th>{permission}</Th>;
                    })}
                  </Tr>
                </Thead>
                <tbody>
                  {members.map((member: any, idx) => {
                    refs[idx] = [];
                    return (
                      <Tr>
                        <TdEmployee key={member.id}>
                          {member.firstName} {member.lastName}
                        </TdEmployee>
                        {permissions.map((permission: any, idx2) => {
                          //TODO index ex. checkbox1_1, checkbox1_2
                          refs[idx][idx2] = React.createRef<HTMLInputElement>();
                          //console.log(refs[idx][idx2]);
                          return (
                            <Td>
                              <input
                                type="checkbox"
                                name=""
                                ref={refs[idx][idx2]}
                                defaultChecked={member.features.includes(
                                  permission
                                )}
                                value={permission}
                              />
                            </Td>
                          );
                        })}
                      </Tr>
                    );
                  })}
                </tbody>
              </Table>
            </Div>
          </form>
        </CModalBody>
        <CModalFooter>
          {/* TODO submit > for loop ung members > for loop permission > get checkbox value  */}
          {/* TODO send array of members with array of features / permissions to /api/team/permissions */}
          <CButton
            disabled={isloading ? true : false}
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            {isloading ? <CSpinner size="sm" /> : "Confirm"}
          </CButton>
          <CButton
            color="secondary"
            type="button"
            onClick={() => setModal(!modal)}
          >
            Cancel
          </CButton>
        </CModalFooter>
      </Modal>
    </>
  );
};

export default Permission;
