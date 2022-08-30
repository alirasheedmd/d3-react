export const AxisBottom = ({ xScale, innerHeight }) => {
  return xScale.ticks().map((tickValue, i) => (
    <g transform={`translate(${xScale(tickValue)}, 0)`} key={i}>
      <line y2={innerHeight} stroke="black" />
      <text y={innerHeight + 3} style={{ textAnchor: "middle" }} dy="0.71em">
        {tickValue}
      </text>
    </g>
  ))
}
