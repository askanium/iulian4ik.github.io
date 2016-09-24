---
layout: post
title: Function Expressions vs Function Declarations
description: "What's the difference?"
permalink: /function-expressions-vs-function-declarations/
date: 2016-09-15 20:31:19
category: "javascript"
tags: [basics, functions]
sharemessage: 'Found out something new? Share this article to let others know function expressions and function declarations are not that complicated.'
---

Have you heard about the two ways of declaring a function in JavaScript? Did you use them? Let's check what you know already by taking this short quiz:

<div id="quizContent"></div>

<button id="nextQuestion" disabled="true" onclick="nextQuestionBtnHandler();">Next</button>

<script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script type="text/javascript" src="../assets/scripts/charts/gauge.js"></script>
<script type="text/javascript">
'use strict';

    var quizContent = {
        questions: [
            {
                body: '' + 
'<span>What is the output of the following code?</span>' +
'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="kd">function</span> <span class="nx">universeIs</span> <span class="p">()</span> <span class="p">{</span>\n' +
    '    <span class="kd">function</span> <span class="nx">dimension</span> <span class="p">()</span> <span class="p">{</span>\n' +
        '        <span class="k">return</span> <span class="s1">"gigantic"</span><span class="p">;</span>\n' +
    '    <span class="p">}</span>\n' +
    '    <span class="k">return</span> <span class="nx">dimension</span><span class="p">();</span>\n' +
    '    <span class="kd">function</span> <span class="nx">dimension</span> <span class="p">()</span> <span class="p">{</span>\n' +
        '        <span class="k">return</span> <span class="s1">"enormous"</span><span class="p">;</span>\n' +
    '    <span class="p">}</span>\n' +
'<span class="p">}</span>\n' +
'<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">universeIs</span><span class="p">());</span>\n' +
'</code></pre>\n' +
'</div>',
                answers: [
                    'gigantic',
                    'enormous',
                    'undefined',
                    'it will throw an error'
                ],
                correctAnswer: 1
            },
            {
                body: '' + 
                '<span>What will print the following code?</span>' + 
'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">universeIs</span><span class="p">());</span>\n' +
'<span class="kd">function</span> <span class="nx">universeIs</span> <span class="p">()</span> <span class="p">{</span>\n' +
'    <span class="kd">var</span> <span class="nx">dimension</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>\n' +
'        <span class="k">return</span> <span class="s1">"gigantic"</span><span class="p">;</span>\n' +
'    <span class="p">};</span>\n' +
'    <span class="k">return</span> <span class="nx">dimension</span><span class="p">();</span>\n' +
'    <span class="kd">var</span> <span class="nx">dimension</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>\n' +
'        <span class="k">return</span> <span class="s1">"enormous"</span><span class="p">;</span>\n' +
'    <span class="p">};</span>\n' +
'<span class="p">}</span>\n' +
'</code></pre>\n' +
'</div>',
                answers: [
                    'gigantic',
                    'enormous',
                    'undefined',
                    'it will throw an error'
                ],
                correctAnswer: 0
            },
            {
                body: '' + 
                '<span>What will print the following code?</span>' + 
'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="kd">function</span> <span class="nx">universeIs</span> <span class="p">()</span> <span class="p">{</span>\n' +
'    <span class="kd">var</span> <span class="nx">dimension</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>\n' +
'        <span class="k">return</span> <span class="s1">"gigantic"</span><span class="p">;</span>\n' +
'    <span class="p">};</span>\n' +
'    <span class="k">return</span> <span class="nx">dimension</span><span class="p">();</span>\n' +
'    <span class="kd">var</span> <span class="nx">dimension</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>\n' +
'        <span class="k">return</span> <span class="s1">"enormous"</span><span class="p">;</span>\n' +
'    <span class="p">};</span>\n' +
'<span class="p">}</span>\n' +
'<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">universeIs</span><span class="p">());</span>\n' +
'</code></pre>\n' +
'</div>',
                answers: [
                    'gigantic',
                    'enormous',
                    'undefined',
                    'it will throw an error'
                ],
                correctAnswer: 0
            },
            {
                body: '' + 
                '<span>What will print the following code?</span>' + 
'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="kd">function</span> <span class="nx">universeIs</span> <span class="p">()</span> <span class="p">{</span>\n' +
'    <span class="k">return</span> <span class="nx">dimension</span><span class="p">();</span>\n' +
'    <span class="kd">var</span> <span class="nx">dimension</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>\n' +
'        <span class="k">return</span> <span class="s1">"gigantic"</span><span class="p">;</span>\n' +
'    <span class="p">};</span>\n' +
'    <span class="kd">var</span> <span class="nx">dimension</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>\n' +
'        <span class="k">return</span> <span class="s1">"enormous"</span><span class="p">;</span>\n' +
'    <span class="p">};</span>\n' +
'<span class="p">}</span>\n' +
'<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">universeIs</span><span class="p">());</span>\n' +
'</code></pre>\n' +
'</div>',
                answers: [
                    'gigantic',
                    'enormous',
                    'undefined',
                    'it will throw an error'
                ],
                correctAnswer: 3
            },
            {
                body: '' + 
                '<span>What will print the following code?</span>' + 
'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="kd">function</span> <span class="nx">universeIs</span> <span class="p">()</span> <span class="p">{</span>\n' +
'    <span class="k">return</span> <span class="s1">"gigantic"</span><span class="p">;</span>\n' +
'<span class="p">}();</span>\n' +
'</code></pre>\n' +
'</div>',
                answers: [
                    'gigantic',
                    'enormous',
                    'undefined',
                    'it will throw an error'
                ],
                correctAnswer: 3
            },
            {
                body: '' + 
                '<span>What will print the following code?</span>' + 
'<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="kd">var</span> <span class="nx">universeSize</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>\n' +
'    <span class="k">return</span> <span class="s1">"gigantic"</span><span class="p">;</span>\n' +
'<span class="p">}();</span>\n' +
'<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">universeSize</span><span class="p">);</span>\n' +
'</code></pre>\n' +
'</div>',
                answers: [
                    'gigantic',
                    'enormous',
                    'undefined',
                    'it will throw an error'
                ],
                correctAnswer: 0
            },
        ],
        feedbackMessages: {
            '<100': 'Need to improve',
            '100': 'Great!'
        },
        callToAction: 'Go to the latest post.'
    };
