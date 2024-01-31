import Flow from "common/components/reactFlow/Flow";
import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";

function Home() {
  const loadingContext = useLoadingContext();

  useEffect(() => {
    loadingContext.done();
  }, []);
  return (
    <div>
      <Flow />
    </div>
  );
}

export default Home;
