---
layout: post

title: "The Manipulator. Part 1 — Intro to Operators"

image: /assets/images/2016/10/TheManipulator-ComparisonExample.png

meta_description: "In the first article of this series, you'll meet the second Hero of JavaScript - The Manipulator, who compares, combines and operates on variables in different ways."

summary: "In the first article of this series, you'll meet the second Hero of JavaScript - The Manipulator, who compares, combines and operates on variables in different ways."

permalink: /heroes/the-manipulator-part-1-intro/

date: 2016-10-23 20:20:20

categories: [basics,operators]

tags: ["heroes-of-programming","the-manipulator"]

keywords: [learn javascript, learn to code, learn programming, learn to program, javascript variables, operators, assignment, arithmetic operator, logical operator, ternary operator, comparison operator]

sharemessage: "Liked this article about The Manipulator and how he handles things? You can share it with others below!"
---

The Master of Variables does a good job of creating variables that you might need, but storing variables alone doesn't bring you much value. Variables are static. You put something in it and it is there, waiting for something. You won't write any useful program without modifying, manipulating the data in your variables. The world is a dynamic place, so are the programs that people write. Therefore, we, as programmers, should be able to operate on our variables in various ways.

## Meet "The Manipulator"

![The Manipulator shows an example of complex comparison he can make](/assets/images/2016/10/TheManipulator-ComparisonExample.png)

Can you tell whether it is true or false? Besides storing values in variables, you will need to compare and combine existing variables and values in different ways in your programs. And not always you will have variables of the same type. Different data types might seem as completely different things to compare and to operate on in real life, like _"comparing a cat and a book"_ or _"adding 320 meters and $100,"_ but don't worry, as **The Manipulator** knows his job very good.

He has no trouble comparing anything you might give him and at the same time he can combine variables in various ways. Take the above example. There is a boolean, null, string, array and a number there, yet The Manipulator can do the math and the comparison. He often likes to show his smartness and ingenuity in this way.

However, a big part of his smartness resides in a small Toolbox that he carries everywhere with him and that is full of tools and tricks to perform any operation on any variable you might give to him.

Let’s dive in more details and learn how The Manipulator combines, compares and operates on variables.

## Types of operators

As there are many types of operators, we will discuss them one by one:

- Assignment operators
- Arithmetic operators
- Logical operators
- Ternary operator
- Comparison operators
- Bitwise operators
- Unary operators
- Relational operator

All these operators are either _unary_ or _binary_ (and there is only one _ternary_ operator). We will discuss the first four in this article and the next four in the next article.

Unary operators require a single operand, either before or after the operator:

```javascript
operator operand
// or
operand operator
```

An example of unary operator is `typeof y` or `x++`

Binary operators require two operands, one before the operator and one after:

```javascript
operand operator operand
```

An example of binary operator is `x + y`.

Ternary operator requires three operands. We'll address its structure later on in this chapter.

### Assignment operators

The assignment operator is straightforward: it assigns a value to its left operand the value of its right operand. 

There are two types of assignment operators:

- simple
- compound

#### Simple Assignment Operator

The simple assignment operator is _equal_ `=`, which simply assigns the value of its right operand to its left operand.

```javascript
var x, y;
x = 3;  // `=` assigns the value 3 to x
y = x;  // `=` assigns the value of x (which is 3) to y
```

#### Compound Assignment Operator

Compound assignment operators contain two operations: a simple assignment operation and one operation that modifies the right operand. The compound assignment operators are shortcuts for the following operations:

| Name | Shortcut | Meaning |
| --- | --- | --- |
| Addition assignment | x += y | x = x + y |
| Subtraction assignment | x -= y | x = x - y |
| Multiplication assignment | x *= y | x = x * y |
| Division assignment | x /= y | x = x / y |
| Remainder assignment | x %= y | x = x % y |
| Exponentiation assignment | x **= y | x = x ** y |
| Left shift assignment | x <<= y | x = x << y |
| Right shift assignment | x >>= y | x = x >> y |
| Bitwise AND assignment | x &= y | x = x & y |
| Bitwise OR assignment | x \|= y | x = x \| y |
| Bitwise XOR assignment | x ^= y | x = x ^ y |

You will find the explanation of operators that are part of compound assignment operators in the following sections. As for the simple assignment operator, just remember that it assigns the value of the left operand to the right operand.

## Arithmetic operators

Arithmetic operations are fundamental to math, therefore some of these operators won't need an in-deep analysis. There are, however, some operators that are encountered only in programming languages. There are unary and binary arithmetic operators, therefore we will address them separately.

### Binary arithmetic operators

