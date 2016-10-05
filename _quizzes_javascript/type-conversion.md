---
layout: page
collection: quizzes_javascripts
title: Type conversion
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
'<p>What will be the result of the following statement?</p>\n' +
'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="mf">3.14</span><span class="p">.</span><span class="nx">toString</span><span class="p">();</span>\n' +
'</code></pre>\n' +
'</div>\n' +
'',
                answers: [
                    '<code class="highlighter-rouge">3</code>',
                    '<code class="highlighter-rouge">3.14</code>',
                    '<code class="highlighter-rouge">"3.14"</code>',
                    'error',
                ],
                correctAnswer: 2
            },
            {
                body: '' + 
'<p>What will be the result of the following statement?</p>\n'+
'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="p">(</span><span class="o">-</span><span class="kc">Infinity</span><span class="p">).</span><span class="nx">toString</span><span class="p">();</span>\n'+
'</code></pre>\n'+
'</div>\n'+
'',
                answers: [
                    '<code class="highlighter-rouge">-Infinity</code>',
                    '<code class="highlighter-rouge">Infinity</code>',
                    'error',
                ],
                correctAnswer: 0
            },
            {
                body: '' + 
'<p>What will be the result of the following statement?</p>\n'+

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="nb">String</span><span class="p">(</span><span class="kc">true</span><span class="p">);</span>\n'+
'</code></pre>\n'+
'</div>\n'+
'',
                answers: [
                    '<code class="highlighter-rouge">true</code>',
                    '<code class="highlighter-rouge">"true"</code>',
                    'error',
                ],
                correctAnswer: 1
            },
            {
                body: '' + 
'<p>What will be the result of the object to string conversion?</p>\n'+

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="kd">var</span> <span class="nx">obj</span> <span class="o">=</span> <span class="p">{</span> <span class="s2">"a"</span><span class="p">:</span> <span class="mi">1</span> <span class="p">};</span>\n'+

'<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">obj</span><span class="p">.</span><span class="nx">toString</span><span class="p">());</span>\n'+
'</code></pre>\n'+
'</div>\n'+
'',
                answers: [
                    '<code class="highlighter-rouge">"<span class="p">{</span><span class="w"> </span><span class="nt">\'a\'</span><span class="p">:</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">}</span>"</code>',
'<code class="highlighter-rouge">"\'a\': 1"</code>',
'<code class="highlighter-rouge">"a"</code>',
'<code class="highlighter-rouge">"[object Object]"</code>',
'error',

                ],
                correctAnswer: 3
            },
            {
                body: '' +
'<p>What will be the result of the following statement?</p>\n'+

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="p">[</span><span class="mi">1</span><span class="p">,</span> <span class="p">[</span><span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">],</span> <span class="kc">true</span><span class="p">,</span> <span class="kc">undefined</span><span class="p">,</span> <span class="s1">\'abc\'</span><span class="p">].</span><span class="nx">toString</span><span class="p">();</span>\n'+
'</code></pre>\n'+
'</div>\n'+
'',
                answers: [
                    '<code class="highlighter-rouge">"1,[2,3],true,undefined,abc"</code>',
'<code class="highlighter-rouge">"1,[2,3],true,,abc"</code>',
'<code class="highlighter-rouge">"1,2,3,true,undefined,abc"</code>',
'<code class="highlighter-rouge">"1,2,3,true,,abc"</code>',

                ],
                correctAnswer: 3
            },
            {
                body: '' +
'<p>What will be the result of the following statement?</p>\n'+

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="nb">parseInt</span><span class="p">(</span><span class="s1">\'-41.43\'</span><span class="p">);</span>\n'+
'</code></pre>\n'+
'</div>\n'+
'',
                answers: [
                    '41',
                    '41.43',
                    '-41',
                    '-41.43',
                    'NaN',
                    'error',
                ],
                correctAnswer: 2
            },
            {
                body: '' +
'<p>What will be the result of the following statement?</p>\n'+

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="nb">parseFloat</span><span class="p">(</span><span class="s1">\'-123.3a43\'</span><span class="p">);</span>\n'+
'</code></pre>\n'+
'</div>\n'+
'',
                answers: [
                    '-123',
                    '-123.3',
                    '-123.343',
                    'NaN',
                    'error',
                ],
                correctAnswer: 1
            },
            {
                body: '' +
'<p>What will be the result of the following statement?</p>\n'+

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="nb">parseInt</span><span class="p">(</span><span class="s1">\'a123\'</span><span class="p">);</span>\n'+
'</code></pre>\n'+
'</div>\n'+
'',
                answers: [
                    '123',
                    'NaN',
                    'error',
                ],
                correctAnswer: 1
            },
            {
                body: '' +
'<p>What will be the result of the following statement?</p>\n'+

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="nb">parseFloat</span><span class="p">(</span><span class="s1">\'\'</span><span class="p">);</span>\n'+
'</code></pre>\n'+
'</div>\n'+
'',
                answers: [
                    '0',
                    'NaN',
                    'error',
                ],
                correctAnswer: 1
            },
            {
                body: '' +
'<p>What will be the result of the following statement?</p>\n'+

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="o">+</span><span class="s1">\'\'</span>\n'+
'</code></pre>\n'+
'</div>\n'+
'',
                answers: [
                    '0',
                    'NaN',
                    'error',
                ],
                correctAnswer: 0
            },
            {
                body: '' +
'<p>What will be the result of the following statement?</p>\n'+

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="o">+</span><span class="s1">\'12zzz\'</span><span class="p">;</span>\n'+
'</code></pre>\n'+
'</div>\n'+
'',
                answers: [
                    '12',
                    'NaN',
                    'error',
                ],
                correctAnswer: 1
            },
            {
                body: '' +
'<p>What will be the result of the following statements?</p>\n'+

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="o">+</span><span class="kc">true</span><span class="p">;</span>\n'+
'<span class="nb">parseInt</span><span class="p">(</span><span class="kc">true</span><span class="p">);</span>\n'+
'</code></pre>\n'+
'</div>\n'+
'',
                answers: [
                    '1 and 1',
                    '1 and NaN',
                    'NaN and 1',
                    'NaN and NaN',
                ],
                correctAnswer: 1
            },
            {
                body: '' +
'<p>What will be the result of the following statement?</p>\n'+

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="o">+</span><span class="kc">null</span>\n'+
'</code></pre>\n'+
'</div>\n'+
'',
                answers: [
                    '0',
                    'NaN',
                    'error',
                ],
                correctAnswer: 0
            },
            {
                body: '' +
'<p>What will be the result of the following statement?</p>\n'+

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="nb">parseInt</span><span class="p">([</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">]);</span>\n'+
'</code></pre>\n'+
'</div>\n'+
'',
                answers: [
                    '123',
                    '1',
                    '0',
                    'error',

                ],
                correctAnswer: 1
            },
            {
                body: '' +
'<p>What will be the result of the following statement?</p>\n'+

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="o">!!</span><span class="s1">\'abc\'</span>\n'+
'</code></pre>\n'+
'</div>\n'+
'',
                answers: [
                    '<code class="highlighter-rouge">\'abc\'</code>',
'<code class="highlighter-rouge">\'!!abc\'</code>',
'true',
'false',
                ],
                correctAnswer: 2
            },
            {
                body: '' +
'<p>What will be the result of the following statement?</p>\n'+

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="o">!!</span><span class="mi">0</span>\n'+
'</code></pre>\n'+
'</div>\n'+
'',
                answers: [
                    '<code class="highlighter-rouge">0</code>',
                    '<code class="highlighter-rouge">\'0\'</code>',
                    '<code class="highlighter-rouge">\'!!0\'</code>',
                    'true',
                    'false',
                ],
                correctAnswer: 4
            },
            {
                body: '' +
'<p>What will be the result of the following statement?</p>\n'+

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="o">!!</span><span class="p">{}</span>\n'+
'</code></pre>\n'+
'</div>\n'+
'',
                answers: [
                    '<code class="highlighter-rouge">0</code>',
                    '<code class="highlighter-rouge"><span class="p">{}</span></code>',
                    '<code class="highlighter-rouge">\'!!{}\'</code>',
                    'true',
                    'false',

                ],
                correctAnswer: 3
            },
            {
                body: '' +
'<p>What is the type of <code class="highlighter-rouge">nr</code>?</p>\n'+

'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="kd">var</span> <span class="nx">nr</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Number</span><span class="p">(</span><span class="mi">2</span><span class="p">);</span>\n'+

'<span class="k">typeof</span> <span class="nx">nr</span><span class="p">;</span>  <span class="c1">// ?</span>\n'+
'</code></pre>\n'+
'</div>\n'+
'',
                answers: [
                    'number',
                    'array',
                    'primitive',
                    'object',
                    'constructor',

                ],
                correctAnswer: 3
            },
        ],
        feedbackMessages: {
            '<100': "Good! There is space for improvement for you! Check out the series of articles about the <a href='/heroes/master-of-variables-type-conversion-part-1-string-and-number/'>Master of Variables converting variables</a> and come back after you've finished it. I bet you'll score higher next time!",
            '100': "Great! You've answered all questions correctly! This is an important achievement in your journey of becoming a Hero of Programming. Keep up the good work!"
        },
        callToAction: 'In case you want to revise some information on type conversion in JavaScript, feel free to check out the series of posts about the <a href="/heroes/master-of-variables-part-1-intro/">Master of Variables converting variables</a>.'
    };
</script>
<script type="text/javascript" src="/assets/scripts/quizzes/quiz.js"></script>
