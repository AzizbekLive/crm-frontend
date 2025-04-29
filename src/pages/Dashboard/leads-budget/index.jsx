import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';

const StackedColumn = () => {
    const series = [
        {
            name: 'PRODUCT A',
            data: [44, 55, 41, 67, 22, 43, 41, 6, 7, 8, 9, 10, 11, 12],
        },
        {
            name: 'PRODUCT B',
            data: [13, 23, 20, 8, 13, 27, 20, 8, 22, 43, 41, 6, 7],
        },
    ];

    const options = {
        chart: {
            stacked: !0,
            toolbar: {
                show: !1,
            },
            zoom: {
                enabled: false,
            },
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0,
                    },
                },
            },
        ],
        plotOptions: {
            bar: {
                horizontal: !1,
                borderRadius: 10,
            },
        },
        xaxis: {
            type: 'datetime',
            categories: ['1 Jul', '3 Jul', '5 Jul', '7 Jul', '9 Jul', '11 Jul', '13 Jul', '15 Jul', '17 Jul', '19 Jul', '21 Jul', '23 Jul', '25 Jul'],
        },
        legend: {
            show: false,
            position: 'top',
            offsetY: 0,
        },
        fill: {
            opacity: 1,
        },
        colors: ['#9E77ED', '#D6BBFB'],
    };
    return <ReactApexChart dir="ltr" className="apex-charts" series={series} options={options} type="bar" height={350} />;
};

const LeadsBudget = () => {
    return (
        <Card>
            <CardHeader>
                <h4 className="card-title mb-0">Leads</h4>
            </CardHeader>
            <CardBody>
                <StackedColumn />
            </CardBody>
        </Card>
    );
};

export default LeadsBudget;
