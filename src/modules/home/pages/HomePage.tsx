import { noop } from "lodash-es";
import { useQuery } from "react-query";
import { useLoadingContext } from "react-router-loading";

function HomePage() {
	const loadingContext = useLoadingContext();
	useQuery("home-init", noop, {
		onSettled() {
			loadingContext.done();
		},
	});

	return (
		<div className="flex ml-52 pr-12 pt-7 flex-col  h-full w-full pb-10"></div>
	);
}

export default HomePage;
