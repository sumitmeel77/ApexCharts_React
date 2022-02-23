import React, { useState, useEffect } from 'react'
import ReactApexChart from "react-apexcharts"


function Sum(arr) {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }
    return (sum)
}
export default function SparklineGraph() {
    const [AdultArray, setAdultArray] = useState([])
    const [childrenArray, setChildrenArray] = useState([])

    const series1 = [{
        data: AdultArray
    }]
    const series2 = [{
        data: childrenArray
    }]
    var options1 = {
        chart: {
            type: 'line',
            height: 160,
            sparkline: {
                enabled: true
            },
        },
        stroke: {
            curve: 'straight'
        },
        fill: {
            opacity: 0.3
        },
        xaxis: {
            crosshairs: {
                width: 1
            },
        },
        yaxis: {
            min: 0
        },
        title: {
            text: Sum(AdultArray),
            offsetX: 0,
            style: {
                fontSize: '24px',
            }
        },
        subtitle: {
            text: 'NO. of Adult',
            offsetX: 0,
            style: {
                fontSize: '14px',
            }
        }
    };

    var options2 = {
        chart: {
            type: 'line',
            height: 160,
            sparkline: {
                enabled: true
            },
        },
        stroke: {
            curve: 'straight'
        },
        fill: {
            opacity: 0.3
        },
        xaxis: {
            crosshairs: {
                width: 1
            },
        },
        yaxis: {
            min: 0
        },
        title: {
            text: Sum(childrenArray),
            offsetX: 0,
            style: {
                fontSize: '24px',
            }
        },
        subtitle: {
            text: 'No of Children',
            offsetX: 0,
            style: {
                fontSize: '14px',
            }
        }
    };

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:5000/api/sparklineChart');
            const output = await response.json(response);
            setAdultArray(output.status[0])
            setChildrenArray(output.status[1])
        }
        fetchData();
    }, [])

    return (
        <>
            <div
                style={{
                    backgroundColor: "white",
                    textAlign: "center",
                }}
            >
                <ReactApexChart
                    series={series1}
                    options={options1}
                    type="line"
                    height={350}
                    text="Adult"
                />
            </div>
            <div
                style={{
                    backgroundColor: "white",
                    textAlign: "center",
                }}
            >
                {console.log(childrenArray)}
                <ReactApexChart
                    series={series2}
                    options={options2}
                    type="line"
                    height={350}
                    text='Children'
                />
            </div>
        </>
    );
}