import React from 'react';
import { Col, Row } from 'reactstrap';
import { Widgets } from './widgets';
// import Budgets from './budgets';
import AprtmentSale from './apartment-sale';
import LeadsSocial from './leads-social';
import LeadsBudget from './leads-budget';
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
                    <LeadsSocial />
                </Col>
                <Col xl={12}>
                    <LeadsBudget />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Starter;
