import React, { useCallback } from "react";
import swal from "sweetalert2";
import axios from "../../axios";
import Cookies from "universal-cookie";
import {
    CButton,
    CFormGroup,
} from "@coreui/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

const defaultValues = {
  comment: "",
}
  
type commentProps = {
  comment: string;
}
type Props = {
  tId: string;
  getComments(): void;
}

const cookies = new Cookies();
const token = cookies.get("token");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};
const CommentForm: React.FC<Props> = ({ tId , getComments}: Props ) => {
  const {
    handleSubmit,
    reset,
    control,
  } = useForm<commentProps>({ defaultValues });
  
  const addComments : SubmitHandler<commentProps>= useCallback(
    async (newIssueData) => {
      const newFomatData = {
        ...newIssueData,
        id : tId
      };

      try {
        const { data: response } = await axios.post(
          "/team/comment",
          newFomatData,
          config
        );
        swal.fire({
          icon: "success",
          text: response.message,
          showConfirmButton: false,
          timer: 2500,
        });
        getComments();
        reset(defaultValues);
      } catch (error:any) {
        swal.fire({
          icon: "error",
          text: error.message,
        });
        reset(defaultValues);
      }
    },
    [reset, tId, getComments]
  )
    
  return (
    <form
      onSubmit={
        handleSubmit(addComments)
      }>
      <CFormGroup>
        <Controller
          control={control}
          name="comment"
          render={({ field }) => (
            <>
            <textarea
              {...field}
              required  
              value={field.value || ""}
              placeholder="Your Comment"
              className="w-100 p-2"
            />
            </>
          )}
        />
      </CFormGroup>
      <CButton color="info" type="submit" className="float-right" >
        Submit
      </CButton>
    </form>
  );
}
export default CommentForm;
