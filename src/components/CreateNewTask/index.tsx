import { FC } from "react";
import { Controller } from "react-hook-form";
import {
  CButton,
  CFormGroup,
  CLabel,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CModal,
} from "@coreui/react";
import { Input, ModalHeader, Select } from "./style";

type Props = {
  add: any;
  submit: any;
  control: any;
  members: any;
  reset: any;
  modal: boolean;
  setModal: any;
};

const CreateNewTask: FC<Props> = ({
  add,
  submit,
  control,
  members,
  reset,
  modal,
  setModal,
}: Props) => {
  return (
    <>
      <CButton color="primary" onClick={() => setModal(!modal)}>
        Create New Task
      </CButton>

      <form onSubmit={submit(add)}>
        <CModal show={modal} onClose={setModal} position-static centered>
          <ModalHeader>
            <CModalTitle>Create New Task</CModalTitle>
          </ModalHeader>
          <CModalBody>
            <CFormGroup>
              <CLabel htmlFor="branch">Branch</CLabel>
              <Controller
                control={control}
                name="branch"
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value || ""}
                    id="branch"
                    placeholder="Enter branch"
                    required
                  />
                )}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="name">Task Name</CLabel>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value || ""}
                    id="name"
                    placeholder="Enter task name"
                    required
                  />
                )}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="description">Description</CLabel>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value || ""}
                    id="description"
                    placeholder="Enter description"
                    required
                  />
                )}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="startDate">Start Date</CLabel>
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <Input
                    type="date"
                    {...field}
                    value={field.value || ""}
                    id="startDate"
                    required
                  />
                )}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="endDate">End Date</CLabel>
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <Input
                    type="date"
                    {...field}
                    value={field.value || ""}
                    id="endDate"
                    required
                  />
                )}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="assignee">Assignee</CLabel>
              <Controller
                control={control}
                name="userId"
                render={({ field }) => (
                  <Select id="userId" {...field} required>
                    <option value="" disabled selected>
                      Please select
                    </option>
                    {members.map((items: any) => {
                      return (
                        <>
                          <option value={items.id}>
                            {items.firstName + " " + items.lastName}
                          </option>
                        </>
                      );
                    })}
                  </Select>
                )}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="priority">Priority Level</CLabel>
              <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                  <Select id="priority" {...field} required>
                    <option value="" disabled selected>
                      Please select
                    </option>
                    <option value="3">Low</option>
                    <option value="2">Medium</option>
                    <option value="1">High</option>
                  </Select>
                )}
              />
            </CFormGroup>
          </CModalBody>
          <CModalFooter>
            <CButton type="submit" color="primary">
              Submit
            </CButton>
            <CButton
              color="secondary"
              onClick={() => {
                setModal(false);
                reset();
              }}
            >
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
      </form>
    </>
  );
};

export default CreateNewTask;
