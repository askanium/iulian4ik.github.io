var firstTime=true,
	margin={top: 10, right: 50, bottom: 30, left: 65},
	w = document.getElementById("graph").offsetWidth - margin.left - margin.right,
	h = 300 - margin.top - margin.bottom,
	color=["#FF3333","#FFFF33","#0b9b00"],
	animationDuration = 800,
	animationDelay = 100,
	rect,layers,layer,graph,qPath,line,yAxisLeft,oldLineData,lineOffsetData,tLine,
	stack=d3.layout.stack(),
	x=d3.scale.linear(),
	y=d3.scale.linear(),
	xBuffer=d3.scale.ordinal(),
	xAxis=d3.svg.axis();
	
function drawChart(chartId, json){
	graph=d3.select("#graph")
		.append("svg:svg")
		.attr("width",w + margin.left + margin.right)
		.attr("height",h + margin.top + margin.bottom)
		.append("svg:g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	yAxisLeft = d3.svg.axis()
		.scale(y)
		.ticks(6)
		.orient("left");

	layers = stack(d3.range(json.buffer.length).map(function(i){return json.buffer[i];}));

	layer = graph.selectAll(".layer")
		.data(layers)
		.enter()
		.append("g")
		.attr("class", "layer")
		.style("fill", function(d,i){return color[i];});
    
    graph.append("svg:g")
    	.attr("class", "x axis")
    	.attr("transform", "translate(0,"+h+")");
	
	graph.append("svg:g")
		.attr("class","y axis")
		.call(yAxisLeft);
	
	tLine=json.data;
	superChart(json);
}

function superChart(jsonData){
	var lineOffsetData1 = computeOffsetArray(jsonData.data);
	line = d3.svg.line()
		.x(function(d,i){
			var p = i + lineOffsetData1[i];  // This is the whole trick - compute the offset for the datapoint and set it to 'previous' category.
			return x(p);
		})
		.y(function(d){
			return y(d);
		});

	layers = stack(
		d3.range(jsonData.buffer.length)
			.map(function(i){return jsonData.buffer[i];})
	);

	xBuffer.domain(d3.range(jsonData.buffer[0].length))
		.rangeRoundBands([0,w], computeSpacing(jsonData.buffer[0].length));

	if(!firstTime){
	    if(jsonData.data.length > oldLineData.length){
	    	var transitionLine = oldLineData.slice(0);
	    	for(var i = oldLineData.length; i < jsonData.data.length; i++){
	    		transitionLine.push(oldLineData[oldLineData.length-1]);
	    		lineOffsetData.push(lineOffsetData[lineOffsetData.length-1]-1);
	    	}
	    	tLine = jsonData.data.slice(0);
	    	lineOffsetData1 = lineOffsetData.slice(0);
	    	qPath.transition().duration(0).attr("d",line(transitionLine));
	    	lineOffsetData1 = computeOffsetArray(jsonData.data);
	    } else {
	    	var transitionLine = jsonData.data.slice(0);
	    	for(var i = jsonData.data.length; i < oldLineData.length; i++){
	    		transitionLine.push(jsonData.data[jsonData.data.length-1]);
	    		lineOffsetData1.push(lineOffsetData1[lineOffsetData1.length-1]-1);
	    	}
	    	tLine=transitionLine.slice(0);
	    }
	}

	setTimeout(function() {
	    y.domain([
	    	0, 
	    	Math.max(
	    		Math.max.apply(null, jsonData.data),
	    		d3.max(layers, function(layer){
	    			return d3.max(layer, function(d){ return d.y0+d.y; }); 
	    		})
	    	)
	    	]).range([h,0]);

		var emptyTickValues = Array.apply(null,new Array(jsonData.data.length)).map(String.prototype.valueOf,"")

		xAxis.scale(xBuffer)
			.tickSize(0)
			.tickPadding(6)
			.orient("bottom");

		layer = graph.selectAll("g.layer")
			.data(layers);
		
		rect = layer.selectAll("rect")
			.data(function(d){return d;});
		
		rect.enter()
			.append("rect")
			.attr("x", function(d){ return xBuffer(d.x); })
			.attr("y", h)
			.attr("class", 'stacked-bar')
			.attr("width",xBuffer.rangeBand())
			.attr("height",0);
		
		rect.transition()
			.delay(0)
			.duration(animationDuration)
			.attr("x", function(d){ return xBuffer(d.x); })
			.attr("width", xBuffer.rangeBand())
			.attr("y", function(d){ return y(d.y0+d.y);})
			.attr("height", function(d){ return y(d.y0)-y(d.y0+d.y);});
		
		rect.exit()
			.transition()
			.delay(0)
			.duration(animationDuration)
			.attr("x", w)
			.attr("width", 0)
			.attr("y", h)
			.attr("height", 0)
			.remove();

		graph.selectAll("g.x.axis")
			.transition()
			.duration(0+animationDuration)
			.call(xAxis)
			.selectAll("text")
			.text(function(i){
				if(jsonData.tickValues1[i]!=null){
					return jsonData.tickValues1[i];
				} else {
					return "";
				}
			});

		x.domain([-0.5, jsonData.buffer[0].length-0.5]).range([0,w]);

		x.domain([
			-(((xBuffer(1)-xBuffer(0)-1)/2+xBuffer(0))/2/x(0)),
			jsonData.buffer[0].length-1+(((xBuffer(1)-xBuffer(0)-1)/2+xBuffer(0))/2/x(0))
		]);

		if (firstTime) {
			qPath = graph.append("svg:path")
				.attr("d", line(Array.apply(null,new Array(jsonData.data.length)).map(Number.prototype.valueOf,0)));
			firstTime=false;
		}
		
		var circleCoords=[];
		qPath.transition()
			.delay(0)
			.duration(animationDuration)
			.attr("d", line(tLine));

		for (var i=0; i < jsonData.data.length; i++) {
			circleCoords.push({"x":xBuffer(i+lineOffsetData1[i])+xBuffer.rangeBand()/2,"y":y(tLine[i])});
		}
		
		circles=graph.selectAll('circle').data(circleCoords);
		
		circles.enter()
			.append('circle')
			.attr('cx', function(d){return d.x;})
			.attr('cy',function(d){return d.y;})
			.attr('r',0)
			.attr('fill','#333')
			.transition()
			.attr('r',5);
		
		circles.transition()
			.delay(0)
			.duration(animationDuration)
			.attr('cx',function(d){return d.x;})
			.attr('cy',function(d){return d.y;})
			.attr('r',5);
		
		circles.append("svg:title")
			.text(function(d,i){return jsonData.data[i];})
		
		circles.exit()
			.transition()
			.delay(0)
			.duration(animationDuration)
			.attr('r',0)
			.style('opacity',0)
			.remove();
	    
	    graph.select("g.y.axis")
	    	.transition()
	    	.delay(0)
	    	.duration(animationDuration)
	    	.call(yAxisLeft);

	}, animationDelay);

	oldLineData = jsonData.data.slice(0);
	lineOffsetData = lineOffsetData1.slice(0);
}

function computeSpacing(nrOfColumns){
	if (nrOfColumns<10) {
		return .01;
	} else {
		if (nrOfColumns<20) { 
			return .02;
		} else {
			return .03;
		}
	}
}

function computeOffsetArray(data){
	var arr=[0];
	for (var i=1; i < data.length; i++) {
		if (data[i] > data[i-1]) {
			arr.push(arr[i-1]-1);
		} else {
			arr.push(arr[i-1]);
		}
	}
	return arr.slice(0);
}
