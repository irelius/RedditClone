import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ModalProvider } from './context/Modal';
import './index.css';
import App from './App';
import configureStore from './store';
import SubredditProvider from './context/SubredditContext';
import LikesProvider from './context/LikesContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <SubredditProvider>
          <LikesProvider>
            <App />
          </LikesProvider>
        </SubredditProvider>
      </ModalProvider>
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);
