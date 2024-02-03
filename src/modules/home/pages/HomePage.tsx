import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";
import CurriculumBox from "common/components/CurriculumBox";
import Enrolled from "common/components/showEnrolled";
import SemBox from "common/components/SemBox";
import CourseTitleExtractor from "common/components/getCourseTitle";


function Home() {
	const loadingContext = useLoadingContext();

	useEffect(() => {
		loadingContext.done();
	}, []);
	return (
		
		<div style={{fontFamily: "IBM Plex Sans Thai, sans-serif"  }}>
		  
		  <CourseTitleExtractor />
		</div>
	  );
}

export default Home;
