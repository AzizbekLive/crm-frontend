import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Kanban from './kanban';
import DraggableTest from './DraggableTest';
const Starter = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xs={12}>
                            <Kanban />
                            {/* <DraggableTest /> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Starter;
