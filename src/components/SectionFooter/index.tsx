import { FC } from "react";
import {
  Footer,
  SectionContainer,
  SectionRow,
  SectionColumn,
  Facebook,
  LinkedIn,
  Twitter,
  Instagram,
  FooterDiv,
} from "./style";

const SectionFooter: FC = () => {
  return (
    <Footer>
      <SectionContainer>
        <SectionRow>
          <SectionColumn>
            <h4>AbraSoft</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              tenetur cupiditate.
            </p>
            <div className="social__media">
              <a href="/">
                <Facebook />
              </a>
              <a href="/">
                <LinkedIn />
              </a>
              <a href="/">
                <Twitter />
              </a>
              <a href="/">
                <Instagram />
              </a>
            </div>
          </SectionColumn>
          <SectionColumn>
            <h4>Company</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/">About us</a>
              </li>
              <li>
                <a href="/">How it works</a>
              </li>
              <li>
                <a href="/">Contact us</a>
              </li>
            </ul>
          </SectionColumn>
          <SectionColumn>
            <h4>Get in Touch</h4>
            <p>info@abrasoft.com</p>
            <p>+1 844-721-7120</p>
          </SectionColumn>
          <SectionColumn>
            <h4>Help</h4>
            <ul>
              <li>
                <a href="/">Help center</a>
              </li>
              <li>
                <a href="/">Contact support</a>
              </li>
              <li>
                <a href="/">Instructions</a>
              </li>
              <li>
                <a href="/">Learn more</a>
              </li>
            </ul>
          </SectionColumn>
        </SectionRow>
        <FooterDiv className="footer__creds">
          <p>
            Copyright © {new Date().toLocaleString("en-US", { year: "numeric" })}{" "}
            AbraSoft
          </p>
        </FooterDiv>
      </SectionContainer>
    </Footer>
  );
};

export default SectionFooter;
