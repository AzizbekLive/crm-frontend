import React from 'react';
import { cryptoSlider } from './data';
import { Card, CardBody, Col, Row } from 'reactstrap';
export const Widgets = () => {
    return (
        <React.Fragment>
            <Row>
                {(cryptoSlider || []).map((item, key) => (
                    <Col xl={6} key={key}>
                        <Card>
                            <CardBody>
                                <div className="d-flex gap-4">
                                    <div className="flex-shrink-0 avatar-sm bg-light rounded border d-flex align-items-center justify-content-center">
                                        <i className={`${item.icon} fs-2`} />
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                        <div className="d-flex align-items-center">
                                            <p className="mb-0 fs-5">{item.label}</p>
                                        </div>
                                        <div className="d-flex align-items-start gap-1 mt-1">
                                            <h5 className="mb-0 fs-3 fw-bold">{item.price}</h5>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    );
};
