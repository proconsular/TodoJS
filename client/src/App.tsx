import React from 'react';
import './App.css';
import ProviderWrapper from './components/ProviderWrapper';
import { getStore } from './redux/store';
import Main from './pages/main.page';

const App = () => {
    return (
        <ProviderWrapper store={getStore()}>
            <Main />
        </ProviderWrapper>
    )
}

export default App;
