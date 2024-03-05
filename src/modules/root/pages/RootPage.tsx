import "reactflow/dist/style.css";
import { Navigate } from "react-router-dom";
import { ClientRouteKey } from "common/constants/keys";

function RootPage() {
	return <Navigate to={ClientRouteKey.Login} replace={true} />;
}

export default RootPage;
