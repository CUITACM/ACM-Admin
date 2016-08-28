import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from './routes';
import DevTools from 'src/helpers/devTools';

export default class Root extends React.Component {
  renderDev() {
    const { history } = this.props;
    return (
      <div>
        <Router history={history} routes={routes} />
        <DevTools />
      </div>
    );
  }
  render() {
    const { store, history } = this.props;
    const isProduction = process.env.NODE_ENV === 'production';
    return (
      <Provider store={store}>
        {
          isProduction
          ? <Router history={history} routes={routes} />
          : this.renderDev()
        }
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
