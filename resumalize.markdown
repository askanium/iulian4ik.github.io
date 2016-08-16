---
layout: page
title: Resumalize
permalink: /resumalize/
tags: resumalize
---
<link rel="stylesheet" type="text/css" href="../css/resumalize.css">
<div id="resumalize"></div>

<svg height="8" width="8" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
        <pattern id="dots-1" patternUnits="userSpaceOnUse" width="8" height="8">
            <rect x="1" y="1" width="1" height="1" fill="#fff"></rect>
        </pattern>
    </defs>
</svg>
<script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="../assets/javascripts/resumalize.js" type="application/javascript"></script>
<script type="text/javascript">
    document.addEventListener( 'DOMContentLoaded', function () {
        var resumalizeChart;
        var resumalizeDom = document.getElementById('resumalize');

        d3.json('../assets/data/resumalize/resumalize.json', function (error, data) {
            resumalizeChart = resumalize(resumalizeDom, {});
            resumalizeChart.render(data);
        });

    }, false );
</script>