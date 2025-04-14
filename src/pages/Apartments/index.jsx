import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Nav, NavItem, NavLink, Row, Table } from 'reactstrap';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import FormSelect from '../../Components/Form/FormSelect';

const tabs = [
    {
        hash: '#apartments',
        label: 'Apartments',
    },
    {
        hash: '#parking',
        label: 'Parking',
    },
    {
        hash: '#stores',
        label: 'Stores',
    },
];

const terraceOptions = [
    {
        id: 1,
        name: 'Terrace 1',
    },
    {
        id: 2,
        name: 'Terrace 2',
    },
];
const roomOptions = [
    {
        id: 1,
        name: 'Room 1',
    },
    {
        id: 2,
        name: 'Room 2',
    },
];
const floorOptions = [
    {
        id: 1,
        name: 'Floor 1',
    },
    {
        id: 2,
        name: 'Floor 2',
    },
];
const blockOptions = [
    {
        id: 1,
        name: 'Block 1',
    },
    {
        id: 2,
        name: 'Block 2',
    },
];
const Starter = () => {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState(window.location.hash || '#apartments');

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
            navigate(`${tab}`, { replace: true });
        }
    };
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardHeader>
                                    <h5 className="mb-0">Apartments</h5>
                                </CardHeader>
                                <CardHeader>
                                    <div className="row align-items-center border-0">
                                        <div className="col">
                                            <Nav className="nav-tabs-custom card-header-tabs border-bottom-0" role="tablist">
                                                {tabs.map((tab) => (
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: activeTab === tab.hash }, 'fw-semibold')}
                                                            onClick={() => toggleTab(tab.hash)}
                                                            href="#">
                                                            {tab.label}
                                                        </NavLink>
                                                    </NavItem>
                                                ))}
                                            </Nav>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardHeader className="border-0 bg-light">
                                    <Row>
                                        <Col lg={2} md={4} sm={6}>
                                            <FormSelect options={terraceOptions} label="Terrace" />
                                        </Col>
                                        <Col lg={2} md={4} sm={6}>
                                            <FormSelect options={roomOptions} label="Room" />
                                        </Col>
                                        <Col lg={2} md={4} sm={6}>
                                            <FormSelect options={floorOptions} label="Floor" />
                                        </Col>
                                        <Col lg={2} md={4} sm={6}>
                                            <FormSelect options={blockOptions} label="Block" />
                                        </Col>
                                        <Col lg={2} md={4} sm={6} className="align-self-end d-flex justify-content-end">
                                            <Button type="button" color="dark" outline className="ms-auto">
                                                <i className="bx bx-refresh me-1 align-middle fs-5" />
                                                Clear
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Table className="align-middle" hover>
                                        <thead className="table-light">
                                            <tr>
                                                <th>Rooms</th>
                                                <th>Total area</th>
                                                <th>Floor</th>
                                                <th>Block</th>
                                                <th>
                                                    Total price per m<sup>2</sup>
                                                </th>
                                                <th>Total price</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[1, 2, 3, 4].map((item) => (
                                                <tr key={item}>
                                                    <td>3 rooms</td>
                                                    <td>
                                                        80 m<sup>2</sup>
                                                    </td>
                                                    <td>5th floor</td>
                                                    <td>12</td>
                                                    <td>15 000 000 sum</td>
                                                    <td>1 200 000 000 sum</td>
                                                    <td>
                                                        <span className="text-link">Contract</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Starter;
