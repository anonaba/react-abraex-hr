import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container } from "GlobalStyles";

export const Section = styled.section`
  padding: 10rem 0;
`;

export const SectionContainer = styled(Container)``;

export const SectionRow = styled.div`
  display: flex;
  gap: 5rem;
  flex-wrap: wrap;
  justify-content: center;

  @media only screen and (min-width: 65em) {
    gap: 13rem;
  }
`;

export const SectionColumn = styled.div`
  flex: 1 calc(calc(76.6rem - 100%) * 999);
  img {
    width: 100%;
  }

  h3 {
    margin-top: 0;
    font-size: clamp(1.6rem, 2vw, 3rem);
  }

  .app {
    display: flex;
    flex-wrap: wrap;

    img {
      width: 100%;
    }
  }
`;

export const Features = styled.div`
  width: 102%;
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-row-gap: 1rem;
  grid-column-gap: 2.5rem;

  p {
    font-size: clamp(1.6rem, 1vw, 3rem);
  }
`;

export const Apps = styled(Link)`
  width: 40%;
  margin-right: 2rem;
  display: block;

  @media only screen and (min-width: 40em) {
    width: 30%;
  }
`;