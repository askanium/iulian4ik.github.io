---
layout: post

title: Master of Variables. Part 2 — Primitives

meta_description: "In the second article of this series about the Master of Variables, you will find out about the basic data types in JavaScript — primitives. In JavaScript, primitives are..."

summary: "The basic data types in JavaScript — Primitives. Primitive values are those that cannot be ..."

permalink: /heroes/master-of-variables-part-2-primitives/

date: 2016-09-28 20:20:20

categories: [basics,variables,primitives]

tags: ["heroes-of-programming","master-of-variables"]

keywords: [learn javascript, learn to code, learn programming, learn to program, javascript primitives, data types, javascript number, javascript string, javascript boolean, javascript null, javascript undefined]

sharemessage: "Learned something new about JavaScript primitives? Spread the knowledge with your friends!"
---

<div class="center">
    <img src="/assets/images/2016/09/MasterOfVariables-Primitives.png" alt="Master of Variables tells the topic of this article — JavaScript Primitives" width="50%" />
</div>

In the [previous article](/heroes/master-of-variables-part-1-intro/) on variables we familiarized with what variables in JavaScript are and how they are defined. As already mentioned, there are several data types in JavaScript:

* Number
* String
* Boolean
* Undefined
* Object
* Function

All types except objects and functions are **immutable**, which means that they cannot be changed. Values of these types are called **"primitive values,"** that is, simple, elementary. These values represent a simple, primal value, such as a number, some characters, true/false or null/undefined.

By "it cannot be changed" I mean that once you have declared such a variable, you cannot _modify the value_ it holds, you can only _assign another value to that variable_.

```javascript
var nr = 2;
nr = 3;  // Here the 2 value is thrown away and the 3 value is assigned.
var str1 = 'I want an ice-cream.';
var str2 = str1;  // str2 = 'I want an ice-cream.'
str1 = 'I want to learn faster.';

console.log(str1);  // "I want to learn faster."
console.log(str2);  // "I want an ice-cream."
```

Referring to a primitive value transfers its value, makes a copy of it so there are two _different values_ with the _same content_ in them. 

```javascript
var earthOrder = 3;
var earthSatellites = earthOrder;  // The value of "earthOrder" was copied

earthSatellites = 1;

console.log(earthOrder);       // 3
console.log(earthSatellites);  // 1
```

Here's a visual explanation to what happens when you work with primitives.

![How primitives are stored](/assets/images/2016/09/storing-primitives.png)

When `answer` is defined and assigned the value `42`, it is being stored in memory at a specific memory address. Then, when we assign the value of the `answer` variable to the newly declared `number` variable, the value is _copied_ into a new memory address that refers to the `number` variable. We have 2 values that represent the number 42 in two different memory addresses that do not have any connection. Next, even if we define another variable with the same 42 value, it will still have its own unique address and it won't be connected to any other variables.

In other words, when the Master of Variables creates a variable with a primitive value assigned to it, that value is "inside the box's variable" and whenever you assign that variable to another variable, the contents of the first box are copied into the second one. For instance, you can't have a number `2` in two boxes simultaneously. When you create a variable with `var x = 2;`, the `x` box contains value `2`. Then, when you write `var y = x;`, the Master of Variables _copies_ the value of `x` variable into the `y` variable. In the end you have two variables with two **different** values of `2`. And when you change the value in one variable, it doesn't affect the value in the other one.

The situation with referring to values is different when working with objects though. We will address this example after several sections.

As for now, let us discuss all data types in more detail.

## Number

There are several types of numbers we can use in JavaScript, although inside JavaScript all numbers are implemented as **double-precision 64-bit binary format**. This scary expression means that actually, a number in JavaScript is represented in a finite number of bits, namely 64 of them (8 bytes).

![64-bit binary format](/assets/images/2016/09/64bit-number.png)

The structure, as seen above, is as follows: 

