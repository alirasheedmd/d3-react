export const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset }) => {
  return xScale.ticks().map((tickValue, i) => (
    <g
      className="tick"
      transform={`translate(${xScale(tickValue)}, 0)`}
      key={i}
    >
      <text style={{ textAnchor: "middle" }} dy=".71em" y={innerHeight + 20}>
        {tickFormat(tickValue)}
      </text>
    </g>
  ))
}
