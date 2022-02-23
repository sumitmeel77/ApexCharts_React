import React from 'react'
import ColumnGraph from './graphs/column-chart'
import SparklineGraph from './graphs/sparkline-chart'
import TimeSeriesGraph from './graphs/time-series'
export default function App() {
  return (
    <>
      <TimeSeriesGraph />
      <ColumnGraph />
      <SparklineGraph />
    </>
  )
}
