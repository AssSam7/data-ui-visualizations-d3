<h1 align="center">Data Visualizations with D3.js & Firebase 🔥</h1>
<p align="center">
  <img src="https://img.shields.io/badge/D3.js-v5-orange">
  <img src="https://img.shields.io/badge/firebase-v7.19.0-green">
</p>

> This repository constitutes to visualizing and rendering using D3.js and Firebase for storing and retrieving the data in real-time.

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
