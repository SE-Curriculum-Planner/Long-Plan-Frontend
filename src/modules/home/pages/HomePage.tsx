import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";

function Home() {
	const loadingContext = useLoadingContext();

	useEffect(() => {
		loadingContext.done();
	}, []);
	return <div>Home2</div>;
}

export default Home;
