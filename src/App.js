import React from 'react';
import { Toaster } from 'sonner';

//import Scss
import './assets/scss/themes.scss';
import './App.css';

//imoprt Route
import Route from './Routes';

function App() {
    return (
        <React.Fragment>
            <Toaster richColors position="top-right" />
            <Route />
        </React.Fragment>
    );
}

export default App;
