import styled from "styled-components";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { CCard, CCardHeader } from "@coreui/react";
import CIcon from "@coreui/icons-react";

export const DataTableWrapper = styled.div`
  .table th, .table td {
    font-size: 13px;
  }
  .btn-sm, .btn-group-sm > .btn {
    font-size: 10px;
  }
`;

export const Card = styled.div`
  width: 500px;
  padding: 15px 25px;
  height: auto;
  background-color: #fff;
  margin: 1.5rem auto;
  box-shadow: 1px 1px 10px 1px rgb(0 0 255/ 30%);
  @media screen and (max-width: 736px) and (min-width: 314px) {
    width: 86%;
    padding: 20px;
  }
`;

export const HeaderDiv = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  background-color: #778899;
  position: relative;
`;

export const H1 = styled.h1`
  display: block;
  margin: 0 20px 0;
  font-size: 2rem;
  align-self: left;
  font-family: sans-serif;
  font-size: 24px;
  font-weight: 550;
  text-align: left;
  padding: 0.8rem 0 0.8rem;
`;

export const HeadText = styled.p`
  display: block;
  margin: 10px 10px 0;
  font-family: sans-serif;
  background-color: #696969;
  padding: 18px;
  font-size: 1.5rem;
  color: #fff;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5%;
  width: 40%;
  @media screen and (max-width: 736px) and (min-width: 314px) {
    width: 50%;
  }
`;

export const MenuItem = styled.div`
  background-color: #00bfff;
  margin-right: 20px;
  :hover {
    background-color: #1e90ff;
    opacity: 1;
  }
  font-size: 1rem;
  padding: 10px;
  color: #fff;
  transition: all, 0.5s;
`;

export const DropdownMenuButton = styled.button`
  display: block;
  background-color: #00bfff;
  border: none;
  color: white;
  padding: 12px 40px;
  text-align: center;
  font-size: 16px;
  margin: 4px 20px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 20px;
  transition: all, 0.5s;
  :hover {
    background-color: #1e90ff;
    opacity: 1;
  }
`;

export const DownIcon = styled(FiChevronDown)`
  float: right;
`;

export const RightIcon = styled(FiChevronRight)`
  float: right;
`;

export const Container = styled.div`
  height: auto;
  background-color: #fff;
  margin: 0 10px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  background-color: #ebebea;
  padding: 10px 10px 10px;
`;

export const Content = styled.div`
  height: 30px;
  background-color: #fff;
  margin: 5px 0 5px;
  display: flex;
  width: 98%;
  flex-direction: row;
  justify-content: space-around;
  box-shadow: 1px 1px 10px 1px rgb(80 80 80 / 20%);
`;

export const Data = styled.input`
  width: 50%;
  padding: 0 10px;
  font-size: 15px;
  display: flex;
  align-items: center;
  outline: none;
  border: none;
`;
export const ActionSection = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ActionButton = styled.button`
  border: none;
  margin: 2px 2px 2px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  background-color: #fff;
  cursor: pointer;
`;

export const Edit = styled(MdEdit)`
  font-size: 25px;
  color: #696969;
  :hover {
    color: #4169e1;
  }
`;

export const Delete = styled(MdDeleteForever)`
  font-size: 25px;
  color: #696969;
  :hover {
    color: #dc143c;
  }
`;

export const AccordionSection = styled.div`
  margin: 0 10px 0;
  display: flex;
  justify-content: center;
`;

export const AccordionButton = styled.button`
  background-color: #696969;
  color: #fff;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 1.5rem;
  font-family: sans-serif;
  transition: 0.4s;
  display: flex;
  justify-content: space-between;
`;
export const H3 = styled.h3`
  color: #ffffff;
  text-align: left; 
  padding: 1rem 0.5rem 1rem;
  background-color: rgb(70,130,160);
`;

// export const H1 = styled.h1`
//   font-size: 24px;
//   font-weight: 550;
//   text-align: left;
//   padding: 0.8rem 0 0.8rem;
// `;


export const PayslipCard = styled(CCard)`
  margin: 1rem;
`;

export const LeaveCard = styled(CCard)`
  margin: 1rem;
`;

export const StatsCard = styled(CCard)`
  margin: 1rem;
`;
export const SwitchDiv = styled.div`
  display: flex;
  justify-items: center;
`;

export const WrapperDiv = styled.div`

`;

export const P = styled.p`
  align-self: left;
  margin: 0 20px 0;
  font-size: 14px;
  color: #696969;
  font-weight: 500;
  text-align: left;
`;

export const UserInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Table = styled.table`
  width: 100%;
  margin-bottom: 2rem;
`;

export const Th = styled.th`
  color: #696969;
  font-weight: 600;
  text-align: center;
`;
export const Tr = styled.tr`
  :nth-child(even) {
    background: #dddddd;
  }
`;

export const Td = styled.td`
  font-size: 9px;
  color: #696969;
  text-align: center;
`;

export const Div = styled.div`
  padding: 3rem;
  text-align: center;
`;

export const H2 = styled.h2`
  font-weight: 500;
  font-size: 20px;
`;

export const Icon = styled(CIcon)`
  transform: scale(0.8);
`;

export const PendingRequestCardHeader = styled(CCardHeader)`
  color: #ffffff;
  text-align: left; 
  padding: 1rem 0.5rem 1rem;
  background-color: rgb(70,130,160);
  display: flex;
  justify-content: space-between;
`;