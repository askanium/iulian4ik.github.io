---
layout: post

title: "The Manipulator. Part 2 — Operators continued"

image: /assets/images/2016/10/TheManipulator-ComparisonExample.png

meta_description: "In the last article of this series, you'll find out about the rest operators as well as the order of their execution. This is where apparently complex expressions simplify to something light and easy to understand."

summary: "In the last article of this series, you'll find out about the rest operators as well as the order of their execution. This is where apparently complex expressions simplify to something light and easy to understand."

permalink: /heroes/the-manipulator-part-2/

date: 2016-10-27 20:20:20

categories: [basics,operators]

tags: ["heroes-of-programming","the-manipulator"]

keywords: [learn javascript, learn to code, learn programming, learn to program, javascript variables, operators, precedence, relational operators, unary operators, comparison operator, operator logic]

sharemessage: "Liked this article about The Manipulator and how he handles things? You can share it with others below!"
---

In the [previous article](/heroes/the-manipulator-part-1-intro/) about The Manipulator, we discussed four JavaScript operators: assignment, arithmetic, logical and ternary operators. In this article we will address the rest four operators:

- Comparison operators
- Bitwise operators
- Relational operators
- Unary operators

As well as discuss the order in which all these operators are executed. Read on!

## Comparison operators

A comparison operator compares its operands and returns a Boolean value based on whether the comparison is true. However, the comparison operators are another way The Manipulator exercises his smartness. The fact is that you can compare different types of data and The Manipulator will still try to figure out a way to compare the values you provide. If the operands are of different type, they are generally compared numerically (converted to numbers and compared).

There are several comparison operators:

- Equal (==)
- Not equal (!=)
- Strict equal (===)
- Strict not equal (!==)
- Greater than (>)
- Greater than or equal (>=)
- Less than (<)
- Less than or equal (<=)

Let's analyze them one by one.

### Equal (==) operator

If both operands are strings, they are compared each character at a time according to standard lexicographical ordering. The standard lexicographical ordering means that the capital letters precede all lowercase letters.

```javascript
var str1 = 'abc';
str1 == 'Abc';  // false, the first letter differs
```

However, if the operand types differ, the equality operator converts the operands to the same type and then compares the values.

```javascript
'12' == 12;         // true
true == 1;          // true
null == undefined;  // true
false == 0;         // true

// An exception is the null and the undefined values
null == false;      // false
null == 0;          // false
undefined == false; // false
undefined == 0;     // false
undefined == null;  // true

// Objects are compared by reference
{} == {};           // false
[1,2] == [1,2];     // false

// However, if an object is compared with a primitive, it is being converted to
// a primitive first.
var obj = {name: 'John', age: 22};
obj.valueOf = function () { return this.age; };
obj == 22;         // true

// The only primitive that is not equal to itself is the NaN value.
NaN == NaN;        // false
```

### Not equal (!=) operator

The not equal operator is the inverse of the equal operator. It still converts the type of the operands though.

```javascript
'12' != 12;      // false, '12' == 12
true != 1;       // false, true == 1
false != true;   // true
{} != {};        // true, the references of these two objects are different
[1,2] != [1,2];  // true, the references of these two objects are different
```

### Strict equal (===) operator

The only difference of `===` operator from the `==` operator is the fact that the strict equal operator doesn't convert the types of the operands. Therefore if the operands are of different types, this automatically means that the comparison will return false.

```javascript
'12' === 12;    // false
true === 1;     // false
true === true;  // true
null === null;  // true
{} === {};      // false
```

### Strict not equal (!==) operator

The strict not equal operator compares if the values are different and the types are different.

```javascript
'12' !== 12;    // true, the types are different
true !== 1;     // true, the types are different
true !== true;  // false, true is equal to true and operands are of the same type
null !== null;  // false, null is equal to null and operands are of the same type
{} !== {};      // true, these two objects have different references
```

### Less than (<) operator

The following operators (<, <=, >, >=) will all call the `valueOf()` function on each operand before a comparison is made. In case of a string compared to a number, the string will be converted using the methods from _group B_ (`Number` or `+` unary operator).

The less than operator returns true if the left operand is less than the right operand.

```javascript
'2' < 3;       // true,  because 2 < 3
2 < '2';       // false, because 2 == 2
false < true;  // true,  because 0 < 1
null < 2;      // true,  because 0 < 2

// In case any operand is converted to NaN, the result is always false, no matter
// the order of operands and the operator (<, <=, >, >=, ==, ===, !=, !==)
1 < '2a';      // false, because Number('2a') is NaN
```

However, in case two strings are compared, the comparison is made one character at a time, according to their lexicographic order. 

