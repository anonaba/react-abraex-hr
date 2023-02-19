import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a
          href="https://hr.abrasoft.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Abraex Inc.
        </a>
        <span className="ml-1">
          &copy; {new Date().toLocaleString("en-US", { year: "numeric" })}{" "}
        </span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a
          href="https://hr.abrasoft.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Abraex Inc.
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
