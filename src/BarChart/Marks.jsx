import React from "react"

const Marks = ({ data, xScale, yScale, xValue, yValue, toolTipFormat }) => {
  return data.map((d, i) => (
    <rect
      className="marks"
      key={i}
      x={0}
      y={yScale(yValue(d))}
      width={xScale(xValue(d))}
      height={yScale.bandwidth()}
    >
      <title>{toolTipFormat(xValue(d))}</title>
    </rect>
  ))
}

export default Marks
