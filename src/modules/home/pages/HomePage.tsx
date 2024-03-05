import PlanSelection from "common/components/Navbar/PlanSelection";
import Diagram from "common/components/diagram/flows/ReactFlowDiagram";
import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";
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
				<PlanSelection />
			</div>
			<EnrollAndCredits />
			<div className="w-3/5 h-4/5 flex  rounded-2xl shadow-box-shadow">
				<Diagram />
			</div>
			{/* <CourseTitleExtractor /> */}
			{/* <CurriculumBox /> */}
		</div>
	);
}

export default Home;
