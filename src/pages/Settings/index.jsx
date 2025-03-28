import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const Starter = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xs={12}>Settings</Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Starter;
