import { useState, useEffect } from "react";
import Axios from "../axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const useCheckProfile = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // fetching all announcements data

    const getProfileAPI = async () => {
      try {
        setLoading(true);
        const { data: profile } = await Axios.get("/user/profile", config);
        const { features } = profile.data;

        for (const feature of features) {
          if (feature === "reports-employees") {
            setIsAdmin(false);
            setLoading(false);
          }

          if (feature === "reports") {
            setIsAdmin(true);
            setLoading(false);
          }
        }
      } catch (error) {
        console.log("error " + error);
      }
    };

    getProfileAPI();
  }, []);

  return [isLoading, isAdmin] as const;
};

export default useCheckProfile;
