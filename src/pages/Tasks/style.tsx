import styled from "styled-components";
import {
  CCard,
  CButton,
  CModal,
  CInput,
  CTextarea,
  CSelect,
  CBadge,
  CCardBody,
  CCollapse,
  CModalHeader,
  CImg,
  CLabel,
} from "@coreui/react";

export const ModalHeader = styled(CModalHeader)`
  align-items: center;
`;
export const DataTableWrapper = styled.div`
  .table th,
  .table td {
    font-size: 13px;
  }
  .c-datatable-filter {
    font-size: 14px;
  }
  .c-datatable-items-per-page {
    font-size: 14px;
  }
  .btn-sm,
  .btn-group-sm > .btn {
    font-size: 10px;
  }
`;
export const ImgWrapper = styled.div`
  width: 100%;
`;
export const MImg = styled(CImg)`
  position: relative;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0.5rem;
  max-width: 100%;
  max-height: 100%;
`;
export const Card = styled(CCard)`
  background: #fff;
  border-radius: 5px;
  margin: 2rem auto;
  width: 90%;
`;

export const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const H1 = styled.h1`
  font-size: 18px;
`;

// export const FlexDiv = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   flex-wrap: wrap;

//   @media only screen and (max-width: 900px) {
//     display: block;
//   }
// `;

export const FlexChild = styled.div`
  width: 45%;
  padding: 1rem;
  margin-bottom: 0.8rem;
  border: 1px solid #dcdcdc;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const FlexChildren = styled.div`
  width: 80%;
`;

export const Button = styled(CButton)`
  margin: 0 1rem !important;
`;

export const Modal = styled(CModal)`
  align-self: center;
`;

export const Input = styled(CInput)`
  margin-top: 0.3rem !important;
`;

export const InputDetails = styled(CTextarea)`
  margin-top: 0.5rem;
  height: 150px !important;
`;

export const P = styled.p`
  margin-bottom: 0.5rem;
  line-height: 1.2rem;
`;

export const Preview = styled.div`
  border: 2px solid #cecece;
  height: 120px;
  width: 120px;
  margin: 0 1rem 0.5rem 0;
`;

export const PreviewSlide = styled.div`
  cursor: pointer;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  white-space: nowrap;
  display: -webkit-inline-box;
  max-width: 500px;
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: lightgray;
    border-radius: 0;
  }
`;

export const CenterDiv = styled.div`
  width: 100%;
  text-align: center;
`;

export const ButtonText = styled.p`
  font-size: 15px;
`;

export const Select = styled(CSelect)`
  margin-top: 0.3rem !important;
`;

export const Badge = styled(CBadge)`
  @media only screen and (max-width: 1190px) {
    padding: 0.5rem;
  }
`;

export const Collapse = styled(CCollapse)`
  margin: auto;
  padding: 0.5rem 2rem;
`;

export const CardBody = styled(CCardBody)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 1190px) {
    display: block;
  }
`;

export const ThreeButtonDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const UploadContainer = styled.div`
  max-width: 13rem;
  @media only screen and (min-width: 74em) {
    margin-left: auto;
  }
  > input {
    display: none;
  }
`;
export const InputLabelButton = styled(CLabel)`
  flex-grow: 4;
  display: flex;
  margin-left: auto;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #4f5d73;
  background: #ced2d8;
  padding: 0.3rem 1rem;
  width: 100%;

  @media only screen and (max-width: 800px) {
    margin-left: 0;
    margin-bottom: 0.5rem;
  }
`;

export const Image = styled(CImg)`
  max-height: 100%;
  width: 100%;
`;

export const ImageModal = styled(CModal)`
  margin: 0;
  padding: 0;
`;

export const DivFlex = styled.div`
  padding: 0.5rem;
`;

export const Div = styled.div`
  padding: 3rem;
  text-align: center;
`;

export const H2 = styled.h2`
  font-weight: 500;
  font-size: 20px;
`;

export const ScrollableDiv = styled.div`
  height: 20rem !important;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 8px;
    height: 7px;
  }

  ::-webkit-scrollbar-thumb {
    background: lightgray;
    border-radius: 0;
  }
`;
