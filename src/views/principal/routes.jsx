import { validateLogin } from 'helpers/auth';
import PrincipalApp from './PrincipalApp';

export default {
  path: 'principal',
  component: PrincipalApp,
  onEnter: validateLogin,
  childRoutes: [
    {
      path: 'profile/:userId',
      getComponent(partialNextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('./Profile').default);
        }, 'principal.profile');
      }
    }
  ]
};
