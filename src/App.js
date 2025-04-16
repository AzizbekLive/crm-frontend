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
            <Toaster
                theme={'dark'}
                position="top-right"
                toastOptions={{
                    duration: 2000,
                    classNames: {
                        toast: 'border-0 text-white',
                        error: 'bg-danger',
                        success: 'bg-success',
                        warning: 'bg-warning',
                        info: 'bg-info',
                    },
                }}
            />
            <Route />
        </React.Fragment>
    );
}

export default App;
