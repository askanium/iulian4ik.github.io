var lotrData = {
  "sentiment": "all",
  "children": [
    {
      "sentiment": "positive",
      "children": [
        {
          "sentiment": "+1",
          "children": [
            {
              "sentiment": "+1",
              "count": 681
            }
          ]
        },
        {
          "sentiment": "+2",
          "children": [
            {
              "sentiment": "+2",
              "count": 994
            }
          ]
        },
        {
          "sentiment": "+3",
          "children": [
            {
              "sentiment": "+3",
              "count": 432
            }
          ]
        },
        {
          "sentiment": "+4",
          "children": [
            {
              "sentiment": "+4",
              "count": 19
            }
          ]
        },
        {
          "sentiment": "+5",
          "children": [
            {
              "sentiment": "+5",
              "count": 1
            }
          ]
        }
      ]
    },
    {
      "sentiment": "negative",
      "children": [
        {
          "sentiment": "-1",
          "children": [
            {
              "sentiment": "-1",
              "count": 887
            }
          ]
        },
        {
          "sentiment": "-2",
          "children": [
            {
              "sentiment": "-2",
              "count": 919
            }
          ]
        },
        {
          "sentiment": "-3",
          "children": [
            {
              "sentiment": "-3",
              "count": 277
            }
          ]
        },
        {
          "sentiment": "-4",
          "children": [
            {
              "sentiment": "-4",
              "count": 1
            }
          ]
        },
        {
          "sentiment": "-5",
          "children": [
            {
              "sentiment": "-5",
              "count": 0
            }
          ]
        }
      ]
    }
  ]
};

var margin = {top: 40, right: 10, bottom: 10, left: 10},
    width = 840 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var color = d3.scale.category20c();
var colors = {
  "-5": "#b71c1c",
  "-4": "#d32f2f",
  "-3": "#f44336",
  "-2": "#e57373",
  "-1": "#ffcdd2",
  "0": "#ffffff",
  "+1": "#dcedc8",
  "+2": "#aed581",
  "+3": "#8bc34a",
  "+4": "#689f38",
  "+5": "#33691e",
};

var treemap = d3.layout.treemap()
    .size([width, height])
    .sticky(true)
    .value(function(d) { return d.count; });

var div = d3.select("#LOTRTreeMap").append("div")
    .style("position", "relative")
    .style("width", (width + margin.left + margin.right) + "px")
    .style("height", (height + margin.top + margin.bottom) + "px")
    .style("left", margin.left + "px")
    .style("top", margin.top + "px");

var node = div.datum(lotrData).selectAll(".node")
    .data(treemap.nodes)
  .enter().append("div")
    .attr("class", "node")
    .call(position)
    .style("background", function(d) { return d.children ? colors[d.sentiment] : null; })
    .text(function(d) { return d.children ? null : d.sentiment; });

function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}