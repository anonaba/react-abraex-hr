import styled from 'styled-components';
import { useHistory } from "react-router-dom";

import {
    CRow,
    CCardBody,
    CContainer,
    CCard,
    CImg,
    CButton
} from "@coreui/react";

const ImgDiv = styled.div`
  text-align: center;
  padding: 1rem;
`;

const Img = styled(CImg)`
  height: 80px;
  width: 100px;
  transform: scale(1.8);
  margin-top: 0.5rem;
`;

const CardBody = styled(CCardBody)`
    text-align: center;
`;

const Message = styled.p`
    margin: 2rem 0 3rem 0;
`;

const Button = styled(CButton)`
    width: 9rem;
`;

const ForgotPassword = () => {
    const history = useHistory();

    const routeChange = () =>{ 
        const path = `/login`; 
        history.push(path);
    }
    
    return (
        <>
            {/* <ForgotPasswordHeader>Forgot Password</ForgotPasswordHeader>
            <Message>Please contact your employer to reset your password</Message>
            <BackButton onClick={routeChange}>Back</BackButton> */}
            <div className="c-app c-default-layout flex-row align-items-center">
                <CContainer>
                <CRow className="justify-content-center">
                    <CCard
                    className="p-4 col-lg-5 col-md-10 col-sm-10"
                    color="gradient-secondary"
                    >
                    <ImgDiv>
                    <Img
                        src="https://hr.abrasoft.com:3000/img/home-logo.png"
                        fluid
                        className="mb-2"
                    />
                    </ImgDiv>
                    <CardBody>
                        <Message className="text small">Please contact your employer to reset your password</Message>
                        <Button
                            color="primary"
                            className="px-0"
                            onClick={routeChange}
                        >
                            Go Back
                        </Button>
                    </CardBody>
                    </CCard>
                </CRow>
                </CContainer>
            </div>
        </>
    )
}

export default ForgotPassword
