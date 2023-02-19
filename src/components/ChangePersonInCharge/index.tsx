import { FC } from "react";
import { CFormGroup } from "@coreui/react";
import { ParentDiv, ChildrenDiv, Button, Select } from "./style";
import { Controller } from "react-hook-form";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInputs } from "./type";
import Axios from "../../axios";
import swal from "sweetalert2";

import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

type Props = {
  assignee: any;
  members: any;
  ownerID: any;
  taskID: any;
  profileID: any;
  rerenderData: any;
};

const defaultInput = {
  assignee: "",
};

const ChangePersonInCharge: FC<Props> = ({
  assignee,
  members,
  ownerID,
  taskID,
  profileID,
  rerenderData,
}: Props) => {
  const { handleSubmit, control, reset } = useForm<FormInputs>();

  const changeAssignee: SubmitHandler<FormInputs> = async (newAssignee) => {
    const formatData = {
      ...newAssignee,
      id: taskID,
    };

    try {
      const { data: taskUpdate } = await Axios.post(
        "/team/task-update",
        formatData,
        config
      );
      swal.fire({
        icon: "success",
        text: taskUpdate.message,
        showConfirmButton: false,
        timer: 2500,
      });
      rerenderData();
      reset(defaultInput);
    } catch (error: any) {
      swal.fire({
        icon: "error",
        text: error.response.data.message,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(changeAssignee)}>
        <CFormGroup>
          <ParentDiv>
            {ownerID === profileID && (
              <>
                <ChildrenDiv>
                  <Controller
                    control={control}
                    name="assignee"
                    render={({ field }) => (
                      <Select id="assignee" {...field} required>
                        <option value="" disabled selected>
                          {assignee}
                        </option>
                        {members.map(({ id, firstName, lastName }: any) => {
                          return (
                            <>
                              {id !== ownerID && (
                                <option value={id}>
                                  {`${firstName} ${lastName}`}
                                </option>
                              )}
                            </>
                          );
                        })}
                      </Select>
                    )}
                  />
                </ChildrenDiv>
                <ChildrenDiv>
                  {" "}
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </ChildrenDiv>
              </>
            )}
          </ParentDiv>
        </CFormGroup>
      </form>
    </>
  );
};

export default ChangePersonInCharge;
