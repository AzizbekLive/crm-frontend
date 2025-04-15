import React from 'react';
import { Card, CardHeader, Col, Container, Row } from 'reactstrap';
import Widgets from './widgets';
import AllClients from './all-clients';

const index = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* <Row>
                        <Widgets />
                    </Row> */}
                    <AllClients />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default index;
