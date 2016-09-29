---
layout: post

title: "Master of Variables. Part 1 — Intro to Variables"

image: /assets/images/2016/09/MasterOfVariables-HelloWorld.png

meta_description: "In the first article of this series, you'll meet the Master of Variables, will learn how variables are stored inside our computers and ..."

summary: "In the first article of this series, you'll meet the Master of Variables, will learn how variables are stored inside our computers and ..."

permalink: /heroes/master-of-variables-part-1-intro/

date: 2016-09-28 20:20:20

categories: [basics,variables]

tags: ["Heroes of Programming","Master of Variables"]

keywords: [learn javascript, learn to code, learn programming, learn to program, javascript variables, data types, variable declaration]

sharemessage: "Liked the intro to JavaScript variables and the description of Master of Variables? You can share it with others below!"
---

Welcome to the first article in the series of three articles about variables. In this article, we will discuss how actually information is stored inside our computers and will address general concepts about variables. 

Before we start, I would recommend you take the variables quiz in order to assess you current level of knowledge of variables in JavaScript. Then, at the end of this series of articles you'll take the quiz once more and see how much you've learned. Or just continue reading on, but note that then you won't see your progress.

# Information on your computer

All information that we have on our computers, from documents, to photos, to movies, to games, to programs, is stored in bits.

A bit \(**bi**nary digi**t**\) is a basic unit of information. It can have one of two values. This simplicity allows the implementation of bits in various forms using any two-state device.

The two values most often are represented as either 0 or 1, but can also be represented as true\/false, yes\/no, on\/off, high\/low, bright\/dark, etc. For instance, information on a CD\/DVD is encoded as a series of pits on its surface, that upon reading are transformed into a series of zeros and ones.

Inside our computers, bits take form of electrical charges. High charges represent a 1 and low charges represent a 0.

And the fact is that photos, programs, text, everything is represented using zeros and ones.

| Nr of bits | Binary | Decimal |
| --- | --- | --- |
| 1 | 0 | 0 |
| 1 | 1 | 1 |
| 4 | 1001 | 9 |
| 8 \(1 Byte\) | 10101011 | 171 |

Because one bit of data is too small to represent even a relatively small amount of information and because other reasons that are out of scope of this book, a **Byte** is used as a measure of information. A Byte consists of eight bits.

## Reading binary information

Did you do transforming from binary to decimal and vice-versa exercises at school? There are specific rules that you must follow in order to read a binary number.

Let's take the following byte of data: `01001011`. This byte corresponds to number 75, but how did I arrive at this conclusion?

![Converting a byte to decimal number](/assets/images/2016/09/Byte-explanation.png)

Each bit's position in a byte represents a power of two and each bit's value indicates whether to sum $$2^{index}$$ to the result or not.

If to analyze the above specific case, we have \(taking bits from right to left\):

$$

0 * 2^7 + 1 * 2^6 + 0 * 2^5 + 0 * 2^4 + 1 * 2^3 + 0 * 2^2 + 1 * 2^1 + 1 * 2^0

$$

$$

= 1 * 2^6 + 1 * 2^3 + 1 * 2^1 + 1 * 2^0

$$

$$

= 64 + 8 + 2 + 1

$$

$$

= 75

$$

As the maximal number that can be stored in a single byte is relatively small, computers use several bytes together to store larger integers.

### A short exercise

What is the largest number that can be expressed using a single byte?

# Meet the "Master of Variables"

![Master of Variables greets you in binary language](/assets/images/2016/09/MasterOfVariables-HelloWorld.png)

I bet you can read it, but how much time will it take you to do that? We all know heroes that fight monsters or forces of darkness, but there are also heroes whose work we don't see until they stop doing it. The **Master of Variables** is one of such heroes. He instantly translates from zeroes and ones to the primitive language that we humans can understand. However, behind this seemingly efortless process hides hardwork of keeping track of myriad of things. But Master of Variables isn't unarmed in his tough duty. As he isn't an ordinary hero, his secret weapon is also special. It is... a book! Oh, sorry, it's THE Book! The Alteration Language Specifications Book that contains everything he needs to know about any type of variable. It includes the specifications of all data types with all their methods, properties and behavior. With the help of his book, the Master of Variables provides other heroes with the necessary variables.

One thing that is important to know is that the variables created by the Master of Variables are universal — they can hold any type of data and they can change their values at any time with any other type of data. You can think these variables as being boxes that hold data inside them. 

