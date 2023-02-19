import * as Yup from "yup";

export const CreateTeamValidationSchema = Yup.object().shape({
  userName: Yup.string()
    .min(6, "Username must have length of 6 or more characters")
    .required("Username is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  team: Yup.string().required("Team is required"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(
      /^(09|\+639)\d{9}$/,
      "Phone number must be a valid format 09|+639 Plus your 9 digit number"
    ),
  position: Yup.string().required("Employee position required"),
  employeeId: Yup.string()
    .min(2, "Employee ID must have length of 2 or more characters")
    .required("Employee ID is required"),
});

export const AddEmployeeValidationSchema = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last name is required"),
  // password: Yup.string()
  //   .min(8, "Password must have length of 8 to 12 characters")
  //   .required("Password is required"),
  // cPassword: Yup.string()
  //   .oneOf([Yup.ref("password"), null], "Password did not match")
  //   .required("Confirm Password is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(
      /^(09|\+639)\d{9}$/,
      "Phone number must be a valid format 09|+639 Plus your 9 digit number"
    ),

  position: Yup.string().required("Employee position required"),
  employeeId: Yup.string().required(
    "Employee ID must have length of 2 or more characters"
  ),
  // birthDate: Yup.string()
  //   .required("Date of Birth is required")
  //   .matches(
  //     /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
  //     "Date of Birth must be a valid date in the format YYYY-MM-DD"
  //   ),
  // middleName: Yup.string().required("Middle Name is required"),
  // password: Yup.string()
  //   .min(6, "Password must be at least 8 characters")
  //   .required("Password is required")
  //   .matches(
  //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
  //     "Password must be 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
  //   ),
  // address: Yup.string().required("Address is required"),
  // contactPerson: Yup.string().required("Contact Person is required"),
  // contactPersonNumber: Yup.string()
  //   .required("Contact Person's number is required")
  //   .matches(
  //     /^(09|\+639)\d{9}$/,
  //     "Phone number must be a valid format 09|+639 Plus your 9 digit number"
  //   ),
  // sssNumber: Yup.string()
  //   .required("SSS number is required")
  //   .matches(/^\d{2}-\d{7}-\d{1}$/, "SSS number is invalid"),
  // tinNumber: Yup.string()
  //   .required("Tin number is required")
  //   .matches(/^\d{3}-\d{3}-\d{3}-\d{3}$/, "Tin number is invalid"),
  // pagIbigNumber: Yup.string()
  //   .required("Pag-Ibig number is required")
  //   .matches(/^\d{12}$/, "Pag-ibig number is invalid"),
});

export const formatBirthdate = (birthDate: string) => {
  const bDateArr = birthDate.split("-");
  return bDateArr[1] + "/" + bDateArr[2] + "/" + bDateArr[0];
};

export const formatLeaveDate = (leaveDate: string) => {
  const lDateArr = leaveDate.split("-");
  return lDateArr[1] + "/" + lDateArr[2] + "/" + lDateArr[0];
};

export const formatLeaveDateUntil = (leaveDateUntil: string) => {
  const lDateUntilArr = leaveDateUntil.split("-");
  return lDateUntilArr[1] + "/" + lDateUntilArr[2] + "/" + lDateUntilArr[0];
};

export const getLeaveApprovalBadge = (status: string) => {
  switch (status) {
    case "Approved":
      return "success";
    case "Rejected":
      return "danger";
    default:
      return "secondary";
  }
};

/**
 * @param timeIn data come from member API "/team/members"
 * @param timeOut data come from attendace API "/team/members"
 * @returns string
 */
export const convertTo24Hours = (timeIn: any, timeOut: any) => {
  /*
   * Separate PM and AM from the time and get the time only
   */
  const [timeInNow] = timeIn.split(" ");
  const [timeOutNow, modifier] = timeOut.split(" ");

  let [timeInHours, timeInMinutes] = timeInNow.split(":");
  let [timeOutHours, timeOutMinutes] = timeOutNow.split(":");

  if (timeOutHours === "12") timeOutHours = "00";

  if (modifier === "pm") timeOutHours = parseInt(timeOutHours, 10) + 12;

  const totalHourOfWork = timeOutHours - timeInHours;
  const totalMinsOfWOrk = timeOutMinutes - timeInMinutes;

  if (totalHourOfWork === 0) return `${totalMinsOfWOrk} min(s)`;

  if (totalHourOfWork >= 1 && totalMinsOfWOrk >= 1)
    return `${totalHourOfWork} hr(s) and ${totalMinsOfWOrk} min(s)`;

  if (totalHourOfWork >= 1 && totalMinsOfWOrk === 0)
    return `${totalHourOfWork} hr(s)`;
};
