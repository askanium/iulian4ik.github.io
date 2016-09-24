/**
 * gaugeChart
 */
'use strict';

var Gauge = (function (d3) {
  var IndicatorArrow = (function (d3) {
    function IndicatorArrow (mainSvg, mainTransform, lineData, indicatorTranslation) {
      var pointerLine = d3.svg.line().interpolate('monotone');

      var mainGroup = mainSvg.append('g').data([lineData])
        .attr('class', 'miniPointer')
        .attr('transform', mainTransform);

      // TODO apply rotation dynamically, depending on gauge settings from constructor.
      var rotationalGroup = mainGroup.append('g')
        .attr('transform', 'rotate(0)');

      var actualPointer = rotationalGroup.append('path')
        .attr('d', pointerLine)
        .style('fill', '#666')
        .attr('transform', 'translate(0,' + indicatorTranslation +')');


      this.changeAngle = function (newAngle, transitionTime) {
        rotationalGroup.transition()
          .duration(transitionTime)
          .ease('elastic')
          .attr('transform', 'rotate(' + newAngle + ')');
      }
    }

    return IndicatorArrow;
  }(d3));

  var MainLabel = (function () {
    function MainLabel (mainSvg, labelSize, labelTx, labelText) {
      var d3Label = mainSvg.append('text')
        .attr('transform', labelTx)
        .text(labelText)
        .style('font-size', labelSize + 'em')
        .style('font-family', 'sans-serif')
        .style('font-weight', 'bold')
        .style('fill', '#666')
        .attr('text-anchor', 'middle');

      this.changeText = function (newText, transitionTime) {
        d3Label.transition()
          .duration(transitionTime)
          .text(newText);
      }
    }

    return MainLabel;
  }());

  function deg2rad(deg) {
    return deg * Math.PI / 180;
  }

  function Gauge (container) {
    var config = {
      // TODO: It looks strange, it would be better if 
      // sizes would be constant and just the scale
      // would be managed
      set size (newSize) {config.halfSize = newSize / 2},
      get size () {return config.halfSize * 2},
      halfSize: 125,

      clipWidth: 250,
      clipHeight: 250,
      ringInset: 15,
      ringWidth: 15,

      pointerWidth: 8,
      pointerTailLength: 5,
      pointerHeadLengthPercent: 0.7,

      renderSecondaryIndicator: false,

      minValue: 0,
      maxValue: 100,

      get angleRange () {return config.maxAngle - config.minAngle},
      minAngle: -135,
      maxAngle: 135,

      transitionMs: 4000,

      majorTicks: 10,
      labelFormat: d3.format(',g'),
      labelInset: 42,
      labelSize: 1.8,

      arcColorFn: ['#FF5555', '#FFDD55', '#44AA00']
      //arcColorFn          : d3.interpolateHsl(d3.rgb('#ff0000'), d3.rgb('#00ff00'))
    };

    var pointerHeadLength = undefined;
    var value = 0;

    var scaleValueToAngle = getScaleValueToAngleFunc();

    var mainSvg = undefined;

    var arc = undefined;
    var scale = undefined;
    var ticks = undefined;
    var tickData = undefined;
    // var scoreLabel = undefined;

    var primaryIndicator;
    var secondaryIndicator;

    var scoreLabel;
    var infoLabel;


    function getScaleValueToAngleFunc () {
      return d3.scale.linear()
        .range([config.minAngle, config.maxAngle])
        .domain([config.minValue, config.maxValue])
    }

    function updateConfiguration(configuration) {
      // Copy new configuration to the configuration object
      for ( var key in configuration ) {
        if ( configuration.hasOwnProperty(key) ) {
          config[key] = configuration[key];
        }
      }

      pointerHeadLength = Math.round(config.halfSize * config.pointerHeadLengthPercent);

      ticks = scaleValueToAngle.ticks(config.majorTicks);
      tickData = d3.range(3).map(function (d) {
        return d === 0 ? 1 / 2 : 1 / 4;
      });

      arc = createArc();

      function createArc() {
        return d3.svg.arc()
          .innerRadius(config.halfSize - config.ringWidth - config.ringInset)
          .outerRadius(config.halfSize - config.ringInset)
          .startAngle(function (d, i) {
            var ratio = [0, 0.5, 0.8];
            return deg2rad(config.minAngle + (ratio[i] * config.angleRange));
          })
          .endAngle(function (d, i) {
            //var ratio = d * (i+1);
            var ratio = [0.5, 0.8, 1];
            return deg2rad(config.minAngle + (ratio[i] * config.angleRange));
          });
      }
    }

    function centerTranslation(horizontalOffset, verticalOffset) {
      var h = config.halfSize + horizontalOffset;
      var v = config.halfSize + verticalOffset;

      return 'translate(' + h + ',' + v + ')';
    }

    function isRendered() {
      return (mainSvg !== undefined);
    }

    function render(newValue) {
      // Create mainSvg
      mainSvg = d3.select(container)
        .append('svg:svg')
        .attr('class', 'gauge')
        .attr('width', config.clipWidth)
        .attr('height', config.clipHeight);

      // Translation of the whole gauge
      var centerTx = centerTranslation(0, 0);

      // Create arc
      var arcs = mainSvg.append('g')
        .attr('class', 'arc')
        .attr('transform', centerTx);

      arcs.selectAll('path')
        .data(tickData)
        .enter().append('path')
        .attr('fill', function (d, i) {
          return config.arcColorFn[i];
        })
        .attr('d', arc);

      // Text labels around the arc
      var lg = mainSvg.append('g')
        .attr('class', 'label')
        .attr('transform', centerTx);

      lg.selectAll('text')
        .data(ticks)
        .enter().append('text')
        .attr('transform', function (d) {
          return 'rotate(' + scaleValueToAngle(d) + ') \
            translate(0,' + (config.labelInset - config.halfSize) + ')';
        })
        .text(config.labelFormat)
        .style('fill', '#999')
        // .style('font-size', '60%')
        .style('font-weight', '700')
        .attr('text-anchor', 'middle');

      // Indicator shapes (considering the arc oriented vertically)
      var primaryIndicatorShape = [
        [config.pointerWidth / 2, 0],
        [0, -pointerHeadLength],
        [-(config.pointerWidth / 2), 0],
        [0, config.pointerTailLength],
        [config.pointerWidth / 2, 0]];

      var secondaryIndicatorShape = [
        [8, 0],
        [0, 8],
        [-8, 0]
      ];

      // Create indicators
      primaryIndicator = new IndicatorArrow(mainSvg,
        centerTx, primaryIndicatorShape, 0);

      if ( config.renderSecondaryIndicator )
        secondaryIndicator = new IndicatorArrow(mainSvg, 
          centerTx, secondaryIndicatorShape, -120);

      // Create two big labels
      scoreLabel = new MainLabel(
        mainSvg,
        config.labelSize,
        centerTranslation(0, 85),
        '0');

      infoLabel = new MainLabel(
        mainSvg,
        config.labelSize,
        centerTranslation(0, 75),
        '');
    }

    function updateIndicator (indicator, newValue) {
      var newAngle = scaleValueToAngle(newValue);
      indicator.changeAngle(newAngle, config.transitionMs);
    }

    function updatePrimaryIndicator (newValue) {
      updateIndicator(primaryIndicator, newValue);

      scoreLabel.changeText(newValue + '%', config.transitionMs)
    }

    function updateSecondaryIndicator (newValue) {
      updateIndicator(secondaryIndicator, newValue);
    }

    function updateScoreLabel(newValue) {
      scoreLabel.changeText(newValue, config.transitionMs);
    }

    function updateInfoLabel(newValue) {
      infoLabel.changeText(newValue, config.transitionMs);
    }

    return {
      updateConfiguration: updateConfiguration,
      updatePrimaryIndicator: updatePrimaryIndicator,
      updateSecondaryIndicator: updateSecondaryIndicator,
      updateScoreLabel: updateScoreLabel,
      updateInfoLabel: updateInfoLabel,

      isRendered: isRendered,

      render: render
    };
  }

  return Gauge;

}(d3));
