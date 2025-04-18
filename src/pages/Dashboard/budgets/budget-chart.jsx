import React from 'react';
import ReactApexChart from 'react-apexcharts';
import getChartColorsArray from '../../../Components/Common/ChartsDynamicColor';

export const BudgetsCharts = ({ dataColors, series }) => {
    var linechartcustomerColors = getChartColorsArray(dataColors);

    var options = {
        chart: {
            height: 470,
            type: 'line',
            toolbar: {
                show: false,
            },
        },
        stroke: {
            curve: 'straight',
            dashArray: [0, 0, 8],
            width: [2, 0, 2.2],
        },
        fill: {
            opacity: [0.1, 0.9, 1],
        },
        markers: {
            size: [0, 0, 0],
            strokeWidth: 2,
            hover: {
                size: 4,
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
        },
        grid: {
            show: true,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: false,
                },
            },
            padding: {
                top: 0,
                right: -2,
                bottom: 15,
                left: 10,
            },
        },
        legend: {
            show: true,
            horizontalAlign: 'center',
            offsetX: 0,
            offsetY: -5,
            markers: {
                width: 9,
                height: 9,
                radius: 6,
            },
            itemMargin: {
                horizontal: 10,
                vertical: 0,
            },
        },
        plotOptions: {
            bar: {
                columnWidth: '30%',
                barHeight: '70%',
            },
        },
        colors: linechartcustomerColors,
        tooltip: {
            shared: true,
            y: [
                {
                    formatter: function (y) {
                        if (typeof y !== 'undefined') {
                            return y.toFixed(0);
                        }
                        return y;
                    },
                },
                {
                    formatter: function (y) {
                        if (typeof y !== 'undefined') {
                            return '$' + y.toFixed(2) + 'k';
                        }
                        return y;
                    },
                },
                {
                    formatter: function (y) {
                        if (typeof y !== 'undefined') {
                            return y.toFixed(0) + ' Sales';
                        }
                        return y;
                    },
                },
            ],
        },
    };
    return (
        <React.Fragment>
            <ReactApexChart dir="ltr" options={options} series={series} type="line" height={470} className="apex-charts" />
        </React.Fragment>
    );
};
