import React from "react"
import { line } from "d3"

const Marsks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
  circleRadius,
  mousePosition,
}) => {
  return (
    <>
      <path
        fill="none"
        stroke="#1f77b4"
        id="line"
        d={line()
          .x((d) => xScale(xValue(d)))
          .y((d) => yScale(yValue(d)))(data)}
      ></path>
      {data.map((d, i) => (
        <>
          <circle
            className="mark"
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={circleRadius}
            fill="#1f77b4"
          >
            <title>{tooltipFormat(yValue(d))}</title>
          </circle>
        </>
      ))}
    </>
  )
}

export default Marsks
