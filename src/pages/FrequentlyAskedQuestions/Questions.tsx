import { CCollapse } from "@coreui/react";
import { Icon } from "pages/FrequentlyAskedQuestions/style";
import { useState } from "react";
import { Answer, QSection, Question, Section } from "./style";

type Props = {
  question: string;
  answer: string;
};

const Questions = ({ question, answer }: Props) => {
  const [collapse, setCollapse] = useState(false);

  const toggle = (e: any) => {
    setCollapse(!collapse);
    e.preventDefault();
  };
  return (
    <div>
      <Section>
        <QSection onClick={toggle}>
          <Question>{question}</Question>
          {collapse ? (
            <Icon size={"sm"} name="cil-caret-top" />
          ) : (
            <Icon size={"sm"} name="cil-caret-bottom" />
          )}
        </QSection>
        <CCollapse show={collapse}>
          <Answer>{answer}</Answer>
        </CCollapse>
      </Section>
    </div>
  );
};

export default Questions;
