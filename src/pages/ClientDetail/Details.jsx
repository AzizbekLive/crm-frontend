import React from 'react';
import { Col, Row } from 'reactstrap';

const Details = () => {
    return (
        <Row className="gy-4">
            <Col md={2}>
                <p className="text-muted mb-1">Name</p>
                <h5>Abdullayev Habibulla</h5>
            </Col>
            <Col md={2}>
                <p className="text-muted mb-1">Phone number 1</p>
                <h5>+998 90 000-00-03</h5>
            </Col>
            <Col md={2}>
                <p className="text-muted mb-1">Contract</p>
                <h5>N-001.pdf</h5>
            </Col>
            <Col md={6}></Col>
            <Col md={2}>
                <p className="text-muted mb-1">Phone number 2</p>
                <h5>+998 90 000-00-03</h5>
            </Col>
            <Col md={2}>
                <p className="text-muted mb-1">Address</p>
                <h5>Chilonzor t., Muqumiy k.</h5>
            </Col>
        </Row>
    );
};

export default Details;
