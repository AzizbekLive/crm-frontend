import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Nav, NavItem, NavLink, Row, Table } from 'reactstrap';
import classnames from 'classnames';
import TooltipElement from '../../Components/Common/Tooltip';

const AllClients = () => {
    const [productList, setProductList] = useState([]);
    const [activeTab, setActiveTab] = useState('1');

    const toggleTab = (tab, type) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
            // let filteredProducts = products;
            // if (type !== 'all') {
            //     filteredProducts = products.filter((product) => product.status === type);
            // }
            setProductList([]);
        }
    };

    return (
        <Row>
            <Col sm={12}>
                <Card>
                    <CardHeader className="border-bottom-0">
                        <div className="d-flex justify-content-between">
                            <CardTitle>Clients</CardTitle>
                            <Button type="button" color="success" className="me-2">
                                <i className="ri-add-line me-1 align-bottom" />
                                Create New User
                            </Button>
                        </div>
                    </CardHeader>
                    <CardHeader className="border-top border-top-dashed">
                        <div className="row align-items-center border-0">
                            <div className="col">
                                <Nav className="nav-tabs-custom card-header-tabs border-bottom-0" role="tablist">
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '1' }, 'fw-semibold')}
                                            onClick={() => {
                                                toggleTab('1', 'all');
                                            }}
                                            href="#">
                                            Qarzdorlar <span className="badge badge-soft-danger align-middle rounded-pill ms-1">12</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '2' }, 'fw-semibold')}
                                            onClick={() => {
                                                toggleTab('2', 'published');
                                            }}
                                            href="#">
                                            Muddatli to'lov <span className="badge badge-soft-danger align-middle rounded-pill ms-1">5</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '3' }, 'fw-semibold')}
                                            onClick={() => {
                                                toggleTab('3', 'draft');
                                            }}
                                            href="#">
                                            Ipoteka
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="p-0">
                        <div className="mb-0">
                            <Table className="mb-0 align-middle" hover>
                                <thead className="table-light text-muted">
                                    <tr>
                                        <th className="fw-bold">#</th>
                                        <th className="fw-bold">Full Name</th>
                                        <th className="fw-bold">Attached apartment</th>
                                        <th className="fw-bold">Contract</th>
                                        <th className="fw-bold">Price</th>
                                        <th className="fw-bold">Payment Status</th>
                                        <th className="fw-bold text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Abdullayev Habibulla</td>
                                        <td>
                                            <div>
                                                <span className="d-block">3 rooms, 80 m.kv</span>
                                                <span className="d-block fs-13 text-muted">3/30, 5th floor</span>
                                            </div>
                                        </td>
                                        <td>N-001.pdf</td>
                                        <td>1 000 000 000 sum</td>
                                        <td>To’langan</td>
                                        <td className="text-end">
                                            <div className="d-flex gap-1 justify-content-end">
                                                <TooltipElement tooltipText={'Download contract'}>
                                                    <Button className="btn-soft-primary btn-icon">
                                                        <i className="ri-download-cloud-2-line" style={{ transform: 'scale(1.3)' }}></i>
                                                    </Button>
                                                </TooltipElement>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Abdullayev Habibulla</td>
                                        <td>
                                            <div>
                                                <span className="d-block">3 rooms, 80 m.kv</span>
                                                <span className="d-block fs-13 text-muted">3/30, 5th floor</span>
                                            </div>
                                        </td>
                                        <td>N-001.pdf</td>
                                        <td>1 000 000 000 sum</td>
                                        <td>To’langan</td>
                                        <td className="text-end">
                                            <div className="d-flex gap-1 justify-content-end">
                                                <TooltipElement tooltipText={'Download contract'}>
                                                    <Button className="btn-soft-primary btn-icon">
                                                        <i className="ri-download-cloud-2-line" style={{ transform: 'scale(1.3)' }}></i>
                                                    </Button>
                                                </TooltipElement>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default AllClients;
