import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Nav, NavItem, NavLink, Row, Table } from 'reactstrap';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import FormSelect from '../../Components/Form/FormSelect';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();

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
                                    <h5 className="mb-0">{t('Apartments')}</h5>
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
                                                            {t(tab.label)}
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
                                            <FormSelect options={terraceOptions} label={t('Terrace')} />
                                        </Col>
                                        <Col lg={2} md={4} sm={6}>
                                            <FormSelect options={roomOptions} label={t('Room')} />
                                        </Col>
                                        <Col lg={2} md={4} sm={6}>
                                            <FormSelect options={floorOptions} label={t('Floor')} />
                                        </Col>
                                        <Col lg={2} md={4} sm={6}>
                                            <FormSelect options={blockOptions} label={t('Block')} />
                                        </Col>
                                        <Col lg={2} md={4} sm={6} className="ms-auto align-self-end d-flex justify-content-end">
                                            <Button type="button" color="info" outline className="ms-auto">
                                                <i className="bx bx-refresh me-1 align-middle fs-5" />
                                                {t('Clear')}
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Table className="align-middle" hover>
                                        <thead className="table-light">
                                            <tr>
                                                <th>{t('Rooms')}</th>
                                                <th>{t('Total Area')}</th>
                                                <th>{t('Floor')}</th>
                                                <th>{t('Block')}</th>
                                                <th>
                                                    {t('Price For Per')} m<sup>2</sup>
                                                </th>
                                                <th>{t('Total Price')}</th>
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
