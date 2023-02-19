import { FC } from "react";
import { CTooltip } from "@coreui/react";
import { CheckIconButton } from "./style";
import { FaCheck } from "react-icons/fa";

type Props = {
  status: any;
  owner: any;
  id: any;
  inProgress: any;
  qaReview: any;
  done: any;
  backLog: any;
};

const ViewDetailStatusButton: FC<Props> = ({
  status,
  owner,
  id,
  inProgress,
  qaReview,
  done,
  backLog
}: Props) => {
  return (
    <>
      {owner === id ? (
        status === "Backlog" ? (
          <CTooltip content="Change status to In Progress" placement={"bottom"}>
            <CheckIconButton
              color="info"
              shape="square"
              size="sm"
              onClick={inProgress}
            >
              <FaCheck />
            </CheckIconButton>
          </CTooltip>
        ) : status === "In Progress" ? (
          <CTooltip content="Change status to QA Review" placement={"bottom"}>
            <CheckIconButton
              color="warning"
              shape="square"
              size="sm"
              onClick={qaReview}
            >
              <FaCheck />
            </CheckIconButton>
          </CTooltip>
        ) : status === "QA Review" ? (
          <CTooltip content="Change status to Done" placement={"bottom"}>
            <CheckIconButton
              color="success"
              shape="square"
              size="sm"
              onClick={done}
            >
              <FaCheck />
            </CheckIconButton>
          </CTooltip>
        ) : (
          <CTooltip content="Change status to Backlog" placement={"bottom"}>
            <CheckIconButton
              color="secondary"
              shape="square"
              size="sm"
              onClick={backLog}
            >
              <FaCheck />
            </CheckIconButton>
          </CTooltip>
        )
      ) : (
        ""
      )}
    </>
  );
};

export default ViewDetailStatusButton;
