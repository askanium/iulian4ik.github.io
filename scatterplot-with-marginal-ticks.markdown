---
layout: page
title: Scatterplot with marginal ticks
categories: visualization d3.js
---

This is one of my first charts made in d3.js. And it was made long before I knew what a scatterplot with marginal ticks is.

The code for it was written ~5 years ago and I didn't revise it, so there should be space for improvement. 

Initially, the chart took input data from the table below and sent it to a remote endpoint for processing. After processing, the segmented data returned and was visualized in the chart. However, for demonstration purpose, I've refactored it a bit to make all the computations inplace. 

The chart displays the data points' distribution and shows which points fall above/below one standard deviation. You can also visualize the `Biggest Series 1` and `Biggest Series 2` data.

Below the chart there are 2 buttons. The `Randomize&Update` generates random variables and process them. The `Update` button requires you to first make some changes to the table (it is editable) and then updates the table with the newly computed coefficients.

On mouseover, the axis labels fade away, leaving you with precise labels for the point you are focused on at the moment.

Enjoy!

**Dependencies:** D3.js, jQuery 1.11.3, tipsy

<div>
    <link type="text/css" rel="stylesheet" href="/css/scatterplot-with-marginal-ticks.css" />
    <div style="height: 20px;width: 100%;"></div>
    <div id="controls">
        <button onclick="displaySpecificZones([4,8,12,16])">Biggest Series 1</button>
        <button onclick="displaySpecificZones([1,2,3,4])">Biggest Series 2</button>
        <button onclick="collectAllData()">All</button>
    </div>
    <div id="chart"></div>

    <div id="input">
        <form name="userInputForm" onSubmit="return collectAllData()">

        <div class="state-changers">
            <button onclick="randomizeManualInput()">Randomize&amp;Update</button>
            <button name="Submit" type="submit" value="Update">Update Chart</button>
        </div>
    
            <div class="form_groove_outer">
                <div class="form_groove_inner">

                    <table cellspacing="0" cellpadding="1" class="datasheet">
                        <thead>
                            <tr>
                                <th>Label</th>
                                <th>Series 1</th>
                                <th>Series 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" name="label1" class="manualInput" value="Item1" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input id="series1_1" type="text" name="series1_1" class="manualInput" value="3021" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_1" class="manualInput" value="2121" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label2" class="manualInput" value="Item2" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_2" class="manualInput" value="231" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_2" class="manualInput" value="112" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label3" class="manualInput" value="Item3" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_3" class="manualInput" value="1856" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_3" class="manualInput" value="945" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label4" class="manualInput" value="Item4" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_4" class="manualInput" value="765" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_4" class="manualInput" value="756" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label5" class="manualInput" value="Item5" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_5" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_5" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label6" class="manualInput" value="Item6" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_6" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_6" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label7" class="manualInput" value="Item7" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_7" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_7" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label8" class="manualInput" value="Item8" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_8" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_8" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label9" class="manualInput" value="Item9" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_9" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_9" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label10" class="manualInput" value="Item10" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_10" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_10" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label11" class="manualInput" value="Item11" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_11" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_11" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label12" class="manualInput" value="Item12" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_12" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_12" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label13" class="manualInput" value="Item13" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_13" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_13" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label14" class="manualInput" value="Item14" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_14" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_14" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label15" class="manualInput" value="Item15" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_15" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_15" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label16" class="manualInput" value="Item16" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_16" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_16" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label17" class="manualInput" value="Item17" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_17" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_17" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label18" class="manualInput" value="Item18" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_18" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_18" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label19" class="manualInput" value="Item19" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_19" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_19" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label20" class="manualInput" value="Item20" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_20" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_20" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label21" class="manualInput" value="Item21" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_21" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_21" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label22" class="manualInput" value="Item22" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_22" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_22" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label23" class="manualInput" value="Item23" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_23" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_23" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label24" class="manualInput" value="Item24" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_24" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_24" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="label25" class="manualInput" value="Item25" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series1_25" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                                <td><input type="text" name="series2_25" class="manualInput" value="" onfocus="removeIncorrectDataClass()" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </form>
    </div>
    
<script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="https://code.jquery.com/jquery-1.11.3.js"></script>
<script src="/assets/javascripts/tipsy.js"></script>
<script type="text/javascript" src="/assets/javascripts/gallery/scatterplot-with-marginal-ticks.js"></script>
    </div>
