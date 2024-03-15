import PlanSelection from "common/components/Navbar/PlanSelection";
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
			}}
		>
			<div className="flex justify-center items-center pt-5">
				<PlanSelection />
			</div>
			<EnrollAndCredits />
			<h1 className="mt-20 text-center">แผนการเรียน</h1>
			<CurriculumBox />
			<div className="w-screen h-screen flex justify-center items-center">
				<div className="w-3/5 h-4/5 flex  rounded-2xl">{/*<Diagram />*/}</div>
			</div>

			{/* <CourseTitleExtractor /> */}
		</div>
	);
}

export default Home;
