import { CChartBar } from "@coreui/react-chartjs";
import { CCardHeader, CCardBody, CCard, CSpinner } from "@coreui/react";
import useGraphHook from "hooks/useGraphHook";
import { SpinnerDiv } from "components/Announcement/style";

const Graph = () => {
  const [present, absent, late, onLeave, loading] = useGraphHook();

  return (
    <>
      {loading ? (
        <SpinnerDiv>
          <CSpinner size="lg" />
        </SpinnerDiv>
      ) : (
        <CCard>
          <CCardHeader>
            <h1>Attendance Percentage</h1>
          </CCardHeader>
          <CCardBody>
            <CChartBar
              style={{
                height: "369px",
                minHeight: "369px",
                display: "flex",
                alignItems: "center",
              }}
              datasets={[
                {
                  label: "Present Percentage",
                  backgroundColor: "#20a8d8",
                  data: present,
                },
                {
                  label: "Absent Percentage",
                  backgroundColor: "#f86c6b",
                  data: absent,
                },
                {
                  label: "Late Percentage",
                  backgroundColor: "#ffc107",
                  data: late,
                },
                {
                  label: "On leave Percentage",
                  backgroundColor: "#c8ced3",
                  data: onLeave,
                },
              ]}
              labels="months"
              options={{
                tooltips: {
                  enabled: true,
                },
              }}
            />
          </CCardBody>
        </CCard>
      )}
    </>
  );
};

export default Graph;
