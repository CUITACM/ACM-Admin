import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import routers from './routers';
import models from './models';
import './styles/common.less';

// init app
const app = dva({
  history: browserHistory,
});

// plugins
app.use(createLoading());
app.use({
  onError: err => console.log('ERROR => ', err)
});


// config models
models.forEach(m =>
  app.model(m)
);

// config routers
app.router(routers);

// start app
app.start('#app-root');
