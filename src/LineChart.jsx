import { useEffect, useRef } from "react"
import * as d3 from "d3"
import "./LineChart.css"

var LineChart = () => {
  const svgRef = useRef(null)
  const svg = d3.select(svgRef.current)

  var myData = [
    {
      date: "2011-09-30T19:00:00+05:00",
      "Hyundai Elentra 2007": 12000,
    },
    {
      date: "2011-10-04T19:00:00+05:00",
      "Hyundai Elentra 2007": 13000,
    },
    {
      date: "2011-10-09T19:00:00+05:00",
      "Hyundai Elentra 2007": 12500,
    },
    {
      date: "2011-10-14T19:00:00+05:00",
      "Hyundai Elentra 2007": 12300,
    },
    {
      date: "2011-10-19T19:00:00+05:00",
      "Hyundai Elentra 2007": 12700,
    },
    {
      date: "2011-10-24T19:00:00+05:00",
      "Hyundai Elentra 2007": 12600,
    },
    {
      date: "2011-10-29T19:00:00+05:00",
      "Hyundai Elentra 2007": 12400,
    },
    {
      date: "2011-10-31T19:00:00+05:00",
      "Hyundai Elentra 2007": 12600,
    },
    {
      date: "2011-11-04T19:00:00+05:00",
      "Hyundai Elentra 2007": 12100,
    },
    {
      date: "2011-11-09T19:00:00+05:00",
      "Hyundai Elentra 2007": 12500,
    },
    {
      date: "2011-11-14T19:00:00+05:00",
      "Hyundai Elentra 2007": 12300,
    },
    {
      date: "2011-11-19T19:00:00+05:00",
      "Hyundai Elentra 2007": 12500,
    },
    {
      date: "2011-11-24T19:00:00+05:00",
      "Hyundai Elentra 2007": 12500,
    },
    {
      date: "2011-11-29T19:00:00+05:00",
      "Hyundai Elentra 2007": 12800,
    },
    {
      date: "2011-11-30T19:00:00+05:00",
      "Hyundai Elentra 2007": 12600,
    },
    {
      date: "2011-12-04T19:00:00+05:00",
      "Hyundai Elentra 2007": 12300,
    },
    {
      date: "2011-12-09T19:00:00+05:00",
      "Hyundai Elentra 2007": 12500,
    },
    {
      date: "2011-12-14T19:00:00+05:00",
      "Hyundai Elentra 2007": 12500,
    },
    {
      date: "2011-12-19T19:00:00+05:00",
      "Hyundai Elentra 2007": 12700,
    },
    {
      date: "2011-12-24T19:00:00+05:00",
      "Hyundai Elentra 2007": 12300,
    },
    {
      date: "2011-12-29T19:00:00+05:00",
      "Hyundai Elentra 2007": 12100,
    },
    {
      date: "2011-12-31T19:00:00+05:00",
      "Hyundai Elentra 2007": 11000,
    },
  ]

  var margin = {
      top: 20,
      right: 80,
      bottom: 30,
      left: 50,
    },
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom

  // gridlines in x axis function

  useEffect(() => {
    var x = d3.scaleTime().range([0, width])

    var y = d3.scaleLinear().range([height, 0])

    var color = d3.scaleOrdinal(d3.schemeCategory10)

    var xAxis = d3.axisBottom(x)

    var yAxis = d3.axisLeft(y)

    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    var line = d3
      .line()
      .x(function (d) {
        return x(d.date)
      })
      .y(function (d) {
        return y(d.temperature)
      })

    color.domain(
      Object.keys(myData[0]).filter(function (key) {
        return key !== "date"
      })
    )
    var parseDate = d3.utcParse("%Y-%m-%dT%H:%M:%S%Z")
    myData.forEach(function (d) {
      d.date = parseDate(d.date)
    })
    console.log(myData)
    var cities = color.domain().map(function (name) {
      return {
        name: name,
        values: myData.map(function (d) {
          return {
            date: d.date,
            temperature: +d[name],
          }
        }),
      }
    })

    x.domain(
      d3.extent(myData, function (d) {
        return d.date
      })
    )

    y.domain([
      d3.min(cities, function (c) {
        return d3.min(c.values, function (v) {
          return v.temperature - 2000
        })
      }),
      d3.max(cities, function (c) {
        return d3.max(c.values, function (v) {
          return v.temperature + 2000
        })
      }),
    ])

    var legend = svg
      .selectAll("g")
      .data(cities)
      .enter()
      .append("g")
      .attr("class", "legend")

    legend
      .append("rect")
      .attr("x", width - 20)
      .attr("y", function (d, i) {
        return i * 20
      })
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", function (d) {
        return color(d.name)
      })

    legend
      .append("text")
      .attr("x", width - 8)
      .attr("y", function (d, i) {
        return i * 20 + 9
      })
      .text(function (d) {
        return d.name
      })

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price(USD)")

    var city = svg
      .selectAll(".city")
      .data(cities)
      .enter()
      .append("g")
      .attr("class", "city")

    city
      .append("path")
      .attr("class", "line")
      .attr("d", function (d) {
        return line(d.values)
      })
      .style("stroke", function (d) {
        return color(d.name)
      })

    city
      .append("text")
      .datum(function (d) {
        return {
          name: d.name,
          value: d.values[d.values.length - 1],
        }
      })
      .attr("transform", function (d) {
        return (
          "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"
        )
      })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function (d) {
        return d.name
      })

    var mouseG = svg.append("g").attr("class", "mouse-over-effects")

    mouseG
      .append("path") // this is the black vertical line to follow mouse
      .attr("class", "mouse-line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", "0")

    var lines = document.getElementsByClassName("line")

    var mousePerLine = mouseG
      .selectAll(".mouse-per-line")
      .data(cities)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line")

    mousePerLine
      .append("circle")
      .attr("r", 7)
      .style("stroke", function (d) {
        return color(d.name)
      })
      .style("fill", "none")
      .style("stroke-width", "1px")
      .style("opacity", "0")

    mousePerLine.append("text").attr("transform", "translate(10,3)")

    mouseG
      .append("svg:rect") // append a rect to catch mouse movements on canvas
      .attr("width", width) // can't catch mouse events on a g element
      .attr("height", height)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("mouseout", function () {
        // on mouse out hide line, circles and text
        d3.select(".mouse-line").style("opacity", "0")
        d3.selectAll(".mouse-per-line circle").style("opacity", "0")
        d3.selectAll(".mouse-per-line text").style("opacity", "0")
      })
      .on("mouseover", function () {
        // on mouse in show line, circles and text
        d3.select(".mouse-line").style("opacity", "1")
        d3.selectAll(".mouse-per-line circle").style("opacity", "1")
        d3.selectAll(".mouse-per-line text").style("opacity", "1")
      })
      .on("mousemove", function (e) {
        let mouse = d3.pointer(e)

        d3.select(".mouse-line").attr("d", function () {
          let d = "M" + mouse[0] + "," + height
          d += " " + mouse[0] + "," + 0
          return d
        })

        // d3.selectAll(".mouse-per-line").attr("transform", function (d, i) {
        //   var xDate = x.invert(mouse[0]),
        //     bisect = d3.bisector(function (d) {
        //       return d.date
        //     }).right
        //   bisect(d.values, xDate)

        //   let beginning = 0,
        //     end = lines[i].getTotalLength(),
        //     target = null
        //   console.log(lines[i].getTotalLength())
        //   let pos = lines[i].getPointAtLength(target)
        //   while (true) {
        //     target = Math.floor((beginning + end) / 2)
        //     let pos = lines[i].getPointAtLength(target)
        //     if (
        //       (target === end || target === beginning) &&
        //       pos.x !== mouse[0]
        //     ) {
        //       break
        //     }
        //     if (pos.x > mouse[0]) end = target
        //     else if (pos.x < mouse[0]) beginning = target
        //     else break //position found
        //   }

        //   d3.select(this).select("text").text(y.invert(pos.y))

        //   return "translate(" + mouse[0] + "," + pos.y + ")"
        // })
      })
  }, [svg])

  return (
    <div>
      <svg
        ref={svgRef}
        id="chart"
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
        style={{ border: "1px dashed" }}
      ></svg>
    </div>
  )
}

export default LineChart
