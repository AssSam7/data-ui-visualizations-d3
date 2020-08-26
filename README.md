<h1 align="center">Data Visualizations with D3.js & Firebase 🔥</h1>
<p align="center">
  <img src="https://img.shields.io/badge/D3.js-v5-orange">
  <img src="https://img.shields.io/badge/firebase-v7.19.0-green">
</p>

> This repository constitutes to visualizing and rendering using D3.js and Firebase for storing and retrieving the data in real-time.

## Demo 🪁

https://keen-minsky-e0571f.netlify.app/

## Getting Started 🚀

### 1. D3.js CDN

Add the following **CDN** at the end of the <body> in **index.html**

```html
<script src="https://d3js.org/d3.v5.js"></script>
```

### 2. Firebase CDN

Get the below code from console.firebase.google.com and check out, Adding this project to the web app

```html
<script src="https://www.gstatic.com/firebasejs/7.19.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.19.0/firebase-firestore.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDQQN1E2V8K8wFqjHKiSjimAHvjagZst0k",
    authDomain: "d3-firebase-starter.firebaseapp.com",
    databaseURL: "https://d3-firebase-starter.firebaseio.com",
    projectId: "d3-firebase-starter",
    storageBucket: "d3-firebase-starter.appspot.com",
    messagingSenderId: "1020387918909",
    appId: "1:1020387918909:web:508221bf07b68bc2079654",
    measurementId: "G-XJ376VQ9BE",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
</script>
```

## Canvas container ✏️

```html
<div class="canvas"></div>
```

## Drawing base shapes 🖍️

### 1. Selecting the canvas container and append our base SVG element to it

```javascript
const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);
```

### 2. Geometry of graph

All the margin properties are added using javascript object

```javascript
const margin = {
  top: 20,
  right: 20,
  bottom: 100,
  left: 100,
};
```

Using the **margin** object and calculating graph height and width

```javascript
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;
```

### 3. Using the above dimensions by applying them to graph

```javascript
const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margin.left},${margin.top})`);
```

## Axes and groups

### 1. Creating axes groups

Groups or group elements can be created by appending **g** to the container

```javascript
const xAxisGroup = graph
  .append("g")
  .attr("transform", `translate(0, ${graphHeight})`);

const yAxisGroup = graph.append("g");
```

### 2. Axis Elements

- x-axis can be created by **d3.axisBottom()** as it resides at the bottom
- y-axis can be created by **d3.axisLeft()** as it resides at the left

### 3. Calling axis elements through groups

```javascript
xAxisGroup.call(xAxis);
yAxisGroup.call(yAxis);
```

## Scales

### 1. Creating a band scale (x-axis)

Band scale can be created by **d3.scaleBand()**, any scale required two properties

a. **Domain**: Starting from the initial value what are all the values that should be there on the axis in this case **x-axis**, if it was **y-axis** then it would from **0** to **last value** or the **max value** till which the graph should extend.

b. **Range**: It's the height or width of the axis.

The above values can be generated dynamically depending upon the data

```javascript
const x = d3
  .scaleBand()
  .range([0, graphWidth])
  .paddingInner(0.2)
  .paddingOuter(0.2);
```

### 2. Creating a linear scale (y-axis)

Linear scale can be created by **d3.scaleLinear()**

```javascript
const y = d3.scaleLinear().range([graphHeight, 0]);
```

## Listening for real-time data updates from firebase

Firebase (Firestore) provides a method known as **onSnapshot()** to listen for real-time updates on any particular collection in the firestore. This method accepts a call-back as an argument with **res** as its parameter.

1. Apply this method on our collection where the data is stored
2. There are 3 cases of data alteration in firestore
   - **Added**: When a new document is added to the collection.
   - **Modified**: When a existing document properties are altered or new properties are added to an existing document.
   - **Deleted**: When an existing document is deleted.

```javascript
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
```

## Update method for binding visualization based on data

### 1. Declaring the update method

```javascript
const update = (data) => {
  ...
};
```

### 2. Updating linear and band scale domains on data update

```javascript
y.domain([0, d3.max(data, (d) => d.orders)]);
x.domain(data.map((item) => item.name));
```

### 3. Joining data to shapes

```javascript
const rects = graph.selectAll("rect").data(data);
```

### 4. Removing elements from the Exit selection

**Exit Selection:** The selection of elements for which the data doesn't exist to bind.
**Ex:** Suppose we're getting **4** objects of data from the back-end, previously **5** were there so one shape's data got deleted internally. Hence, that shape should exit from the visualization. **D3** determines automatically the exit selection elements based on the joined data.

```javascript
rects.exit().remove();
```

### 5. Update current shapes in DOM

```javascript
rects
  .attr("width", x.bandwidth)
  .attr("fill", "crimson")
  .attr("x", (d) => x(d.name));
```

### 6. Append items from enter selection (if new data comes)

```javascript
rects
  .enter()
  .append("rect")
  .attr("width", x.bandwidth)
  .attr("fill", "crimson")
  .attr("x", (d) => x(d.name))
  .attr("height", 0)
  .attr("y", graphHeight);
```

## Adding transition (Smooth rendering)

### 1. Storing the transition in a variable, to re-use

```javascript
const t = d3.transition().duration(1000);
```

### 2. Applying the transition

```javascript
.transition(t)
    .attr("height", (d) => graphHeight - y(d.orders))
    .attr("y", (d) => y(d.orders));
```

## Author ✨

- Twitter : [@malsaslam97](https://twitter.com/malsaslam97)
- Github: [@AssSam7](https://github.com/AssSam7)
- LinkedIn: [Aslam Mohammed](https://www.linkedin.com/in/malsaslam97/)
