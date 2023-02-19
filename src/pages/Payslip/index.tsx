import React, { useState, useEffect } from "react";
import Axios from "../../axios";
import Cookies from "universal-cookie";
import Moment from "moment";
import useLogOut from "hooks/useLogOut";
import {
  CCard,
  CContainer,
  CButton,
  CCardBody,
  CCollapse,
  CDataTable,
  CSwitch,
  CSpinner,
  CCardHeader,
} from "@coreui/react";
import { Div, H1, H3, H5, Hr, Info, InfoDivColumn, InfoDivRow, Logo, P, PayslipCard, SwitchDiv , DataTableWrapper} from "./style";

type obj = any;
type holder = {} | any;
// type newArray2 = any[];
type filteredLeaveData = any[];
type filteredMemberData = any[];
type filteredPayslipData = any[];
const cookies = new Cookies();
const accessToken = cookies.get("token");

const Payslip: React.FC = () => {
  // const [payslipData, setPayslipData] = useState<any[]>([]);
  const [allMember, setAllMember] = useState<any[]>([]);
  const [details, setDetails] = useState(allMember);
  const [display, setDisplay] = useState<boolean>();
  const [newSettings, setNewSettings] = useState<any>([null]);
  const [cca, setCca] = useState<any>(0);
  const [conveyance, setConveyance] = useState<any>(0);
  const [houseRent, setHouseRent] = useState<any>(0);
  const [medical, setMedical] = useState<any>(0);
  const [overtime, setOvertime] = useState<any>(0);
  const [special, setSpecial] = useState<any>(0);
  const [pf, setPf] = useState<any>(0);
  const [setLogOut, setErrMessage] = useLogOut(false);


  const fields = [
    {
      key: "employeeId",
      _style: { width: "10%", color: "#fff", background: "#3f72af" },
    },
    {
      key: "firstName",
      _style: { width: "26%", color: "#fff", background: "#3f72af" },
    },
    {
      key: "lastName",
      _style: { width: "26%", color: "#fff", background: "#3f72af" },
    },
    {
      key: "position",
      _style: { width: "26%", color: "#fff", background: "#3f72af" },
    },
    {
      key: "show_details",
      label: "Action",
      _style: { width: "15%", color: "#fff", background: "#3f72af" },
      sorter: false,
      filter: false,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      await Axios.get("/user/profile", {
        headers: {
          Authorization: "Bearer ".concat(
            accessToken ? accessToken : undefined
          ),
        },
      })
        .then(async (response1) => {
          // If request is good...
          await Axios.get("/team/members", {
            headers: {
              Authorization: "Bearer ".concat(
                accessToken ? accessToken : undefined
              ),
            },
          })
            .then(async (resposne2) => {
              // If request is good...
              await Axios.get("/team/leave", {
                headers: {
                  Authorization: "Bearer ".concat(
                    accessToken ? accessToken : undefined
                  ),
                },
              })
                .then((response3) => {
                  // If request is good...
                  //changes
                  const profile = response1.data.data;
                  var filteredLeaveData: filteredLeaveData = [];
                  var memberData = [];
                  memberData = resposne2.data.data;
                  var filteredMemberData: filteredMemberData = [];
                  for (var x = 0; x < memberData.length; x++) {
                    filteredMemberData.push({
                      id: memberData[x].id,
                      employeeId: memberData[x].employeeId,
                      userName: memberData[x].userName,
                      firstName: memberData[x].firstName,
                      lastName: memberData[x].lastName,
                      position: memberData[x].position,
                      birthDate: memberData[x].birthDate,
                      basicPay: parseFloat(memberData[x].basicPay),
                      tds: parseFloat(memberData[x].tds),
                      profTax: parseFloat(memberData[x].profTax),
                      sss: parseFloat(memberData[x].sss),
                      pagibig: parseFloat(memberData[x].pagibig),
                      philhealth: parseFloat(memberData[x].philhealth),
                      totalDaysLeave: 0,
                    });
                  }

                  const leaveData = response3.data.data;
                  var leaveDataHolder: holder = {};
                  var filteredLeaveDataHolder: holder = {};
                  leaveData.forEach((d: obj) => {
                    var numStartDate = 0;
                    var numEndDate = 0;
                    if (d.approved === 1) {
                      const startDate = Moment(d.startDate).toDate().getTime();
                      const endDate = Moment(d.endDate).toDate().getTime();
                      numStartDate = Math.floor(
                        startDate / (1000 * 60 * 60 * 24)
                      );
                      numEndDate = Math.floor(endDate / (1000 * 60 * 60 * 24));
                    }
                    if (leaveDataHolder.hasOwnProperty(d.userName)) {
                      leaveDataHolder[d.userName] =
                        leaveDataHolder[d.userName] +
                        (numEndDate - numStartDate);
                    } else {
                      leaveDataHolder[d.userName] = numEndDate - numStartDate;
                    }
                  });
                  for (var prop in leaveDataHolder) {
                    filteredMemberData.push({
                      userName: prop,
                      totalDaysLeave: leaveDataHolder[prop],
                    });
                  }
                  filteredMemberData.forEach((e: obj) => {
                    if (filteredLeaveDataHolder.hasOwnProperty(e.userName)) {
                      filteredLeaveDataHolder[e.userName] =
                        filteredLeaveDataHolder[e.userName] + e.totalDaysLeave;
                    } else {
                      filteredLeaveDataHolder[e.userName] = e.totalDaysLeave;
                    }
                  });
                  for (var f in filteredLeaveDataHolder) {
                    filteredLeaveData.push({
                      userName: f,
                      totalDaysLeave: filteredLeaveDataHolder[f],
                    });
                  }
                  // console.log("-----------filtered leave data-----------");
                  // console.log(filteredLeaveData);

                  const filterByReference = (
                    filteredLeaveData: Array<any>,
                    memberData: Array<any>
                  ) => {
                    let res = [];
                    res = memberData.filter((el) => {
                      return filteredLeaveData.find((element) => {
                        return element.userName === el.userName;
                      });
                    });
                    return res;
                  };

                  var usersLeaveData = [];
                  usersLeaveData = filteredLeaveData.filter((el) => {
                    return el.userName === profile.userName;
                  });
                  const filterByReference2 = (
                    usersLeaveData: Array<any>,
                    memberData: Array<any>
                  ) => {
                    let res = [];
                    res = memberData.filter((el) => {
                      return usersLeaveData.find((element) => {
                        return element.userName === el.userName;
                      });
                    });
                    return res;
                  };

                  const filterByReferenceArr = filterByReference(
                    filteredLeaveData,
                    memberData
                  );
                  const filterByReferenceArr2 = filterByReference2(
                    usersLeaveData,
                    memberData
                  );
                  var filteredPayslipData: filteredPayslipData = [];
                  if (profile.position === "CEO") {
                    for (var i = 0; i < filterByReferenceArr.length; i++) {
                      for (var a = 0; a < filteredLeaveData.length; a++) {
                        if (
                          filteredLeaveData[a].userName ===
                          filterByReferenceArr[i].userName
                        ) {
                          filteredPayslipData.push({
                            id: filterByReferenceArr[i].id,
                            employeeId: filterByReferenceArr[i].employeeId,
                            userName: filterByReferenceArr[i].userName,
                            firstName: filterByReferenceArr[i].firstName,
                            lastName: filterByReferenceArr[i].lastName,
                            position: filterByReferenceArr[i].position,
                            birthDate: filterByReferenceArr[i].birthDate,
                            basicPay: parseFloat(filterByReferenceArr[i].basicPay),
                            tds: parseFloat(filterByReferenceArr[i].tds),
                            profTax: parseFloat(filterByReferenceArr[i].profTax),
                            sss: parseFloat(filterByReferenceArr[i].sss),
                            pagibig: parseFloat(filterByReferenceArr[i].pagibig),
                            philhealth: parseFloat(filterByReferenceArr[i].philhealth),
                            totalDaysLeave: filteredLeaveData[a].totalDaysLeave,
                          });
                        }
                      }
                    }
                  } else {
                    for (var g = 0; g < filterByReferenceArr2.length; g++) {
                      for (var b = 0; b < filteredLeaveData.length; b++) {
                        if (
                          filteredLeaveData[b].userName ===
                          filterByReferenceArr2[g].userName
                        ) {
                          filteredPayslipData.push({
                            id: filterByReferenceArr2[g].id,
                            employeeId: filterByReferenceArr2[g].employeeId,
                            userName: filterByReferenceArr2[g].userName,
                            firstName: filterByReferenceArr2[g].firstName,
                            lastName: filterByReferenceArr2[g].lastName,
                            position: filterByReferenceArr2[g].position,
                            birthDate: filterByReferenceArr2[g].birthDate,
                            basicPay: parseFloat(filterByReferenceArr2[g].basicPay),
                            tds: parseFloat(filterByReferenceArr2[g].tds),
                            profTax: parseFloat(filterByReferenceArr2[g].profTax),
                            sss: parseFloat(filterByReferenceArr2[g].sss),
                            pagibig: parseFloat(filterByReferenceArr2[g].pagibig),
                            philhealth: parseFloat(filterByReferenceArr2[g].philhealth),
                            totalDaysLeave: filteredLeaveData[b].totalDaysLeave,
                          });
                        }
                      }
                    }
                  }
                  // console.log("-----------filtered Payslip data-----------");
                  // console.log(filteredPayslipData);
                  if(filteredPayslipData.length === 0) {
                    setDisplay(true);
                  } else {
                    setDisplay(false);
                  }
                  const newData = filteredPayslipData.map((item:any) => {
                    let basicPay = 0,
                      birthDate = "N/A",
                      employeeId = 0,
                      firstName = "N/A",
                      id = 0,
                      lastName = "N/A",
                      pagibig = 0,
                      philhealth = 0,
                      position = 0,
                      profTax = 0,
                      sss = 0,
                      tds = 0,
                      totalDaysLeave = 0,
                      userName = "N/A";

                      if(item.basicPay) basicPay = item.basicPay;
                      if(item.birthDate) birthDate = item.birthDate;
                      if(item.employeeId) employeeId = item.employeeId;
                      if(item.firstName) firstName = item.firstName;
                      if(item.id) id = item.id;
                      if(item.lastName) lastName = item.lastName;
                      if(item.pagibig) pagibig = item.pagibig;
                      if(item.philhealth) philhealth = item.philhealth;
                      if(item.position) position = item.position;
                      if(item.profTax) profTax = item.profTax;
                      if(item.sss) sss = item.sss;
                      if(item.tds) tds = item.tds;
                      if(item.totalDaysLeave) totalDaysLeave = item.totalDaysLeave;
                      if(item.userName) userName = item.userName;

                      return {
                        ...item,
                        basicPay,
                        birthDate,
                        employeeId,
                        firstName,
                        id,
                        lastName,
                        pagibig,
                        philhealth,
                        position,
                        profTax,
                        sss,
                        tds,
                        totalDaysLeave,
                        userName
                      };
                  });
                  setAllMember(newData);
                  // console.log(filteredPayslipData);
                })
                .catch((error) => {
                  console.log("error " + error);
                });
            })
            .catch((error) => {
              console.log("error " + error);
            });
        })
        .catch((error) => {
          if (error.response.data.status === 401) {
            setErrMessage(error.response.data.error);
            setLogOut(true);
          }
          console.log(error.response.data.message);
        });
    };
    fetchData();
  }, [setErrMessage,setLogOut]);

  useEffect(()=> {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const getSettings = async () => {
      await Axios
        .get("/team/settings", config)
        .then((request) => {
          setNewSettings(request.data.data);
          setCca(request.data.data.cca === null ? 0 : parseFloat(request.data.data.cca));
          setConveyance(request.data.data.conveyance === null ? 0 : parseFloat(request.data.data.conveyance));
          setHouseRent(request.data.data.houseRent === null ? 0 : parseFloat(request.data.data.houseRent));
          setMedical(request.data.data.medical === null ? 0 : parseFloat(request.data.data.medical));
          setOvertime(request.data.data.overtime === null ? 0 : parseFloat(request.data.data.overtime));
          setSpecial(request.data.data.special === null ? 0 : parseFloat(request.data.data.special));
          setPf(request.data.data.providentFund === null ? 0 : parseFloat(request.data.data.providentFund));
        })
        .catch((error) => {
          console.log("error " + error);
        });
    };
    getSettings();
  }, [allMember]) 

  const toggleDetails = (index: any) => {
    const position = details.indexOf(index);
    var newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  return (
    <CContainer className="container-fluid col-lg-12">
      <CCard>
        <CCardHeader>Payslip</CCardHeader>
        <CCardBody>
          <SwitchDiv>
            <p style={{ marginRight: "10px" }}>Fill in</p>
            <CSwitch shape="pill" size="sm" color="info" />
          </SwitchDiv>
          <DataTableWrapper>
            <CDataTable
              items={allMember}
              fields={fields}
              columnFilter
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
              tableFilter={{ placeholder: "Type here...", label: "Search:" }}
              itemsPerPageSelect
              itemsPerPage={10}
              hover
              outlined
              pagination
              scopedSlots={{
                show_details: (item: any) => {
                  return (
                    <td className="py-2">
                      <CButton
                        color={details.includes(item.id) ? "danger" : "primary"}
                        shape="square"
                        size="md"
                        onClick={() => {
                          toggleDetails(item.id);
                        }}
                      >
                        {details.includes(item.id) ? "Hide" : "View more"}
                      </CButton>
                    </td>
                  );
                },
                details: (item: any) => {
                  return (
                    <CCollapse show={details.includes(item.id)}>
                      <PayslipCard>
                        <CCardBody>
                          <Logo
                            className="c-sidebar-brand-full"
                            src="img/dashboard-logo.png"
                            alt="Abraex Inc"
                            height="48"
                          />
                          <H3>Payslip for the period of July 2021</H3>
                          <InfoDivRow>
                            <InfoDivColumn>
                              <Info>
                                <P>Employment ID:</P>
                                <P>{item.employeeId}</P>
                              </Info>
                              <Info>
                                <P>Department:</P>
                                <P>Information Technology</P>
                              </Info>
                              <Info>
                                <P>Date of birth:</P>
                                <P>{item.birthDate}</P>
                              </Info>
                              <Info>
                                <P>Date of joining</P>
                                <P>10-05-2015</P>
                              </Info>
                              <Info>
                                <P>Days worked:</P>
                                <P>20 days</P>
                              </Info>
                              <Info>
                                <P>Absence:</P>
                                <P>0 days:</P>
                              </Info>
                              <Info>
                                <P>Holidays:</P>
                                <P>{newSettings.holidays} days</P>
                              </Info>
                              <Info>
                                <P>Casual leave:</P>
                                <P>{item.totalDaysLeave} days</P>
                              </Info>
                            </InfoDivColumn>
                            <InfoDivColumn>
                              <Info>
                                <P>Name:</P>
                                <P>
                                  {item.firstName} {item.lastName}
                                </P>
                              </Info>
                              <Info>
                                <P>Designation:</P>
                                <P>{item.position}</P>
                              </Info>
                              <Info>
                                <P>Privilege leave:</P>
                                <P>{newSettings.privilegeLeave} days</P>
                              </Info>
                            </InfoDivColumn>
                          </InfoDivRow>
                          <Hr />
                          <InfoDivRow>
                            <InfoDivColumn>
                              <Info>
                                <H5>Earnings</H5>
                                <H5>Amount</H5>
                              </Info>
                            </InfoDivColumn>
                            <InfoDivColumn>
                              <Info>
                                <H5>Deductions</H5>
                                <H5>Amount</H5>
                              </Info>
                            </InfoDivColumn>
                          </InfoDivRow>
                          <Hr />
                          <InfoDivRow>
                            <InfoDivColumn>
                              <Info>
                                <P>Basic Pay:</P>
                                <P>{item.basicPay.toFixed(2)}</P>
                              </Info>
                              <Info>
                                <P>CCA:</P>
                                <P>{cca.toFixed(2)}</P>
                              </Info>
                              <Info>
                                <P>Conveyance Allowance:</P>
                                <P>{conveyance.toFixed(2)}</P>
                              </Info>
                              <Info>
                                <P>House Rent Allowance</P>
                                <P>{houseRent.toFixed(2)}</P>
                              </Info>
                              <Info>
                                <P>Medical Allowance</P>
                                <P>{medical.toFixed(2)}</P>
                              </Info>
                              <Info>
                                <P>Overtime:</P>
                                <P>{overtime.toFixed(2)}</P>
                              </Info>
                              <Info>
                                <P>Special Allowance:</P>
                                <P>{special.toFixed(2)}</P>
                              </Info>
                            </InfoDivColumn>
                        <InfoDivColumn>
                              <Info>
                                <P>TDS:</P>
                                <P>{item.tds.toFixed(2)}</P>
                              </Info>
                              <Info>
                                <P>Provident Fund:</P>
                                <P>{pf.toFixed(2)}</P>
                              </Info>
                              <Info>
                                <P>Profesional Tax:</P>
                                <P>{item.profTax.toFixed(2)}</P>
                              </Info>
                              <Info>
                                <P>SSS:</P>
                                <P>{item.sss.toFixed(2)}</P>
                              </Info>
                              <Info>
                                <P>Pagibig:</P>
                                <P>{item.pagibig.toFixed(2)}</P>
                              </Info>
                              <Info>
                                <P>Philhealth:</P>
                                <P>{item.philhealth.toFixed(2)}</P>
                              </Info>
                            </InfoDivColumn>
                          </InfoDivRow>
                          <Hr />
                          <InfoDivRow>
                            <InfoDivColumn>
                              <Info>
                                <H5>Total Earnings</H5>
                                <H5>{(item.basicPay + cca + conveyance + houseRent + medical + overtime + special).toFixed(2)}</H5>
                              </Info>
                            </InfoDivColumn>
                            <InfoDivColumn>
                              <Info>
                                <H5>Total Deductions</H5>
                                <H5>{(item.tds + pf + item.profTax + item.sss + item.pagibig + item.philhealth).toFixed(2)}</H5>
                              </Info>
                            </InfoDivColumn>
                          </InfoDivRow>
                          <Hr />
                          <InfoDivRow>
                            <InfoDivColumn></InfoDivColumn>
                            <InfoDivColumn>
                              <Info>
                                <H5>Net Pay (rounded) </H5>
                                <H5>{((item.basicPay + cca + conveyance + houseRent + medical + overtime + special) - (item.tds + pf + item.profTax + item.sss + item.pagibig + item.philhealth)).toFixed(2)}</H5>
                              </Info>
                            </InfoDivColumn>
                          </InfoDivRow>
                        </CCardBody>
                      </PayslipCard>
                    </CCollapse>
                  );
                },
              }}
            />
          </DataTableWrapper> 
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default Payslip;
