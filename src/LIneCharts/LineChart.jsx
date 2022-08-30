import { extent, scaleLinear, scaleTime, timeFormat } from "d3"
import { AxisBottom } from "./AxisBottom"
import { AxisLeft } from "./AxisLeft"
import { useData } from "./userData"
import "./LineChart.css"
import { Marks } from "./Marsks"

var LineChart = () => {
  const width = 960
  const height = 500

  const margin = { top: 20, right: 20, bottom: 50, left: 240 }

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const xAxisLabelOffset = 40

  const xAxisTickFormat = timeFormat("%m/%y")

  const yValue = (d) => d.price
  const xValue = (d) => d.date

  const data = useData()

  const yScale =
    data && scaleLinear().domain(data.map(yValue)).range([innerHeight, 0])

  const xScale =
    data &&
    scaleTime().domain(extent(data, xValue)).range([0, innerWidth]).nice()

  if (data) {
    return (
      <svg width={width} height={height} className="line-chart">
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisLeft yScale={yScale} innerWidth={innerWidth} />
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
            xAxisLabelOffset={xAxisLabelOffset}
          />
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={7}
          />
        </g>
      </svg>
    )
  } else {
    return <div>"Loading..."</div>
  }
}

export default LineChart
