import React, { useState } from "react";
import styled from "styled-components";

import {
  CDataTable,
  CButton,
  CBadge,
  CCollapse,
  CCardBody,
  CContainer,
} from "@coreui/react";

const Row = styled.div`
  display: flex;
  @media screen and (max-width: 736px) and (min-width: 314px) {
    flex-direction: column !important;
  }
`;

const usersData = [
  {
    id: 0,
    name: "John Doe",
    date: "2021/01/01",
    position: "Front-End Developer",
    status: "New",
  },
  {
    id: 1,
    name: "Samppa Nori",
    date: "2021/01/01",
    position: "Front-End Developer",
    status: "Initial Interview",
  },
  {
    id: 2,
    name: "Estavan Lykos",
    date: "2021/02/01",
    position: "Front-End Developer",
    status: "Passed II",
  },
  {
    id: 3,
    name: "Chetan Mohamed",
    date: "2021/02/01",
    position: "Back-End Developer",
    status: "Failed II",
  },
  {
    id: 4,
    name: "Derick Maximinus",
    date: "2021/03/01",
    position: "Front-End Developer",
    status: "Final Interview",
  },
  {
    id: 5,
    name: "Friderik Dávid",
    date: "2021/01/21",
    position: "Front-End Developer",
    status: "Passed FI",
  },
  {
    id: 6,
    name: "Yiorgos Avraamu",
    date: "2021/01/01",
    position: "Front-End Developer",
    status: "Failed FI",
  },
  {
    id: 7,
    name: "Avram Tarasios",
    date: "2021/02/01",
    position: "Front-End Developer",
    status: "Pooling",
  },
  {
    id: 8,
    name: "Quintin Ed",
    date: "2021/02/01",
    position: "Back-End Developer",
    status: "Job Offer",
  },
  {
    id: 9,
    name: "Enéas Kwadwo",
    date: "2021/03/01",
    position: "Front-End Developer",
    status: "Hired",
  },
  {
    id: 10,
    name: "Agapetus Tadeáš",
    date: "2021/01/21",
    position: "Admin",
    status: "Withdraw Application",
  },
  {
    id: 11,
    name: "Carwyn Fachtna",
    date: "2021/01/01",
    position: "Admin",
    status: "New",
  },
  {
    id: 12,
    name: "Nehemiah Tatius",
    date: "2021/02/01",
    position: "Admin",
    status: "Failed FI",
  },
  {
    id: 13,
    name: "Ebbe Gemariah",
    date: "2021/02/01",
    position: "Back-End Developer",
    status: "Pooling",
  },
  {
    id: 14,
    name: "Eustorgios Amulius",
    date: "2021/03/01",
    position: "Admin",
    status: "Final Interview",
  },
  {
    id: 15,
    name: "Leopold Gáspár",
    date: "2021/01/21",
    position: "Admin",
    status: "New",
  },
  {
    id: 16,
    name: "Pompeius René",
    date: "2021/01/01",
    position: "Staff",
    status: "Failed II",
  },
  {
    id: 17,
    name: "Paĉjo Jadon",
    date: "2021/02/01",
    position: "Staff",
    status: "New",
  },
  {
    id: 18,
    name: "Micheal Mercurius",
    date: "2021/02/01",
    position: "Back-End Developer",
    status: "Failed II",
  },
  {
    id: 19,
    name: "Ganesha Dubhghall",
    date: "2021/03/01",
    position: "Staff",
    status: "Initial Interview",
  },
  {
    id: 20,
    name: "Hiroto Šimun",
    date: "2021/01/21",
    position: "Staff",
    status: "New",
  },
  {
    id: 21,
    name: "Vishnu Serghei",
    date: "2021/01/01",
    position: "QA",
    status: "New",
  },
  {
    id: 22,
    name: "Zbyněk Phoibos",
    date: "2021/02/01",
    position: "QA",
    status: "New",
  },
  {
    id: 23,
    name: "Aulus Agmundr",
    date: "2021/01/01",
    position: "QA",
    status: "Initial Interview",
  },
  {
    id: 24,
    name: "Ford Prefect",
    date: "2021/05/25",
    position: "QA",
    status: "Passed FI!",
  },
];

