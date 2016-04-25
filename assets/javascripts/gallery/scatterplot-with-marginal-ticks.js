/* zones
        | 1  | 2  | 3  | 4  
        --------------------
        | 5  | 6  | 7  | 8  
        --------------------
        | 9  | 10 | 11 | 12 
        --------------------
        | 13 | 14 | 15 | 16 
        --------------------
        X axes - x
        Y axes - y
      */
function getDataPointsForOneZone (zone) {
    var tempData = [];
    switch (zone) {
        case 1:
            for (var i=0;i<pointsData.length;i++) {
                if (!(pointsData[i].x < xMargins[0] && pointsData[i].y >= yMargins[1])) {
                    tempData.push(pointsData[i]);
                }
            }
            break;
        case 2:
            for (var i=0;i<pointsData.length;i++) {
                if (!(pointsData[i].x >= xMargins[0] && pointsData[i].x < xCenterLine[0] && pointsData[i].y >= yMargins[1])) {
                    tempData.push(pointsData[i]);
                }
            }
            break;
        case 3:
            for (var i=0;i<pointsData.length;i++) {
                if (!(pointsData[i].x >= xCenterLine[0] && pointsData[i].x < xMargins[1] && pointsData[i].y >= yMargins[1])) {
                    tempData.push(pointsData[i]);
                }
            }
            break;
        case 4:
            for (var i=0;i<pointsData.length;i++) {
                if (!(pointsData[i].x >= xMargins[1] && pointsData[i].y >= yMargins[1])) {
                    tempData.push(pointsData[i]);
                }
            }
            break;
        case 5:
            for (var i=0;i<pointsData.length;i++) {
                if (!(pointsData[i].x < xMargins[0] && pointsData[i].y >= yCenterLine[0] && pointsData[i].y < yMargins[1])) {
                    tempData.push(pointsData[i]);
                }
            }
            break;
        case 6:
            for (var i=0;i<pointsData.length;i++) {
                if (!(pointsData[i].x >= xMargins[0] && pointsData[i].x < xCenterLine[0] && pointsData[i].y >= yCenterLine[0] && pointsData[i].y < yMargins[1])) {
                    tempData.push(pointsData[i]);
                }
            }
            break;
        case 7:
            for (var i=0;i<pointsData.length;i++) {
                if (!(pointsData[i].x >= xCenterLine[0] && pointsData[i].x < xMargins[1] && pointsData[i].y >= yCenterLine[0] && pointsData[i].y < yMargins[1])) {
                    tempData.push(pointsData[i]);
                }
            }
            break;
        case 8:
            for (var i=0;i<pointsData.length;i++) {
                if (!(pointsData[i].x >= xMargins[1] && pointsData[i].y >= yCenterLine[0] && pointsData[i].y < yMargins[1])) {
                    tempData.push(pointsData[i]);
                }
            }
            break;
        case 9:
            for (var i=0;i<pointsData.length;i++) {
                if (!(pointsData[i].x < xMargins[0] && pointsData[i].y < yCenterLine[0] && pointsData[i].y >= yMargins[0])) {
                    tempData.push(pointsData[i]);
                }
            }
            break;
        case 10:
            for (var i=0;i<pointsData.length;i++) {
                if (!(pointsData[i].x >= xMargins[0] && pointsData[i].x < xCenterLine[0] && pointsData[i].y < yCenterLine[0] && pointsData[i].y >= yMargins[0])) {
                    tempData.push(pointsData[i]);
                }
            }
            break;
        case 11:
            for (var i=0;i<pointsData.length;i++) {
                if (!(pointsData[i].x >= xCenterLine[0] && pointsData[i].x < xMargins[1] && pointsData[i].y < yCenterLine[0] && pointsData[i].y >= yMargins[0])) {
                    tempData.push(pointsData[i]);
                }
            }
            break;
        case 12:
            for (var i=0;i<pointsData.length;i++) {
                if (!(pointsData[i].x >= xMargins[1] && pointsData[i].y < yCenterLine[0] && pointsData[i].y >= yMargins[0])) {
                    tempData.push(pointsData[i]);
                }
            }
            break;
        case 13:
            for (var i=0;i<pointsData.length;i++) {
                if (!(pointsData[i].x < xMargins[0] && pointsData[i].y < yMargins[0])) {
                    tempData.push(pointsData[i]);
                }
            }
            break;
        case 14:
            for (var i=0;i<pointsData.length;i++) {
                if (!(pointsData[i].x >= xMargins[0] && pointsData[i].x < xCenterLine[0] && pointsData[i].y < yMargins[0])) {
                    tempData.push(pointsData[i]);
                }
            }
            break;
        case 15:
            for (var i=0;i<pointsData.length;i++) {
                if (!(pointsData[i].x >= xCenterLine[0] && pointsData[i].x < xMargins[1] && pointsData[i].y < yMargins[0])) {
                    tempData.push(pointsData[i]);
                }
            }
            break;
        case 16:
            for (var i=0;i<pointsData.length;i++) {
                if (!(pointsData[i].x >= xMargins[1] && pointsData[i].y < yMargins[0])) {
                    tempData.push(pointsData[i]);
                }
            }
            break;
    }
    return tempData;
}