</script>
<script type="text/javascript" src="../assets/scripts/quizzes/quiz.js"></script>

<!-- #### Question 1:

```javascript
function universeIs () {
    function dimension () {
        return 'gigantic';
    }
    return dimension();
    function dimension () {
        return 'enormous';
    }
}
console.log(universeIs());
```

#### Question 2:

```javascript
console.log(universeIs());
function universeIs () {
    var dimension = function () {
        return 'gigantic';
    };
    return dimension();
    var dimension = function () {
        return 'enormous';
    };
}
```

#### Question 3:

```javascript
function universeIs () {
    var dimension = function () {
        return 'gigantic';
    };
    return dimension();
    var dimension = function () {
        return 'enormous';
    };
}
console.log(universeIs());
```

#### Question 4:

```javascript
function universeIs () {
    return dimension();
    var dimension = function () {
        return 'gigantic';
    };
    var dimension = function () {
        return 'enormous';
    };
}
console.log(universeIs());
```

#### Question 5:

```javascript
function universeIs () {
    return 'gigantic';
}();
```

#### Question 6:

```javascript
var universeSize = function () {
    return 'gigantic';
}();
console.log(universeSize);
```


Now, if your answers differ from the following:

1. `'enormous'`
2. `'gigantic'`
3. `'gigantic'`
4. `TypeError: dimension is not a function`
5. `SyntaxError: Unexpected token )`
6. `gigantic`

then you will find more new and interesting things than those who answered correctly to all these questions (but they will find interesting information as well). -->

## Similarities

Let's start with similarities: they are both functions. 

Functions declared using these two methods (expression and declaration) do not differ in any way. The types of these functions are the same and they behave exactly the same, no matter the definition method.

## Differences

But what makes them different then? The most prominent answer is the way they are defined.

### Function declaration

In order to define a function using a _function declaration,_ you start declaring a function using the `function` keyword.

```javascript
function universeSize () {
    return 'immense';
}
```

Using function declaration you can define a _named function_. Two important details in function declaration:

1. The `function` keyword should not be preceded by anything else - it is the first word on the line.
2. Function declaration cannot be nested within non-function blocks (see _Migrating one into the other_ section below).

Similarly to variable declaration using the keyword `var`, the function declaration defines a variable that is a function right from the start. It is like a special way to define a function. The existence of this method has an explanation and some benefits that are also described below.

### Function expression

On the other hand, a _function expression_ is not a stanalone construct, as it defines a function as _a part of a larger expression_, hence the name. This means that you define a function expression when your definition does not start with the keyword `function`:

