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

  const margin = { top: 20, right: 20, bottom: 50, left: 100 }

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const line = document.getElementById("line")

  const xAxisLabelOffset = 40

  const xAxisTickFormat = timeFormat("%m/%y")
  const siFormater = format("")
  const yAxisTickFormat = (n) => "$" + siFormater(n)

  const yValue = (d) => d.price
  const xValue = (d) => d.date

  let pos

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

  const traslate = (d, i) => {
    let xDate = xScale.invert(mousePosition.x),
      bisect = bisector(function (d) {
        return xScale(xValue(d))
      }).right
    bisect(d, xDate)

    let beginning = 0,
      end = line.getTotalLength(),
      target = null

    while (true) {
      target = Math.floor((beginning + end) / 2)
      pos = line.getPointAtLength(target)
      if (
        (target === end || target === beginning) &&
        pos.x !== mousePosition.x
      ) {
        break
      }
      if (pos.x > mousePosition.x) end = target
      else if (pos.x < mousePosition.x) beginning = target
      else break //position found
    }

    return `translate(${mousePosition.x + margin.left}, ${pos.y})`
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
        {line && (
          <circle
            r={5}
            fill="#1f77b4"
            opacity={opacity}
            cy={margin.top}
            transform={traslate(data, 0)}
          />
        )}
        <line
          stroke="#000000"
          opacity={opacity}
          x1={mousePosition.x + margin.left}
          y1={margin.top}
          x2={mousePosition.x + margin.left}
          y2={innerHeight + margin.top}
        />
      </svg>
    )
  } else {
    return <div>"Loading..."</div>
  }
}

export default LineChart
