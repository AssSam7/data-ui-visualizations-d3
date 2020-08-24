const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);

// Creating margins and dimensions
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

// Creating axes group
const xAxisGroup = graph
  .append("g")
  .attr("transform", `translate(0, ${graphHeight})`);

const yAxisGroup = graph.append("g");

// Linear scale
const y = d3.scaleLinear().range([graphHeight, 0]);

// Band scale
const x = d3
  .scaleBand()
  .range([0, graphWidth])
  .paddingInner(0.2)
  .paddingOuter(0.2);

// Creating the Axes
const xAxis = d3.axisBottom(x);
const yAxis = d3
  .axisLeft(y)
  .ticks(3)
  .tickFormat((d) => d + " orders");

// Update function
const update = (data) => {
  // 1. Updating linear and band scale domains on data update
  y.domain([0, d3.max(data, (d) => d.orders)]);
  x.domain(data.map((item) => item.name));

  // 2. Joining data to rects
  const rects = graph.selectAll("rect").data(data);

  // 3. Remove elements from the Exit selection
  rects.exit().remove();

  // 4. Update current shapes in DOM
  rects
    .attr("width", x.bandwidth)
    .attr("height", (d) => graphHeight - y(d.orders))
    .attr("fill", "crimson")
    .attr("x", (d) => x(d.name))
    .attr("y", (d) => y(d.orders));

  // 5. Append items from enter selection
  rects
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    .attr("height", (d) => graphHeight - y(d.orders))
    .attr("fill", "crimson")
    .attr("x", (d) => x(d.name))
    .attr("y", (d) => y(d.orders));

  // Call the axes
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  xAxisGroup
    .selectAll("text")
    .attr("fill", "crimson")
    .attr("transform", "rotate(-40)")
    .attr("text-anchor", "end");
};

// Global data array
let data = [];

db.collection("dishes").onSnapshot((res) => {
  res.docChanges().forEach((change) => {
    const doc = { ...change.doc.data(), id: change.doc.id };

    switch (change.type) {
      case "added":
        data.push(doc);
        break;
      case "modified":
        const index = data.findIndex((item) => item.id == doc.id);
        data[index] = doc;
        break;
      case "removed":
        data = data.filter((item) => item.id !== doc.id);
        break;
      default:
        break;
    }
  });

  update(data);
});
