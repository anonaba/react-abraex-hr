import styled from "styled-components";
import { Container } from "GlobalStyles";

interface SectionRowProps {
  readonly isReverse: string;
}

interface SectionProps {
  readonly isBackground: boolean;
}

export const Section = styled.section<SectionProps>`
  padding: 10rem 0;
  background-image: ${({ isBackground }) =>
    isBackground
      ? "linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%)"
      : "linear-gradient(0deg,#1e3d5f 100%,#e0c3fc 100%)"};
`;

export const SectionContainer = styled(Container)``;

export const SectionRow = styled.div<SectionRowProps>`
  display: flex;
  gap: 5rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  flex-direction: ${({ isReverse }) => (isReverse ? "row-reverse" : "row")};

  @media only screen and (min-width: 65em) {
    gap: 13rem;
  }
`;

export const SectionColumn = styled.div`
  flex: 1 calc(calc(76.6rem - 100%) * 999);
`;

export const TextWrapper = styled.div`
  color: #fff;
  max-width: 55rem;

  p {
    font-size: clamp(1.8rem, 4vw, 2.4rem);
  }
`;

export const HeadingLevelOne = styled.h1`
  /* font-size: clamp(5rem, 4vw, 6rem); */
`;

export const HeadingLevelTwo = styled.h2`
  /* font-size: clamp(4rem, 4vw, 5.5rem); */
`;

export const HeadingLevelTree = styled.h3`
  /* font-size: clamp(3rem, 4vw, 4.5rem); */
`;

export const ImgWrapper = styled.div`
  img {
    display: block;
    width: 100%;
  }
`;
