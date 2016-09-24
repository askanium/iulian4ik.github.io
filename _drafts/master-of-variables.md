---
layout: post
title: Master of Variables
description: Meet the Master of Variables
permalink: /heroes/master-of-variables/
date: 2016-09-07 20:20:20
category: "heroes of programming"
tags: [basics, variables]
---
# Variables

In JavaScript, as in any other programming language, variables are the placeholders for data.

## Information on your computer

All information that we have on our computers, from documents, to photos, to movies, to games, to programs, is stored in bits.

A bit (**bi**nary digi**t**) is a basic unit of information. It can have one of two values. This simplicity allows the implementation of bits in various forms using any two-state device.

The two values most often are represented as either 0 or 1, but can also be represented as true/false, yes/no, on/off, high/low, bright/dark, etc. For instance, information on a CD/DVD is encoded as a series of pits on its surface, that upon reading are transformed into a series of zeros and ones.

Inside our computers, bits take form of electrical charges. High charges represent a 1 and low charges represent a 0.

And the fact is that photos, programs, text, everything is represented using zeros and ones.

| Nr of bits | Binary | Decimal |
| -- | -- | -- |
| 1 | 0 | 0 |
| 1 | 1 | 1 |
| 4 | 1001 | 9 |
| 8 (1 Byte) | 10101011 | 171 |

Because one bit of data is too small to represent even a relatively small amount of information and because other reasons that are out of scope of this book, a **Byte** is used as a measure of information. A Byte consists of eight bits.

### Reading binary information

Did you do transforming from binary to decimal and vice-versa exercises at school? There are specific rules that you must follow in order to read a binary number.

Let's take the following byte of data: `01001011`. This byte corresponds to number 75, but how did I arrive at this conclusion?

Each bit's position in a byte represents a multiple

## Meet the "Master of Variables"

This hero is responsible for any variable that the team might need and that your code might require. As with other heroes, the _Master of Variables_ has its own quirks, which we will discuss throughout this and following chapters.

The _**Master of Variables**_ has an important role in the team, as he is the only one who **provides** everyone else with variables that others can manipulate and change. Thus, everything he does is providing everyone else with variables, so that they can work with them.

## Defining variables

In JavaScript, a variable is defined using the special keyword `var`:

```javascript
// Defining a variable
var myVariable;

// Defining a variable and assigning a value to it
var earthDiameter = 12756.2;  // in km
```

And this is all that you need in order to define a variable in JavaScript.

There are, however, some rules by which you need to define variable names.

### Variable name rules

In order to be a valid variable name, it should adhere to several simple rules.

#### First character

In a variable's name, first character cannot be a digit.

```javascript

// Invalid variable names
var 123;
var 1twoThree;

// Valid variable names
var a123;
var one2Three4;
```

#### Punctuation

A variable cannot contain punctuation or special signs, except the `$` and `_` characters.

```javascript

// Invalid variable names
var .welcome;
var abc%;
var q.werty;

// Valid variable names
var $myVariable;
var _smile;
var $;
var _$$_$;
var m$ney_;

```

#### Spaces

A variable name cannot contain spaces.

```javascript

// Invalid variable names
var my cool variable;
var $ is good;

// Valid variable names
var thisShouldBePrettyStraightforward;
var tryNotToUseSuchLongVariableNamesThough;

```

#### Reserved keywords

There are some names that are reserved and cannot be used as variable names.

* arguments

* break

* case

* catch

* class

* const

* continue

* debugger

* default

* delete

* do

* else

* enum

* eval

* export

* extends

* false

* finally

* for

* function

* if

* implements

* import

* in

* instanceof

* interface

* let

* new

* null

* package

* private

* protected

* public

* return

* static

* super

* switch

* this

* throw

* true

* try

* typeof

* var

* void

* while

* with

* yield

You don't have \(although it is prefferable\) to remember them, as JavaScript will not let you create variables with these names.

### What a variable actually is

Many people think of a variable as a box that holds the value of that variable inside it.

* an address where the value is located

* naming

* reserved keywords

### Life cycle of a variable

* a program can access it as long as it has at least one variable pointing to it

* [environment](http://eloquentjavascript.net/02_program_structure.html#h_2Tc54fkIgF)

## Types

Variables can be of different types, depending what operations we want to do with them, or what kind of values we want to store in them.

### Number

There are several types of numbers we can use in JavaScript. Generally speaking, a number is represented in a finite number of bits.

* 64 bits to represent a number. [source](http://eloquentjavascript.net/01_values.html#h_flOCH3CuFg)

#### Integer

An integer is just that - a positive or negative whole number. In order to represent it, you don't need to be a rocket scientist. Just assign the number you want to a variable and that's it.

```javascript

var ultimateQuestionOfLifeAnswer = 42;

var int2 = -8;

var int3 = 0;

var int4 = +92;

var int5 = -   3;  // -3

```

All the above variables are valid integers. One interesting particular case is the following

```javascript

var negativeZero = -0;

console.log(negativeZero);  // will output -0

```

Can you explain why it happens? As you remember, each number has encoded the sign within it. So, when we write -0, we encode the sign into the binary sequence.

The reasons behind this we will discuss later on.

#### Fractional numbers

You can use fractional numbers in JavaScript as well, which are written using a dot. These numbers are called `float` numbers, because of the floating point.

```javascript

var pi = 3.14;

var float1 = -1.2;

var float2 = 0.001;

```

You can also skip the first zero in case of a number between 0 and 1 and still get a valid float number.

```javascript

var float3 = .3;      // equals to 0.3

var float4 = .00042;  // equals to 0.00042

```

#### Scientific notation

In case you would like to define a huge number, JavaScript support the scientific notation.

```javascript

var hugeNumber = 1e10;    // 10000000000

var smallNumber = 23e-7;  // 0.0000023

```

These numbers are transformed in "regular" integers or floats. They are just a convenience way to save time by not typing several zeros.

#### Special numbers

Besides all these numbers, JavaScript has two more special "numbers."

The first one can be obtained when you want to represent a number that is bigger than the largest possible number you can represent in JavaScript;

```javascript

var infinity = Infinity;

var negativeInfinity = -Infinity;

```

Note that `Infinity - 1` is still `Infinity` and so on. Also, remember the negative zero example? Now, there are some cases where you can have this:

```javascript

1 / -0;  // -Infinity

```

The second special number is quite the opposite of a number and is called a "Not a Number." It is represented using `NaN`. This value is returned whenever an arithmetic operation is made that cannot return a valid result.

```javascript

'a' / 'b';           // NaN

Infinity - Infinity  // NaN

```

#### Numbers in other base

You can also represent numbers in base 16. For this, prepend `0x` before the hexadecimal number.

```javascript

var x = 0xFC;  // 252 in decimal

var y = 0x93;  // 147 in decimal

```

### String

* definition \(" or '\)

* concatenation

* newline characters

* character escaping

### Boolean

### Object

* properties

* definition

* methods

* hasOwnProperty

* length

### Array

* push

* pop

* length

* slice

* splice

* shift

* unshift

### Undefined

### Null

### Function

## Type conversion

