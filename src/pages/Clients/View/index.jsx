import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
// import RelativeLayout
import classnames from 'classnames';
import Details from './Details';
import PaymentHistory from './PaymentHistory';
import Chat from './Chat';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CLIENTS_ENDPOINT } from '../../../helpers/url_helper';
import { getService } from '../../../service';
import Loader from '../../../Components/Common/Loader';
import EmptyData from '../../../Components/Common/EmptyData';

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
    // {
    //     value: 'chat',
    //     label: 'Chat',
    //     hash: '#chat',
    // },
];

const index = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState(window.location.hash || '#details');

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
            navigate(`${tab}`, { replace: true });
        }
    };

    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(false);
    async function fetchApartment() {
        setLoading(true);
        try {
            const clientData = await getService(`${CLIENTS_ENDPOINT}/${id}`);
            setClient(clientData);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchApartment();
        return () => setClient(null);
    }, []);

    return (
        <React.Fragment>
            <Row>
                <Col sm={12} className="mb-3">
                    <Button color="dark" outline className="btn btn-ghost-dark" onClick={() => navigate('/clients')}>
                        <i className="ri-arrow-left-line align-middle me-1"></i> {t('Back')}
                    </Button>
                </Col>
                <Col sm={12}>
                    {loading ? (
                        <Loader />
                    ) : !client ? (
                        <EmptyData title={t('No Data')} text=" " />
                    ) : (
                        <Card>
                            <CardHeader className="pb-0 px-0">
                                <h2 className="ps-3">{`${client?.firstName} ${client?.lastName}`}</h2>
                                <Nav className="nav-tabs-custom nav-tabs nav-tabs-custom nav-danger mt-4 border-bottom-0" role="tablist">
                                    {tabs.map((tab) => (
                                        <NavItem key={tab.value}>
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
                                            <Details client={client} />
                                        </TabPane>
                                        <TabPane tabId="#payment-history">
                                            <PaymentHistory client={client} />
                                        </TabPane>
                                        {/* <TabPane tabId="#chat">
                                        <Chat />
                                    </TabPane> */}
                                    </TabContent>
                                </div>
                            </CardBody>
                        </Card>
                    )}
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default index;