Generally speaking, the lexicographic order is the "alphabet" of all the characters available to type, including numbers, special signs and other characters. As you already know, everything is stored as 0 and 1 inside our computers. Characters are not an exception. Moreover, each character can be "converted" to a number that reflects its order in the "alphabet".

For instance, below are a sequence of common characters with their order:

| DEC | BIN | Symbol | Description |
| --- | --- | --- | --- |
| 32 | 00100000 |   | Space |
| 33 | 00100001 | ! | Exclamation mark |
| 34 | 00100010 | " | Double quotes (or speech marks) |
| 35 | 00100011 | # | Number |
| 36 | 00100100 | $ | Dollar |
| 37 | 00100101 | % | Procenttecken |
| 38 | 00100110 | & | Ampersand |
| 39 | 00100111 | ' | Single quote |
| 40 | 00101000 | ( | Open parenthesis (or open bracket) |
| 41 | 00101001 | ) | Close parenthesis (or close bracket) |
| 42 | 00101010 | * | Asterisk |
| 43 | 00101011 | + | Plus |
| 44 | 00101100 | , | Comma |
| 45 | 00101101 | - | Hyphen |
| 46 | 00101110 | . | Period, dot or full stop |
| 47 | 00101111 | / | Slash or divide |
| 48 | 00110000 | 0 | Zero |
| 49 | 00110001 | 1 | One |
| 50 | 00110010 | 2 | Two |
| 51 | 00110011 | 3 | Three |
| 52 | 00110100 | 4 | Four |
| 53 | 00110101 | 5 | Five |
| 54 | 00110110 | 6 | Six |
| 55 | 00110111 | 7 | Seven |
| 56 | 00111000 | 8 | Eight |
| 57 | 00111001 | 9 | Nine |
| 58 | 00111010 | : | Colon |
| 59 | 00111011 | ; | Semicolon |
| 60 | 00111100 | < | Less than (or open angled bracket) |
| 61 | 00111101 | = | Equals |
| 62 | 00111110 | > | Greater than (or close angled bracket) |
| 63 | 00111111 | ? | Question mark |
| 64 | 01000000 | @ | At symbol |
| 65 | 01000001 | A | Uppercase A |
| 66 | 01000010 | B | Uppercase B |
| 67 | 01000011 | C | Uppercase C |
| 68 | 01000100 | D | Uppercase D |
| 69 | 01000101 | E | Uppercase E |
| 70 | 01000110 | F | Uppercase F |
| 71 | 01000111 | G | Uppercase G |
| 72 | 01001000 | H | Uppercase H |
| 73 | 01001001 | I | Uppercase I |
| 74 | 01001010 | J | Uppercase J |
| 75 | 01001011 | K | Uppercase K |
| 76 | 01001100 | L | Uppercase L |
| 77 | 01001101 | M | Uppercase M |
| 78 | 01001110 | N | Uppercase N |
| 79 | 01001111 | O | Uppercase O |
| 80 | 01010000 | P | Uppercase P |
| 81 | 01010001 | Q | Uppercase Q |
| 82 | 01010010 | R | Uppercase R |
| 83 | 01010011 | S | Uppercase S |
| 84 | 01010100 | T | Uppercase T |
| 85 | 01010101 | U | Uppercase U |
| 86 | 01010110 | V | Uppercase V |
| 87 | 01010111 | W | Uppercase W |
| 88 | 01011000 | X | Uppercase X |
| 89 | 01011001 | Y | Uppercase Y |
| 90 | 01011010 | Z | Uppercase Z |
| 91 | 01011011 | [ | Opening bracket |
| 92 | 01011100 | \\ | Backslash |
| 93 | 01011101 | ] | Closing bracket |
| 94 | 01011110 | ^ | Caret - circumflex |
| 95 | 01011111 | _ | Underscore |
| 96 | 01100000 | \` | Grave accent |
| 97 | 01100001 | a | Lowercase a |
| 98 | 01100010 | b | Lowercase b |
| 99 | 01100011 | c | Lowercase c |
| 100 | 01100100 | d | Lowercase d |
| 101 | 01100101 | e | Lowercase e |
| 102 | 01100110 | f | Lowercase f |
| 103 | 01100111 | g | Lowercase g |
| 104 | 01101000 | h | Lowercase h |
| 105 | 01101001 | i | Lowercase i |
| 106 | 01101010 | j | Lowercase j |
| 107 | 01101011 | k | Lowercase k |
| 108 | 01101100 | l | Lowercase l |
| 109 | 01101101 | m | Lowercase m |
| 110 | 01101110 | n | Lowercase n |
| 111 | 01101111 | o | Lowercase o |
| 112 | 01110000 | p | Lowercase p |
| 113 | 01110001 | q | Lowercase q |
| 114 | 01110010 | r | Lowercase r |
| 115 | 01110011 | s | Lowercase s |
| 116 | 01110100 | t | Lowercase t |
| 117 | 01110101 | u | Lowercase u |
| 118 | 01110110 | v | Lowercase v |
| 119 | 01110111 | w | Lowercase w |
| 120 | 01111000 | x | Lowercase x |
| 121 | 01111001 | y | Lowercase y |
| 122 | 01111010 | z | Lowercase z |
| 123 | 01111011 | { | Opening brace |
| 124 | 01111100 | \| | Vertical bar |
| 125 | 01111101 | } | Closing brace |
| 126 | 01111110 | ~ | Equivalency sign - tilde |

Therefore, when comparing two strings, the comparison takes place each character at a time, comparing the _order_ of those characters.

```javascript
// Below, first two characters are equal, but 'C' < 'c', as 'C' has the order 67
// and 'c' has 99. Thus 67 < 99, therefore 'abC' < 'abc'
'abC' < 'abc';   // true

