---
layout: page
collection: quizzes_javascripts
title: Variables
---

<!-- <div id="result" class='margin-tb-md'></div> -->
<div id="quizContent"></div>

<button id="nextQuestion" disabled="true" onclick="nextQuestionBtnHandler();">Next</button>

<script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script type="text/javascript" src="/assets/scripts/charts/gauge.js"></script>
<script type="text/javascript">
    var quizContent = {
        questions: [
            {
                body: '' +
'<p>What will be the value of the <code class="highlighter-rouge">myVariable</code> defined as follows?</p>' +

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="kd">var</span> <span class="nx">myVariable</span><span class="p">;</span>' +
'</code></pre>' +
'</div>',
                answers: [
                    '<code class="highlighter-rouge">null</code>',
                    '<code class="highlighter-rouge">undefined</code>',
                    'non-existent',
                    'will throw an error'
                ],
                correctAnswer: 1
            },
            {
                body: '' + 
'<p>What are valid variable names out of the list below.</p>' +

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="kd">var</span> <span class="mi">123</span><span class="p">;</span>\n' +
'<span class="kd">var</span> <span class="nx">oneTwoThree</span><span class="p">;</span>\n' +
'<span class="kd">var</span> <span class="mi">1</span><span class="nx">TwoThree</span><span class="p">;</span>\n' +
'<span class="kd">var</span> <span class="nx">a123</span><span class="p">;</span>\n' +
'<span class="kd">var</span> <span class="nx">one</span> <span class="nx">two</span> <span class="nx">three</span><span class="p">;</span>\n' +
'<span class="kd">var</span> <span class="nx">_$</span><span class="p">;</span>\n' +
'</code></pre>\n' +
'</div>',
                answers: [
                    '<code class="highlighter-rouge">123, oneTwoThree, 1TwoThree, a123</code>',
                    '<code class="highlighter-rouge">oneTwoThree, a123, one two three</code>',
                    '<code class="highlighter-rouge">oneTwoThree, 1TwoThree, a123</code>',
                    '<code class="highlighter-rouge">oneTwoThree, a123, _$</code>',
                    '<code class="highlighter-rouge">oneTwoThree, a123</code>',
                ],
                correctAnswer: 3
            },
            {
                body: '' + 
'<p>What will be the value of <code class="highlighter-rouge">planets</code> in the end?</p>' +

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="kd">var</span> <span class="nx">planets</span> <span class="o">=</span> <span class="mi">8</span><span class="p">;</span>\n' +
'<span class="kd">var</span> <span class="nx">nrWithPluto</span> <span class="o">=</span> <span class="nx">planets</span><span class="p">;</span>\n' +

'<span class="nx">nrWithPluto</span> <span class="o">=</span> <span class="nx">nrWithPluto</span> <span class="o">+</span> <span class="mi">1</span><span class="p">;</span>\n' +

'<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">planets</span><span class="p">);</span>\n' +
'</code></pre>\n' +
'</div>',
                answers: [
                    '8',
                    '9',
                ],
                correctAnswer: 0
            },
            {
                body: '' + 
'<p>Which number(s) is/are defined incorrectly?</p>' +

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="kd">var</span> <span class="nx">pointThree</span> <span class="o">=</span> <span class="p">.</span><span class="mi">3</span><span class="p">;</span>\n' +
'<span class="kd">var</span> <span class="nx">huge</span> <span class="o">=</span> <span class="mi">1</span><span class="nx">e42</span><span class="p">;</span>\n' +
'<span class="kd">var</span> <span class="nx">negative</span> <span class="o">=</span> <span class="o">-</span>   <span class="mi">5</span><span class="p">;</span>\n' +
'</code></pre>\n' +
'</div>',
                answers: [
                    '<code class="highlighter-rouge">.3</code>',
                    '<code class="highlighter-rouge">1e42</code>',
                    '<code class="highlighter-rouge">-&nbsp;&nbsp;&nbsp;5</code>',
                    '<code class="highlighter-rouge">.3</code> and <code class="highlighter-rouge">1e42</code>',
                    '<code class="highlighter-rouge">.3</code> and <code class="highlighter-rouge">-&nbsp;&nbsp;&nbsp;5</code>',
                    '<code class="highlighter-rouge">1e42</code> and <code class="highlighter-rouge">-&nbsp;&nbsp;&nbsp;5</code>',
                    'they are all defined incorrectly',
                    'they are all defined correctly',
                ],
                correctAnswer: 7
            },
            {
                body: '' +
'<p>What is the length of the following string: <code class="highlighter-rouge">"I am \\n a robot."</code></p>',
                answers: [
                    '14',
                    '15',
                    '16'
                ],
                correctAnswer: 1
            },
            {
                body: '' +
'<p>Is the statement on the second line valid in JavaScript?</p>' +

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="kd">var</span> <span class="nx">number</span> <span class="o">=</span> <span class="mi">123</span><span class="p">;</span>\n' +
'<span class="nx">number</span> <span class="o">=</span> <span class="kc">undefined</span><span class="p">;</span>\n' +
'</code></pre>\n' +
'</div>',
                answers: [
                    'true',
                    'false'
                ],
                correctAnswer: 0
            },
            {
                body: '' +
'<p>What will the following statement return?</p>' + 
'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="k">typeof</span> <span class="kc">null</span><span class="p">;</span>  <span class="c1">// ?</span>\n' +
'</code></pre>\n' +
'</div>',
                answers: [
                    'null',
                    'undefined',
                    'object',
                    'void',
                ],
                correctAnswer: 2
            },
            {
                body: '' +
'<p>Will the <code class="highlighter-rouge"><span class="p">{}</span><span class="w"> </span><span class="err">==</span><span class="w"> </span><span class="p">{}</span></code> comparison return true or false?</p>',
                answers: [
                    'true',
                    'false',
                ],
                correctAnswer: 1
            },
            {
                body: '' +
'<p>What will the following code output?</p>' +

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="kd">var</span> <span class="nx">obj</span> <span class="o">=</span> <span class="p">{};</span>\n' +
'<span class="nx">object</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">=</span> <span class="mi">1</span><span class="p">;</span>\n' +
'<span class="nx">object</span><span class="p">[</span><span class="s1">\'1\'</span><span class="p">]</span> <span class="o">=</span> <span class="s1">\'one\'</span><span class="p">;</span>\n' +
'<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">object</span><span class="p">[</span><span class="mi">1</span><span class="p">]);</span>  <span class="c1">// ?</span>\n' +
'</code></pre>\n' +
'</div>',
                answers: [
                    '1',
                    'one',

                ],
                correctAnswer: 1
            },
            {
                body: '' +
'<p>What will the following code output?</p>' +
'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="kd">var</span> <span class="nx">thirdPlanet</span> <span class="o">=</span> <span class="p">{</span>\n' +
'    <span class="na">order</span><span class="p">:</span> <span class="mi">3</span><span class="p">,</span>\n' +
'    <span class="na">hasLife</span><span class="p">:</span> <span class="kc">true</span><span class="p">,</span>\n' +
'    <span class="na">resources</span><span class="p">:</span> <span class="s1">\'plenty\'</span>\n' +
'<span class="p">};</span>\n' +
'<span class="kd">var</span> <span class="nx">earth</span> <span class="o">=</span> <span class="nx">thirdPlanet</span><span class="p">;</span>\n' +
'<span class="nx">earth</span><span class="p">.</span><span class="nx">resources</span> <span class="o">=</span> <span class="s1">\'few\'</span><span class="p">;</span>\n' +
'<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">thirdPlanet</span><span class="p">.</span><span class="nx">resources</span><span class="p">);</span>  <span class="c1">// ?</span>\n' +
'</code></pre>\n' +
'</div>',
                answers: [
                    'plenty',
                    'few',
                ],
                correctAnswer: 1
            },
            {
                body: '' +
'<p>Is the following array valid?</p>' +

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="kd">var</span> <span class="nx">arr</span> <span class="o">=</span> <span class="p">[</span><span class="mi">1</span><span class="p">,</span> <span class="s1">\'a\'</span><span class="p">,</span> <span class="kc">true</span><span class="p">,</span> <span class="p">{</span><span class="na">b</span><span class="p">:</span> <span class="s1">\'23\'</span><span class="p">},</span> <span class="p">[</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="s1">\'x\'</span><span class="p">],</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">undefined</span><span class="p">];</span>\n' +
'</code></pre>\n' +
'</div>',
                answers: [
                    'true',
                    'false',
                ],
                correctAnswer: 0
            },
            {
                body: '' +
'<p>What will the following code output?</p>' +

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="kd">var</span> <span class="nx">arr</span> <span class="o">=</span> <span class="p">[</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">,</span> <span class="mi">5</span><span class="p">];</span>\n' +
'<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">arr</span><span class="p">[</span><span class="mi">10</span><span class="p">]);</span>\n' +
'</code></pre>\n' +
'</div>',
                answers: [
                    '11',
                    'void',
                    'undefined',
                    'null',
                    'it will throw an error',
                ],
                correctAnswer: 2
            },
            {
                body: '' +
'<p>How the array will look like after code execution?</p>' +

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="kd">var</span> <span class="nx">arr</span> <span class="o">=</span> <span class="p">[</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">];</span>\n' +
'<span class="nx">arr</span><span class="p">.</span><span class="nx">length</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span>\n' +

'<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">arr</span><span class="p">);</span>\n' +
'</code></pre>\n' +
'</div>',
                answers: [
                    '<code class="highlighter-rouge">[0, 1, 2, 3]</code>',
                    '<code class="highlighter-rouge">[1, 2, 3]</code>',
                    '<code class="highlighter-rouge">[2, 3]</code>',
                    '<code class="highlighter-rouge">[]</code>',
                ],
                correctAnswer: 3
            },
        ],
        feedbackMessages: {
            '<100': "Good! There is space for improvement for you! Check out the series of articles about the <a href='/heroes/master-of-variables-part-1-intro/'>Master of Variables</a> and come back after you've finished it. I bet you'll score higher next time!",
            '100': "Great! You've answered all questions correctly! This is an important achievement in your journey of becoming a Hero of Programming. Keep up the good work!"
        },
        callToAction: 'In case you want to revise some information on variables in JavaScript, feel free to check out the series of posts about the <a href="/heroes/master-of-variables-part-1-intro/">Master of Variables</a>.'
    };
</script>
<script type="text/javascript" src="/assets/scripts/quizzes/quiz.js"></script>