In this context, binary means operators that have two operands and not operators that operate with 0 and 1. These operators do not need any serious introduction, as these are basic math operations. The standard arithmetic operations are addition (+), subtraction (-), multiplication (*) and division (/). Besides these operators, there is a _remainder operator (%),_ that returns the remainder after division and an _exponentiation operator (**)_ that raises a number to a power. Note that the exponentiation operator is an experimental feature, meaning that it may not be implemented in all browsers.

Generally speaking, the arithmetic operators take two numerical (or not!) values as their operands and return a _single numerical value_.

```javascript
7 + 4;  // 11   <- addition operator
7 - 4;  // 3    <- subtraction operator
7 * 4;  // 28   <- multiplication operator
7 / 4;  // 1.75 <- division operator
7 % 4;  // 3    <- remainder operator
```

We are accustomed to work with numerical values when using arithmetic operations, but they can be applied on other values as well. This is **The Manipulator** expressing his ingenuity and smartness, although he has quirks of his own.

For instance, whenever the operands of an arithmetic operator are not numbers, The Manipulator will automatically **convert them to numbers,** using the methods from the _group B_ described in the previous chapter (using `Number` or `+` unary operator). Check out the [type conversion chapter](/heroes/js/master-of-variables-on-type-conversion-in-javascript/) for a refresh on how it works.

```javascript
3 + true;      // 4
2 - false;     // 2
true - 5;      // -4
[3] - 1;       // 2
100 * false;   // 0
2 / '10';      // 0.2
null - 4;      // -4
'111' - '11';  // 100
'1' - true;    // 0
null + true;   // 1
```

**The result of any arithmetic operation is always _a number._**

