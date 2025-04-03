import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Kanban from './kanban';
const Starter = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xs={12}>
                            <Kanban />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Starter;
