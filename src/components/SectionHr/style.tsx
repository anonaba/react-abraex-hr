import styled from "styled-components";
import { Container } from "GlobalStyles";

export const Section = styled.section`
  padding: 5rem 0;
`;

export const SectionContainer = styled(Container)``;

export const SectionRow = styled.div`
  text-align: center;
  h2 {
    font-size: clamp(2.5rem, 4vw, 4rem);
  }

  p {
    font-size: clamp(1.5rem, 2vw, 2rem);
  }
`;
