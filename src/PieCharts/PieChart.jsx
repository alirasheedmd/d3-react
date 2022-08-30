import React, { useEffect, useState } from "react"
import * as d3 from "d3"

const csvUrl =
  "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv"

const PieChart = () => {
  const [data, setData] = useState(null)
  const width = 960
  const height = 500
  const centerX = width / 2
  const centerY = height / 2

  // const messsage = (data) => {
  //   let message = ""
  //   message = message + Math.round(d3.csvFormat(data).length / 1024) + " KB "
  //   message = message + data.length + " rows "
  //   message = message + data.columns.length + ` columns`
  //   return message
  // }

  const pieArc = d3.arc().innerRadius(0).outerRadius(width)

  useEffect(() => {
    d3.csv(csvUrl).then(setData)
  }, [])

  if (!data) {
    return <div>"Loading..."</div>
  }

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {/* {data.map((d, i) => (
          <path
            fill={d["RGB hex value"]}
            d={pieArc({
              startAngle: (i / data.length) * 2 * Math.PI,
              endAngle: ((i + 1) / data.length) * 2 * Math.PI,
            })}
          />
        ))} */}
        {d3
          .pie()
          .value(1)(data)
          .map((d) => (
            <path fill={d.data["RGB hex value"]} d={pieArc(d)} />
          ))}
      </g>
    </svg>
  )
}

export default PieChart
