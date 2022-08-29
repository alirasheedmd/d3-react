import { useEffect, useRef } from "react"
import * as d3 from "d3"

const BarChart = () => {
  const svgRef = useRef(null)
  const rectWidth = 50

  const barData = [45, 67, 96, 84, 41]

  useEffect(() => {
    d3.select(svgRef.current)
      .selectAll("rect")
      .data(barData)
      .enter()
      .append("rect")
      // calculate x-position based on its index
      .attr("x", (d, i) => i * rectWidth)
      .attr("y", (d) => 100 - d)
      // set height based on the bound datum
      .attr("height", (d) => d)
      // rest of attributes are constant values
      .attr("width", rectWidth)
      .attr("stroke-width", 3)
      .attr("stroke-dasharray", "5 5")
      .attr("stroke", "plum")
      .attr("fill", "pink")
  }, [barData])

  return (
    <div>
      <svg
        ref={svgRef}
        width={rectWidth * barData.length}
        height="100"
        style={{ border: "1px dashed" }}
      ></svg>
    </div>
  )
}

export default BarChart
