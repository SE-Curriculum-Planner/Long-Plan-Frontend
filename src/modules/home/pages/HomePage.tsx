import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";
import CurriculumBox from "common/components/CurriculumBox";

function Home() {
	const loadingContext = useLoadingContext();

	useEffect(() => {
		loadingContext.done();
	}, []);
	return (
		
		<div style={{fontFamily: "IBM Plex Sans Thai, sans-serif"  }}>
		  <h1>นี่คือวิชาบังคับ</h1>
		  <CurriculumBox />
		</div>
	  );
}

export default Home;
