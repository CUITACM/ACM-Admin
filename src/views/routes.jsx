import mainRoute from './main/routes';
import authRoute from './auth/routes';
import adminRoute from './admin/routes';
import principalRoute from './principal/routes';

const RootRoute = {
  childRoutes: [{
    path: '/',
    indexRoute: {
      onEnter: (_, replace) => replace('/home'),
    },
    childRoutes: [
      mainRoute,
      authRoute,
      adminRoute,
      principalRoute
    ]
  }]
};

export default RootRoute;
