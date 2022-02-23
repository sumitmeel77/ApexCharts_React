import React, { useState, useEffect } from 'react'
import ReactApexChart from "react-apexcharts"

export default function TimeSeriesGraph(props) {
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
            align: 'center',
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#ffffff'
            }
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
                style: {
                    fontSize: '10px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    cssClass: 'apexcharts-xaxis-label',
                }
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

            const startDate = props.state[0]
            const endDate = props.state[1]
            const output = await fetch("http://localhost:5000/api/timeseries", {
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
            setTotalNumber(output.status[0])
            setDateArray(output.status[1])
        }
        fetchData();
    }, [props.state])

    return (
        <>
            <div className='container'>
                <ReactApexChart
                    options={options}
                    series={series}
                    type="area"
                    height={350}
                />
            </div>
            <style jsx>{`
        .container{
            width: "60%";
            background: "black";
        }
      `}</style>
        </>

    );
}