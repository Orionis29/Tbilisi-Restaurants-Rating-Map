// mapbox projection
function getLL(d) {
  return new mapboxgl.LngLat(+d.lat, +d.lng)
}
function project(d) {
  return map.project(getLL(d));
}

// create color scale for dots on a map
function colorScale(i) {
  return i >= 5 ? 'steelblue' :
       i >= 4  ? '#31a354' :
       i >= 3  ? '#74c476' :
       i >= 2  ? '#a1d99b' :
       i >= 1  ? '#c7e9c0' :
                 '#d73027' ;
}

// create radius scale for dots on a map
function radiusScale(i) {
  return i >= 1000 ? 15 :
       i >= 500  ? 10 :
       i >= 200  ? 8 :
       i >= 100  ? 6 :
       i >= 50  ? 5 :
       i >= 10  ? 4 :
            3 ;
}
// define legend content
var starsLegend = [0, 1, 2, 3, 4, 5];
var reviewsLegend = [0, 10, 50, 100, 200, 500, 1000];

// draw legend for the stars raiting
d3.select('.stars')
  .append('ul')
  .selectAll('li')
    .data(starsLegend)
    .enter()
    .append('li')
    .append('div')
      .style("width", '14px')
      .style("height", '14px')
      .style("background", (d) => colorScale(d))
      .style("border-radius", "7px")
      .style("margin-left", "-10px")
      .style("border", "solid .5px #333")
    .append("text")
    .html((d) => '<text>' + d + '</text>')

// draw legend for the reviews raiting
d3.select('.reviews')
  .append('ul')
  .selectAll('li')
    .data(reviewsLegend)
    .enter()
    .append('li')
    .append('div')
      .style("width", (d) => radiusScale(d) + 3 + 'px')
      .style("height", (d) => radiusScale(d) + 3 +  'px')
      .style("background", 'white')
      .style("border-radius", (d) => (radiusScale(d) + 3) / 2 + 'px')
      .style("margin-left", (d) => (radiusScale(d) - 8)+ 'px')
      .style("border", "solid .5px #333")
    .append("text")
    .html((d) => '<text>' + d + '</text>')

// tooltip
let tooltip = d3.select("body")
    .append("div")
    .attr("class", "d3-tip")
    .style("position", "absolute")
    .style("z-index", "100")
    .style("visibility", "hidden");