// Here, the first characters are different, with 'A' having the order 65 and
// 'B' having the order 66. As 65 < 66, the comparison returns true
'Abra' < 'Bbra'; // true
```

### Less than or equal (<=) operator

The <= operator is similar to the < operator, except that it will return `true` if the operands are equal.

```javascript
'abc' < 'abc';   // false
'abc' <= 'abc';  // true
2 <= 2;          // true
```

### Greater than (>) operator

The > operator returns true if the first operand is greater than the right operand.

```javascript
3 > 2;         // true, 3 > 2
'4' > 1;       // true, 4 > 1
false > true;  // false, 0 < 1
'Z' > 'A';     // true, 90 > 65
```

### Greater than or equal (>=) operator

Finally, the >= operator returns true if the left operand is greater or equal to the right operand.

```javascript
'2' >= 2;  // true, 2 == 2
4 >= 2;    // true, 4 > 2
```

## Bitwise operators

The operands of all bitwise operators are converted to signed 32-bit integers.

For example, the number `75` has the following binary representation: `00000000000000000000000001001011`. Therefore, the binary operators operate namely on this representation and not on number `75`.

You will rarely use bitwise operators, but it is worth knowing them.

### Bitwise AND (&)

The bitwise AND operator follows the classic AND rule, but is applied to each bit individually. This means that it returns a one in each bit position for which the corresponding bits of both operands are ones. For instance, `75 & 12` is computed as follows:

```javascript
00000000000000000000000001001011  // <- 32 bit binary representation of 75
00000000000000000000000000001100  // <- 32 bit binary representation of 12
--------------------------------
00000000000000000000000000001000  // <- the result of 75 & 12 = 8
```

### Bitwise OR (|)

The bitwise OR operator returns a zero in each bit position for which the corresponding bits of both operands are zeros. Taking the same numbers `75 | 12` yields the following result:

```javascript
00000000000000000000000001001011  // <- 32 bit binary representation of 75
00000000000000000000000000001100  // <- 32 bit binary representation of 12
--------------------------------
00000000000000000000000001001111  // <- the result of 75 | 12 = 79
```

### Bitwise XOR (^)

The bitwise XOR operator (Exclusive OR) returns a one in each bit position for which the corresponding bits are different. Taking `75 ^ 12` as an example:

```javascript
00000000000000000000000001001011  // <- 32 bit binary representation of 75
00000000000000000000000000001100  // <- 32 bit binary representation of 12
--------------------------------
00000000000000000000000001000111  // <- the result of 75 ^ 12 = 71
```

### Bitwise NOT (~)

The bitwise NOT operator simply inverts the bits of its operand.

But before looking at an example, note that 

```javascript
00000000000000000000000001001011  // <- 32 bit binary representation of 75
--------------------------------
11111111111111111111111110110100  // <- the result of ~75 = -76
```

Now, this may seem surprisingly strange, as probably you have expected the negation of 75 to be -75. But if to convert the resulting binary representation to a decimal number, you will obtain -76. You know how to convert a positive binary number to decimal. But how to convert a negative binary number to decimal?

A negative number can be converted by taking the 1 before the first zero, raising 2 to the power of that one's index, negating the result and adding all 2 to power's of indexes of one bits.

In the case above we have the first zero at position 6.

```javascript
//                      76543210  // <- indexes
11111111111111111111111110110100  // <- the result of ~75 = -76
```

Therefore, we take $$-2^7$$ and add all twos to power of indexes where the bits are one. In our case the indexes are: 5, 4 and 2.

$$

-2^7 + 2^5 + 2^4 + 2^2

$$

$$

= -128 + 32 + 16 + 4

$$

$$

= -76

$$

### Left shift (<<)

This operator shifts the first operand the specified number of bits to the left. Excess bits shifted off to the left are discarded with zero bits shifted in from the right.

For example, `8 << 2` yields 32:

```javascript
00000000000000000000000000001000  // 8 in binary
--------------------------------
00000000000000000000000000100000  // 8 << 2 = 32
```

### Sign-propagating right shift (>>)

This operator shifts the first operand the specified number of bits to the right. The excess bits shifted off to the right are discarded, while copies of the leftmost bit are shifted in from the left. Namely this copying of the leftmost bit assures that the sign is preserved, hence the name "sign-propagating".

Therefore, `8 >> 2` yields 2:

```javascript
00000000000000000000000000001000 // 8 in binary
--------------------------------
00000000000000000000000000000010 // 8 >> 2 = 2
```

And `-8 >> 2` yields -2:

```javascript
11111111111111111111111111111000 // -8 in binary
--------------------------------
11111111111111111111111111111110 // -8 >> 2 = -2
```

### Zero-fill right shift (>>>)

This operator shifts the first operand the specified number of bits to the right. Excess bits shifted off to the right are discarded. However, no matter what the first to the left bit is, zero bits are shifted in from the left. The sign bit becomes 0, so the result is always non-negative.

Therefore, `8 >>> 2` will yield the same result of 2:

```javascript
00000000000000000000000000001000 // 8 in binary
--------------------------------
00000000000000000000000000000010 // 8 >> 2 = 2
```

However `-8 >>> 2` yields 1073741822:

```javascript
11111111111111111111111111111000 // -8 in binary
--------------------------------
00111111111111111111111111111110 // -8 >> 2 = 1073741822
```

## Relational operators

Relational operators check for relations and return a boolean value depending on the relationship status. There are two relational operators in JavaScript: `in` and `instanceof`.

### `in` relational operator

The `in` operator returns `true` if the specified property is in the specified object. The syntax of this operator is 

```javascript
propertyNameOrNumber in objectName
```

Here are some examples of using the `in` operator:

```javascript
// Using the `in` operator with objects.
var planet = {
  name: 'Earth',
  age: "4.54 ± 0.05 billion years",
  nrOfSatellites: 1,
  inhabited: true
};
'age' in planet;             // true
'nrOfSatellites' in planet;  // true
'Earth' in planet;           // false <- you must specify the property name, 
                             // not the value at that property

