import { FC } from "react";
import { FcDataBackup, FcDepartment, FcDeployment } from "react-icons/fc";

import {
  Section,
  SectionContainer,
  SectionColumn,
  SectionRow,
  Features,
  Apps,
} from "./style";

import phone from "../../assets/img/phone.svg";
import googlePlay from "../../assets/img/button-google-play.png";
import appStore from "../../assets/img/button-app-store.png";

const SectionApp: FC = () => {
  return (
    <Section>
      <SectionContainer>
        <h2>
          In hac habitasse platea <br /> dictumst
        </h2>
        <SectionRow>
          <SectionColumn>
            <img src={phone} alt="Phone" />
          </SectionColumn>
          <SectionColumn>
            <h3>Sed eget eros porttitor ex faucibus malesuada nec vel risus</h3>
            <Features>
              <FcDataBackup size={40} style={{ gridRow: "1 / span 2" }} />
              <h4>Amazing Title</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </Features>
            <Features>
              <FcDepartment size={40} style={{ gridRow: "1 / span 2" }} />
              <h4>Amazing Title</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </Features>
            <Features>
              <FcDeployment size={40} style={{ gridRow: "1 / span 2" }} />
              <h4>Amazing Title</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </Features>
            <div className="app">
              <Apps to="/">
                <img src={googlePlay} alt="Google Play" />
              </Apps>
              <Apps to="/">
                <img src={appStore} alt="App Store" />
              </Apps>
            </div>
          </SectionColumn>
        </SectionRow>
      </SectionContainer>
    </Section>
  );
};

export default SectionApp;
