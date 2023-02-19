import { CButton, CCard, CInput } from "@coreui/react";
import styled from "styled-components";

export const Card = styled(CCard)`
  width: 60%;
  max-width: 1050px;
  padding: 1.5rem 2rem 2rem;
  margin: 25vh auto;
  min-height: 288px;
  @media screen and (max-width: 1520px) {
    margin: 6% auto;
    width: 70%;
    padding: 20px;
  }
  @media screen and (max-width: 1380px) {
    width: 90%;
    padding: 20px;
  }
  @media screen and (max-width: 1280px) {
    width: 95%;
    padding: 15px;
  }
  @media screen and (max-width: 768px) and (min-width: 314px) {
    width: 86%;
    padding: 20px;
  }
`;

export const ProfileImg = styled.img`
  margin-top: 2rem;
  width: 150px;
  height: 150px;
  border: 2px solid #cecece;
  border-radius: 50%;
  object-fit: cover;
  @media screen and (max-width: 768px) and (min-width: 314px) {
    display: flex;
    align-self: center;
    margin: auto;
  }
`;
export const Label = styled.label`
  display: flex;
  align-self: center;
  font-family: sans-serif;
`;
export const Input = styled(CInput)`
  font-size: 13px;
  width: 90%;
  padding: 12px 10px;
  margin: 0.5rem 1rem;
  display: inline-block;
  font-family: sans-serif;
  color: black;
  border-radius: 4px;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  align-self: center;
  @media screen and (max-width: 1280px) {
    padding: 20px;
  }
`;
export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 95%;
  @media screen and (max-width: 768px) and (min-width: 314px) {
    display: flex;
    flex-direction: column;
  }
`;
export const CardInfo = styled(CCard)`
  display: flex;
  align-self: flex-end;
  flex-direction: column;
  margin: 1rem 1rem;
  height: 100%;
  min-height: 200px;
  width: 90%;
  max-width: 750px;
  padding: 30px 10px;
  left: 0;
  right: 0;
  @media screen and (max-width: 768px) and (min-width: 314px) {
    width: 86%;
    padding: 20px 20px;
    margin: 1rem 0;
    display: flex;
    align-self: center;
  }
`;
export const ColumnInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImageInput = styled(CInput)`
  width: 68%;
  height: 100%;
  padding: 0;
  margin: 0.5rem auto;
  border: none;
  ::-webkit-file-upload-button {
    visibility: hidden;
    margin: 0;
  }
  ::before {
    color: #fff;
    background: #321fdb;
    content: "Update Picture";
    display: inline-block;
    border: none;
    border-radius: 3px;
    padding: 5px 10px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    font-weight: 400;
    font-size: 13px;
    text-align: center;
    width: 100%;
  }
  :hover::before {
    background: #4638c2;
  }
  :focus::before {
    border: none;
  }
`;

export const Button = styled(CButton)`
  margin: 0 auto 0.5rem;
  padding: 3px 10px;
  width: 68%;
`;

export const Div = styled.div`
  text-align: center;
  margin: auto;
  @media screen and (max-width: 768px) and (min-width: 314px) {
    display: flex;
    flex-direction: column;
  }
`;

