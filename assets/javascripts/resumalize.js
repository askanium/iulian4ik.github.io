'use strict';

document.addEventListener( 'DOMContentLoaded', function () {
    var resumalizeChart;
    var resumalizeDom = document.getElementById('resumalize');
    d3.json('resumalize.json', function (error, data) {
        resumalizeChart = resumalize(resumalizeDom, {});
        resumalizeChart.render(data);
    });

}, false );


var resumalize = function(container, data, configuration) {
    var that = {};
    var config = {
        chartHeight					: 400,
        margin                      : {top: 10, right: 60, bottom: 30, left: 45},

        transitionMs				: 4000,
        xTickFormat					: d3.time.format('%Y'),

        workItemsLabel              : 'work',
        learningItemsLabel          : 'learning',
        noEndDateCharacter          : '-'

    };

    var width = undefined;
    var height = undefined;

    var minDate = new Date().toJSON();
    var maxDate = '1970-01-01';

    var itemProps = [config.workItemsLabel, config.learningItemsLabel];

    var svg = undefined;

    var x = undefined;
    var y = undefined;
    var area = undefined;

    var xAxis = undefined;
    var yAxis = undefined;
    var timeLineAxis = undefined;
    var timeLineTickValues = undefined;
    var ticks = undefined;
    var tickData = undefined;

    var workplace = undefined;
    var volunteerPlaces = undefined;
    var learningPlaces = undefined;
    var coursePlaces = undefined;

    function getYearDatesBetweenTwoDates ( minDate, maxDate ) {
        var minDateYear = parseInt(minDate);
        var maxDateYear = parseInt(maxDate);
        var result = [];

        for ( var i = minDateYear; i <= maxDateYear; i++ ) {
            result.push(new Date(i, 0, 1));
        }

        return result;
    }

    function extractMinAndMaxDates ( data ) {
        itemProps.forEach(function (prop) {
            data[prop] = data[prop] || [];
            data[prop].forEach(function ( xpItem ) {
                minDate = minDate > xpItem.dateStart ? xpItem.dateStart : minDate;
                maxDate = xpItem.dateEnd === config.noEndDateCharacter
                    ? new Date().toJSON()
                    : (maxDate < xpItem.dateEnd
                        ? xpItem.dateEnd
                    : maxDate);
            });
        });
        minDate = new Date(parseInt(minDate), 0, 1).toJSON();
        maxDate = new Date(parseInt(maxDate), 0, 1, 2, 0, 0).toJSON();
    }

    function getAreaObjectForItem ( item ) {
        var dateStart = new Date(item.dateStart);
        var startAsc = new Date(item.dateStart);
        var dateEnd = item.dateEnd === '-' ? new Date() : new Date(item.dateEnd);
        var endAsc = item.dateEnd === '-' ? new Date() : new Date(item.dateEnd);
        var areaObj = [];

        startAsc.setMonth(startAsc.getMonth() + 2);
        endAsc.setMonth(endAsc.getMonth() - 2);

        areaObj.push({date: dateStart, y: 0});
        areaObj.push({date: startAsc, y: 10});
        areaObj.push({date: endAsc, y: 10});
        areaObj.push({date: dateEnd, y: 0});

        return areaObj;
    }

    function dataPreparation ( data ) {
        extractMinAndMaxDates(data);
        itemProps.forEach(function (prop) {
            data[prop] = data[prop] || [];
            data[prop].forEach(function ( xpItem ) {
                xpItem.chartCoords = getAreaObjectForItem(xpItem);
            });
        });
    }

    function configure ( configuration ) {
        var prop;
        for ( prop in configuration ) {
            config[prop] = configuration[prop];
        }

        width = d3.select(container).node().offsetWidth - config.margin.left - config.margin.right;
        height = config.chartHeight - config.margin.top - config.margin.bottom;

        x = d3.time.scale()
            .range([config.margin.left, width - config.margin.right])
            .domain([new Date(minDate), new Date(maxDate)]);

        y = d3.scale.linear()
            .range([height, 0])
            .domain([0, 150]);

        area = d3.svg.area()
            .x(function (d) {
                return x(new Date(d.date));
            })
            .y0(height)
            .y1(function (d) {
                return y(d.y);
            });

        timeLineTickValues = getYearDatesBetweenTwoDates(minDate, maxDate);

        //ticks = x.ticks(d3.time.year, timeLineTickValues.length);
        //ticks = x.ticks(5);
        //tickData = d3.range().map(function(d) { return d === 0 ? 1/2 : 1/4;});

        xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .tickValues(timeLineTickValues)
            .tickFormat(config.xTickFormat);

        yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

    }
    that.configure = configure;

    function isRendered() {
        return (svg !== undefined);
    }
    that.isRendered = isRendered;

    function render ( data ) {
        svg = d3.select(container)
            .append('svg:svg')
            .attr('class', 'resumalize')
            .attr('width', '100%')
            .attr('height', config.chartHeight + 'px')
            .append('g')
            .attr('class', 'g_area')
            .attr('transform', 'translate(' + config.margin.left + ',' + config.margin.top + ')');

        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

        update(data === undefined ? {} : data, {});
    }
    that.render = render;

    function update ( newData, newConfiguration ) {
        dataPreparation(newData);
        configure(newConfiguration);

        svg.select('.x.axis')
            .call(xAxis);

        workplace = svg.selectAll('.workplace')
            .data(newData[config.workItemsLabel])
            .enter()
            .append('g')
            .attr('class', 'workplace');

        workplace
            .append('path')
            .attr('class', 'area')
            .attr('d', function (d) { return area(d.chartCoords)})
            .style('fill', '#333');

    }
    that.update = update;

    configure(configuration);

    return that;
};