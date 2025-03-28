import React from 'react';
import { cryptoSlider } from './data';
import { Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap';
import { WidgetsCharts } from './widgets-chart';
export const Widgets = () => {
    return (
        <React.Fragment>
            <Row>
                {(cryptoSlider || []).map((item, key) => (
                    <Col lg={4}>
                        <Card key={key}>
                            <CardBody>
                                <div className="float-end">
                                    <UncontrolledDropdown direction="start">
                                        <DropdownToggle className="text-reset" tag="a" role="button">
                                            <span className="text-muted fs-18">
                                                <i className="mdi mdi-dots-horizontal"></i>
                                            </span>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu dropdown-menu-end">
                                            <DropdownItem href="#"> Details </DropdownItem>
                                            <DropdownItem href="#"> Cancel </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                                <div className="d-flex align-items-center">
                                    <h4 className="fw-bold mb-0 fs-21">{item.label}</h4>
                                </div>
                                <Row className="align-items-end g-0">
                                    <Col xs={12}>
                                        <div className="mb-1 mt-4 d-flex align-items-start gap-1">
                                            <h5 className="mb-0 fs-2 fw-bold">{item.price}</h5>
                                            <p className={'fw-semibold fs-4 mb-0 text-' + item.changeClass}>{item.change}</p>
                                        </div>
                                    </Col>
                                    <Col xs={12}>
                                        <div className="d-flex justify-content-end">
                                            <div className="apex-charts crypto-widget" dir="ltr">
                                                <WidgetsCharts seriesData={item.series} chartsColor={item.chartsColor} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    );
};
