import PlanSelection from "common/components/Navbar/PlanSelection";
import Diagram from "common/components/diagram/flows/ReactFlowDiagram";
import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";
import EnrollAndCredits from "common/components/enrollAndCredits.tsx";
import CurriculumBox from "common/components/CurriculumBox";

function Home() {
  const loadingContext = useLoadingContext();

  useEffect(() => {
    loadingContext.done();
  }, []);
  return (
    <div
      className="w-screen flex flex-col "
      style={{
        fontFamily: "IBM Plex Sans Thai, sans-serif",
        backgroundColor: "#F5F5F5",
        overflowX: "hidden",
      }}
    >
      <EnrollAndCredits />
      <div className="flex justify-center">
        <CurriculumBox />
      </div>

      {/* <CourseTitleExtractor /> */}
      <div className="flex flex-col justify-center items-center text-sm bg-blue-shadeb5 rounded-t-2xl w-screen h-[100px] pt-10 pb-4 mt-4">
        <div className="flex items-center gap-4 mb-2  text-white">
          <a
            href="https://docs.google.com/spreadsheets/d/1p1P_x4op-EsioJxqPyRJTR9pqsWjEgRxEYXUR2d-r2w/edit?gid=0#gid=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/imgs/feedback.svg" alt="" style={{ width: "80px" }} />{" "}
          </a>
          <span className="text-xl font-medium">
            Give us Feedback and Bugs report
          </span>
        </div>
        <p className=" text-blue-shadeb3">LongPlan 2024</p>
      </div>
    </div>
  );
}

export default Home;
