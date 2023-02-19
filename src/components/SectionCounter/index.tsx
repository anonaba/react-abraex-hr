import CountUp from "react-countup";

import {
  Section,
  SectionContainer,
  SectionRow,
  CounterWrappper,
  Counter,
} from "./style";

const SectionCounter = () => {
  return (
    <Section>
      <SectionContainer>
        <SectionRow>
          <h2>Aliquam dignissim hendrerit ornare</h2>
          <CounterWrappper>
            <Counter>
              <span>
                <CountUp end={99.9} suffix="%" decimals={1} />
              </span>
              <p>
                Payroll <br /> Accuracy
              </p>
            </Counter>
            <Counter>
              <span>
                <CountUp end={15} suffix="min" duration={4} />
              </span>
              <p>
                Response <br /> Time
              </p>
            </Counter>
            <Counter>
              <span>
                <CountUp end={90} suffix="%" />
              </span>
              <p>
                Reduction in <br /> Process Time
              </p>
            </Counter>
            <Counter>
              <span>
                <CountUp end={700} suffix="+" />
              </span>
              <p>
                Knowledge <br /> Base Articles
              </p>
            </Counter>
          </CounterWrappper>
        </SectionRow>
      </SectionContainer>
    </Section>
  );
};

export default SectionCounter;
