import {
  bisector,
  extent,
  format,
  pointer,
  scaleLinear,
  scaleTime,
  timeFormat,
} from "d3"
import { AxisBottom } from "./AxisBottom"
import { AxisLeft } from "./AxisLeft"
import { useData } from "./useData"
import "./LineChart.css"
import Marks from "./Marsks"
import { useCallback, useState } from "react"

var LineChart = () => {
  const width = 960
  const height = 500
  const initialMousePosition = {
    x: width / 2,
    y: height / 2,
  }
  const [mousePosition, setMousePosition] = useState(initialMousePosition)
  const [opacity, setOpacity] = useState(0)

  const margin = { top: 40, right: 20, bottom: 50, left: 100 }

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const line = document.getElementById("line")

  const xAxisLabelOffset = 40

  const xAxisTickFormat = timeFormat("%m/%y")
  const siFormater = format(".3s")
  const yAxisTickFormat = (n) => "$" + siFormater(n)

  const yValue = (d) => d.price
  const xValue = (d) => d.date

  const data = useData()

  const yScale =
    data &&
    scaleLinear()
      .domain(extent(data, (d) => d.price))
      .range([innerHeight, 0])

  const xScale =
    data &&
    scaleTime().domain(extent(data, xValue)).range([0, innerWidth]).nice()

  const handleMouseMove = useCallback(
    (event) => {
      const point = pointer(event)
      setMousePosition({ x: point[0], y: point[1] })
    },

    [setMousePosition]
  )

  const traslate = (d) => {
    let xDate = xScale.invert(mousePosition.x),
      bisect = bisector(function (d) {
        return d.date
      }).right
    const i = bisect(d, xDate)

    return { x: xScale(data[i].date) + margin.left, y: yScale(data[i].price) }
  }

  if (data) {
    return (
      <svg
        width={width}
        height={height}
        className="line-chart"
        onMouseLeave={() => setOpacity(0)}
        onMouseEnter={() => setOpacity(1)}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisLeft
            yScale={yScale}
            innerWidth={innerWidth}
            yAxisTickFormat={yAxisTickFormat}
          />
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
            tooltipFormat={yAxisTickFormat}
            circleRadius={3}
            mousePosition={mousePosition}
          />
          <rect
            height={innerHeight}
            width={innerWidth}
            opacity={0}
            onMouseMove={handleMouseMove}
          />
        </g>
        <line
          opacity={opacity}
          x1={traslate(data, 0).x}
          y1={margin.top}
          z1={-1}
          x2={traslate(data, 0).x}
          y2={innerHeight + margin.top}
          className="vertical-line"
        />
        {line && (
          <>
            <circle
              r={5}
              fill="#1f77b4"
              opacity={opacity}
              cy={margin.top}
              transform={`translate(${traslate(data, 0).x}, ${
                traslate(data, 0).y
              })`}
            ></circle>
            <text
              opacity={opacity}
              x={traslate(data, 0).x - 30}
              y={traslate(data, 0).y + 20}
            >
              {yAxisTickFormat(yScale.invert(traslate(data, 0).y))}
            </text>
          </>
        )}
      </svg>
    )
  } else {
    return <div>"Loading..."</div>
  }
}

export default LineChart
