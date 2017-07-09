import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'

class BarChart extends Component {

  constructor(props) {
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
  }

  componentDidMount() {
    this.createBarChart()
  }

  componentDidUpdate() {
    this.createBarChart()
  }

  createBarChart() {
    const node = this.node
    const dataMax = max(this.props.data)
    const yScale = scaleLinear()
      .domain([0,dataMax])
      .range([0,this.props.size[1]])
    const barWidth = this.props.size[0]/this.props.data.length

    select(node)
      .selectAll("rect")
      .data(this.props.data)
      .enter()
      .append("rect")

    select(node)
      .selectAll("rect")
      .data(this.props.data)
      .exit()
      .remove()

    select(node)
      .selectAll("rect")
      .data(this.props.data)
      .attr("x", (d,i) => i*barWidth)
      .attr("y", d => this.props.size[1] - yScale(d))
      .attr("height", d => yScale(d))
      .attr("width", barWidth)
      .attr("stroke", "blue")
      .attr("fill", "purple")
      .attr("fill-opacity", 0.5)
      .attr("stroke-opacity", 0.8)
  }

  render() {
    return <svg ref={node => this.node = node}
      width={500}
      height={500}
      />
  }
}

export default BarChart
