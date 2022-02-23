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

      <Datepicker state={state} />
      <TimeSeriesGraph state={state} />
      <ColumnGraph state={state} />
      <SparklineGraph state={state} />
    </>
  )
}
