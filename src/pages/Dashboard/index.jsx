import React from 'react';
import { Col, Row } from 'reactstrap';
import { Widgets } from './widgets';
// import Budgets from './budgets';
import AprtmentSale from './apartment-sale';
import Leads from './leads';
const Starter = () => {
    return (
        <React.Fragment>
            <Row>
                <Col xl={4}>
                    <AprtmentSale />
                </Col>
                <Col xl={8}>
                    <Widgets />
                </Col>
                <Col xl={12}>
                    <Leads />
                </Col>
            </Row>
            <Row></Row>
        </React.Fragment>
    );
};

export default Starter;
