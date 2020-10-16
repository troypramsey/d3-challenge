// Declaring container sizing variables

const width = 800, height = 500;

const chartWidth = width - (width*.2), chartHeight = height - (height*.2)

// Initial SVG properties

let svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('heigh', height)

let chartGroup = svg.append('g')
    

// Import data

d3.csv('assets/data/data.csv').then(data => {

    // Setting axes scales and values
    let xScale = d3.scaleLinear()
        .domain([d3.min(data, d=> d.poverty), d3.max(data, d=> d.poverty)])
        .range([0, chartWidth])

    let yScale = d3.scaleLinear()
        .domain([d3.min(data, d=>d.healthcare), d3.max(data, d=>d.healthcare)])
        .range([chartHeight, 0])

    let xAxis = d3.axisBottom(xScale)
    let yAxis = d3.axisLeft(yScale)

    // Appending axes to chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);

    // Adding plots to chart
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => xScale(d.poverty))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", 0.5)
    .attr("stroke", "black")
    .attr("stroke-width", 1);
})