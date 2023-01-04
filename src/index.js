import { render } from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom';
import { registerMicroApps, start, initGlobalState } from 'qiankun';
import { ConfigProvider } from 'antd';
import { Provider } from "react-redux";
import Root from './routers/router';
import BaseLayout from './layout';
import { store, persistor } from './store'
import 'whatwg-fetch';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
const Promise = require('promise-polyfill');
const setAsap = require('setasap');
Promise._immediateFn = setAsap;
if (!window.Promise) {
    window.Promise = Promise;
}
render(
    <Provider store={store} id="cesiumContainer">
        <PersistGate loading={null} persistor={persistor}>
            <ConfigProvider locale={zh_CN}>
                <BrowserRouter>
                    <BaseLayout>
                        <Root />
                    </BaseLayout>
                </BrowserRouter>
            </ConfigProvider>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);
// 初始化 state
const initialState = {
    user: {} // 用户信息
  };
  const actions = initGlobalState(initialState);
  actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    // console.log(state, prev);
  });
  actions.setGlobalState(initialState);
  actions.offGlobalStateChange();
  
  registerMicroApps([
    {
      name: 'nelda-web-controlCenter-xian',
      entry: window.MICRO_PATH,
      container: '#app',
      // activeRule: '/xian',
      activeRule: (location) => location.pathname.indexOf('$') > -1,
    },
  ], {
    beforeLoad: app => {
      console.log('before load app.name====>>>>>', app.name)
    },
    beforeMount: [
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      },
    ],
    afterMount: [
      app => {
        console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name);
      }
    ],
    afterUnmount: [
      app => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
      },
    ],
  })
  // 启动 qiankun
  start({
    excludeAssetFilter: (assetUrl) => {
      const whiteWords = ['baidu', 'map'];
      return whiteWords.some(v => assetUrl.includes(v))
    },
    sandbox: false
  });