Because the Master of Variables believes that what is inside is more important than the appearance of a variable, all these boxes look the same. You can't say what is in the box until you check its content. This is a peculiarity of this hero, as everytime another hero uses a variable, he/she needs to check each time what's inside the box in order to know how to work with it.

Let's dive in more details and learn what the Master of Variables create and how do they work — **variables.**

# Defining variables

In JavaScript, a variable is defined using the special keyword `var`:

```javascript
// Defining a variable
var myVariable;

// Defining a variable and assigning a value to it
var earthDiameter = 12756.2;  // in km
```

As you can see, a variable can be defined either without any value, or it can be assigned a value using the **assignment operator** `=`. If to continue the analogy of boxes, you can either create a box without anything in it (the first scenario from above), or you can create a box and put something in it (the second scenario).

And this is all that you need to do in order to define a variable in JavaScript. There are, however, some rules by which you need to define variable names.

## Variable naming rules

In order to be a valid variable name, it should adhere to several simple rules.

### First character

In a variable's name, the first character cannot be a digit.

```javascript
// Invalid variable names
var 123;
var 1twoThree;

// Valid variable names
var a123;
var one2Three4;
```

### Punctuation

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
var __$_$;
var m$ney_;
```

### Spaces

A variable name cannot contain spaces.

```javascript
// Invalid variable names
var my cool variable;
var $ is good;

// Valid variable names
var thisShouldBePrettyStraightforward;
var tryNotToUseSuchLongVariableNamesThough;
```

### Reserved keywords

There are some names that are reserved and cannot be used as variable names:

```
arguments break case catch class const continue debugger default delete do else
enum eval export extends false finally for function if implements import in
instanceof interface let new null package private protected public return static
super switch this throw true try typeof var void while with yield
```

You don't have \(although it is prefferable\) to remember them, as JavaScript will not let you create variables with these names.

## Life cycle of a variable

The variables you declare can be either **global** or **local.**

When declaring a variable outside of any function definition, it is a **global** variable. This means that it can be accessed by any part of your program which can change its value. Global variables "live" for as long as your program runs.

When declaring a variable inside a function, it is a **local** variable. This means that it can be accessed and its value can be modified only within the function inside which the variable is declared. Local variables are created when the function is invoked (called) and they disappear when the function exits.

### Global and local variable names

Global and local variables with the same name can "coexist." This will be addressed in more detail in a later chapter, but for now, let's examine this code.

```javascript
var galaxy = 'Andromeda';

function searchAlienLife () {
    var galaxy = 'Milky Way';
    console.log(galaxy);  // 'Milky Way'
}

console.log(galaxy);  // 'Andromeda'
```

As you can see, when a local variable has the same name as a global variable, it doesn't overwrite the global variable, because these are two distinct variables. This is called "shadowing." The local variable has shadowed the global variable and blocked the access to it, as you can't reach it using the `galaxy` variable name, because it points to a local variable inside the function.

## The importance of `var` keyword

One important thing in declaring variables is the `var` keyword. A good practice is to use it _everytime_ you need to declare a variable. The thing is that you can create a new variable without the `var` keyword. This will create (if it doesn't already exist) a global variable no matter where it is declared.

```javascript
function planetRotation () {
    var speed = 12093201;
    diameter = 4303890;
}

planetRotation();

console.log(speed);     // ReferenceError: speed is not defined
console.log(diameter);  // 4303890
```

Even if the `diameter` variable was defined inside the function, because it wasn't defined with the `var` keyword, it became a global variable. This is a bad practice, therefore do not use it. Instead, always declare your variables using the `var` keyword.

# Data Types

As we need to store different kind of data in variables, this data should be somehow organized to let the JavaScript environment differentiate between them and operate with them.

Thus, in JavaScript we have several **data types:**

* Number
* String
* Boolean
* Undefined
* Object
* Function

A data type indicates what type of data the value belongs to. This has important implications when we want to operate with values of different types as we will discuss about it in the next chapter.

In order to find out the data type of a variable, use the `typeof` operator.

```javascript
typeof 42;  // "number"
```

In the [second article](/heroes/master-of-variables-part-2-primitives/) of this series we will discuss in detail several data types from the list above and namely: Numbers, Strings, Booleans and Undefined. These are also called **primitive data types.** Find out why in the next article!