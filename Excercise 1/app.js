const canvas = d3.select("#canvas");

const data = [
    { name: "Medellín", index2005: 3, index2006: 33 },
    { name: "Cali", index2005: 39, index2006: 45 },
    { name: "Bogotá", index2005: 7, index2006: 31 },
    { name: "Pereira", index2005: 35, index2006: 36 },
    { name: "Bucaramanga", index2005: 16, index2006: 23 },
    { name: "Cúcuta", index2005: 45, index2006: 45 },
    { name: "Armenia", index2005: 6, index2006: 16 }
];

const width = 700;
const height = 500;
const margin = { top:10, left:50, bottom: 40, right: 10};
const iwidth = width - margin.left - margin.right;
const iheight = height - margin.top -margin.bottom;

const svg = canvas.append("svg");
svg.attr("width", width);
svg.attr("height", height);

let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

const y = d3.scaleLinear() 
    .domain([0, 50])
    .range([iheight, 0]);

const x = d3.scaleBand()
.domain(data.map(d => d.name) ) 
.range([0, iwidth])
.padding(0.1); 

const bars = g.selectAll("rect").data(data);

const barra = bars.enter().append("rect")
.attr("class", "bar")
.attr("x", d => x(d.name))
.attr("y", d => y(d.index2005))
.attr("height", d => iheight - y(d.index2005))
.style("fill", "lawngreen")
.attr("width", x.bandwidth())  


d3.select("#index2005").on("click", function () {
barra.transition()  
.attr("y", d => y(d.index2005))
.attr("height", d => iheight - y(d.index2005))
.style("fill", "lawngreen")
.duration(2000);
});


d3.select("#index2006").on("click", function () {
    barras.transition()  
    .attr("y", d => y(d.index2006))
    .attr("height", d => iheight - y(d.index2006))
    .style("fill", "mediumpurple")
    .duration(2000);
});
    
g.append("g")
.classed("x--axis", true)
.call(d3.axisBottom(x))
.attr("transform", `translate(0, ${iheight})`);  

g.append("g")
.classed("y--axis", true)
.call(d3.axisLeft(y));