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
			className="w-screen flex flex-col"
			style={{
				fontFamily: "IBM Plex Sans Thai, sans-serif",
				backgroundColor: "#F5F5F5",
			}}
		>
			<div className="flex justify-center items-center pt-5">
				<PlanSelection />
			</div>
			<EnrollAndCredits />
			<div className="w-screen h-screen flex justify-center items-center">
				<div className="w-3/5 h-4/5 flex  rounded-2xl shadow-box-shadow">
					<Diagram />
				</div>
			</div>

			{/* <CourseTitleExtractor /> */}
			{/* <CurriculumBox /> */}
		</div>
	);
}

export default Home;
