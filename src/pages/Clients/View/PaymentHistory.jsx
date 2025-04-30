import React from 'react';
import CountUp from 'react-countup';
import { Card, CardBody, Col, Row, Table } from 'reactstrap';

const projectsWidgets = [
    {
        id: 1,
        label: 'Total amount',
        badgeClass: 'danger',
        icon: 'ri-arrow-down-s-line',
        percentage: '5.02 %',
        caption: 'Projects this month',
        subCounter: [{ id: 1, counter: '1000000000000', suffix: ' sum', separator: ',' }],
    },
    {
        id: 2,
        label: 'Total amount paid',
        badgeClass: 'success',
        icon: 'ri-arrow-up-s-line',
        percentage: '3.58 %',
        caption: 'Leads this month',
        subCounter: [{ id: 1, counter: '825000000000', suffix: ' sum', separator: ',' }],
    },
    {
        id: 3,
        feaconClass: 'primary',
        label: 'Total reamining amount',
        badgeClass: 'danger',
        icon: 'ri-arrow-down-s-line',
        percentage: '10.35 %',
        caption: 'Work this month',
        subCounter: [{ id: 1, counter: '825000000000', suffix: ' sum', separator: ',' }],
    },
    {
        id: 4,
        label: 'Monthly payment arrears',
        badgeClass: 'danger',
        icon: 'ri-arrow-down-s-line',
        percentage: '10.35 %',
        caption: 'Work this month',
        subCounter: [{ id: 1, counter: '825000000000', suffix: ' sum', separator: ',' }],
    },
];

const PaymentHistory = () => {
    return (
        <React.Fragment>
            <Row>
                {(projectsWidgets || []).map((item, key) => (
                    <Col xl={3} key={key}>
                        <Card className="shadow-none border rounded-3">
                            <CardBody>
                                <div className="flex-grow-1 overflow-hidden ms-3">
                                    <p className="text-uppercase fw-medium text-muted text-truncate mb-3">{item.label}</p>
                                    <div className="d-flex align-items-center mb-">
                                        <h4 className="fs-4 flex-grow-1 mb-0">
                                            {item.subCounter.map((item, key) => (
                                                <span className="counter-value me-1" data-target="825" key={key}>
                                                    <CountUp
                                                        start={0}
                                                        suffix={item.suffix}
                                                        separator={item.separator}
                                                        end={item.counter}
                                                        duration={2}
                                                    />
                                                </span>
                                            ))}
                                        </h4>
                                        <span className={'fs-12 badge badge-soft-' + item.badgeClass}>
                                            <i className={'fs-13 align-middle me-1 ' + item.icon}></i>
                                            {item.percentage}
                                        </span>
                                    </div>
                                    {/* <p className="text-muted text-truncate mb-0">{item.caption}</p> */}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row>
                <Col sm={12}>
                    <Table className="align-middle" hover>
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: '42px' }}>№</th>
                                <th>Payment due payment</th>
                                <th>Amount payable</th>
                                <th>Amount paid</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>01.01.2025</td>
                                <td>400 000 000 sum</td>
                                <td>400 000 000 sum</td>
                                <td>Paid</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>01.01.2025</td>
                                <td>400 000 000 sum</td>
                                <td>400 000 000 sum</td>
                                <td>Paid</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>01.01.2025</td>
                                <td>400 000 000 sum</td>
                                <td>400 000 000 sum</td>
                                <td>Paid</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default PaymentHistory;
