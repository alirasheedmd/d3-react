import React from "react"
import { scaleBand, scaleLinear, max, format } from "d3"
import { useData } from "./useData"
import { AxisBottom } from "../Common/AxisBottom"
import { AxisLeft } from "../Common/AsixLeft"
import Marks from "./Marks"

const BarChart = () => {
  const width = 960
  const height = 500

  const margin = { top: 20, right: 20, bottom: 50, left: 240 }

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const xAxisLabelOffset = 40

  const siFormater = format(".2s")
  const xAsisTickFormat = (n) => siFormater(n).replace(/G/, "B")

  const xValue = (d) => d.Population * 1000
  const yValue = (d) => d.Country

  const data = useData()

  const yScale =
    data &&
    scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .paddingInner(0.15)

  const xScale =
    data &&
    scaleLinear()
      .domain([0, max(data, xValue)])
      .range([0, innerWidth])

  if (data) {
    return (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAsisTickFormat}
          />
          <AxisLeft yScale={yScale} />
          <text
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
            className="axis-label"
          >
            Population
          </text>
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            toolTipFormat={xAsisTickFormat}
          />
        </g>
      </svg>
    )
  } else {
    return <div>"Loading..."</div>
  }
}

export default BarChart
