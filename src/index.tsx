import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import {
  Style as GsStyle
} from 'geostyler-style';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
var browser = require("webextension-polyfill");

browser.storage.local.get('style')
  .then((loadedStyle: any) => {
    if (loadedStyle) {
      const style: GsStyle = JSON.parse(loadedStyle.style);
      ReactDOM.render(
        <App
          style={style}
          browser={browser}
        />,
        document.getElementById('root') as HTMLElement
      );
    }
  });

registerServiceWorker();
