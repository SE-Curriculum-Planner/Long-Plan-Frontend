import { ClientRouteKey } from "common/constants/keys";
import Home from "modules/home/pages/HomePage";
import LoginPage from "modules/login/pages/LoginPage";
import RootPage from "modules/root/pages/RootPage";
// import DocPage from "modules/home/pages/DocPage";

const routes = [
	{
		path: ClientRouteKey.Root,
		component: RootPage,
	},
	{
		path: ClientRouteKey.Login,
		component: LoginPage,
	},
	{
		path: ClientRouteKey.Home,
		component: Home,
		// loading: true,
	},
];

export default routes;
