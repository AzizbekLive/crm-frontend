import React from 'react';
import { Col, Row } from 'reactstrap';
import { Widgets } from './widgets';
import Budgets from './budgets';
const Starter = () => {
    return (
        <React.Fragment>
            <Row>
                <Col xs={12}>
                    <Widgets />
                </Col>
                <Col xs={12}>
                    <Budgets />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Starter;
