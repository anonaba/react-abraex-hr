import styled from "styled-components";
import { Container } from "GlobalStyles";

export const Section = styled.section`
  padding: 5rem 0;
`;

export const SectionContainer = styled(Container)``;

export const SectionRow = styled.div`
  display: flex;
  @media only screen and (min-width: 60em) {
    gap: 13rem;
  }
`;

export const SectionHeading = styled.div`
  text-align: center;
  h2 {
    text-transform: uppercase;
  }
`;

export const SectionLogos = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 6rem;
`;

export const ClientLogoList = styled.li`
  flex: 1;
  margin: 2rem;
  text-align: center;
  display: flex;
  justify-content: center;
`;

export const ClientImageLogo = styled.img`
  max-width: 50rem;
  display: block;
`;
