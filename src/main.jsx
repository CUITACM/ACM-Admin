import 'babel-polyfill';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createApp from './views';
import configureStore from './store/configureStore';
import './styles/common.less';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  createApp(store, history),
  document.getElementById('app-root')
);
