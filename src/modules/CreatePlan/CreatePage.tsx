import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";

function CreatePage() {
  const loadingContext = useLoadingContext();

  useEffect(() => {
    loadingContext.done();
  }, []);

  return (
    <div
      className="w-screen flex flex-col justify-center items-center text-center  h-screen "
      style={{
        fontFamily: "IBM Plex Sans Thai, sans-serif",
        backgroundColor: "#F5F5F5",
        overflowX: "hidden",
      }}
    >
      <div className="flex flex-col mt-40 mb-10">
        <span className="text-[96px] font-bold text-blue-shadeb4"> SOS </span>
        <span className="text-[24px] font-medium text-blue-shadeb4">
          This feature is coming soon . . .
        </span>
        <img src="/imgs/SOS.png" alt="" className="w-[400px] " />
      </div>
      <footer className="flex flex-col justify-center items-center text-sm bg-blue-shadeb5 rounded-t-2xl w-screen h-[100px] pt-4 pb-2 mt-2">
        <div className="flex items-center gap-2 mb-1 text-white">
          <a
            href="https://docs.google.com/spreadsheets/d/1p1P_x4op-EsioJxqPyRJTR9pqsWjEgRxEYXUR2d-r2w/edit?gid=0#gid=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/imgs/feedback.svg" alt="" style={{ width: "50px" }} />
          </a>
          <span className="text-lg font-medium">
            Give us Feedback and Bugs report
          </span>
        </div>
        <p className="text-blue-shadeb3">LongPlan 2024</p>
      </footer>
    </div>
  );
}

export default CreatePage;
