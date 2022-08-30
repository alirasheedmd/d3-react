import React from "react"

export const AxisLeft = ({ yScale }) => {
  return yScale.domain().map((tickValue) => (
    <g
      className="tick-left"
      transform={`translate(0, ${yScale(tickValue) + yScale.bandwidth() / 2})`}
      key={tickValue}
    >
      <text x={-3} style={{ textAnchor: "end" }} dy="0.32em">
        {tickValue}
      </text>
    </g>
  ))
}
