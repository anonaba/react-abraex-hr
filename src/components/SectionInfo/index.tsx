import React, { FC } from "react";

import { Button } from "GlobalStyles";

import {
  Section,
  SectionContainer,
  SectionRow,
  SectionColumn,
  TextWrapper,
  ImgWrapper,
  HeadingLevelOne,
  HeadingLevelTwo,
  HeadingLevelTree,
} from "./style";

interface Props {
  lightBg: boolean;
  headline: string;
  description: string;
  buttonLabel: string;
  imgStart: string;
  img: string;
  alt: string;
  headingLevelTwo?: string;
  headingLevelTree?: string;
}

const SectionInfo: FC<Props> = ({
  lightBg,
  headline,
  description,
  buttonLabel,
  imgStart,
  img,
  alt,
  headingLevelTwo,
  headingLevelTree,
}) => {
  const HeadingLevel = (heading?: string) => {
    switch (heading) {
      case "h2":
        return <HeadingLevelTwo>{headline}</HeadingLevelTwo>;
      case "h3":
        return <HeadingLevelTree>{headline}</HeadingLevelTree>;
      default:
        return <HeadingLevelOne>{headline}</HeadingLevelOne>;
    }
  };

  return (
    <Section isBackground={lightBg}>
      <SectionContainer>
        <SectionRow isReverse={imgStart}>
          <SectionColumn>
            <TextWrapper>
              {HeadingLevel(headingLevelTwo || headingLevelTree)}
              <p>{description}</p>
              <Button color="primary">{buttonLabel}</Button>
            </TextWrapper>
          </SectionColumn>
          <SectionColumn>
            <ImgWrapper>
              <img src={img} alt={alt} />
            </ImgWrapper>
          </SectionColumn>
        </SectionRow>
      </SectionContainer>
    </Section>
  );
};

export default SectionInfo;
