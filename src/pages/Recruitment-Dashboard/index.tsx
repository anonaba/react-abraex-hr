import React from "react";
import styled from "styled-components";
import { FaUserTie, FaSearch } from "react-icons/fa";

const Row = styled.div`
  @media screen and (max-width: 736px) and (min-width: 314px) {
    flex-direction: column !important;
  }
`;
const Container = styled.div`
  position: relative;
  width: 98%;
  @media screen and (max-width: 990px) and (min-width: 314px) {
    width: 100%;
    margin-left: auto;
  }
`;

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="c-wrapper">
        <main className="c-main">
          <Container className="container-fluid">
            <div className="card">
              <div className="card-body">
                <h2>Welcome back Administrator!</h2>
                <hr className="mt-5" />
                <Row className="text-white d-flex flex-row justify-content-center mt-4">
                  <div className="card col-lg-3 bg-gradient-info mx-2">
                    <div className="card-body row justify-content-between ">
                      <div>
                        <div>New Applicants</div>
                        <div className="text-value-lg">1</div>
                      </div>
                      <div>
                        <FaUserTie />
                      </div>
                    </div>
                  </div>
                  <div className="card col-lg-3 bg-gradient-warning mx-2">
                    <div className="card-body row justify-content-between ">
                      <div>
                        <div>Active Vacancies</div>
                        <div className="text-value-lg">3</div>
                      </div>
                      <div>
                        <FaSearch />
                      </div>
                    </div>
                  </div>
                </Row>
              </div>
            </div>
          </Container>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
