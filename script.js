const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);

// Creating margins and groups
const margin = {
  top: 20,
  right: 20,
  bottom: 100,
  left: 100,
};

const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margin.left},${margin.top})`);

const xAxisGroup = graph
  .append("g")
  .attr("transform", `translate(0, ${graphHeight})`);
const yAxisGroup = graph.append("g");

db.collection("dishes")
  .get()
  .then((res) => {
    let data = [];

    res.docs.forEach((doc) => {
      data.push(doc.data());
    });

    console.log(data);

    // Joining data to rects
    const rects = graph.selectAll("rect").data(data);
    // Linear scale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.orders)])
      .range([graphHeight, 0]);

    // Band scale
    const x = d3
      .scaleBand()
      .domain(data.map((item) => item.name))
      .range([0, graphHeight])
      .paddingInner(0.2)
      .paddingOuter(0.2);

    // rects
    //   .attr("width", x.bandwidth)
    //   .attr("height", (d) => y(d.orders))
    //   .attr("fill", "crimsom")
    //   .attr("x", (d) => x(d.name));

    // Append items from enter selection
    rects
      .enter()
      .append("rect")
      .attr("width", x.bandwidth)
      .attr("height", (d) => graphHeight - y(d.orders))
      .attr("fill", "crimson")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.orders));

    // Creating Axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    yAxis.ticks(3).tickFormat((d) => d + " orders");

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    xAxisGroup
      .selectAll("text")
      .attr("transform", "rotate(-40)")
      .attr("text-anchor", "end")
      .attr("fill", "crimson");
  });
