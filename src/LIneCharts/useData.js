import { json, timeParse } from "d3"
import { useEffect, useState } from "react"

export const useData = () => {
  const [data, setData] = useState(null)
  var parseTime = timeParse("%Y%m%d")
  useEffect(() => {
    json(
      "https://gist.githubusercontent.com/alirasheedmd/be0841895f5990be6e18b7f1bb4fab1b/raw/15bcdec14b8efb56b01e576583cb24633a95a3ed/data.json"
    ).then((data) => {
      data.forEach(function (d) {
        d.date = parseTime(d.date)
        d.price = +d["Hyundai Elentra 2007"]
      })
      setData(data)
    })
    // eslint-disable-next-line
  }, [])
  return data
}
