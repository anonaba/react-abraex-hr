import React from "react";
import {
  Section,
  SectionContainer,
  SectionHeading,
  SectionLogos,
  ClientLogoList,
  ClientImageLogo,
} from "./style";

import Dropbox from "../../assets/img/dropbox.png";
import Intel from "../../assets/img/intel.png";
import Cola from "../../assets/img/lg-cola.png";
import Nokia from "../../assets/img/nokia.png";
import Zendesk from "../../assets/img/zendesk.png";

const SectionClients = () => {
  return (
    <Section>
      <SectionContainer>
        <SectionHeading>
          <h2>Ut enim ad minima veniam</h2>
        </SectionHeading>
        <SectionLogos>
          <ClientLogoList>
            <ClientImageLogo src={Dropbox} />
          </ClientLogoList>
          <ClientLogoList>
            <ClientImageLogo src={Intel} />
          </ClientLogoList>
          <ClientLogoList>
            <ClientImageLogo src={Cola} />
          </ClientLogoList>
          <ClientLogoList>
            <ClientImageLogo src={Nokia} />
          </ClientLogoList>
          <ClientLogoList>
            <ClientImageLogo src={Zendesk} />
          </ClientLogoList>
        </SectionLogos>
      </SectionContainer>
    </Section>
  );
};

export default SectionClients;
