'use strict';
var bookster = (function () {
  var originalData,
      colors = {
        "all": "#ffffff",
        "positive": "#1B5E20",
        "negative": "#D50000",
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

  function bookster (data) {
    originalData = data;
    
    return {
      squares: drawBookser,
      treemaps: drawTreemaps,
      piecharts: drawPieCharts,
      linechart: drawLineChart
    };
  }

  /**
   * Draws the squares that represent the emotionally charged words.
   * @param {DOM} elem - The DOM element in which to draw the bookster.
   */
  function drawBookser(elem) {
    originalData.forEach(function ( sentimentWordPair ) {
      d3.select(elem).append("div").attr('class', 'b'+sentimentWordPair[0]).attr('title', sentimentWordPair[1]);
    });
  }

  /**
   * Draw one lineChart in the provided element with the provided data.
   * @param {DOM} elem - The DOM element in which to draw the lineChart.
   * @param {Object[]} lineChartData - The data to use in the lineChart.
   */
  function drawLineChart(elem) {
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = elem.clientWidth - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;

    var processedData = preProcessDataForLineChart(originalData, width);

    var x = d3.scale.linear()
        .range([0, width])
        .domain([0, width]);

    var y = d3.scale.linear()
        .range([height, 0])
        .domain([
          d3.min(processedData[1].values), 
          d3.max(processedData[0].values)
        ]);

    var line = d3.svg.line()
        .x(function (d, i) { return x(i); })
        .y(function (d) { return y(d); });

    var svg = d3.select(elem).append("svg")
        .style("width", (width + margin.left + margin.right) + "px")
        .style("height", (height + margin.top + margin.bottom) + "px")
        .append('g')
        .attr('transform', 'translate(' + margin.top + ', ' + margin.right + ')');

    var impressions = svg.selectAll(".impression")
        .data(processedData)
      .enter().append("g")
        .attr("class", "impression");

    impressions.append('path')
        .attr('class', 'line')
        .attr('d', function (d) { 
          return line(d.values); 
        })
        .style('stroke', function (d) { 
          return colors[d.category]; 
        });
  }

  /**
   * Draws treemaps with words of each type of emotional intensity.
   * @param {DOM} elem - The DOM element in which to draw the treemap.
   * @param {number} amount - The amount of treemaps to draw. This number will split the data set into subsets
   *    and each treemap will represent the corresponding subset of data.
   * @param {number[]} treemapsGrid - An array that defines how the treemaps should be placed within the parent
   *    element. E.g. if `amount = 9` and `treemapGrid = [3, 3, 3]`, this will draw three rows with three 
   *    treemaps on each row. If `tremapGrid = [5, 4]` instead, then treemaps will be drawn in two rows with five
   *    of them on the first row and four on the second.
   */ 
  function drawTreemaps(elem, amount, treemapsGrid) {
    var childElem, childTreemapData, startIndex, endIndex,
        plottedTreemaps = 0, 
        elemWidth = elem.clientWidth,
        wordsInOneChunk = Math.floor(originalData.length / amount);  // TODO verify if amount is greater than data points.

    treemapsGrid.forEach(function (treemapsPerRow, i) {
      var widthOfATreemap = elemWidth / treemapsPerRow;

      for (var j = plottedTreemaps; j < treemapsPerRow + plottedTreemaps; j++) {
        childElem = document.createElement('div');
        childElem.style.display = 'inline-block';
        childElem.style.width = widthOfATreemap + 'px';
        childElem.style.height = (widthOfATreemap / 2) + 'px';
        elem.appendChild(childElem);

        startIndex = j * wordsInOneChunk;
        endIndex = j == amount - 1 ? originalData.length : (j+1) * wordsInOneChunk;
        
        childTreemapData = preProcessDataForTreemap(originalData.slice(startIndex, endIndex));
        
        drawTreemap(childElem, childTreemapData);
      }

      // Save the amount of already plottedTreemaps to know where from to extract data from the original data.
      plottedTreemaps += treemapsPerRow;
    })    
  }

  /**
   * Draw one treemap in the provided element with the provided data.
   * @param {DOM} elem - The DOM element in which to draw the treemap.
   * @param {Object[]} treemapData - The data to use in the treemap.
   */
  function drawTreemap(elem, treemapData) {
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = elem.clientWidth - margin.left - margin.right,
        height = elem.clientHeight - margin.top - margin.bottom;

    var treemap = d3.layout.treemap()
      .size([width, height])
      .sticky(true)
      .value(function(d) { return d.count; });

    var div = d3.select(elem).append("div")
        .style("position", "relative")
        .style("width", (width + margin.left + margin.right) + "px")
        .style("height", (height + margin.top + margin.bottom) + "px")
        .style("left", margin.left + "px")
        .style("top", margin.top + "px");

    var node = div.datum(treemapData).selectAll(".node")
        .data(treemap.nodes)
      .enter().append("div")
        .attr("class", "node")
        .call(position)
        .style("background", function(d) { 
          return colors[d.sentiment]; 
        })
        .text(function(d) { 
          return d.sentiment; 
        });
  }

  function drawHierarchicalPieChart(plot, pieChartData) {
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = plot.clientWidth - margin.left - margin.right,
        height = plot.clientHeight - margin.top - margin.bottom;

    while (plot.hasChildNodes()) {
        plot.removeChild(plot.firstChild);
    }

    var width = plot.offsetWidth;
    console.log(width);
    var height = width;
        
    var data_slices = [];
    var max_level = 2;

    var svg = d3.select(plot).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height * .52 + ")");
          
    function process_data(data,level,start_deg,stop_deg) {
      function toFixed(num, fixed) {
        var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
        return +num.toString().match(re)[0];
      }
      
      var name = data.sentiment;
      var total = data.count;
      var children = data.children;
      var current_deg = start_deg;

      if (level > max_level) { return; }
      if (start_deg == stop_deg) { return; }
      
      data_slices.push([start_deg, stop_deg, name, level, total]);
      
      children.forEach(function (child) {
        var inc_deg = toFixed((stop_deg-start_deg)/total*child.count, 15);
        var child_start_deg = current_deg;
        current_deg += inc_deg;
        var child_stop_deg = current_deg;
        var span_deg = child_stop_deg-child_start_deg;
        process_data(child,level+1,child_start_deg,child_stop_deg);
      });
    }

    process_data(pieChartData,0,0,2*Math.PI);

    var ref = data_slices[0];
    var next_ref = ref;
    var last_refs = [];
    var last_ref;

    var thickness = width/2.0/(max_level+2)*1.1;
        
    var arc = d3.svg.arc()
    .startAngle(function(d) { 
      if(d[3]==0){
        return d[0];
      }
      return d[0]+0.01; 
    })
    .endAngle(function(d) { if(d[3]==0){return d[1];}return d[1]-0.01; })
    .innerRadius(function(d) { return 1.1*d[3]*thickness; })
    .outerRadius(function(d) { return (1.1*d[3]+1)*thickness; });    

    var slices = svg.selectAll(".form")
        .data(function(d) { return data_slices; })
        .enter()
        .append("g");
        slices.append("path")
        .attr("d", arc)
        .attr("id",function(d,i){return d[0]+i;})
        .style("fill", function(d) { 
          return colors[d[2]];
        })
        .attr("class","form");
    slices.on("click",animate);

    // if (title_function != undefined)
    // {
    //     slices.append("svg:title")
    //           .text(title_function);        
    // }
    // if (legend_function != undefined)
    // {
    //     slices.on("mouseover",update_legend)
    //           .on("mouseout",remove_legend);
    //     var legend = d3.select("#"+element_id+"_legend")
            
    //     function update_legend(d)
    //     {
    //         legend.html(legend_function(d));
    //         legend.transition().duration(200).style("opacity","1");
    //     }
        
    //     function remove_legend(d)
    //     {
    //         legend.transition().duration(1000).style("opacity","0");
    //     }
    // }
    function get_start_angle(d,ref)
    {
        if (ref)
        {
            var ref_span = ref[1]-ref[0];
            return (d[0]-ref[0])/ref_span*Math.PI*2.0
        }
        else
        {
            return d[0];
        }
    }
    
    function get_stop_angle(d,ref)
    {
        if (ref)
        {
            var ref_span = ref[1]-ref[0];
            return (d[1]-ref[0])/ref_span*Math.PI*2.0
        }
        else
        {
            return d[0];
        }
    }
    
    function get_level(d,ref)
    {
        if (ref)
        {
            return d[3]-ref[3];
        }
        else
        {
            return d[3];
        }
    }
    
    function rebaseTween(new_ref)
    {
        return function(d)
        {
            var level = d3.interpolate(get_level(d,ref),get_level(d,new_ref));
            var start_deg = d3.interpolate(get_start_angle(d,ref),get_start_angle(d,new_ref));
            var stop_deg = d3.interpolate(get_stop_angle(d,ref),get_stop_angle(d,new_ref));
            var opacity = d3.interpolate(100,0);
            return function(t)
            {
                return arc([start_deg(t),stop_deg(t),d[2],level(t)]);
            }
        }
    }
    
    var animating = false;
    
    function animate(d) {
        if (animating)
        {
            return;
        }
        animating = true;
        var revert = false;
        var new_ref;
        if (d == ref && last_refs.length > 0)
        {
            revert = true;
            last_ref = last_refs.pop();
        }
        if (revert)
        {
            d = last_ref;
            new_ref = ref;
            svg.selectAll(".form")
            .filter(
                function (b)
                {
                    if (b[0] >= last_ref[0] && b[1] <= last_ref[1]  && b[3] >= last_ref[3])
                    {
                        return true;
                    }
                    return false;
                }
            )
            .transition().duration(1000).style("opacity","1").attr("pointer-events","all");
        }
        else
        {
            new_ref = d;
            svg.selectAll(".form")
            .filter(
                function (b)
                {
                    if (b[0] < d[0] || b[1] > d[1] || b[3] < d[3])
                    {
                        return true;
                    }
                    return false;
                }
            )
            .transition().duration(1000).style("opacity","0").attr("pointer-events","none");
        }
        svg.selectAll(".form")
        .filter(
            function (b)
            {
                if (b[0] >= new_ref[0] && b[1] <= new_ref[1] && b[3] >= new_ref[3])
                {
                    return true;
                }
                return false;
            }
        )
        .transition().duration(1000).attrTween("d",rebaseTween(d));
        setTimeout(function(){
            animating = false;
            if (! revert)
            {
                last_refs.push(ref);
                ref = d;
            }
            else
            {
                ref = d;
            }
            },1000);
    };    

}

  /**
   * Draw pie charts with positive and negative words for a comparative analysis.
   * @param {DOM} elem - The DOM element in which to draw the treemap.
   * @param {number} amount - The amount of pie charts to draw. This number will split the data set into subsets
   *    and each treemap will represent the corresponding subset of data.
   * @param {number[]} pieChartsGrid - An array that defines how the pie charts should be placed within the parent
   *    element. E.g. if `amount = 9` and `treemapGrid = [3, 3, 3]`, this will draw three rows with three 
   *    pie charts on each row. If `tremapGrid = [5, 4]` instead, then pie charts will be drawn in two rows with
   *    five of them on the first row and four on the second.
   */
  function drawPieCharts(elem, amount, pieChartsGrid) {
    var childElem, childPieChartData, startIndex, endIndex,
        plottedPieCharts = 0, 
        elemSizes = elem.getBoundingClientRect(),
        wordsInOneChunk = Math.floor(originalData.length / amount);  // TODO verify if amount is greater than data points.
        console.log(elem);
    pieChartsGrid.forEach(function (pieChartsPerRow, i) {
      var widthOfAPieChart = elemSizes.width / pieChartsPerRow;

      for (var j = plottedPieCharts; j < pieChartsPerRow + plottedPieCharts; j++) {
        childElem = document.createElement('div');
        childElem.style.display = 'inline-block';
        childElem.style.width = widthOfAPieChart + 'px';
        childElem.style.height = widthOfAPieChart + 'px';
        elem.appendChild(childElem);

        startIndex = j * wordsInOneChunk;
        endIndex = j == amount - 1 ? originalData.length : (j+1) * wordsInOneChunk;
        
        childPieChartData = preProcessDataForTreemap(originalData.slice(startIndex, endIndex));
        
        drawHierarchicalPieChart(childElem, childPieChartData);
      }

      // Save the amount of already plottedPieCharts to know where from to extract data from the original data.
      plottedPieCharts += pieChartsPerRow;
    })    
  }

  function preProcessDataForTreemap ( data ) {
    var result = {
      "sentiment": "all",
      "count": 0,
      "children": [
        {
          "sentiment": "positive",
          "count": 0,
          "children": [
            {"sentiment": "+1", "count": 0, "children": []},
            {"sentiment": "+2", "count": 0, "children": []},
            {"sentiment": "+3", "count": 0, "children": []},
            {"sentiment": "+4", "count": 0, "children": []},
            {"sentiment": "+5", "count": 0, "children": []}
          ]
        },
        {
          "sentiment": "negative",
          "count": 0,
          "children": [
            {"sentiment": "-1", "count": 0, "children": []},
            {"sentiment": "-2", "count": 0, "children": []},
            {"sentiment": "-3", "count": 0, "children": []},
            {"sentiment": "-4", "count": 0, "children": []},
            {"sentiment": "-5", "count": 0, "children": []}
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
      result.count += 1;
      result.children[sentimentIdx].count += 1;
      result.children[sentimentIdx].children[sentimentPowerIdx].count += 1;
      // result.children[sentimentIdx].children[sentimentPowerIdx].children[0].count += 1;
    });
    console.log(result);
    return result;
  }

  function position() {
    this.style("left", function(d) { return d.x + "px"; })
        .style("top", function(d) { return d.y + "px"; })
        .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
        .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
  }

  function preProcessDataForLineChart( data, width ) {
    var result = [
      { category: 'positive', values: [] },
      { category: 'negative', values: [] }
    ];
    var positiveScore = 0,
        negativeScore = 0;
    var wordsPerPixel = Math.floor(data.length / width);

    data.forEach(function ( sentimentWordPair, i ) {
      if (i && i % wordsPerPixel === 0 ) {
        result[0].values.push(positiveScore);
        result[1].values.push(negativeScore);
        positiveScore = 0;
        negativeScore = 0;
      }

      var sentiment = sentimentWordPair[0] > 0 
        ? '+' + sentimentWordPair[0] 
        : sentimentWordPair[0].toString();

      if ( sentiment > 0 ) {
        positiveScore += Number(sentiment);
      } else {
        negativeScore += Number(sentiment);
      }

      if ( i === data.length - 1 && i % wordsPerPixel > 0 ) {
        if ( sentiment > 0 ) {
          result[0].values[result[0].values.length - 1] += positiveScore;
        } else {
          result[1].values[result[1].values.length - 1] += negativeScore;
        }
      }
    });

    console.log(result);
    return result;
  }

  return bookster;
})();

window.bookster = bookster;