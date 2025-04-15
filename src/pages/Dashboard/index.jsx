import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Widgets } from './widgets';
import Budgets from './budgets';
const Starter = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xs={12}>
                            <Widgets />
                        </Col>
                        <Col xs={12}>
                            <Budgets />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Starter;
