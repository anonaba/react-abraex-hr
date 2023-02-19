import styled, { css } from "styled-components";
import { Container } from "GlobalStyles";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

export const Footer = styled.footer`
  padding-top: 8rem;
  background-color: #4682b4;
  color: #fff;
`;
export const SectionContainer = styled(Container)`
  .footer__creds {
    font-size: clamp(1.5rem, 1vw, 2rem);
    margin-top: 2.5rem;
    padding-bottom: 4rem;
    p {
      margin: 0 1rem 1rem;
      font-size: 1.8rem;
    }
  }
`;

export const SectionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const SectionColumn = styled.div`
  max-width: 25rem;
  margin: 0 1rem 1rem;

  @media only screen and (max-width: 50em) {
    flex: 1 calc(calc(80rem - 100%) * 999);
  }

  .social__media {
    display: flex;
    a {
      display: block;
      margin-right: 1.6rem;
    }
  }

  h4 {
    margin: 1.6rem 0;
    font-weight: 500;
  }
  p {
    margin: 1rem 0;
    /* font-size: 2rem; */
    font-size: clamp(1.5rem, 1vw, 2rem);
    line-height: 22px;
  }

  a {
    display: block;
    text-transform: capitalize;
    margin-bottom: 0.352rem;
    color: #fff;
    font-size: clamp(1.5rem, 1vw, 2rem);
    line-height: 20px;
  }
`;

const socialMediaButtons = css`
  color: #fff;
  transition: 0.3s;
  margin-top: 0.5rem;
  font-size: 1.8rem;
  &:hover {
    color: #000;
  }
`;

export const Facebook = styled(FaFacebookF)`
  ${socialMediaButtons}
`;
export const LinkedIn = styled(FaLinkedinIn)`
  ${socialMediaButtons}
`;
export const Twitter = styled(FaTwitter)`
  ${socialMediaButtons}
`;
export const Instagram = styled(FaInstagram)`
  ${socialMediaButtons}
`;
export const FooterDiv = styled.div`
  padding: 5rem;
  text-align: center;
`;