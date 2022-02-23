import React, { useState, useEffect } from 'react'
import ReactApexChart from "react-apexcharts"

function Sum(arr) {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }
    return (sum)
}
export default function SparklineGraph(props) {
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
            const startDate = props.state[0]
            const endDate = props.state[1]
            const output = await fetch("http://localhost:5000/api/sparklineChart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    startDate,
                    endDate
                })
            }
            ).then((res) => res.json())
            setAdultArray(output.status[0])
            setChildrenArray(output.status[1])
        }
        fetchData();
    }, [props.state])

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