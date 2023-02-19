import { FC } from "react";
import { Controller } from "react-hook-form";
// import { authAxios } from "../../axios";
import {
  CRow,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CInput,
  CInvalidFeedback,
  CSpinner,
  CFormText,
} from "@coreui/react";

import { Button } from "./style";

type Props = {
  add: any;
  isloading: boolean;
  control: any;
  submit: any;
  reset: any;
  errors: any;
  setIsOpenModal: any;
  isOpenModal: boolean;
};
const AddEmployee: FC<Props> = ({
  add,
  isloading,
  control,
  submit,
  reset,
  errors,
  setIsOpenModal,
  isOpenModal,
}: Props) => {
  // const [loading, setLoading] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpenModal(!isOpenModal)} color="primary">
        Add Employee
      </Button>
      <CModal
        show={isOpenModal}
        onClose={() => {
          setIsOpenModal(!isOpenModal);
          reset();
        }}
        size="lg"
        d-block
        position-static
        centered
      >
        <CModalHeader closeButton>
          <CModalTitle>ADD EMPLOYEE</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={submit(add)}>
            <CRow className="justify-content-around">
              <CFormGroup className="col-6">
                <Controller
                  control={control}
                  name="userName"
                  render={({ field }) => (
                    <CInput
                      {...field}
                      value={field.value || ""}
                      placeholder="Username"
                      type="string"
                      className={`form-control ${
                        errors.userName ? "is-invalid" : ""
                      }`}
                    />
                  )}
                />
                <CInvalidFeedback className="help-block">
                  {errors.userName?.message}
                </CInvalidFeedback>
              </CFormGroup>
              <CFormGroup className="col-6">
                <Controller
                  control={control}
                  name="employeeId"
                  render={({ field }) => (
                    <CInput
                      {...field}
                      value={field.value || ""}
                      name="employeeId"
                      type="text"
                      placeholder="Employee ID"
                      className={`form-control ${
                        errors.employeeId ? "is-invalid" : ""
                      }`}
                    />
                  )}
                />
                <CInvalidFeedback className="help-block">
                  {errors.employeeId?.message}
                </CInvalidFeedback>
              </CFormGroup>
            </CRow>
            <CRow>
              <CFormGroup className="col-12">
                <Controller
                  control={control}
                  name="position"
                  render={({ field }) => (
                    <CInput
                      {...field}
                      value={field.value || ""}
                      name="position"
                      type="text"
                      placeholder="Position"
                      className={`form-control ${
                        errors.position ? "is-invalid" : ""
                      }`}
                    />
                  )}
                />
                <CInvalidFeedback className="help-block">
                  {errors.position?.message}
                </CInvalidFeedback>
              </CFormGroup>
            </CRow>
            <CRow className="justify-content-around">
              <CFormGroup className="col-4">
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <CInput
                      {...field}
                      value={field.value || ""}
                      type="text"
                      autoComplete="off"
                      name="firstName"
                      placeholder="First Name..."
                      className={`form-control ${
                        errors.firstName ? "is-invalid" : ""
                      }`}
                    />
                  )}
                />

                <CInvalidFeedback>{errors.firstName?.message}</CInvalidFeedback>
              </CFormGroup>
              <CFormGroup className="col-4">
                <Controller
                  control={control}
                  name="middleName"
                  render={({ field }) => (
                    <CInput
                      {...field}
                      value={field.value || ""}
                      autoComplete="off"
                      type="text"
                      name="middleName"
                      placeholder="Middle Name..."
                      className={`form-control ${
                        errors.middleName ? "is-invalid" : ""
                      }`}
                    />
                  )}
                />
                <CInvalidFeedback>
                  {errors.middleName?.message}
                </CInvalidFeedback>
              </CFormGroup>
              <CFormGroup className="col-4">
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field }) => (
                    <CInput
                      {...field}
                      value={field.value || ""}
                      autoComplete="off"
                      type="text"
                      name="lastName"
                      placeholder="Last Name..."
                      className={`form-control ${
                        errors.lastName ? "is-invalid" : ""
                      }`}
                    />
                  )}
                />

                <CInvalidFeedback>{errors.lastName?.message}</CInvalidFeedback>
              </CFormGroup>
            </CRow>
            <CRow className="justify-content-around">
              <CFormGroup className="col-4">
                <Controller
                  control={control}
                  name="birthDate"
                  render={({ field }) => (
                    <>
                      <CInput
                        {...field}
                        value={field.value || ""}
                        type="date"
                        name="birthDate"
                        className={`form-control ${
                          errors.birthDate ? "is-invalid" : ""
                        }`}
                      />
                      <CFormText style={{ fontSize: "12px" }}>
                        Birthdate
                      </CFormText>
                    </>
                  )}
                />
                <CInvalidFeedback>{errors.birthDate?.message}</CInvalidFeedback>
              </CFormGroup>
              <CFormGroup className="col-4">
                <Controller
                  control={control}
                  name="mobile"
                  render={({ field }) => (
                    <CInput
                      {...field}
                      value={field.value || ""}
                      name="mobile"
                      type="text"
                      placeholder="Phone Number..."
                      className={`form-control ${
                        errors.mobile ? "is-invalid" : ""
                      }`}
                    />
                  )}
                />

                <CInvalidFeedback>{errors.mobile?.message}</CInvalidFeedback>
              </CFormGroup>
              <CFormGroup className="col-4">
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <CInput
                      {...field}
                      value={field.value || ""}
                      autoComplete="off"
                      name="email"
                      type="email"
                      placeholder="email..."
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                    />
                  )}
                />
                <CInvalidFeedback className="invalid-feedback">
                  {errors.email?.message}
                </CInvalidFeedback>
              </CFormGroup>
            </CRow>

            <CFormGroup className="float-right mx-auto">
              <CButton
                disabled={isloading ? true : false}
                color="primary"
                type="submit"
                className="mx-2"
              >
                {isloading ? <CSpinner size="sm" /> : "Submit"}
              </CButton>
              <CButton
                color="secondary"
                onClick={() => {
                  setIsOpenModal(!isOpenModal);
                  reset();
                }}
              >
                Cancel
              </CButton>
            </CFormGroup>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  );
};

export default AddEmployee;
