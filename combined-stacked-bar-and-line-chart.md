---
layout: page
title: Combined stacked bar and line charts with several data points per category
categories: visualization d3.js
---
<div>
	<style>
			/* tell the SVG path to be a thin blue line without any area fill */
			path {
				stroke: #333;
				stroke-width: 2;
				fill: none;
			}
			
			.axis {
			  shape-rendering: crispEdges;
			}
 
			.x.axis line {
			  stroke: lightgrey;
			}
 
			.x.axis .minor {
			  stroke-opacity: .5;
			}
 
			.x.axis path {
			  display: none;
			}
 
			.y.axis line, .y.axis path {
			  fill: none;
			  stroke: #000;
			  stroke-width:1;
			}

			#graph {
				width: 100%;
			}

		</style>
 
 	<div id="graph" class="aGraph"></div>

	<script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>
	<script type="text/javascript" src="/assets/javascripts/gallery/stockchart.js"></script>

	<script>	
		var half=
		{ "buffer": [
		  [
		      { "x": 0, "y": 300 },
		      { "x": 1, "y": 300 },
		      { "x": 2, "y": 300 },
		      { "x": 3, "y": 200 },
		      { "x": 4, "y": 200 },
		      { "x": 5, "y": 267 }
		  ],
		  [
		      { "x": 0, "y": 300 },
		      { "x": 1, "y": 300 },
		      { "x": 2, "y": 300 },
		      { "x": 3, "y": 200 },
		      { "x": 4, "y": 200 },
		      { "x": 5, "y": 267 }
		  ],
		  [
		      { "x": 0, "y": 300 },
		      { "x": 1, "y": 300 },
		      { "x": 2, "y": 300 },
		      { "x": 3, "y": 200 },
		      { "x": 4, "y": 200 },
		      { "x": 5, "y": 267 }
		  ]
		], 
		"data": [900, 800, 720, 580, 340, 330, 710],
		"tickValues1": ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
	};
	
	var year=
		{ "buffer": [
		  [
		      { "x": 0, "y": 600 },
		      { "x": 1, "y": 600 },
		      { "x": 2, "y": 800 },
		      { "x": 3, "y": 800 },
		      { "x": 4, "y": 800 },
		      { "x": 5, "y": 533 },
		      { "x": 6, "y": 533 },
		      { "x": 7, "y": 710 },
		      { "x": 8, "y": 710 },
		      { "x": 9, "y": 473 },
		      { "x": 10, "y": 473 },
		      { "x": 11, "y": 315 }
		  ],
		  [
		      { "x": 0, "y": 600 },
		      { "x": 1, "y": 600 },
		      { "x": 2, "y": 800 },
		      { "x": 3, "y": 800 },
		      { "x": 4, "y": 800 },
		      { "x": 5, "y": 533 },
		      { "x": 6, "y": 533 },
		      { "x": 7, "y": 710 },
		      { "x": 8, "y": 710 },
		      { "x": 9, "y": 473 },
		      { "x": 10, "y": 473 },
		      { "x": 11, "y": 315 }
		  ],
		  [
		      { "x": 0, "y": 600 },
		      { "x": 1, "y": 600 },
		      { "x": 2, "y": 800 },
		      { "x": 3, "y": 800 },
		      { "x": 4, "y": 800 },
		      { "x": 5, "y": 533 },
		      { "x": 6, "y": 533 },
		      { "x": 7, "y": 710 },
		      { "x": 8, "y": 710 },
		      { "x": 9, "y": 473 },
		      { "x": 10, "y": 473 },
		      { "x": 11, "y": 315 }
		  ]
		], 
		"data": [1800, 1200, 1000, 2100, 1900, 1700, 1400, 900, 800, 1600, 1500, 950, 800, 750],
		"tickValues1": ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	};
		var week=
		{ "buffer": [
		  [
		      { "x": 0, "y": 120 },
		      { "x": 1, "y": 80 },
		      { "x": 2, "y": 80 },
		      { "x": 3, "y": 54 },
		      { "x": 4, "y": 54 },
		      { "x": 5, "y": 72 },
		      { "x": 6, "y": 72 }
		  ],
		  [
		      { "x": 0, "y": 120 },
		      { "x": 1, "y": 80 },
		      { "x": 2, "y": 80 },
		      { "x": 3, "y": 54 },
		      { "x": 4, "y": 54 },
		      { "x": 5, "y": 72 },
		      { "x": 6, "y": 72 }
		  ],
		  [
		      { "x": 0, "y": 120 },
		      { "x": 1, "y": 80 },
		      { "x": 2, "y": 80 },
		      { "x": 3, "y": 54 },
		      { "x": 4, "y": 54 },
		      { "x": 5, "y": 72 },
		      { "x": 6, "y": 72 }
		  ]
		], 
		"data": [360, 200, 180, 100, 90, 85, 210, 185],
		"tickValues1": ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	};

		
		function change2 (json){
			superChart(json);
		}

		
		drawChart("graph",week);
	</script>
	<div style="clear:both;"></div>
 <button onclick="change2(week);">Week</button>
 <button onclick="change2(half);">Half</button>
 <button onclick="change2(year);">Year</button>
		
</div>
