import React from "react"

const Marks = ({ data, xScale, yScale, xValue, yValue }) => {
  return data.map((d, i) => (
    <rect
      key={i}
      x={0}
      y={yScale(yValue(d))}
      width={xScale(xValue(d))}
      height={yScale.bandwidth()}
    />
  ))
}

export default Marks
