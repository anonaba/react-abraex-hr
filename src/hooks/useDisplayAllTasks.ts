import { useState, useEffect, useCallback } from "react";
import axios from "../axios";
import useLogOut from "hooks/useLogOut";

const useDisplayAllTask = (
  taskAPI: string,
  membersAPI: string,
  profileAPI: string,
  config: object
) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [data, setData] = useState<string[]>([]);
  const [display, setDisplay] = useState<boolean>();
  const [members, setMembers] = useState<string[]>([]);
  const [setLogOut, setErrMessage] = useLogOut(false);
  const [profileID, setProfileID] = useState<string>("");

  const fetchTaskData = useCallback(async () => {
    try {
      const { data: teamTask } = await axios.get(taskAPI, config);
      const { data: teamMembers } = await axios.get(membersAPI, config);
      const { data: userProfile } = await axios.get(profileAPI, config);

      //to display fullname of all members in dropdown
      setMembers(teamMembers.data);

      const { id } = userProfile.data;
      setProfileID(id);

      const taskData = teamTask.data.map((teamTaskItem: any) => {
        let branch = "N/A",
          taskName = "N/A",
          taskDetails = "N/A",
          attachments = [],
          attachment = "N/A",
          assignee = "N/A",
          createdBy = "N/A",
          status = "N/A",
          priority = "N/A",
          ownerId = teamTaskItem.owner,
          userId = userProfile.data.id;

        teamTaskItem.branch && (branch = teamTaskItem.branch);
        teamTaskItem.name && (taskName = teamTaskItem.name);
        teamTaskItem.description && (taskDetails = teamTaskItem.description);
        teamTaskItem.attachments && (attachments = teamTaskItem.attachments);
        teamTaskItem.status === "0" && (status = "Backlog");
        teamTaskItem.status === "1" && (status = "In Progress");
        teamTaskItem.status === "2" && (status = "QA Review");
        teamTaskItem.status === "3" && (status = "Done");
        // 1 for high, 2 for medium, 3 for low priority
        teamTaskItem.priority === "1" && (priority = "High");
        teamTaskItem.priority === "2" && (priority = "Medium");
        teamTaskItem.priority === "3" && (priority = "Low");

        teamTaskItem.attachments.length === 0
          ? (attachment = "None")
          : teamTaskItem.attachments.length < 2
          ? (attachment = teamTaskItem.attachments.length + " file")
          : (attachment = teamTaskItem.attachments.length + " files");

        for (const members of teamMembers.data) {
          members.id === teamTaskItem.owner &&
            (assignee = `${members.firstName} ${members.lastName}`);
          members.id === teamTaskItem.createdBy &&
            (createdBy = `${members.firstName} ${members.lastName}`);
        }

        return {
          ...teamTaskItem,
          branch,
          taskName,
          taskDetails,
          attachments,
          attachment,
          status,
          assignee,
          createdBy,
          userId,
          ownerId,
          priority,
        };
      });

      taskData.length === 0 ? setDisplay(true) : setDisplay(false);
      for (const features of userProfile.data.features) {
        if (features === "reports-employees") {
          let filteredTaskData: any = taskData.filter(
            (filteredData: any) => filteredData.owner === userProfile.data.id
          );
          setData(filteredTaskData);
          filteredTaskData.length === 0 ? setDisplay(true) : setDisplay(false);
        } else if (features === "reports") {
          setData(taskData);
        }
      }
    } catch (error: any) {
      if (error.response.data.status === 401) {
        setErrMessage(error.response.data.error);
        setLogOut(true);
      }
      console.log(error.response.data.message);
    }
  }, [taskAPI, membersAPI, profileAPI, config, setErrMessage, setLogOut]);

  useEffect(() => {
    let timer = setTimeout(() => fetchTaskData(), 500);
    return () => {
      clearTimeout(timer);
    };
  }, [refreshKey, fetchTaskData]);

  return [
    members,
    data,
    display,
    setRefreshKey,
    profileID,
    fetchTaskData,
  ] as const;
};

export default useDisplayAllTask;
