import React from 'react'
import Datepicker from './components/datepicker'
import ColumnGraph from './graphs/column-chart'
import SparklineGraph from './graphs/sparkline-chart'
import TimeSeriesGraph from './graphs/time-series'
import { useSelector } from "react-redux"
export default function App() {
  const state = useSelector(state => state.loginData)
  return (
    <>
      <div className="container">
        <Datepicker state={state} />
        <div className="headGra">GRAPHS</div>
        <TimeSeriesGraph state={state} />
        <ColumnGraph state={state} />
        <div className='subGra'> Sparkline Graph</div>
        <SparklineGraph state={state} />
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          background:#000000
        }
        .headGra{
            color:#ffffff;
            font-size: 40px;
            margin-bottom:20px;
            text-align:center;
        }
        .subGra{
            color:#ffffff;
            font-size: 14px;
            font-weight:bold;
            text-align:center;
        }
        
      `}</style>
    </>
  )
}
