'use strict';
var bookster = (function () {

  function bookster (data, id) {
    var treemapData = preProcessDataForTreemap(data);
    var booksterDiv = d3.select("#"+id+'-bookster');
    var margin = {top: 40, right: 10, bottom: 10, left: 10},
    width = 840 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    colors = {
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

    data.forEach(function ( sentimentWordPair ) {
      booksterDiv.append("div").attr('class', 'b'+sentimentWordPair[0]).attr('title', sentimentWordPair[1]);
    });

    var div = d3.select("#"+id+'-treemap').append("div")
    .style("position", "relative")
    .style("width", (width + margin.left + margin.right) + "px")
    .style("height", (height + margin.top + margin.bottom) + "px")
    .style("left", margin.left + "px")
    .style("top", margin.top + "px");

    var node = div.datum(treemapData).selectAll(".node"+id)
    .data(treemap.nodes)
  .enter().append("div")
    .attr("class", "node")
    .call(position)
    .style("background", function(d) { return d.children ? colors[d.sentiment] : null; })
    .text(function(d) { return d.children ? null : d.sentiment; });
  }

  function preProcessDataForTreemap ( data ) {
    var result = {
      "sentiment": "all",
      "children": [
        {
          "sentiment": "positive",
          "children": [
            {"sentiment": "+1", "children": [{"sentiment": "+1", "count": 0}]},
            {"sentiment": "+2", "children": [{"sentiment": "+2", "count": 0}]},
            {"sentiment": "+3", "children": [{"sentiment": "+3", "count": 0}]},
            {"sentiment": "+4", "children": [{"sentiment": "+4", "count": 0}]},
            {"sentiment": "+5", "children": [{"sentiment": "+5", "count": 0}]}
          ]
        },
        {
          "sentiment": "negative",
          "children": [
            {"sentiment": "-1", "children": [{"sentiment": "-1", "count": 0}]},
            {"sentiment": "-2", "children": [{"sentiment": "-2", "count": 0}]},
            {"sentiment": "-3", "children": [{"sentiment": "-3", "count": 0}]},
            {"sentiment": "-4", "children": [{"sentiment": "-4", "count": 0}]},
            {"sentiment": "-5", "children": [{"sentiment": "-5", "count": 0}]}
          ]
        }
      ]
    };

    data.forEach(function ( sentimentWordPair ) {
      var sentiment = typeof sentimentWordPair[0] === 'string' 
        ? (sentimentWordPair[0].length > 1 
            ? sentimentWordPair[0] 
            : '+' + sentimentWordPair[0]) 
        : (sentimentWordPair[0] > 0 
            ? '+' + sentimentWordPair[0] 
            : sentimentWordPair[0].toString());
      var word = sentimentWordPair[1];
      var sentimentIdx = parseInt(sentiment) > 0 ? 0 : 1;
      var sentimentPowerIdx = Math.abs(parseInt(sentiment)) - 1;
      result.children[sentimentIdx].children[sentimentPowerIdx].children[0].count += 1;
    });
    return result;
  }

  function position() {
    this.style("left", function(d) { return d.x + "px"; })
        .style("top", function(d) { return d.y + "px"; })
        .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
        .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
  }

  return bookster;
})();

window.bookster = bookster;