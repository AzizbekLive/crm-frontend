import React from 'react';
import { Col, Row } from 'reactstrap';
import Kanban from './kanban';
// import DraggableTest from './DraggableTest';
const Starter = () => {
    return (
        <Row>
            <Col xs={12}>
                <Kanban />
                {/* <DraggableTest /> */}
            </Col>
        </Row>
    );
};

export default Starter;