function displaySpecificZones(zones) {
    var dataToHide = getDataPointsForOneZone(zones[0]);
    var dataToShow = [];
    if(zones.length > 1) {
        for (var i=1;i<zones.length;i++) {
            var d = getDataPointsForOneZone(zones[i]);
            for (var j=0;j<dataToHide.length;j++) {
                if (d.indexOf(dataToHide[j]) === -1) {
                    dataToHide.splice(j,1);
                    j--;
                }
            }
        }
    }
    for (var i=0;i<pointsData.length;i++) {
        if (dataToHide.indexOf(pointsData[i]) === -1) {
            dataToShow.push(pointsData[i]);
        }
    }
    d3.selectAll(".dot")
    .data(dataToShow, function(d) {
        return d.label;
    })
    .transition()
    .duration(animationDuration)
    .attr("r",radius);
    
    d3.selectAll(".x-dot-ticks")
    .data(dataToShow, function(d) {
        return d.label;
    })
    .transition()
    .duration(animationDuration)
    .attr("y2",height);
    
    d3.selectAll(".y-dot-ticks")
    .data(dataToShow, function(d) {
        return d.label;
    })
    .transition()
    .duration(animationDuration)
    .attr("x2",0);
    
    d3.selectAll(".dot")
    .data(dataToHide, function(d) {
        return d.label;
    })
    .transition()
    .duration(animationDuration)
    .attr("r",0);
    
    d3.selectAll(".x-dot-ticks")
    .data(dataToHide, function(d) {
        return d.label;
    })
    .transition()
    .duration(animationDuration)
    .attr("y2",height-6);
    
    d3.selectAll(".y-dot-ticks")
    .data(dataToHide, function(d) {
        return d.label;
    })
    .transition()
    .duration(animationDuration)
    .attr("x2",6);
}