**The only exception** to this rule (life would be so much simpler without all these exceptions, isn't it? :) is the addition operator. Whenever one of the operands is a _string,_ then **both operands are converted to strings** and the `+` operator concatenates those strings.

```javascript
'1' + 2;        // '12'
1 + '2';        // '12'
'0' + true;     // '0true'
false + '';     // 'false'
null + 'null';  // 'nullnull'
[1,2] + '3';    // '1,23'
```

### Unary arithmetic operators

You already know one unary arithmetic operator, the `+` operator. And you should know how it works already. Its counterpart, the `-` unary operator works exactly the same as the `+` operator, but negates the resulting value.

```javascript
-'';     // -0
-true;   // -1
-'123';  // -123
```

Besides these two, JavaScript has 2 more unary arithmetic operators: the increment (++) and decrement (\-\-) operators. Unsurprisingly, they either _increment_ the value by one, or _decrement_ it.

You can place the unary operator _before_ or _after_ the operand, obtaining different results.

```javascript
var x = 2;
var y = '5';
var a = ++x;
var b = y++;

console.log(x);  // 3
console.log(y);  // 6
console.log(a);  // 3
console.log(b);  // 5
```

Therefore, the prefix unary operator _increases the variable first, and then returns the result_.

The postfix unary operator _returns the variable first, and then increases the variable's value_.

Note that you can't use the increment and decrement operators on primitive values, as these operators require a variable to change:

```javascript
++2;  // ReferenceError: Invalid left-hand side expression in prefix operation

// The above is similar to the following code:
2 = 2 + 1;  // You cannot assign a value to a value, hence the error.
```

When using increment and decrement unary operators, they are executed in two steps:

```javascript
var x = 4;
var a = x--;  // <- this statement is executed in the following two steps

// 1. As the decrement operator is *after* variable x, the value of x is returned
a = x;    // at this point x is still 4

// 2. After the value of x is returned, it is decremented by 1
x = x - 1;    // only now x is decreased, having a value of 3

console.log(x);  // 3
console.log(a);  // 4

var y = 7;
var b = --y;  // <- this statement is executed in the following two steps

// 1. As the decrement operator is *before* the variable, its value is
// modified first
x = x - 1;

// 2. After the value is modified, it is assigned to y
b = x;

console.log(y);  // 6
console.log(b);  // 6
```

## Logical operators

Logical operations are at the core of computers' way of functioning, as everything is 0 and 1 inside them and logical operators handle the operations with these values.

But logical operators are required when writing programs too, not only inside computers. There are several of them we'll discuss here:

- Logical AND (`&&`)
- Logical OR (`||`)
- Logical NOT (`!`)

All these operators are typically used with Boolean values. However, when used with other than Boolean values, in order to perform the operation, values are converted to Boolean values according to the rules of converting [something] -> Boolean.

Another important characteristic is that the `&&` and `||` operators actually **return the value of one of the operands.**

### AND logical operator

The classical logical AND operator states that both `operand1` AND `operand2` should be true, in order for the result to be true. The following table summarizes all possible cases.

| Operand 1 | Operator | Operand 2 | Result |
| --- | --- | --- | --- |
| false | && | false | false |
| false | && | true | false |
| true | && | false | false |
| true | && | true | true |

However, as mentioned above, in JavaScript the AND and OR operators return one of the operands. Therefore, the rules of the AND operator in JavaScript are the following:

- if `operand1` can be converted to `false`, return `operand1`
- otherwise return `operand2`

And it's quite logically. If the first operand will be converted to `false`, then the result of `&&` operator cannot be `true` no matter what the second operand is. Conversely, if the first operand can be converted to `true`, then the result of the `&&` operator depends on the value of the second operand, which is being returned.

Let's examine some specific cases:

```javascript
var e1 = true && false;    // t && f returns operand2, which is false
var e2 = false && true;    // f && t returns operand1, which is false
var e3 = 2 && false;       // t && f returns operand2, which is false
var e4 = 4 && '';          // t && f returns operand2, which is "" (empty string)
var e5 = null && true;     // f && t returns operand1, which is null
var e6 = [1] && undefined; // t && f returns operand2, which is undefined
var e7 = true && 'zero';   // t && t returns operand2, which is "zero"
var e8 = {} && [1, 2, 3];  // t && t returns operand2, which is [1, 2, 3]
```

### OR logical operator

The classical OR operator states that either `operand1` OR `operand2` should be true, in order for the result to be true. The following tables summarizes all possible cases.

| Operand 1 | Operator | Operand 2 | Result |
| --- | --- | --- | --- |
| false | \|\| | false | false |
| false | \|\| | true | true |
| true | \|\| | false | true |
| true | \|\| | true | true |

Similarly to the AND operator, the OR operator returns one of the operands. The rules of the OR operator are the following:

- if `operand1` can be converted to `true`, return `operand1`
- otherwise return `operand2`

Let's examine some specific cases:

```javascript
var e1 = true && false;    // t && f returns operand1, which is true
var e2 = false && true;    // f && t returns operand2, which is true
var e3 = 2 && false;       // t && f returns operand1, which is 2
var e4 = 4 && '';          // t && f returns operand1, which is 4
var e5 = null && true;     // f && t returns operand2, which is true
var e6 = [1] && undefined; // t && f returns operand1, which is [1]
var e7 = true && 'zero';   // t && t returns operand1, which is true
var e8 = {} && [1, 2, 3];  // t && t returns operand1, which is {}
```

### NOT logical operator

The NOT operator is an unary operator that returns a boolean value no matter what type the operand is. And it negates the boolean value: 

- if the operand can be converted to `true`, then the NOT operator returns `false`
- if the operand can be converted to `false`, then the NOT operator returns `true`

```javascript
var e1 = !true;  // !t returns false
var e2 = !false; // !f returns true
var e3 = !10;    // !t returns false
var e4 = !0;     // !f returns true
var e5 = !'';    // !f returns true
var e6 = !null;  // !f returns true
var e7 = ![1,2]; // !t returns false
var e8 = !{};    // !t returns false
```

By the way, do you remember one way of converting from [something] -> Boolean? The double negation `!!` method. It first negates a value and then negates the negation, giving you the Boolean alternative to your initial value.

### Short-circuit evaluation

One interesting thing about the AND and OR operators in JavaScript is that they are tested for possible "short-circuit" evaluation. As they both are evaluated from left to right, this means that in some cases the result can be predicted from evaluating the first operand only using the following rules:

- false && _anything_ is short-circuit evaluated to false
- true \|\| _anything_ is short-circuit evaluated to true

The rules of logic guarantee that these evaluations are always correct. Moreover, in the above cases the _anything_ expression is not evaluated, meaning that whatever you will write there will not be executed.

```javascript

// Note that the second operands are not strings. However, the second
// operands won't even be evaluated, so no error will be thrown.
var e1 = false && абв;  // e1 = false
var e2 = true || абв;   // e2 = true
```


## Conditional (ternary) operator

The conditional operator is the only JavaScript operator that takes three operands. The operator returns one of two values based on a condition.

The syntax of the conditional operator is `condition ? val1 : val2`. 

If condition is `true`, then the operator returns `val1`, otherwise it returns `val2`.

```javascript
var flower = 'rose';
var color = (flower == 'rose') ? 'red' : 'blue';

console.log(color);  // 'red'
```

You can also nest conditional operator to construct more complex conditions. But be aware that this can quickly become unreadable and hard to read and understand.

```javascript
var flower = 'violet';
var color = (flower == 'rose') ? 'red' : (flower == 'violet' ? 'blue' : 'yellow');

console.log(color);  // 'blue'
```

In the next article, you will find out about the comparison operators, bitwise operators, and unary and relational operators. Keep tuned!