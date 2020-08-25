<h1 align="center">Data Visualizations with D3.js & Firebase 🔥</h1>
<p align="center">
  <img src="https://img.shields.io/badge/D3.js-v5-orange">
  <img src="https://img.shields.io/badge/firebase-v7.19.0-green">
</p>

> This repository constitutes to visualizing and rendering using D3.js and Firebase for storing and retrieving the data in real-time.

## 🏠 [Adding D3.js]

Add the following **CDN** at the end of the <body> in **index.html**

```html
<script src="https://d3js.org/d3.v5.js"></script>
```

## 🪁 [Adding Firebase]

Get the below code from console.firebase.google.com and check out, Adding this project to web app

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

## ✏️ [Canvas container]

```html
<div class="canvas"></div>
```

## Selecting the canvas and appending svg and attributes

```javascript
const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);
```

## Margins and Dimensions of graph

```javascript
const margin = {
  top: 20,
  right: 20,
  bottom: 100,
  left: 100,
};

const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;
```

## Using the above dimensions by applying them to graph

```javascript
const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margin.left},${margin.top})`);
```
