import { validateLogin } from 'helpers/auth';
import PrincipalApp from './PrincipalApp';

export default {
  path: 'principal',
  component: PrincipalApp,
  onEnter: validateLogin,
  getChildRoutes(partialNextState, callback) {
    require.ensure([], (require) => {
      callback(null, [
        {
          path: 'profile/:userId',
          component: require('./Profile').default
        }
      ]);
    }, 'principal');
  }
};
