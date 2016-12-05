import dva from 'dva';
import createLoading from 'dva-loading';
import { createHistory, useBasename } from 'history';
import routers from './routers';

const app = dva({
  history: useBasename(createHistory)({ basename: '/admin' }),
});

app.use(createLoading());

app.model();

app.router(routers);

app.start('#app-root');
