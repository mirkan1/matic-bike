import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  Mainnet,
  DAppProvider,
  useEtherBalance,
  useEthers,
  Config,
  // BNB,
  Polygon,
  //PolygonTestnet,
  BSCTestnet,
  DEFAULT_SUPPORTED_CHAINS,
} from '@usedapp/core';
// import { DEFAULT_SUPPORTED_CHAINS } from '@usedapp/core/constats';
// import { formatEther } from '@ethersproject/units';
import store from './store'
import { Provider } from 'react-redux';
//import './assets/Pixelar Regular W01 Regular/Pixelar Regular W01 Regular.ttf';

const config = {
  //readOnlyChainId: Polygon.chainId,
  readOnlyChainId: 80001,
  readOnlyUrls: {
    //[Polygon.chainId]: 'https://rpc-mainnet.matic.network',
    [80001]: 'https://rpc-endpoints.superfluid.dev/mumbai',
  },
  networks: [
   DEFAULT_SUPPORTED_CHAINS[29],
  ]
}

ReactDOM.render(
  <Provider store={store}>
    <DAppProvider config={config}>
        <App />
    </DAppProvider>
  </Provider>,
  document.getElementById('root')
)