```javascript
// Anonymous function expression. (starts with `var`)
var universeSize = function () {
    return 'immense';
};

// Named function expression. (starts with `var`)
var universeSize = function defineUniverseSize () {
    return 'immense';
};

// IIFE (Immediately Invoked Function Expression) (starts with `(`)
(function () {
    console.log('The Universe is immense.');
}());
```

As you can see, _function expressions can be named and can be anonymous,_ whereas _function declaration can only be named._

An interesting case is the third case, where the function expression starts with a `(` parenthesis. This is also a function expression as it does not start with the `function` keyword but with the parenthesis character.

### Named vs Anonymous Functions

As it was already mentioned, there are _named functions_ and _anonymous functions_. A named function has a name and an anonymous function doesn't (aye, Captain Obvious!). But what does this mean?

Generally speaking, a function's name is what comes after the `function` keyword. There is a distinction, as you'll see, between the function's name and the variable to which that function is assigned.

#### Names in function declaration

When using _function declaration,_ the name of the function is available both inside its scope and in the scope of its parent.

```javascript
function universe () { 
    var age = 13.8e9;  // In years
    console.log(universe);
}
console.log(universe);  // (1)
universe();             // (2)
```

Both `console.log(universe)` (1) statement and `universe()` function call will print out the same thing:

```javascript
//  function universe () { 
//      var age = 13.8e9;  // In years
//      console.log(universe);
//  }
```

#### Names in function expressions

On the other hand, the name of the function defined using a function expression is available only inside the function scope and not in its parent scope.

```javascript
var universeExpression = function universe () {
    var age = 13.8e9;  // In years
    console.log(universe);
};

universeExpression();
console.log(universe);
```

In this case, the `universeExpression()` function call will output this:

```javascript
// function universe() {
//     var age = 13.8e9;  // In years
//     console.log(universe);
// }
```

Whereas the `console.log(universe)` statement will throw a `ReferenceError: universe is not defined`.

But note that we have an assignment expression. We assign the `universe` function to the `universeExpression` variable. Therefore, you have access to the `universe` function through the `universeExpression` variable. What you can do though is have the same name for the function and the variable to which that function is assigned.

```javascript
var universe = function universe () {
    var age = 13.8e9;  // In years
    console.log(universe);
};

universe();
console.log(universe);
```

In this case, both statements will produce the same result. This is what function declaration implicitly does - it creates a variable with the same name as the function name.

#### Names in anonymous functions

Well. That's kinda obvious. Anonymous functions do not have a name, therefore you cannot access them by some name. But there are cases where you do not even need one! 

Anonymous functions are quite widespread. One example of their usage is when we loop through an array.

```javascript
var planets = ['Mercury', 'Venus', 'Earth', 'Mars'];
planets.forEach(function () { /* do stuff here */ });  // Anonymous function!
```

However, you can assign an anonymous function to a variable and have access to it through that variable.

```javascript
var explode = function () { /* explode stuff here */ };
```

## Benefits of function declarations

Let's analyze quiz questions in more detail. Question 1:

```javascript
function universeIs () {
    function dimension () {
        return 'gigantic';
    }
    return dimension();
    function dimension () {
        return 'enormous';
    }
}
console.log(universeIs());
```

Why the answer to it is `'enormous'`? The explanation resides in the way JavaScript interpreter functions. You see, when JavaScript parses the code, upon encountering a function declaration, it automatically moves it up, at the top of the scope it is defined. So, after JavaScript interpreter parsed the code, the code before actually running it looks like this:

```javascript
function universeIs () {
    // Define the dimension function
    function dimension () {
        return 'gigantic';
    }
    // Redefine the dimension function
    function dimension () {
        return 'enormous';
    }
    // Return the result of dimension function's invocation
    return dimension();
}
console.log(universeIs());
```

This process of moving parts of code before actually running it is called **hoisting.**

Hoisting is what allows us to define a function after calling it.

```javascript
bigBang();

function bigBang() { /* ka-buuuum!!! */ }
```

The above code works perfectly well, because the function declaration is hoisted to the top.

The benefit of hoisting is that we can organize our code better and we do not need to worry about whether a function is defined already or not yet. We could write the main logic and then, at the end of our script, define the functions taht we use, so you have a separation of logic and additional functions.

## Benefits of function expressions

Even if function expressions are not hoisted, they have other advantages over function declarations:

- closures
- arguments to other functions
- Immediately Invoked Function Expressions (IIFE)

### Closures

Using function expressions, you can create a closure. One of the simplest example would be the following:

```javascript
function incrementerBy (index) {
    return function (nr) {
        // Do stuff here.
        // The index variable is available from here.
        return index + nr;
    };
}

var incrementers = {};

for (var i = 1; i < 4; i++) {
    incrementers['by' + i] = incrementerBy(i);
}
console.log(incrementers.by1(2));  // 3
console.log(incrementers.by2(2));  // 4
console.log(incrementers.by3(2));  // 5
```

Without a closure, we would have this:

```javascript
function incrementerBy (index) {
    return index + nr;
}

var incrementers = {};

for (var i = 1; i < 4; i++) {
    incrementers['by' + i] = function (nr) { return i + nr; };
}
console.log(incrementers.by1(2));  // 6
console.log(incrementers.by2(2));  // 6
console.log(incrementers.by3(2));  // 6
```

### Function arguments

Function expressions can be passed directly to functions as function arguments without having to assign the function to an intermediate variable. One such case is the `forEach()` array method argument.

```javascript
var planets = ['Mercury', 'Venus', 'Earth', 'Mars'];
planets.forEach(function (planet) { /* do smth with planet */ });
```

### Immediately Invoked Function Expressions (IIFE)

IIFEs prevent JavaScript functions and variables from affecting the global scope. This is achieved by the fact that all the variables and functions withing the IIFE are scoped to the anonymous function, thus remaining unaccessible from the outside. A simple example of an IIFE is the following:

```javascript
(function () {
    // your code here
}());
```

## Migrating one into the other

Generally speaking, a function declaration can be very easily converted into a function expression when it either:

- becomes part of an expression (see examples above)
- is no longer a **source element** of a function or the script itself. A source element is a non-nested statement in the script or a function body:

```javascript
var a = 0;               // source element
if (a === 0) {           // source element
   a = 1;                // not a source element
   function earth() {}   // not a source element, therefore not a func declaration
}
function universe() {    // source element
   var b = 10;           // source element
   function jupiter() {} // source element
   while (b === 5) {     // source element
      function io() {}   // not a source element, therefore not a func declaration
      b++;               // not a source element
   }
}
```

Be careful how you define your functions so that your code works as expected.

## Remained questions explanation

Let's discuss the remained questions and why they provide such results.

#### Question 2:

```javascript
console.log(universeIs());
function universeIs () {
    var dimension = function () {
        return 'gigantic';
    };
    return dimension();
    var dimension = function () {
        return 'enormous';
    };
}
```

As you already know, the `universeIs` function declaration is hoisted to the top, thus making it available at the `console.log(universeIs())` statement. But what happens inside the function?

In JavaScript, variable declarations are also hoisted. I won't dive into it right now, but I highly recommend you Ben Cherry's [article on scoping and hoisting](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html) where he addresses it in more detail.

So, after hoisting and before the code is executed, it looks something like this:

```javascript
console.log(universeIs());
function universeIs () {
    var dimension;  // First variable declaration hoisted.
    var dimension;  // Second variable declaration hoisted.

    // Function expression assigned to `dimension` variable.
    dimension = function () {
        return 'gigantic';
    };

    // Return result of first function expression invokation.
    return dimension();

    // Second function expression unreachable because of `return` statement.
}
```

Question 3 is similar in this regard.

#### Question 4:

```javascript
function universeIs () {
    return dimension();
    var dimension = function () {
        return 'gigantic';
    };
    var dimension = function () {
        return 'enormous';
    };
}
console.log(universeIs());
```

Can you explain this one yourself? If not yet, let's analyze it together. This is how the code looks after hoisting variable declarations:

```javascript
function universeIs () {
    var dimension;
    var dimension;

    // As `dimension` is `undefined`, invoking it as a function gives the
    // "TypeError: dimension is not a function"
    return dimension();
    
    // Both function expressions are unreachable
}
console.log(universeIs());
```

#### Question 5:

```javascript
function universeIs () {
    return 'gigantic';
}();
```

As already mentioned, function declaration is a standalone construct, so we cannot do anything else except define it. Actually, upon encountering the closing curly brace that ends the function body block, JavaScript will interpret next characters as another statement. So, JavaScript interpreter sees the above example as follows:

```javascript
function universeIs () {
    return 'gigantic';
}
();
```

And it throws a `SyntaxError: Unexpected token )` as this syntax is invalid in JavaScript. However, if you will write:

```javascript
function universeIs () {
    return 'gigantic';
}var lifeExists = true;
```

You will have both a function and a variable defined and no errors will be thrown.

#### Question 6:

```javascript
var universeSize = function () {
    return 'gigantic';
}();
console.log(universeSize);
```

Here, the anonymous function expression can be invoked immediately after its definition and no errors will be thrown.

## Conclusion

Now you know the difference between function declarations and function expressions. 

**Is there any preferred way?**

Not really. You saw what they are capable of and what their limitations are, so select the proper way according to your needs.

PS: There is actually a third type to declare a function using the `new Function()` constructor, but this a topic for another post.

<hr />

Want to challenge yourself once more? You should do better on this one, as now you are armed with all the needed information!

<div id="quizContent"></div>

<button id="nextQuestion" disabled="true" onclick="nextQuestionBtnHandler();">Next</button>
