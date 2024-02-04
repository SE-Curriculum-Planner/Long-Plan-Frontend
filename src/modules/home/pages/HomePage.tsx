import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";
import CurriculumBox from "common/components/CurriculumBox";
import CourseTitleExtractor from "common/components/getCourseTitle";
import EnrollAndCredits from "common/components/enrollAndCredits.tsx";

function Home() {
  const loadingContext = useLoadingContext();

  useEffect(() => {
    loadingContext.done();
  }, []);
  return (
    <div
      style={{
        fontFamily: "IBM Plex Sans Thai, sans-serif",
        backgroundColor: "#F5F5F5",
      }}
    >
      <div className="flex justify-center items-center pt-5">
        <h1 className="text-center text-collection-1-black-shade-bl5 mr-5">
          แผนการเรียนหลักสูตร{" "}
        </h1>
        <div className="w-80 h-10 px-3 bg-white rounded-3xl border border-solid border-blue-shadeb5 justify-center items-center gap-2.5 inline-flex">
          <h1 className="text-center text-indigo-700 ">CPE Normal Plan</h1>
          <div className="px-2 rounded-2xl border border-solid border-zinc-300 justify-center items-center gap-2.5 flex">
            <span className="text-center text-zinc-300 ">Default</span>
          </div>
        </div>
      </div>
      <EnrollAndCredits />
      {/* <CourseTitleExtractor /> */}
      <CurriculumBox />
    </div>
  );
}

export default Home;
