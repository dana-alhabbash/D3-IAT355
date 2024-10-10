import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const dataset = [
  { platform: "PS2", count: 400 },
  { platform: "DS", count: 2152 },
  { platform: "PS3", count: 1331 },
  { platform: "Wii", count: 1320 },
  { platform: "X360", count: 1262 },
  { platform: "PSP", count: 1209 },
  { platform: "PC", count: 4500 },
  { platform: "XB", count: 150 },
  { platform: "GBA", count: 120 },
];

const width = 640;
const height = 400;

const margin = { top: 20, right: 20, bottom: 20, left: 20 };

const svg = d3
  .select("#visContainer")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const g = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const xScale = d3.scaleLinear().domain([120, 4500]).range([0, 640]);
const yScale = d3.scaleLinear().domain([120, 4500]).range([0, 400]);

console.log(xScale(2190));

svg
  .selectAll("rect")
  .data(dataset)
  .join("rect")
  .attr("x", (d) => {
    return xScale(d.count) - 20;
  })
  .attr("y", 50)
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", () => {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`;
  });
