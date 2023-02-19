import styled from 'styled-components';
import { 
    CContainer,
    CInput,
    CButton
} from '@coreui/react';

export const Container = styled(CContainer)`
    margin: 5vh auto;
    width: 70%;
    padding: 2rem 0 2rem 0;
    border-radius: 5px;
    box-shadow: 1px 1px 10px 1px rgb(0 0 255/ 30%);
`;

export const Header = styled.h1`
    text-align: center;
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 30px;
    color: #4169e1;
`;

export const SecondHeader = styled.h1`
    width: 100%;
    padding: 1.5rem;
    font-weight: bold;
    color: white;
    background: #4169e1;
    font-size: 20px;
`;

export const Grid = styled.div`
    padding: 1rem;
    display: grid;
    grid-template-columns: 20rem auto;

    @media only screen and (max-width: 1080px) {
        display: block;
        border-bottom: 1.5px solid #e1e5ea;
    }
`;

export const FirstDiv = styled.div`
    align-self: center;
    margin-left: 3rem;

    @media only screen and (max-width: 1080px) {
        padding: 0 0 0 1rem;
        margin-left: 0;
    }
`;

export const SecondDiv = styled.div`
    display: grid;
    margin-left: 3rem;
    grid-template-columns: 5rem auto;

    @media only screen and (max-width: 1080px) {
        padding: 1rem 0 0 1rem;
        grid-template-columns: 4rem auto;
        margin-left: 0;
    }
`;

export const LogoPic = styled.div`
    border: solid 1px black;
    height: 60px;
    width: 60px;

    @media only screen and (max-width: 1080px) {
        height: 50px;
        width: 50px;
    }
`;

export const SecondDivTwo = styled.div`
    align-self: end;
`;

export const DivTwo = styled.div`
    margin-left: 3rem;

    @media only screen and (max-width: 1080px) {
        padding: 1rem 0 0 1rem;
        grid-template-columns: 4rem auto;
        margin-left: 0;
    }
`;

export const Input = styled(CInput)`
    width: 50%;
`;

export const ShortText = styled(CInput)`
    width: 30%;
`;

export const Label = styled.label`
    font-size: 18px;
`;

export const Paragraph = styled.p`
    font-size: 12px;
    margin: 0.5rem 0 0.5rem 0;
`;

export const Buttondiv = styled.div`
    width: 50%;
    margin: 1rem auto;
`;

export const Button = styled(CButton)`
    width: 100%;
`;