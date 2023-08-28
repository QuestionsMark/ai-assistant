import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { PromisesProvider } from './contexts/promises.context';
import { UserProvider } from './contexts/user.context';

import { App } from './components/layout/App';

import 'react-toastify/dist/ReactToastify.css';
import './styles/index.scss';
import 'react-chat-widget/lib/styles.css';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <PromisesProvider>
                <UserProvider>
                    <App />
                </UserProvider>
            </PromisesProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
