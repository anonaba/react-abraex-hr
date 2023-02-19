import React, { useState } from "react";
import { Div1, Div2, Input, Label } from "./style";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import swal from "sweetalert2";
import axios from "../../axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

interface UserProps {
  userID: any;
  idx: any;
  position: any;
  basicPay: any;
  tds: any;
  profTax: any;
  sss: any;
  pagibig: any;
  philhealth: any;
}

const EditMember: React.FC<UserProps> = ({
  userID,
  idx,
  basicPay,
  tds,
  profTax,
  sss,
  pagibig,
  philhealth,
  position,
}) => {
  const [modal, setModal] = useState(false);
  const [pos, setPos] = useState(position);
  const [newBPay, setNewBPay] = useState(basicPay);
  const [newTds, setNewTds] = useState(tds);
  const [newProfTax, setNewProfTax] = useState(profTax);
  const [newSss, setNewSss] = useState(sss);
  const [newPagibig, setNewPagibig] = useState(pagibig);
  const [newPhilhealth, setNewPhilhealth] = useState(philhealth);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = async (e: any) => {
    const data = {
      userId: userID,
      position: pos,
      basicPay: newBPay === null ? "0" : newBPay,
      tds: newTds === null ? "0" : newTds,
      profTax: newProfTax === null ? "0" : newProfTax,
      sss: newSss === null ? "0" : newSss,
      pagibig: newPagibig === null ? "0" : newPagibig,
      philhealth: newPhilhealth === null ? "0" : newPhilhealth,
    };
    e.preventDefault();

    if (
      data.basicPay === "0" &&
      data.tds === "0" &&
      data.profTax === "0" &&
      data.sss === "0" &&
      data.pagibig === "0" &&
      data.philhealth === "0"
    ) {
      swal.fire({
        icon: "error",
        text: "Invalid data",
      });
    } else {
      await axios
        .post("/user/edit-member", data, config)
        .then((response) => {
          swal.fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
            timer: 2500,
          });
        })
        .catch((error) => {
          swal.fire({
            icon: "error",
            text: error && "Invalid data",
          });
        });
    }
  };

  return (
    <div>
      <CButton color="primary" onClick={toggle}>
        Edit Member
      </CButton>
      <CModal centered show={modal} onClose={toggle}>
        <CModalHeader>Edit Member</CModalHeader>
        <form onSubmit={handleSubmit}>
          <CModalBody style={{ padding: "0" }}>
            <Div1 id={userID} key={idx}>
              <Div2>
                <Label htmlFor="new_position">Position</Label>
                <Input
                  onChange={(e: any) => {
                    setPos(e.target.value);
                  }}
                  id={"new_position" + idx}
                  value={pos}
                  defaultValue={position}
                  type="text"
                  required
                />
              </Div2>
              <Div2>
                <Label htmlFor="basic-pay">Basic Pay</Label>
                <Input
                  onChange={(e: any) => {
                    setNewBPay(e.target.value);
                  }}
                  id={"basic-pay" + idx}
                  value={newBPay}
                  defaultValue={basicPay}
                  type="number"
                  required
                />
              </Div2>
              <Div2>
                <Label htmlFor="tds">Tax Deducted at Source(TDS)</Label>
                <Input
                  onChange={(e: any) => {
                    setNewTds(e.target.value);
                  }}
                  id={"tds" + idx}
                  value={newTds}
                  defaultValue={tds}
                  type="number"
                  required
                />
              </Div2>
              <Div2>
                <Label htmlFor="prof-tax">Professional Tax</Label>
                <Input
                  onChange={(e: any) => {
                    setNewProfTax(e.target.value);
                  }}
                  id={"prof-tax" + idx}
                  value={newProfTax}
                  defaultValue={profTax}
                  type="number"
                  required
                />
              </Div2>
              <Div2>
                <Label htmlFor="sss">SSS</Label>
                <Input
                  onChange={(e: any) => {
                    setNewSss(e.target.value);
                  }}
                  id={"sss" + idx}
                  value={newSss}
                  defaultValue={sss}
                  type="number"
                  required
                />
              </Div2>
              <Div2>
                <Label htmlFor="p-ibig">Pagibig</Label>
                <Input
                  onChange={(e: any) => {
                    setNewPagibig(e.target.value);
                  }}
                  id={"p-ibig" + idx}
                  value={newPagibig}
                  defaultValue={pagibig}
                  type="number"
                  required
                />
              </Div2>
              <Div2>
                <Label htmlFor="phealth">Philhealth</Label>
                <Input
                  onChange={(e: any) => {
                    setNewPhilhealth(e.target.value);
                  }}
                  id={"phealth" + idx}
                  value={newPhilhealth}
                  defaultValue={philhealth}
                  type="number"
                  required
                />
              </Div2>
            </Div1>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" type="submit">
              Confirm
            </CButton>
            <CButton color="secondary" onClick={toggle}>
              Cancel
            </CButton>
          </CModalFooter>
        </form>
      </CModal>
    </div>
  );
};

export default EditMember;