const ApplicationList: React.FC = () => {
  const [details, setDetails] = useState([usersData]);
  // const [items, setItems] = useState(usersData)

  const toggleDetails = (index: any) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const fields = [
    { key: "name", _style: { width: "40%" } },
    "date",
    { key: "position", _style: { width: "20%" } },
    { key: "status", _style: { width: "20%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  const getBadge = (status: any) => {
    switch (status) {
      case "Passed II":
        return "success";
      case "Passed FI":
        return "success";
      case "Hired":
        return "success";
      case "New":
        return "info";
      case "Final Interview":
        return "warning";
      case "Pooling":
        return "warning";
      case "Failed II":
        return "danger";
      case "Failed FI":
        return "danger";
      case "Withdraw Application":
        return "danger";
      case "Initial Interview":
        return "primary";
      case "Job Offer":
        return "primary";
      default:
        return "primary";
    }
  };
  return (
    <>
      <div className="c-wrapper">
        <main className="c-main">
          <Row>
            <CContainer className="container-fluid col-lg-9">
              <div className="card">
                <header className="card-header">Application List</header>
                <div className="card-body">
                  <CDataTable
                    items={usersData}
                    fields={fields}
                    columnFilter
                    tableFilter
                    footer
                    itemsPerPageSelect
                    itemsPerPage={5}
                    hover
                    sorter
                    pagination
                    striped
                    outlined
                    responsive
                    scopedSlots={{
                      status: (item: any) => (
                        <td>
                          <CBadge color={getBadge(item.status)}>
                            {item.status}
                          </CBadge>
                        </td>
                      ),
                      show_details: (item: any, index: any) => {
                        return (
                          <td className="py-2">
                            <CButton
                              color="primary"
                              variant="outline"
                              shape="square"
                              size="sm"
                              onClick={() => {
                                toggleDetails(index);
                              }}
                            >
                              {details.includes(index) ? "Hide" : "Actions"}
                            </CButton>
                          </td>
                        );
                      },
                      details: (item: any, index: any) => {
                        return (
                          <CCollapse show={details.includes(index)}>
                            <CCardBody>
                              <h4>{item.name}</h4>
                              <br />
                              <p className="text-muted">
                                Applied Position: {item.position}
                              </p>
                              <p className="text-muted">Date: {item.date}</p>
                              <CButton size="sm" color="info">
                                Edit
                              </CButton>
                              <CButton
                                size="sm"
                                color="danger"
                                className="ml-1"
                              >
                                Delete
                              </CButton>
                            </CCardBody>
                          </CCollapse>
                        );
                      },
                    }}
                  />
                </div>
              </div>
            </CContainer>
            <CContainer className="container-fluid">
              <div className="card">
                <div className="card-body">
                  <div className="btn-group-vertical btn-lg btn-block">
                    <button className="btn btn-info my-2">All</button>
                    <button className="btn btn-info my-2">New</button>
                    <button className="btn btn-info my-2">
                      For Initial Interview
                    </button>
                    <button className="btn btn-info my-2">PASSED II</button>
                    <button className="btn btn-info my-2">FAILED II</button>
                    <button className="btn btn-info my-2">
                      For Final Interview
                    </button>
                    <button className="btn btn-info my-2">PASSED FI</button>
                    <button className="btn btn-info my-2">FAILED FI</button>
                    <button className="btn btn-info my-2">FOR POOLING</button>
                    <button className="btn btn-info my-2">Job Offer</button>
                    <button className="btn btn-info my-2">Hired</button>
                    <button className="btn btn-info my-2">
                      Withdraw Application
                    </button>
                  </div>
                </div>
              </div>
            </CContainer>
          </Row>
        </main>
      </div>
    </>
  );
};

export default ApplicationList;
