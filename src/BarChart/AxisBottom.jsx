export const AxisBottom = ({ xScale, innerHeight, tickFormat }) => {
  return xScale.ticks().map((tickValue, i) => (
    <g
      className="tick"
      transform={`translate(${xScale(tickValue)}, 0)`}
      key={i}
    >
      <line y2={innerHeight} />
      <text y={innerHeight + 3} style={{ textAnchor: "middle" }} dy="0.71em">
        {tickFormat(tickValue)}
      </text>
    </g>
  ))
}
