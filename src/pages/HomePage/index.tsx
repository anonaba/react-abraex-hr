import { FC } from "react";
import { GlobalStyles } from "GlobalStyles";

import { homeObjOne, homeObjOTwo } from "./data";

// COMPONENTS
import Navbar from "components/Navbar";
import SectionInfo from "components/SectionInfo";
import SectionClients from "components/SectionClients";
import SectionHr from "components/SectionHr";
import SectionCounter from "components/SectionCounter";
import SectionApp from "components/SectionApp";
import SectionFooter from "components/SectionFooter";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";

const Home: FC = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  if (token) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <GlobalStyles />
      <header>
        <Navbar />
      </header>
      <SectionInfo {...homeObjOne} />
      <SectionClients />
      <SectionInfo {...homeObjOTwo} headingLevelTwo="h2" />
      <SectionHr />
      <SectionCounter />
      <SectionApp />
      <SectionFooter />
    </>
  );
};

export default Home;
