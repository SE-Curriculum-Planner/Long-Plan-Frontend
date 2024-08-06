import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";
import FeedBack from "common/components/FeedBack";
import EnrollAndCredits from "common/components/enrollAndCredits";

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
        overflowX: "hidden",
      }}
    >
      {/* <StudentCheckPage /> */}
      <EnrollAndCredits />
      {/*<div className={`flex justify-center`}>*/}
      {/*    <CurriculumBox/>*/}
      {/*</div>*/}
      <FeedBack />
      {/* <CourseTitleExtractor /> */}
    </div>
  );
}

export default Home;
