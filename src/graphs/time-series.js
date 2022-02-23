import React, { useState, useEffect } from 'react'
import ReactApexChart from "react-apexcharts"

export default function TimeSeriesGraph() {
    const [DateArray, setDateArray] = useState([])
    const [totalNumber, setTotalNumber] = useState([])

    const series = [
        {
            name: "Number fo visitors per day",
            data: totalNumber,
        }
    ];
    const options = {
        chart: {
            type: 'area',
            stacked: false,
            height: 350,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 0,
        },
        title: {
            text: 'Time Series graph',
            align: 'left'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
            },
        },
        xaxis: {
            categories: DateArray,
            labels: {
                datetimeFormatter: {
                    year: 'yyyy',
                    month: "MMM 'yy",
                    day: 'dd MMM',
                },
            },
        },
        tooltip: {
            x: {
                format: "dd/MM/yy",
            },
        },
    };
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:5000/api/timeseries');
            const output = await response.json(response);
            setTotalNumber(output.status[0])
            setDateArray(output.status[1])
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
            <br />
            <h2>Graphs</h2>
            <br />
            <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={350}
            />
        </div>
    );
}