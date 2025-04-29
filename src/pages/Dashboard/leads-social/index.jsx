import React from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import instagram from '../../../assets/images/instagram.png';
import telegram from '../../../assets/images/telegram.png';
const LeadsSocial = () => {
    return (
        <Card>
            <CardHeader>Total Leads</CardHeader>
            <CardBody>
                <Row className="gy-4">
                    <Col md={6}>
                        <div className="px-2">
                            <div className="d-flex align-items-start gap-2 w-100">
                                {/* Instagram */}
                                <img src={instagram} alt="" />
                                <div className="w-100">
                                    <div className="d-flex mb-2">
                                        <div className="flex-grow-1">
                                            <div>Instagram</div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <span className="badge badge-soft-primary text-primary fs-14 rounded-pill badge-pill">
                                                <i className="ri-user-line align-bottom"></i> 50 ta
                                            </span>
                                        </div>
                                    </div>
                                    <div className="progress animated-progess">
                                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: 50 }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="px-2">
                            <div className="d-flex align-items-start gap-2 w-100">
                                {/* Target */}
                                <div>
                                    <i className="ri-global-line fs-2 text-muted"></i>
                                </div>
                                <div className="w-100">
                                    <div className="d-flex mb-2">
                                        <div className="flex-grow-1">
                                            <div>Target</div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <span className="badge badge-soft-primary text-primary fs-14 rounded-pill badge-pill">
                                                <i className="ri-user-line align-bottom"></i> 50 ta
                                            </span>
                                        </div>
                                    </div>
                                    <div className="progress animated-progess">
                                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: 50 }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="px-2">
                            <div className="d-flex align-items-start gap-2 w-100">
                                {/* Telegram */}
                                <img src={telegram} alt="" />
                                <div className="w-100">
                                    <div className="d-flex mb-2">
                                        <div className="flex-grow-1">
                                            <div>Telegram</div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <span className="badge badge-soft-primary text-primary fs-14 rounded-pill badge-pill">
                                                <i className="ri-user-line align-bottom"></i> 50 ta
                                            </span>
                                        </div>
                                    </div>
                                    <div className="progress animated-progess">
                                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: 50 }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="px-2">
                            <div className="d-flex align-items-start gap-2 w-100">
                                {/* Qo'lda kritilgan */}
                                <div>
                                    <i className="ri-user-3-fill fs-2 text-muted"></i>
                                </div>
                                <div className="w-100">
                                    <div className="d-flex mb-2">
                                        <div className="flex-grow-1">
                                            <div>Qo'lda kritilgan</div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <span className="badge badge-soft-primary text-primary fs-14 rounded-pill badge-pill">
                                                <i className="ri-user-line align-bottom"></i> 50 ta
                                            </span>
                                        </div>
                                    </div>
                                    <div className="progress animated-progess">
                                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: 50 }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default LeadsSocial;
