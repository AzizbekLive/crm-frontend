import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
// import RelativeLayout
import classnames from 'classnames';
import Details from './Details';
import PaymentHistory from './PaymentHistory';
import Chat from './Chat';
import { useNavigate } from 'react-router-dom';

const tabs = [
    {
        value: 'details',
        label: 'Details',
        hash: '#details',
    },
    {
        value: 'payment_history',
        label: 'Payment history',
        hash: '#payment-history',
    },
    {
        value: 'chat',
        label: 'Chat',
        hash: '#chat',
    },
];

const index = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState(window.location.hash || '#details');

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
            navigate(`${tab}`, { replace: true });
        }
    };

    const back = () => navigate('/clients');

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Card>
                        <CardHeader className="pb-0 px-0">
                            <div>
                                <Button color="danger" outline className="btn btn-ghost-danger ms-2" onClick={back}>
                                    <i className="ri-arrow-left-line align-middle me-1"></i> Back
                                </Button>
                                <h2 className="mt-4 ps-3">Abdullayev Habibulla</h2>
                            </div>
                            <Nav className="nav-tabs-custom nav-tabs nav-tabs-custom nav-danger mt-4 border-bottom-0" role="tablist">
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
                        </CardHeader>
                        <CardBody>
                            <div>
                                <TabContent activeTab={activeTab} className="text-muted">
                                    <TabPane tabId="#details" id="home1">
                                        <Details />
                                    </TabPane>
                                    <TabPane tabId="#payment-history">
                                        <PaymentHistory />
                                    </TabPane>
                                    <TabPane tabId="#chat">
                                        <Chat />
                                    </TabPane>
                                </TabContent>
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default index;
