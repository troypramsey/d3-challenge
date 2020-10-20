// Declaring container sizing variables

let width = 1000
let height = 800;

let margin = {
    left: 20,
    top: 20,
    right: 20,
    bottom: 50
}

let chartWidth = width - margin.left - margin.right 
let chartHeight = height - margin.top - margin.bottom

// Initial SVG properties

let svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

let chartGroup = svg.append('g')
    .attr('transform', `translate(${margin.left * 2}, ${margin.top})`)
    

// Import data

d3.csv('assets/data/data.csv', d3.autoType).then(data => {

    // Setting axes scales and values
    let xScale = d3.scaleLinear()
        .domain(d3.extent(data, d=>d.poverty))
        .range([0, chartWidth])
        .nice()

    let yScale = d3.scaleLinear()
        .domain([d3.min(data, d=>d.healthcare), d3.max(data, d=>d.healthcare)])
        .range([chartHeight, 0])
        .nice()

    let xAxis = d3.axisBottom(xScale)
    let yAxis = d3.axisLeft(yScale)

    // Appending axes to chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);

    // Adding plots to chart
    let circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .attr("r", "15")
        .attr("fill", "grey")
        .attr("opacity", 0.5)

    let textGroup = chartGroup.selectAll(null)
        .data(data)
        .join('text')
        .text(d=>d.abbr)
        .attr('x', d=>xScale(d.poverty))
        .attr('y', d=>yScale(d.healthcare))
        .attr('text-anchor', 'middle')
        .attr('font-family', 'sans-serif')
        .attr('fill', 'black')
        .attr('font-size', '10px')

    // Adding axis labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left*2)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .text("% w/o Health Insurance")
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif');

      chartGroup.append("text")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 35})`)
      .text("% Poverty")
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif');
    
    

})