import React, { useEffect, useState } from "react"
import { csv, scaleBand, scaleLinear, max } from "d3"

const csvUrl =
  "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv"

const BarChartUN = () => {
  const [data, setData] = useState(null)
  const width = 960
  const height = 500
  const margin = { top: 20, right: 20, bottom: 20, left: 200 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  // const messsage = (data) => {
  //   let message = ""
  //   message = message + Math.round(csvFormat(data).length / 1024) + " KB "
  //   message = message + data.length + " rows "
  //   message = message + data.columns.length + ` columns`
  //   return message
  // }

  const yScale =
    data &&
    scaleBand()
      .domain(data.map((d) => d.Country))
      .range([0, innerHeight])

  const xScale =
    data &&
    scaleLinear()
      .domain([0, max(data, (d) => d.Population)])
      .range([0, innerWidth])

  useEffect(() => {
    const row = (d) => {
      d.Population = +d["2020"]
      return d
    }
    csv(csvUrl, row).then((data) => setData(data.slice(0, 10)))
  }, [])

  data && console.log(xScale.ticks())

  if (data) {
    return (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {xScale.ticks().map((tickValue) => (
            <g transform={`translate(${xScale(tickValue)}, 0)`}>
              <line y2={innerHeight} stroke="black" />
              <text
                y={innerHeight + 3}
                style={{ textAnchor: "middle" }}
                dy="0.71em"
              >
                {tickValue}
              </text>
            </g>
          ))}
          {yScale.domain().map((tickValue) => (
            <g
              transform={`translate(0, ${
                yScale(tickValue) + yScale.bandwidth() / 2
              })`}
            >
              <text x={-3} style={{ textAnchor: "end" }} dy="0.32em">
                {tickValue}
              </text>
            </g>
          ))}
          {data.map((d, i) => (
            <rect
              key={i}
              x={0}
              y={yScale(d.Country)}
              width={xScale(d.Population)}
              height={yScale.bandwidth()}
            />
          ))}
        </g>
      </svg>
    )
  } else {
    return <div>"Loading..."</div>
  }
}

export default BarChartUN
