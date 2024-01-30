import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";
import CoreBox from "common/components/SubjectBox/Core";
import MajorBox from "common/components/SubjectBox/Major";
import ActBox from "common/components/SubjectBox/Act";
import LearnerBox from "common/components/SubjectBox/Learner";
import CoCreBox from "common/components/SubjectBox/Cocre";
import ElecBox from "common/components/SubjectBox/Elec";
import FreeBox from "common/components/SubjectBox/Free";


function Home() {
	const loadingContext = useLoadingContext();

	useEffect(() => {
		loadingContext.done();
	}, []);
	return (
		
		<div>
		  <h2>Welcome to Home</h2>
		  <CoreBox />
		  <MajorBox />
		  <ActBox />
		  <LearnerBox />
		  <CoCreBox />
		  <ElecBox />
		  <FreeBox />
		</div>
	  );
}

export default Home;