* 52 bits to store the number itself ([significant digits](https://en.wikipedia.org/wiki/Significant_figures))
* 11 bits to store the exponent value
* 1 bit to store the sign of the number

This means that there are only 52 bits to represent a number in JavaScript, which gives 15 significant digits precision. That is, you can represent a number that has 15 digits.

The 11 exponent bits allow the representation of numbers between $$10^{-308}$$ and $$10^{308}$$.

The sign bit stores either a `0`, which represents a positive number, or a `1`, which represents a negative value.

### Integer

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

### Fractional numbers

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

As mentioned in the beginning of the **Number** section, all numbers in JavaScript internally are represented as floating point numbers, even integers. There is no **Integer** type in JavaScript and the lack of the `.` (dot) in the definition of an integer is for simple commodity, as we are used to it. 

Another example that shows there is a single type for numbers is this one:

```javascript
var x = 1.0;

console.log(x);  // 1 (and not 1.0)
```

### Scientific notation

In case you would like to define a huge number, JavaScript support the scientific notation.

```javascript
var hugeNumber = 1e10;    // 10000000000
var smallNumber = 23e-7;  // 0.0000023
```

These numbers are transformed in "regular" integers or floats. They are just a convenience way to save time by not typing several zeros.

### Special numbers

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

### The Number data type

All these numbers, although different \(integers, floats, in base 16\) are of the same "number" data type. They are all numbers.

```javascript
typeof 2016;      // "number"
typeof 12.3;      // "number"
typeof 1e10;      // "number"
typeof Infinity;  // "number"
typeof NaN;       // "number"
```

## String

Besides numbers, we need to represent and operate with some text in our programs. Thus, we have the `String` variable type. A string is a finite sequence of ordered characters.

### Defining a string

In order to define a string variable, enclose the data you want in single `'` or double `"` quotation marks.

```javascript
var myName = 'Iulian';
var earthAge = "4.54 ± 0.05 billion years";
var emptyString = '';
var frenchLanguage = 'Français';
```

A string variable, as you see, can contain any type of character and can start with any character. Also, there is no difference between the single and double quotation marks in defining a string, so use whatever you like more.

But how do we use a `'` or `"` character in a string themselves?

```javascript
var greeting1 = 'It's showtime! Meet the "Jack the Crusher"!';
var greeting2 = "It's showtime! Meet the "Jack the Crusher"!";
```

In the above cases, the code will throw a: `SyntaxError: Unexpected identifier`.

In order to use the quotation character in our strings, we need to "escape" them, using the escape character `\`.

```javascript
var greeting1 = 'It\'s showtime! Meet "Jack the Crusher"!';
// It's showtime! Meet "Jack the Crusher"!

var greeting2 = "It's showtime! Meet \"Jack the Crusher\"!";
// It's showtime! Meet "Jack the Crusher"!

// The ' character inside a string defined in "" doesn't require escaping though.
var great = "I'm great!";

// The same is with " character inside a string defined in ''.
var question = 'Did you read "The Master and Margarita" during your vacantion?';
```

### The escape character

The backslash `\` character that we saw earlier is special in JavaScript strings. Whenever the JavaScript engine encounters this character, this means that the character after it should be treated differently. In the case with `'` and `"` characters, this means that these characters should not terminate a string definition, but be included in the string itself. Similarly, when we want to include a backslash character, we need to "escape" it as well.

```javascript
var string = 'This is a string with a \\ character.'

// This is a string with a \ character.
```

There are cases, when the next character isn't displayed on the screen, but serves another purpose. For instance, whenever you want your string to spread along two lines of code, you should use the _universal newline character_ `\n`.

```javascript
var twoLines = 'I am reading a book on JavaScript\nand learn about strings.';

// I am reading a book on JavaScript
// and learn about strings.
```

Below is the list of special characters that can be used in a string.

| Code | Output |
| --- | --- |
| \' | single quote |
| \" | double quote |
| \\ | backslash |
| \n | new line |
| \r | carriage return |
| \t | tab |
| \b | backspace |
| \f | form feed |

### String properties

In order to obtain the length of a string, just access its `length` property.

```javascript
var human = 'I am a human.';
var robot = 'I am \n a robot.';

human.length;  // 13
robot.length;  // 15 (a space and the '\n' character that counts as 1 character)
```

Sometimes you will need to get the character at a specific position in the string. To do that, use the square brackets with the position of the character you want to get. Note that in JavaScript the ordering of the characters start at zero. Thus, the first element in the string is obtained at the 0th index.

```javascript
var greeting = 'Hello! How are you?';

console.log(greeting[0]);  // 'H'
console.log(greeting[5]);  // '!'
```

### The String data type

All strings, as expected, are of the same "string" data type.

```javascript
typeof 'abc'; // "string"
typeof '\n';  // "string"
```

## Boolean

As you will see, you will often need a value that can only have one of two values. These are the yes\/no, on\/off type of values that we talked about at the beginning of the Variables chapter. In JavaScript there is a special data type that represents such values - the _Boolean_ data type. It can only take the values `true` or `false`.

```javascript
var truthyValue = true;
var falsyValue = false;
```

Despite its inherent simplicity, boolean variables have a tremendous importance in programming. As they are themselves a form of binary data, other types of variables at different times throughout code execution are being converted to these simple `true` or `false` values in order to do stuff.

The type of the `true` and `false` variables is "boolean".

```javascript
typeof true;   // "boolean"
typeof false;  // "boolean"
```

## Undefined

Earlier in this chapter, when we saw that a variable can be defined like this:

```javascript
// Defining a variable
var myVariable;

// Defining a variable and assigning a value to it
var earthDiameter = 12756.2; // in km
```

It is clear what value we will receive when we access the `earthDiameter` variable. But what we will get if we will access `myVariable`?

There is a special value for the variables that have no value in JavaScript. It is called `undefined`.

```javascript
var myVariable;  

console.log(myVariable);  // "undefined"
```

`undefined` is a separate data type in JavaScript, meaing that you can use `typeof` operator to find out whether a variable's type is `undefined`.

```javascript
typeof myVariable;  // undefined
```

If you want to "empty" a variable, just set it's value to `undefined`.

```javascript
var randomVar = 'abc';
typeof randomVar;  // "string";

randomVar = undefined;
typeof randomVar;  // "undefined";
```

## Null

Another special value in JavaScript is the `null` value. Unlike the `undefined` value, which means that there is no value set for the variable, the `null` value means that the value exists, but it is "empty", it has "nothing" in it, it is null.

An interesting fact is the following piece of code:

```javascript
typeof null;  // "object"
```

This is now considered a bug in JavaScript. The type of the `null` value should be "null", but this behavior is not corrected so as to keep existing code working. If the people that work on the JavaScript language itself would make this change and return "null" instead of "object" as the type of the `null` value, it would break a lot of existing applications that rely on the "object" response. But this does not mean that it is ok to do that \(i.e. not changing something because there is code that is already written that should be changed\). It is called backward compatibility of the language versions and it is a complex process that we won't discuss in this book.

In the [last article](/heroes/master-of-variables-part-3-objects/) of this series we will discuss about one of the most important concepts in JavaScript — objects. See you there!