// Using the `in` operator with arrays.
var planets = ['Mercury', 'Venus', 'Earth', 'Mars'];
0 in planets;         // true
3 in planets;         // true
4 in planets;         // false <- the last index is 3 in the array
'length' in planets;  // true <- length parameter exists in any array
'Earth' in planets;   // false <- you must specify the index,
                      // not the value at that index
```

### `instanceof` operator

The `instanceof` operator reflects a relationship between an object and its object type. The syntax of this operator is the following:

```javascript
objectName instanceof objectType
```

Use the `instanceof` operator whenever you need to find the type of an object at runtime.

```javascript
var arr = [1, 2, 3];
typeof arr;               // "object"
arr instanceof Array;     // true

var str = new String('abc');
typeof str;               // "object"
str instanceof String;    // true

var bool = new Boolean(1);
typeof bool;              // "object"
bool instanceof Boolean;  // true
```

Note that the `typeof` operator always returns `"object"` for the examples above. This is because the `instanceof` operator operates only on objects.

The `instanceof` will be of greater value to you when you will learn object constructors in JavaScript later.

## Unary operators

As already mentioned, unary operators are those that have a single operand. We've already discussed `+`, `-`, `++` and `--` operators above. Also, you might remember the `typeof` unary operator from the [Master of Variables chapter](/heroes/master-of-variables-part-1-intro/). `typeof` operator takes one operand and returns the _type_ of that operand.

But there are more unary operators in JavaScript and we are going to describe them below.

### `delete` operator

You might remember delete as well from the introduction to objects article. In that article, using `delete` we removed an attribute of an object.

```javascript
delete objName.property;  // deletes the `property` name of `objName`
delete objName[property]; // deletes the `property` name of `objName`
delete arrName[index];    // deletes the `index` of `arrName`
```

Note that `delete` sets the property of an object to `undefined`, therefore you won't see that property in the object's properties.

The `delete` operator returns `true` if hte operation is possible and returns `false` if the operation is not possible.

```javascript
var obj = {
  a: 1,
  b: 2,
  c: 3
};
console.log(obj);  // {a:1, b:2, c:3}
delete obj.b;      // true <- the operation is possible
console.log(obj);  // {a: 1, c: 3}
```

#### Deleting array elements

As arrays are objects, deleting an index of an array removes the array element altogether. However, _the length of the array is unaffected._

```javascript
var planets = ['Mercury', 'Venus', 'Earth', 'Mars'];

