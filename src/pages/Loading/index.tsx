import styled from "styled-components";
// import { CSpinner } from "@coreui/react";
import FadeLoader from "react-spinners/FadeLoader";

const StyleDiv = styled.div`
  background: #fff;
  height: 100vh;
`;

const Div = styled.div`
      position: fixed;
      z-index: 1031;
      top: calc( 50% - ( 4rem / 2) );
      right: calc( 50% - ( 4rem / 2) );
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

    @media only screen and (max-width: 600px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
`;

const Loading = () => {
  return (
    <StyleDiv>
      <Div>
        {/* <CSpinner
          color="primary"
          style={{ width: "4rem", height: "4rem", marginInline: "auto" }}
        /> */}
        <FadeLoader color={"#321fdb"} />
      </Div>
    </StyleDiv>
  );
};

export default Loading;
