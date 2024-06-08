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
          className="w-screen flex flex-col"
          style={{
            fontFamily: "IBM Plex Sans Thai, sans-serif",
            backgroundColor: "#F5F5F5",
            overflowX: 'hidden'
          }}
      >
        <div className="flex justify-center items-center pt-5">
          <PlanSelection/>
        </div>
        <EnrollAndCredits/>
        <h1 className="mt-20 text-center">แผนการเรียน</h1>
        <CurriculumBox/>

        {/* <CourseTitleExtractor /> */}
      </div>
  );
}

export default Home;
