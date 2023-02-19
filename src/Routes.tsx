import React from "react";

export const ROUTE_HOME = "/";
export const ROUTE_LOGIN = "/login";
export const ROUTE_REGISTER = "/register";
export const ROUTE_DASHBOARD = "/dashboard";
export const ROUTE_ATTENDANCE = "/attendance";
export const ROUTE_REGISTRATION = "/registration";
export const ROUTE_PROFILE = "/profile";
export const ROUTE_FORGOT_PASSWORD = "/forgot-password";
export const ROUTE_ATTENDANCE_SHEET = "/attendance-sheet";
export const ROUTE_PAYSLIP = "/payslip";
export const ROUTE_RESOLUTION_CENTER = "/resolution-center";
export const ROUTE_NAVBAR = "/navbar";
export const ROUTE_EMPLOYEE_STUFF = "/employee-stuff";
export const ROUTE_RESIGNATION_REQUEST = "/resignation-request";
export const ROUTE_RESIGNATION_APPROVED = "/resignation-approved";
export const ROUTE_RECRUITMENT_MANAGEMENT = "/recruitment-management";
export const ROUTE_APPLICATION_LIST =
  "/recruitment-management/application-list";
export const ROUTE_ADMIN = "/admin";
export const ROUTE_LEAVE_REQUEST = "/leave-request";
export const ROUTE_PENDING_APPROVAL = "/pending-approval";
export const ROUTE_TRY = "/try";
export const ROUTE_SCHEDULING = "/scheduling";
export const ROUTE_EMPLOYEE_ATTENDANCE = "/employee-attendance";
export const ROUTE_RESET_PASSWORD = "/reset-password";
export const ROUTE_PERMISSION = "/permission-maintenance";
export const ROUTE_TASKS = "/tasks";
export const ROUTE_FAQS = "/FAQS";
export const ROUTE_CREATE_TEAM = "/create-team";
export const ROUTE_NEW_PASSWORD = "/new-password";

// DashBoard Components
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const EmployeeAttendance = React.lazy(
  () => import("./pages/Employee-Attendance")
);
const Scheduling = React.lazy(() => import("./components/Scheduling"));
const Attendance = React.lazy(() => import("./pages/Attendance"));
const Profile = React.lazy(() => import("./pages/Profile"));
const AttendanceSheet = React.lazy(() => import("./pages/Attendance-Sheet"));
const Payslip = React.lazy(() => import("./pages/Payslip"));
const ResolutionCenter = React.lazy(() => import("./pages/Resolution-Center"));
const EmployeeStuff = React.lazy(() => import("./pages/EmployeeStuff"));
const ApplicationList = React.lazy(() => import("./pages/Application-List"));
const EmployeeList = React.lazy(() => import("./pages/EmployeeList"));
const RecruitmentDashboard = React.lazy(
  () => import("./pages/Recruitment-Dashboard")
);
const Resignation = React.lazy(
  () => import("./pages/Resignation")
);
const LeaveRequest = React.lazy(() => import("./pages/LeaveRequest"));
const PendingApproval = React.lazy(() => import("./pages/PendingApprovals"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const Permission = React.lazy(() => import("components/Permission"));
const Task = React.lazy(() => import("./pages/Tasks"));
const FAQs = React.lazy(() => import("./pages/FrequentlyAskedQuestions"));
const CreateTeam = React.lazy(() => import("./pages/CreateTeam"));
const TeamSettings = React.lazy(() => import("./pages/TeamSettings"));
const EditMember = React.lazy(() => import("./components/EditMember"));

export const routes = [
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/employee-list", name: "EmployeeList", component: EmployeeList },
  {
    path: "/employee-attendance",
    name: "EmployeeAttendance",
    component: EmployeeAttendance,
  },
  { path: "/attendance", name: "Attendance", component: Attendance },
  { path: "/profile", name: "Profile", component: Profile },
  {
    path: "/attendance-sheet",
    name: "AttendanceSheet",
    component: AttendanceSheet,
  },
  { path: "/payslip", name: "Payslip", component: Payslip },
  {
    path: "/resolution-center",
    name: "ResolutionCenter",
    component: ResolutionCenter,
  },
  { path: "/employee-stuff", name: "EmployeeStuff", component: EmployeeStuff },
  {
    path: "/application-list",
    name: "ApplicationList",
    component: ApplicationList,
  },
  {
    path: "/recruitment-dashboard",
    name: "RecruitmentDashboard",
    component: RecruitmentDashboard,
  },
  {
    path: "/resignation",
    name: "Resignation",
    component: Resignation,
  },
  { path: "/leave-request", name: "LeaveRequest", component: LeaveRequest },
  {
    path: "/pending-approval",
    name: "PendingApproval",
    component: PendingApproval,
  },
  { path: "/reset-password", name: "ResetPassword", component: ResetPassword },
  {
    path: "/permission-maintenance",
    name: "permission",
    component: Permission,
  },
  { path: "/scheduling", name: "scheduling", component: Scheduling },
  { path: "/task", name: "Task", component: Task },
  { path: "/FAQs", name: "FAQs", component: FAQs },
  { path: "/create-team", name: "CreateTeam", component: CreateTeam },
  { path: "/team-settings", name: "TeamSettings", component: TeamSettings },
  { path: "/edit-member", name: "EditMember", component: EditMember },
];
