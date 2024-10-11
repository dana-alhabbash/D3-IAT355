import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawVis() {

// const dataset = [
//   { platform: "PS2", global_sales: 400, jp_sales: 139 },
//   { platform: "DS", global_sales: 2152, jp_sales: 1500 },
//   { platform: "PS3", global_sales: 1331, jp_sales: 800 },
//   { platform: "Wii", global_sales: 1320, jp_sales: 1500 },
//   { platform: "X360", global_sales: 1262, jp_sales: 100 },
//   { platform: "PSP", global_sales: 1209, jp_sales: 76 },
//   { platform: "PC", global_sales: 4500, jp_sales: 250 },
//   { platform: "XB", global_sales: 150, jp_sales: 180 },
//   { platform: "GBA", global_sales: 120, jp_sales: 250 },
// ];

const dataset = await d3.csv("./datasets/videogames_wide.csv", d3.autoType);

console.log(dataset);

const width = 640;
const height = 400;

const margin = { top: 10, right: 20, bottom: 20, left: 30 };

const svg = d3
  .select("#visContainer")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("border", "1px solid black");

const maxGlobalSales = d3.max(dataset, (d)=>d.Global_Sales);
const maxJpSales = d3.max(dataset, (d)=>d.JP_Sales);

const xScale = d3
.scaleLinear()
.domain([0, maxGlobalSales])
.range([margin.left, width - margin.right]);

const yScale = d3
.scaleLinear()
.domain([0, maxJpSales])
.range([height - margin.bottom, margin.top]);

const colorScale = d3
.scaleLinear()
.domain([0, maxGlobalSales])
.range("blue", "red")

svg
  .selectAll("circle")
  .data(dataset)
  .join("circle")
  .attr("cx", (d) => {
    return xScale(d.Global_Sales);
  })
  .attr("cy", (d) => {
    return yScale(d.JP_Sales);
  })
  .attr("r",2)
  .attr("fill", (d) => {
    try {
      if (d.Name.toLowerCase().includes("mario")){
        return "red";
      } else {
        return "grey";
      }
    } catch (error){
      console.log(d);
    }
   

  });

  //x axis
  svg
  .append("g")
  .call(d3.axisBottom(xScale))
  .attr("transform", `translate(0, ${height - margin.bottom})`);

  //y axis
  svg
  .append("g")
  .call(d3.axisLeft(yScale))
  .attr("transform", `translate(${margin.left}, 0)`);
    

}
drawVis();