function randomizeManualInput() {
    for (var i=1; i<=25; i++){
        $('input[name=label'+i+']').val("Item_"+i);
        $('input[name=series1_'+i+']').val(getRandomArbitary(-1,1));
        $('input[name=series2_'+i+']').val(getRandomArbitary(-1,1));
    }
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function removeIncorrectDataClass() {
    $('.incorrect-data').removeClass('incorrect-data');
    $('.red-tipsy').each(function() {
        $('input[name='+$(this).attr('related-input')+']').tipsy("hide");
    });
}

var minX,maxX,minY,maxY,tipsyElem=null;

function showTipsyTooltipOnProblematicInput (inputName,isEmpty,i) {
    var message = "Should not be empty";
    if(!isEmpty) {
        message = "This is not a number";
    }
    tipsyElem = $('input[name='+inputName+i+']'); // TODO to create local var, because hiding tipsy happens through jQuery selector
    tipsyElem.addClass("incorrect-data");
    tipsyElem.tipsy({ 
        className: 'red-tipsy',
        gravity: 'n',
        fade: true,
        trigger: 'manual',
        title: function() {
            return message;
        }
    });   
    tipsyElem.tipsy('show');
}

function validateInputData(val, inputName, i) {
    if (inputName === "label") {
        if (!val) {
            showTipsyTooltipOnProblematicInput(inputName,true,i); 
            return false;
        } else {
            return true;
        }
    } else {
        if (!val) {
            showTipsyTooltipOnProblematicInput(inputName,true,i); 
            return false;
        } else if (!isNumber(val)) {
            showTipsyTooltipOnProblematicInput(inputName,false,i); 
            return false;
        } else {
            return true;
        }
    }
}

function standardDeviation(values){
  var avg = average(values);
  
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  
  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}

function collectAllData() {
    var jsonObject = {
        "label":[],
        "series1":[],
        "series2":[]
    },
    dataVerifier = true,
    lVerifier,s1Verifier,s2Verifier,
    l,s1,s2,problematicInput;
    
    for (var i=1;i<=25;i++) {
        l = $('input[name=label'+i+']').val();
        s1 = $('input[name=series1_'+i+']').val();
        s2 = $('input[name=series2_'+i+']').val();
        if (!(!l && !s1 && !s2)){
            lVerifier = validateInputData(l,"label",i);
            s1Verifier = validateInputData(s1,"series1_",i);
            s2Verifier = validateInputData(s2,"series2_",i);
            if (lVerifier && s1Verifier && s2Verifier) {
                jsonObject.label.push(l);
                jsonObject.series1.push(parseFloat(s1));
                jsonObject.series2.push(parseFloat(s2));
            } else {
                dataVerifier = false;
                break;
            }
        }
    }
    if (dataVerifier) {
        var xAvg = average(jsonObject.series1);
        var yAvg = average(jsonObject.series2);
        var xStdDev = standardDeviation(jsonObject.series1);
        var yStdDev = standardDeviation(jsonObject.series2);
        var pts = [];

        for (i = 0, l = jsonObject.label.length; i < l; i++) {
            pts.push({
                "label": jsonObject.label[i],
                "x": jsonObject.series1[i],
                "y": jsonObject.series2[i]
            });
        }

        resetGlobalVars();
        xCenterLine.push(xAvg);
        yCenterLine.push(yAvg);
        xMargins.push(xAvg - xStdDev);
        xMargins.push(xAvg + xStdDev);
        yMargins.push(yAvg - yStdDev);
        yMargins.push(yAvg + yStdDev);
        pointsData = pts;
        minX = d3.min(jsonObject.series1);
        maxX = d3.max(jsonObject.series1);
        minY = d3.min(jsonObject.series2);
        maxY = d3.max(jsonObject.series2);
        updateChart(pointsData);
    }
    return false;
}

function resetGlobalVars() {
    xCenterLine = [];
    xMargins = [];
    yCenterLine = [];
    yMargins = [];
    pointsData = [];
}

function getRandomArbitary (min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

document.onready = function(){
    randomizeManualInput();
    setTimeout(collectAllData,400);
}

var xCenterLine,
xMargins,
yCenterLine,
yMargins,
pointsData;

var previousMouseOverPoint = 'null';

var margin = {
    top: 20, 
    right: 50, 
    bottom: 40, 
    left: 60
},
//width = 840 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom,
width = $("#chart").width() - margin.left - margin.right,
//height = $("#chart").height() - margin.top - margin.bottom,
radius = 4,
animationDuration = 700;

var x = d3.scale.linear()
.range([0, width]);

var y = d3.scale.linear()
.range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
.scale(x)
.tickSize(4)
.orient("bottom");

var yAxis = d3.svg.axis()
.scale(y)
.tickSize(4)
.orient("left");

var svg = d3.select("#chart").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append('rect').attr('width',width).attr('height',height).style('visibility','hidden');


x.domain([0,1]).range([0,width]);
y.domain([0,1]).range([height,0]);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("Series 1");

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 8)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Series 2")

svg.selectAll("g.axis g text")
    .attr('fill',"#777");

svg.selectAll('.x-margins')
    .data([0,0])
    .enter()
    .append('line')
    .attr('class','x-margins limits')
    .attr('x1',function(d){
        return x(d);
    })
    .attr('y1',0)
    .attr('x2',function(d){
        return x(d);
    })
    .attr('y2',height)
    .attr('stroke','rgb(48,160,59)')
        
svg.selectAll('.y-margins')
    .data([0,0])
    .enter()
    .append('line')
    .attr('class','y-margins limits')
    .attr('x1',0)
    .attr('y1',function(d){
        return y(d);
    })
    .attr('x2',width)
    .attr('y2',function(d){
        return y(d);
    })
    .attr('stroke','red');

svg.selectAll('.x-center')
    .data([0])
    .enter()
    .append('line')
    .attr('class','x-center limits')
    .attr('x1',function(d){
        return x(d);
    })
    .attr('y1',0)
    .attr('x2',function(d){
        return x(d);
    })
    .attr('y2',height)
    .attr('stroke','#ccc');

svg.selectAll('.y-center')
    .data([0])
    .enter()
    .append('line')
    .attr('class','y-center limits')
    .attr('x1',0)
    .attr('y1',function(d){
        return y(d);
    })
    .attr('x2',width)
    .attr('y2',function(d){
        return y(d);
    })
    .attr('stroke','#ccc');

function updateChart(dataPoints) {
    var xDataMargin = (maxX-minX)/8;
    var yDataMargin = (maxY-minY)/8;
    x.domain([minX-xDataMargin, maxX+xDataMargin]).range([0,width]);
    y.domain([minY-yDataMargin, maxY+yDataMargin]).range([height,0]);

    svg.select("g.y.axis").transition().delay(0).duration(animationDuration).call(yAxis);
    svg.select("g.x.axis").transition().delay(0).duration(animationDuration).call(xAxis);

    svg.selectAll("g.axis g text")
    .attr('fill',"#777");

    svg.selectAll('.x-margins')
    .data(xMargins)
    .transition()
    .duration(animationDuration)
    .attr('x1',function(d){
        return x(d);
    })
    .attr('y1',0)
    .attr('x2',function(d){
        return x(d);
    })
    .attr('y2',height-6)
    .attr('stroke','rgb(48,160,59)')
        
    svg.selectAll(".x-margins-label")
    .data(xMargins)
    .enter()
    .append('text')
    .attr('class',"x-margins-label")
    .attr("x",0)
    .attr("y",-3)
    .attr("text-anchor","middle")
    .attr("fill","green")
    .text(function(d){
        return d.toFixed(2);
    });

    svg.selectAll(".x-margins-label")
    .data(xMargins)
    .transition()
    .duration(animationDuration)
    .attr("x",function(d){
        return x(d);
    })
    .attr("y",-3)
    .attr("text-anchor","middle")
    .attr("fill","green")
    .text(function(d){
        return d.toFixed(2);
    });

    svg.selectAll('.y-margins')
    .data(yMargins)
    .transition()
    .duration(animationDuration)
    .attr('x1',6)
    .attr('y1',function(d){
        return y(d);
    })
    .attr('x2',width)
    .attr('y2',function(d){
        return y(d);
    })
    .attr('stroke','red');

    svg.selectAll(".y-margins-label")
    .data(yMargins)
    .enter()
    .append('text')
    .attr('class',"y-margins-label")
    .attr("x",width+6)
    .attr("y",height)
    .attr("fill","red")
    .attr("dy","0.3em")
    .text(function(d){
        return d.toFixed(2);
    });

    svg.selectAll(".y-margins-label")
    .data(yMargins)
    .transition()
    .duration(animationDuration)
    .attr("x",width+6)
    .attr("y",function(d){
        return y(d);
    })
    .attr("fill","red")
    .attr("dy","0.3em")
    .text(function(d){
        return d.toFixed(2);
    });

    svg.selectAll('.x-center')
    .data(xCenterLine)
    .transition()
    .duration(animationDuration)
    .attr('x1',function(d){
        return x(d);
    })
    .attr('y1',0)
    .attr('x2',function(d){
        return x(d);
    })
    .attr('y2',height)
    .attr('stroke','#ccc');

    svg.selectAll(".x-center-label")
    .data(xCenterLine)
    .enter()
    .append('text')
    .attr('class',"x-center-label")
    .attr("x",0)
    .attr("y",-3)
    .attr("text-anchor","middle")
    .attr("fill","#aaa")
    .text(function(d){
        return d.toFixed(2);
    });

    svg.selectAll(".x-center-label")
    .data(xCenterLine)
    .transition()
    .duration(animationDuration)
    .attr("x",function(d){
        return x(d);
    })
    .attr("y",-3)
    .attr("text-anchor","middle")
    .attr("fill","#aaa")
    .text(function(d){
        return d.toFixed(2);
    });

    svg.selectAll('.y-center')
    .data(yCenterLine)
    .transition()
    .duration(animationDuration)
    .attr('x1',0)
    .attr('y1',function(d){
        return y(d);
    })
    .attr('x2',width)
    .attr('y2',function(d){
        return y(d);
    })
    .attr('stroke','#ccc');

    svg.selectAll(".y-center-label")
    .data(yCenterLine)
    .enter()
    .append('text')
    .attr('class',"y-center-label")
    .attr("x",width+6)
    .attr("y",height)
    .attr("fill","#aaa")
    .attr("dy","0.3em")
    .text(function(d){
        return d.toFixed(2);
    });

    svg.selectAll(".y-center-label")
    .data(yCenterLine)
    .transition()
    .duration(animationDuration)
    .attr("x",width+6)
    .attr("y",function(d){
        return y(d);
    })
    .attr("fill","#aaa")
    .attr("dy","0.3em")
    .text(function(d){
        return d.toFixed(2);
    });

    svg.selectAll(".x-dot-ticks").data(dataPoints)
    .enter().append("line").attr("class","x-dot-ticks")
    .attr("x1",function(d) {
        return x(d.x);
    }).attr("y1",height-6).attr("x2",function(d) {
        return x(d.x);
    }).attr("y2",height-6);

    svg.selectAll(".x-dot-ticks").data(dataPoints)
    .exit().transition().duration(animationDuration).attr("y2",height-6);

    svg.selectAll(".x-dot-ticks").data(dataPoints)
    .transition().duration(animationDuration)
    .attr("x1",function(d) {
        return x(d.x);
    }).attr("y1",height-6).attr("x2",function(d) {
        return x(d.x);
    }).attr("y2",height);
        
    svg.selectAll(".y-dot-ticks").data(dataPoints)
    .enter().append("line").attr("class","y-dot-ticks")
    .attr("y1",function(d) {
        return y(d.y);
    }).attr("x1",6).attr("y2",function(d) {
        return y(d.y);
    }).attr("x2",6);

    svg.selectAll(".y-dot-ticks").data(dataPoints)
    .exit().transition().duration(animationDuration).attr("x2",6);

    svg.selectAll(".y-dot-ticks").data(dataPoints)
    .transition().duration(animationDuration)
    .attr("y1",function(d) {
        return y(d.y);
    }).attr("x1",6).attr("y2",function(d) {
        return y(d.y);
    }).attr("x2",0);

    svg.selectAll(".dot").data(dataPoints)
    .enter().append("circle")
    .attr("id", function(d,i) {
        return "dot"+i;
    })
    .attr("class", function(d,i) {
        return "dot "+i;
    }).attr("r",0).attr("cx", function(d) {
        return x(d.x);
    }).attr("cy", function(d) {
        return y(d.y);
    }).attr("stroke-width", 0)
    .on('mouseover', function(){
        onMouseOverEventHandler(this);
    })
    .on('mouseout', function() {
        onMouseOutEventHandler(this);
    })
    .style("fill", function(d) {
        return color(d.species);
    });

    svg.selectAll(".dot")
    .data(dataPoints, function(d){
        return d;
    })
    .exit()
    .transition()
    .duration(animationDuration)
    .attr("r",0)
    .remove();

    svg.selectAll(".dot")
    .data(dataPoints)
    .transition()
    .duration(animationDuration)
    .attr("r",radius)
    .attr("cx", function(d) {
        return x(d.x);
    })
    .attr("cy", function(d) {
        return y(d.y);
    });
    
    $('svg circle').tipsy({ 
        gravity: 'w', 
        html: true, 
        title: function() {
            var d = this.__data__;
            var idx = +$(this).attr("id").substring(3)+1;
            var tipsyInnerHTML = '<span class="bold">'+d.label+'</span><br/>'+
            '<span>x - '+$('input[name=series1_'+idx+']').val()+'</span><br/>'+
            '<span>y - '+$('input[name=series2_'+idx+']').val()+'</span><br/>'+
            '<div class="clear"></div>';
            return tipsyInnerHTML; 
        }
    });
}

function onMouseOutEventHandler(obj) {
    var idx = +$(obj).attr("id").substring(3);
    svg.selectAll(".idx"+idx)
    .data([])
    .exit()
    .remove();
    var intIdx = idx+1;
    d3.select(obj).transition().duration(animationDuration/2).attr('r',radius).attr('stroke-width',0);
    d3.selectAll('g.axis g text').transition().duration(animationDuration).style('opacity',1);
    d3.selectAll('g.axis g line').transition().duration(animationDuration).style('opacity',1);
            
    toggleInputRowsClass(intIdx);
}

function toggleInputRowsClass(id) {
    $('input[name=label'+id+']').toggleClass('emphasize');
    $('input[name=series1_'+id+']').toggleClass('emphasize');
    $('input[name=series2_'+id+']').toggleClass('emphasize');
}

function onMouseOverEventHandler(obj) {
    var elem = d3.select(obj).data()[0];
    var idx = parseInt(obj.id.substring(3));
    
    toggleInputRowsClass(idx+1);

    var circleCoords = {
        'points':[{
            'x':elem.x,
            'y':elem.y
        }]
    };
    var coords = [{
        'source':{
            'x':obj.cx.animVal.value,
            'y':obj.cy.animVal.value
        },
        'target':{
            'x':0,
            'y':height
        }
    }];
    d3.selectAll('g.axis g text')
    .transition().duration(animationDuration).style('opacity',0.01);

    d3.selectAll('g.axis g line')
    .transition().duration(animationDuration).style('opacity',0.01);

    svg.selectAll(".vertical-line idx"+idx).data(coords)
    .enter().append('line')
    .attr('class','vertical-line idx'+idx)
    .attr('x1', function(d){
        return d.source.x;
    })
    .attr('y1', function(d){
        return d.source.y + radius * 1.2;
    })
    .attr('x2', function(d){
        return d.source.x;
    })
    .attr('y2', function(d){
        return d.target.y;
    })
    .attr("stroke-width", 1)
    .attr('stroke-dasharray','1,1')
    .attr("stroke", "rgb(31, 119, 180)")
    .style('opacity',0)
    .transition()
    .duration(animationDuration)
    .style('opacity',1);
                
    svg.selectAll(".horz-line idx"+idx)
    .data(coords)
    .enter()
    .append('line')
    .attr('class','horz-line idx'+idx)
    .attr('x1', function(d){
        return d.source.x - radius * 1.2;
    })
    .attr('y1', function(d){
        return d.source.y;
    })
    .attr('x2', function(d){
        return d.target.x;
    })
    .attr('y2', function(d){
        return d.source.y;
    })
    .attr("stroke-width", 1)
    .attr('stroke-dasharray','1,1')
    .attr("stroke", "rgb(31, 119, 180)")
    .style('opacity',0)
    .transition()
    .duration(animationDuration)
    .style('opacity',1);
                
    svg.selectAll('.x-tooltip idx'+idx)
    .data(coords)
    .enter()
    .append('text')
    .attr('class','x-tooltip labels idx'+idx)
    .attr('x',function(d){
        return d.source.x;
    })
    .attr('y',function(d){
        return d.target.y+12;
    })
    .attr("dy", ".35em")
    .text(circleCoords.points[0].x.toFixed(2))
    .transition()
    .duration(animationDuration)
    .style('opacity',1);
                
    svg.selectAll('.y-tooltip idx'+idx)
    .data(coords)
    .enter()
    .append('text')
    .attr('class','y-tooltip labels idx'+idx)
    .attr('x',function(d){
        return d.target.x-20;
    })
    .attr('y',function(d){
        return d.source.y;
    })
    .attr("dy", ".35em")
    .text(circleCoords.points[0].y.toFixed(2))
    .transition()
    .duration(animationDuration)
    .style('opacity',1);
           
    d3.select(obj).transition().duration(animationDuration/2).attr('r',radius*1.2).attr('stroke-width',2);
}
