// Declaring container sizing variables

let width = 800
let height = 500;

let margin = {
    left: 20,
    top: 20,
    right: 20,
    bottom: 20
}

let chartWidth = width - margin.left - margin.right 
let chartHeight = height - margin.top - margin.bottom

// Initial SVG properties

let svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

let chartGroup = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    

// Import data

d3.csv('assets/data/data.csv', d3.autoType).then(data => {

    // Setting axes scales and values
    let xScale = d3.scaleLinear()
        .domain(d3.extent(data, d=>d.poverty))
        .range([0, chartWidth])
        .nice()

    let yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d=>d.healthcare)])
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

    let textGroup = svg.selectAll(null)
        .data(data)
        .join('text')
        .text(d=>d.abbr)
        .attr('x', d=>xScale(d.poverty)+20)
        .attr('y', d=>yScale(d.healthcare)+25)
        .attr('text-anchor', 'middle')
        .attr('font-family', 'sans-serif')
        .attr('fill', '#fafafa')
        .attr('font-size', '10px')
    
    

})