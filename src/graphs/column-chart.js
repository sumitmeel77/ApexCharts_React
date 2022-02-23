import React, { useState, useEffect } from 'react'
import ReactApexChart from "react-apexcharts"

export default function ColumnGraph() {
    const [CountryArray, setCountryArray] = useState([])
    const [totalNumber, setTotalNumber] = useState([])

    const series = [{
        name: "Number fo visitors per day",
        data: totalNumber,
    }]

    var options = {
        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val;
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },

        xaxis: {
            categories: CountryArray,
            position: 'top',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
            }
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val;
                }
            }

        },
        title: {
            text: 'Number of visitors per country',
            floating: true,
            offsetY: 330,
            align: 'center',
            style: {
                color: '#444'
            }
        }
    };
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:5000/api/columnChart');
            const output = await response.json(response);
            setTotalNumber(output.status[0])
            setCountryArray(output.status[1])
        }
        fetchData();
    }, [])

    return (
        <div
            style={{
                backgroundColor: "white",
                textAlign: "center",
            }}
        >
            <ReactApexChart
                series={series}
                options={options}
                type="bar"
                height={350}
            />
        </div>
    );
}