planets.length;     // 4
delete planets[1];  // this removes the index from the array
planets.length;     // 4

if (1 in planets) {
  // this does not get executed, as the index 1 doesn't exist anymore in the array
}
console.log(planets);  // ['Mercury', undefined, 'Earth', 'Mars'];

// If to get the keys of the planets array (which is an object), you can
// use the `Object.keys(objName)` and get the following.
Object.keys(planets)   // ["0", "2", "3"] <- note that index 1 is absent
```

Note that this does not shorten the array in any form. The `delete` operator simply removes the specified index, together with the value at that index.

On the other side, in case you want to remove only the value at a specific index, you can simply set that value to `undefined`. In this case, the index itself is not removed.

```javascript
var planets = ['Mercury', 'Venus', 'Earth', 'Mars'];

planets.length;         // 4
planets[1] = undefined; // this sets the value at index 1 to undefined
planets.length;         // 4

if (1 in planets) {
 // this gets executed, as the index 1 still exists in the array
}
console.log(planets);   // ['Mercury', undefined, 'Earth', 'Mars'];

// Using `Object.keys(objName)` in this case will result in all indexes present.
Object.keys(planets);   // ["0", "1", "2", "3"]
```

## Precedence of operators

With all these operators, sometimes it can be challenging to tell what the result of an expression will be.

```javascript
function sum(x, y) { return x + y; }
var a = 1;

var x = 3 + 2 * 2 && 1 == 1 > !1 + ++a - sum(1,2) * +'2';
console.log(x);  // true
```

As already mentioned, The Manipulator likes to show his ingenuity. Although most of the times it is unnecessary, sometimes you will have complex expressions that you will need to figure out how to compute them. And in order to do this, the following table will aid you.

In JavaScript, operators are executed in a specific order. Therefore, in order to compute the above example, check out the Operator precedence table in JavaScript.

| Operator type | Individual operators | Comments |
| --- | --- | --- | --- |
| member | . [] | as in `obj.property`, `obj[property]` or `arr[index]` |
| call / create instance | () new ||
| negation  /increment | ! ~ - + -- ++ typeof delete | `+` and `-` operators are not addition and subtraction here ||
| multiply / divide | * / % ||
| addition / subtraction | + - ||
| bitwise shift | << >> >>> ||
| relational | < <= > >= in instanceof ||
| equality | == != === !== ||
| bitwise-and | & ||
| bitwise-xor | ^ ||
| bitwise-or | \| ||
| logical-and | && ||
| logical-or | \|\| ||
| conditional (ternary) | ?: ||
| assignment | = += -= *= /= %= <<= >>= >>>= &= ^= \|= ||

Therefore, the above example gets computed in several steps. Let's define them together.

```javascript
// Original statement
// First, we compute the function call, that has the highest precedence
// among all other operators in our specific example:
var x = 3 + 2 * 2 && 1 == 1 > !1 + ++a - sum(1,2) * +'2';

// Next, we have the negation/increment operator types. There are several of them
// in our example, therefore they compute from left to right (!1, ++a and +'2'):
var x = 3 + 2 * 2 && 1 == 1 > !1 + ++a - 3 * +'2';

// After that, we have the multiplication operators:
var x = 3 + 2 * 2 && 1 == 1 > false + 2 - 3 * 2;

// After multiplication, we go with addition and subtraction:
var x = 3 + 4 && 1 == 1 > false + 2 - 6;

// Then, accoring to the operator precendence table we go with relational
// operators. In our case it is the > operator:
var x = 7 && 1 == 1 > -3;

// Next, we evaluate the equality operator (==):
var x = 7 && 1 == true;

// At this moment, our complex expression got simplified to a single logical AND
// statement. According to the rules of logical AND evaluation, in case the first
// operand is true, the result of the operation will be the second operand.
var x = 7 && true;

// At last, we assign the value `true` to x.
var x = true;
```

Now, you don't have to learn by heart operator precedence. However, keep in mind that they are evaluated in a specific order and from time to time you can check it out.

## Conclusion

In the end, remember that you can do any operation on any data type in JavaScript and The Manipulator will figure it out how to do what you will write. Remember that there are simple rules that guide every operation. Therefore, by learning these simple rules you will have no trouble writing and understanding code.