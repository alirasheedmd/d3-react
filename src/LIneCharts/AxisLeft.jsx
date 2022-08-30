import React from "react"

export const AxisLeft = ({ yScale, innerWidth }) => {
  return yScale.domain().map((tickValue, i) => (
    <g
      className="tick-left"
      key={i}
      transform={`translate(0, ${yScale(tickValue)})`}
    >
      <text x={-3} style={{ textAnchor: "end" }} dy="0.32em" className="text">
        {tickValue}
      </text>
      <line x1={0} x2={innerWidth} className="line" />
    </g>
  ))
}
