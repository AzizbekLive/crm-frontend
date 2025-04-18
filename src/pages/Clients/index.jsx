import React from 'react';
import { Col, Row } from 'reactstrap';
// import Widgets from './widgets';
import AllClients from './all-clients';

const index = () => {
    return (
        <React.Fragment>
            <Row>
                <Col sm={12}>
                    <AllClients />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default index;
