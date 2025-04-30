import React, { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';
import { useLayoutStore } from '../../../stores/layouts';
import { useTranslation } from 'react-i18next';

const Chart = () => {
    const layoutModeType = useLayoutStore((s) => s.layoutModeType);
    const { i18n } = useTranslation();

    const series = [24];
    const options = useMemo(
        () => ({
            chart: {
                height: 350,
                type: 'radialBar',
                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                radialBar: {
                    startAngle: 0,
                    endAngle: 360,
                    hollow: {
                        margin: 0,
                        size: '78%',
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: 'front',
                    },
                    track: {
                        show: true,
                        strokeWidth: '100%',
                        margin: 0,
                        opacity: 1,
                        background: 'red',
                    },

                    dataLabels: {
                        show: true,
                        name: {
                            offsetY: -10,
                            show: true,
                            color: layoutModeType === 'dark' ? '#89929b' : '#888',
                            fontSize: '17px',
                        },
                        value: {
                            formatter: function (val) {
                                return parseInt(val);
                            },
                            color: layoutModeType === 'dark' ? '#fff' : '#111',
                            fontSize: '36px',
                            show: true,
                        },
                    },
                },
            },
            stroke: {
                lineCap: 'round',
            },
            labels: [''],
            colors: ['#FF4405'],
        }),
        [layoutModeType, i18n.language]
    );
    return (
        <ReactApexChart
            dir="ltr"
            className="apex-charts radialbar-apartments radialbar-apartments-dark"
            series={series}
            options={options}
            type="radialBar"
            height={250}
        />
    );
};

const AprtmentSale = () => {
    const layoutModeType = useLayoutStore((s) => s.layoutModeType);
    return (
        <Card>
            <CardBody>
                <div className="d-flex flex-md-row flex-column align-items-center justify-content-center">
                    <Chart />
                    <div className="d-flex flex-column gap-3">
                        <div className="position-relative">
                            <span
                                className="position-absolute"
                                style={{ left: -20, top: 9, width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FF4405' }}></span>
                            <p className="mb-0 fs-16">Sold</p>
                            <h5 className="fs-4">100</h5>
                        </div>
                        <div className="position-relative">
                            <span
                                className="position-absolute"
                                style={{
                                    left: -20,
                                    top: 9,
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: layoutModeType === 'dark' ? '#f195582c' : '#FFE6D5',
                                }}></span>
                            <p className="mb-0 fs-16">Apartments for sale</p>
                            <h5 className="fs-4">100</h5>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default AprtmentSale;
