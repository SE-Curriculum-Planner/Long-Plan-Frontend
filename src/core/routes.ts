import { ClientRouteKey } from "common/constants/keys";
import HomePage from "modules/home/pages/HomePage";
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
		component: HomePage,
		loading: true,
	},
];

export default routes;
