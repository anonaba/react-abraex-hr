import React, { useEffect, useState , useCallback} from "react";
// import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  ButtonDiv,
  ConfirmButton,
  Div,
  Div1,
  Div2,
  Input,
  Label,
  FlexDiv
} from "./style";
import swal from "sweetalert2";
import axios from "../../axios";
import Cookies from "universal-cookie";
import { CSpinner } from "@coreui/react";
import useLogOut from "hooks/useLogOut";

const cookies = new Cookies();
const token = cookies.get("token");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const TeamSettings = () => {
  const [newSettings, setNewSettings] = useState<any>([null]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loading1, setLoading1] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [teamName, setTeamName] = useState("");
  const [newHoliday, setNewHoliday] = useState(0);
  const [newPrivilegeLeave, setNewPrivilegeLeave] = useState(0);
  const [newCca, setNewCca] = useState(0);
  const [newConveyance, setNewConveyance] = useState(0);
  const [newHouseRent, setNewHouseRent] = useState(0);
  const [newMedical, setNewMedical] = useState(0);
  const [newOvertime, setNewOvertime] = useState(0);
  const [newSpecial, setNewSpecial] = useState(0);
  const [newProvidentFund, setNewProvidentFund] = useState(0);
  const [setLogOut, setErrMessage] = useLogOut(false);
  
  // const { handleSubmit, control } = useForm<FormInputs>();

  const handleSubmit = async (e: any) => {
    const newData = {
      holidays: newHoliday === null ? "0" : newHoliday,
      privilegeLeave: newPrivilegeLeave === null ? "0" : newPrivilegeLeave,
      cca: newCca === null ? "0" : newCca,
      conveyance: newConveyance === null ? "0" : newConveyance,
      houseRent: newHouseRent === null ? "0" : newHouseRent,
      medical: newMedical === null ? "0" : newMedical,
      overtime: newOvertime === null ? "0" : newOvertime,
      special: newSpecial === null ? "0" : newSpecial,
      providentFund: newProvidentFund === null ? "0" : newProvidentFund,
    };

    // console.log(newData);
    e.preventDefault();

    await axios
      .post("/team/settings", newData, config)
      .then((response) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2500);
        swal.fire({
          icon: "success",
          text: response.data.message,
          showConfirmButton: false,
          timer: 2500,
        });
        setRefreshKey((refresh) => refresh + 1);
        // console.log(response.data);
      })
      .catch((error) => {
        swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };
  const getSettings = useCallback(async () => {
      await axios
        .get("/team/settings", config)
        .then((request) => {
          setNewSettings(request.data.data);
          setTeamName(request.data.data.name);
          setNewHoliday(request.data.data.holidays);
          setNewPrivilegeLeave(request.data.data.privilegeLeave);
          setNewCca(request.data.data.cca);
          setNewConveyance(request.data.data.conveyance);
          setNewHouseRent(request.data.data.houseRent);
          setNewMedical(request.data.data.medical);
          setNewOvertime(request.data.data.overtime);
          setNewSpecial(request.data.data.special);
          setNewProvidentFund(request.data.data.providentFund);
          setLoading1(true);
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
    let timer = setTimeout(() => getSettings(), 250);
    return () => {
      clearTimeout(timer);
    };
  }, [refreshKey,getSettings]);

  return (
    <Div>
      <header className="card-header">Team Settings</header>
      <form onSubmit={handleSubmit}>
        {loading1 ? (
          <Div1>
            <Div2>
              <Label htmlFor="team-name">Team</Label>
              <Input
                type="text"
                id="team-name"
                value={teamName}
                defaultValue={newSettings.name}
                disabled
              />
            </Div2>
            <Div2>
              <Label htmlFor="holidays">Holidays</Label>
              <Input
                type="number"
                id="holidays"
                value={newHoliday}
                onChange={(e: any) => {
                  setNewHoliday(e.target.value);
                }}
                defaultValue={newSettings.holidays}
                required
              />
            </Div2>
            <Div2>
              <Label htmlFor="">Privilege Leave</Label>
              <Input
                type="number"
                id="privilegeLeave"
                value={newPrivilegeLeave}
                onChange={(e: any) => {
                  setNewPrivilegeLeave(e.target.value);
                }}
                defaultValue={newSettings.privilegeLeave}
                required
              />
            </Div2>
            <Div2>
              <Label htmlFor="cca">City Compensatory Allowance(CCA)</Label>
              <Input
                type="number"
                id="cca"
                value={newCca}
                onChange={(e: any) => {
                  setNewCca(e.target.value);
                }}
                defaultValue={newSettings.cca}
                required
              />
            </Div2>
            <Div2>
              <Label htmlFor="conveyanceAllowance">Conveyance Allowance</Label>
              <Input
                type="number"
                id="conveyance"
                value={newConveyance}
                onChange={(e: any) => {
                  setNewConveyance(e.target.value);
                }}
                defaultValue={newSettings.conveyance}
                required
              />
            </Div2>
            <Div2>
              <Label htmlFor="">House Rent Allowance</Label>
              <Input
                type="number"
                id="houseRent"
                value={newHouseRent}
                onChange={(e: any) => {
                  setNewHouseRent(e.target.value);
                }}
                defaultValue={newSettings.houseRent}
                required
              />
            </Div2>
            <Div2>
              <Label htmlFor="">Medical Allowance</Label>
              <Input
                type="number"
                id="medical"
                value={newMedical}
                onChange={(e: any) => {
                  setNewMedical(e.target.value);
                }}
                defaultValue={newSettings.medical}
                required
              />
            </Div2>
            <Div2>
              <Label htmlFor="">Overtime</Label>
              <Input
                type="number"
                id="overtime"
                value={newOvertime}
                onChange={(e: any) => {
                  setNewOvertime(e.target.value);
                }}
                defaultValue={newSettings.overtime}
                required
              />
            </Div2>
            <Div2>
              <Label htmlFor="special">Special Allowance</Label>
              <Input
                type="number"
                id="special"
                value={newSpecial}
                onChange={(e: any) => {
                  setNewSpecial(e.target.value);
                }}
                defaultValue={newSettings.special}
                required
              />
            </Div2>
            <Div2>
              <Label htmlFor="">Provident Fund</Label>
              <Input
                type="number"
                id="providentFund"
                value={newProvidentFund}
                onChange={(e: any) => {
                  setNewProvidentFund(e.target.value);
                }}
                defaultValue={newSettings.providentFund}
                required
              />
            </Div2>
          </Div1>
        ) : (
          <FlexDiv>
            <CSpinner size="lg" />
          </FlexDiv>
        )}
        <ButtonDiv>
          <ConfirmButton
            className="mx-2"
            color="primary"
            type="submit"
            disabled={loading ? true : false}
          >
            {loading ? <CSpinner size="sm" /> : "Confirm"}
          </ConfirmButton>
        </ButtonDiv>
      </form>
    </Div>
  );
};

export default TeamSettings;
