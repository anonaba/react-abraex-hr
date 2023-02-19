import { useState, useEffect } from "react";
import axios from "../axios";
import useLogOut from "hooks/useLogOut";

type filteredLeaveData = any[];
type filteredMember = any[];
type filteredUserRequest = any[];

export const useEmployeeData = (
  profileAPI: string,
  membersAPI: string,
  leaveAPI: string,
  config: object
) => {
  const [setLogOut, setErrMessage] = useLogOut(false);
  const [employeeProfile, setEmployeeProfile] = useState<any[]>([]);
  const [displayData, setDisplayData] = useState<boolean>();
  const [userInfo, setUserInfo] = useState(false);

  useEffect(() => {
    const employeeData = async () => {
      try {
        const { data: userProfile } = await axios.get(profileAPI, config);
        const { data: teamMembers } = await axios.get(membersAPI, config);
        const { data: teamLeave } = await axios.get(leaveAPI, config);

        for (const features of userProfile.data.features) {
          features === "reports" && setUserInfo(true);
        }

        const profileData = userProfile.data;
        var memberData = [];
        memberData = teamMembers.data;
        let filteredMember: filteredMember = [];
        for (const members of memberData) {
          filteredMember.push({
            id: members.id,
            employeeId: members.employeeId,
            userName: members.userName,
            firstName: members.firstName,
            lastName: members.lastName,
            position: members.position,
            birthDate: members.birthDate,
            pendingRequest: [],
          });
        }

        let request: filteredLeaveData = [];
        request = teamLeave.data;
        request.filter((request: any) => {
          return request.approved === 0 && request.rejected === 0;
        });

        filteredMember = filteredMember.filter((el: any) => {
          return profileData.userName === el.userName;
        });

        let userRequest = [];
        userRequest = request.filter((filterRequest: any) => {
          return profileData.userName === filterRequest.userName;
        });

        let filteredUserRequest: filteredUserRequest = [];
        for (const finalFilteredMember of filteredMember) {
          filteredUserRequest.push({
            id: finalFilteredMember.id,
            employeeId: finalFilteredMember.employeeId,
            userName: finalFilteredMember.userName,
            firstName: finalFilteredMember.firstName,
            lastName: finalFilteredMember.lastName,
            position: finalFilteredMember.position,
            birthDate: finalFilteredMember.birthDate,
            pendingRequest: userRequest,
          });
        }

        filteredUserRequest.length === 0
          ? setDisplayData(true)
          : setDisplayData(false);

        setEmployeeProfile(filteredUserRequest);
      } catch (error: any) {
        if (error.response.data.status === 401) {
          setErrMessage(error.response.data.error);
          setLogOut(true);
        }
      }
    };
    employeeData();
  }, [config, leaveAPI, membersAPI, profileAPI, setLogOut, setErrMessage]);

  return [employeeProfile, displayData, userInfo] as const;
};
