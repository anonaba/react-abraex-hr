import styled from 'styled-components';
import { RiDashboard3Fill, RiUserSearchFill } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { IoNewspaperSharp, IoReceiptOutline } from 'react-icons/io5';
import { BsTable, BsPersonLinesFill } from 'react-icons/bs';
import { AiOutlinePullRequest } from 'react-icons/ai';
import { MdExitToApp } from 'react-icons/md';

import {
    CSidebar,
    CSidebarNav,
    CNavLink
} from '@coreui/react';

interface Props {
    isLeft: boolean;
}

const Sidebar = styled(CSidebar)<Props>`
    padding-top: 5rem;
    width: ${({ isLeft }) => (isLeft ? "5rem" : "")};
    transition: 0.5s;

    @media only screen and (max-width: 900px) {
        width: ${({ isLeft }) => (isLeft ? "15rem" : "5rem")};
    }
`;

const NavLink = styled(CNavLink)`
    height: 3rem;
    width: 100%;
    color: #A9A9A9;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    :hover{
        background-color: #696969;
        color: #fff;
        opacity: 1
    }
`

const DashboardIcon = styled(RiDashboard3Fill)`
    font-size: 30px;
    margin-right: 0.5rem;
`;

const IconLabel = styled.p<Props>`
    font-size: 18px;
    width: ${({ isLeft }) => (isLeft ? "0%" : "100%")};
    visibility: ${({ isLeft }) => (isLeft ? "hidden" : "visible")};
    opacity: ${({ isLeft }) => (isLeft ? 0 : 1)};
    transition: 0.5s;
`;

const ProfileIcon = styled(CgProfile)`
    font-size: 30px;
    margin-right: 0.5rem;
`;

const AttendanceIcon = styled(IoNewspaperSharp)`
    font-size: 30px;
    margin-right: 0.5rem;
`;

const AttendanceSheetIcon = styled(BsTable)`
    font-size: 30px;
    margin-right: 0.5rem;
`;

const PayslipIcon = styled(IoReceiptOutline)`
    font-size: 30px;
    margin-right: 0.5rem;
`;

const RequestIcon = styled(AiOutlinePullRequest)`
    font-size: 30px;
    margin-right: 0.5rem;
`;

const ResignationIcon = styled(MdExitToApp)`
    font-size: 30px;
    margin-right: 0.5rem;
`;

const RecruitmentIcon = styled(RiUserSearchFill)`
    font-size: 30px;
    margin-right: 0.5rem;
`;

const EmployeeIcon = styled(BsPersonLinesFill)`
    font-size: 30px;
    margin-right: 0.5rem;
`;

const SideNav: React.FC<Props> = ({isLeft}) => {
    return (
        <>
            <Sidebar isLeft={isLeft}>
                <CSidebarNav>
                    <NavLink activeStyle={{ color: '#fff'}} to="/dashboard">
                        <DashboardIcon/>
                        <IconLabel isLeft={isLeft}>Dashboard</IconLabel>
                    </NavLink>
                    <NavLink activeStyle={{ color: '#fff'}} to="/profile">
                        <ProfileIcon/>
                        <IconLabel isLeft={isLeft}>Profile</IconLabel>
                    </NavLink>
                    <NavLink activeStyle={{ color: '#fff'}} to="/attendance">
                        <AttendanceIcon/>
                        <IconLabel isLeft={isLeft}>Attendance</IconLabel>
                    </NavLink>
                    <NavLink activeStyle={{ color: '#fff'}} to="/attendance-sheet">
                        <AttendanceSheetIcon/>
                        <IconLabel isLeft={isLeft}>Attendance Sheet</IconLabel>
                    </NavLink>
                    <NavLink activeStyle={{ color: '#fff'}} to="/payslip">
                        <PayslipIcon/>
                        <IconLabel isLeft={isLeft}>Payslip</IconLabel>
                    </NavLink>
                    <NavLink activeStyle={{ color: '#fff'}} to="/employee-stuff">
                        <EmployeeIcon/>
                        <IconLabel isLeft={isLeft}>Employee Stuff</IconLabel>
                    </NavLink>
                    <NavLink activeStyle={{ color: '#fff'}} to="/">
                        <RequestIcon/>
                        <IconLabel isLeft={isLeft}>Request / Approval</IconLabel>
                    </NavLink>
                    <NavLink activeStyle={{ color: '#fff'}} to="/resignation-request">
                        <ResignationIcon/>
                        <IconLabel isLeft={isLeft}>Resignation Request/Approved</IconLabel>
                    </NavLink>
                    <NavLink activeStyle={{ color: '#fff'}} to="/">
                        <RecruitmentIcon/>
                        <IconLabel isLeft={isLeft}>Recruitment Management</IconLabel>
                    </NavLink>
                </CSidebarNav>
            </Sidebar>
        </>
    )
}

export default SideNav
