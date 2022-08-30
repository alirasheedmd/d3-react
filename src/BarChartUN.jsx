import React from "react"
import { scaleBand, scaleLinear, max } from "d3"
import { useData } from "./useData"
import { AxisBottom } from "./AxisBottom"
import { AxisLeft } from "./AsixLeft"
import Marks from "./Marks"

const BarChartUN = () => {
  const width = 960
  const height = 500
  const margin = { top: 20, right: 20, bottom: 20, left: 200 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const xValue = (d) => d.Population
  const yValue = (d) => d.Country

  // const messsage = (data) => {
  //   let message = ""
  //   message = message + Math.round(csvFormat(data).length / 1024) + " KB "
  //   message = message + data.length + " rows "
  //   message = message + data.columns.length + ` columns`
  //   return message
  // }

  const data = useData()

  const yScale =
    data && scaleBand().domain(data.map(yValue)).range([0, innerHeight])

  const xScale =
    data &&
    scaleLinear()
      .domain([0, max(data, xValue)])
      .range([0, innerWidth])

  if (data) {
    return (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom xScale={xScale} innerHeight={innerHeight} />
          <AxisLeft yScale={yScale} />
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
          />
        </g>
      </svg>
    )
  } else {
    return <div>"Loading..."</div>
  }
}

export default BarChartUN
