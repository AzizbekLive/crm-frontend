import React from 'react';
import { Spinner } from 'reactstrap';

const Loader = () => {
    return (
        <React.Fragment>
            <div className="d-flex justify-content-center mx-2 mt-2 py-5">
                <Spinner color="primary"> </Spinner>
            </div>
        </React.Fragment>
    );
};

export default Loader;
