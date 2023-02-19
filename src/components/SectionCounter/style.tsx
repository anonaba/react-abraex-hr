import styled from "styled-components";
import { Container } from "GlobalStyles";

export const Section = styled.section`
  padding: 5rem 0;
  background-color: #eee;
`;

export const SectionContainer = styled(Container)``;

export const SectionRow = styled.div`
  h2 {
    font-size: clamp(2.5rem, 4vw, 4rem);
    text-align: center;
  }

  p {
    font-size: clamp(1.6rem, 4vw, 2.2rem);
  }
`;

export const CounterWrappper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Counter = styled.div`
  margin: 3rem 1rem 1rem;
  text-align: center;
  flex: 1 calc(10rem - 100%);

  span {
    font-size: 4rem;
  }

  @media only screen and (min-width: 20em) {
    flex: 1 calc(10rem - 100%);
  }

  @media only screen and (min-width: 75.5em) {
    flex: 1 calc(90rem - 100%);
  }
`;
