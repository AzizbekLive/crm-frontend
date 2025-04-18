import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import CountUp from 'react-countup';
import { BudgetsCharts } from './budget-chart';

export const Budgets = () => {
    const [chartData] = useState([
        {
            name: 'Orders',
            type: 'area',
            data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67],
        },
        {
            name: 'Earnings',
            type: 'bar',
            data: [89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36, 88.51, 36.57],
        },
        {
            name: 'Refunds',
            type: 'line',
            data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35],
        },
    ]);

    return (
        <React.Fragment>
            <Card>
                <CardHeader className="border-0 align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">Budgets</h4>
                    <div className="d-flex gap-1">
                        <button type="button" className="btn btn-soft-secondary btn-sm">
                            ALL
                        </button>
                        <button type="button" className="btn btn-soft-secondary btn-sm">
                            1M
                        </button>
                        <button type="button" className="btn btn-soft-secondary btn-sm">
                            6M
                        </button>
                        <button type="button" className="btn btn-soft-primary btn-sm">
                            1Y
                        </button>
                    </div>
                </CardHeader>

                <CardHeader className="p-0 border-0 bg-soft-light">
                    <Row className="g-0 text-center">
                        <Col xs={6} sm={3}>
                            <div className="p-3 border border-dashed border-start-0">
                                <h5 className="mb-1">
                                    <CountUp start={0} end={7585} duration={3} separator="," />
                                </h5>
                                <p className="text-muted mb-0">Orders</p>
                            </div>
                        </Col>
                        <Col xs={6} sm={3}>
                            <div className="p-3 border border-dashed border-start-0">
                                <h5 className="mb-1">
                                    <CountUp suffix="k" prefix="$" start={0} decimals={2} end={22.89} duration={3} />
                                </h5>
                                <p className="text-muted mb-0">Earnings</p>
                            </div>
                        </Col>
                        <Col xs={6} sm={3}>
                            <div className="p-3 border border-dashed border-start-0">
                                <h5 className="mb-1">
                                    <CountUp start={0} end={367} duration={3} />
                                </h5>
                                <p className="text-muted mb-0">Refunds</p>
                            </div>
                        </Col>
                        <Col xs={6} sm={3}>
                            <div className="p-3 border border-dashed border-start-0 border-end-0">
                                <h5 className="mb-1 text-success">
                                    <CountUp start={0} end={18.92} decimals={2} duration={3} suffix="%" />
                                </h5>
                                <p className="text-muted mb-0">Conversation Ratio</p>
                            </div>
                        </Col>
                    </Row>
                </CardHeader>

                <CardBody className="p-0 pb-2">
                    <div className="w-100">
                        <div dir="ltr">
                            <BudgetsCharts series={chartData} dataColors='["--vz-warning", "--vz-primary", "--vz-danger"]' />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default Budgets;
