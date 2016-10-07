---
layout: post

title: Master of Variables on type conversion in JavaScript

image: "/assets/images/2016/10/MasterOfVariables-TypeCasting.png"

meta_description: "Find out how data of different types is converted from one type into another in JavaScript. Sometimes the result is obvious, while in other situations it is surprising. But at the core of this process are some rules that explain how everything should be converted."

summary: "Find out how data of different types is converted from one type into another in JavaScript. Sometimes the result is obvious, while in other situations it is surprising. But at the core of this process are some rules that explain how everything should be converted."

permalink: /heroes/js/master-of-variables-on-type-conversion-in-javascript/

date: 2016-10-05 12:00:00

categories: [basics,variables,type-conversion]

tags: ["heroes-of-programming","master-of-variables"]

keywords: [learn javascript, learn to code, learn programming, learn to program, type casting, type conversion, objects, primitives, data types, javascript array, array]

sharemessage: "Learned something new about type conversion in JavaScript? Spread the knowledge with your friends!"
---

There are situations in a programmer's life when variables need to be converted from one type to another type. Due to THE Book of the Master of Variables, all the variables that he creates can be transformed in one way or another from one type to another type. This type conversion is also called _casting_. 

![Master of Variables tries to convert from one type to another](/assets/images/2016/10/MasterOfVariables-TypeCasting.png)

But before moving on, I would highly recommend you take the [quiz on type conversion](/quizzes/js/type-conversion/) and see how good you already are. When ready with the quiz, go on with this article.

In order to define all the possible situations, we'll take each data type and see how to **convert variables of other data types into the selected data type.**

# \[something\] => String

Strings, as you already know, are sequences of characters enclosed in pairs of `'` or `"` characters. Converting other data types to strings is pretty easy and straightforward, except some specific cases.

Generally speaking, however, you can convert a value from another data type to string in two ways:

1. Use the `toString()` method.
2. Use the `String` global object.

We'll discuss both these ways in the sections that follow.

## Number => String

The results of converting a number to a string should be of no surprise to you.

```javascript
var x = 144;
var y = 3.14;

console.log(x.toString());  // '144'
console.log(y.toString());  // '3.14'

// You can also call the `toString()` method directly on a number
console.log(10.toString());   // '10'
console.log(.3.toString());   // '0.3' <- note the added zero it is 0.3 after all
console.log((9.).toString()); // '9.0' <- you can also write even 9..toString()

// Actually, anything that has the type 'number' can be easily casted to String.
console.log(Infinity.toString());     // 'Infinity'
console.log(NaN.toString());          // 'NaN'
console.log((-Infinity).toString());  // '-Infinity'
```

You will receive the same results when using the `String` global object.

```javascript
console.log(String(42));  // '42'
```

## Boolean => String

Booleans are also pretty intuitive. You will get what you expect when converting a boolean into a string.

```javascript
console.log(true.toString());   // 'true'
console.log(false.toString());  // 'false'
console.log(String(true));      // 'true'
console.log(String(false));     // 'false'
```

## Null, Undefined => String

Here come the first gotchas. In JavaScript, the `null` and `undefined` values **do not have a `toString()`** method. In order to cast them to strings you need to use the global `String` object.

```javascript
console.log(String(null));       // 'null'
console.log(String(undefined));  // 'undefined'

// Using the `.toString()` method will result in an error
console.log(null.toString());       // TypeError: Cannot read property `toString` of null
console.log(undefined.toString());  // TypeError: Cannot read property `toString` of undefined
```

Note that starting in JavaScript 1.8.5, you can call the `toString()` method on `null` and `undefined` values. The results are `[object Null]` and `[object Undefined]`.

## Object => String

Let's go now for the weird things. Suppose you have the following object:

```javascript
var planet = { name: 'Earth' };
```

What do you think its string representation will look like?

```javascript
console.log(planet.toString());  // '[object Object]'

// Other objects look the same
console.log({}.toString());      // '[object Object]'
console.log({a: 1}.toString());  // '[object Object]'
```

This is explained by the fact that the `toString()` method in JavaScript is inherited by every object descended from `Object`. And since our `planet` object is _an object_ (good job, Captain Obvious!) it automatically inherits the default `toString()` method, which by default returns `"[object type]"`, where _type_ is the object type, in our case `Object`.

But why `"[object Object]"`? Why not, for instance, `"{ name: 'Earth' }"` or `"planet Earth"`?

You see, sometimes it is safer and easier to set a universal default and let each programmer define its own required behavior of object representation as a string. The `toString()` method should return a string representing an object (or a number, in case of numbers, a boolean, in case of booleans, etc.). Therefore, whenever you need to have a specific object to string representation, just override the `toString()` method.

```javascript
planet.toString = function () {
    return 'planet name - ' + this.name;
}

console.log(planet.toString());  // 'planet name - Earth'
```

There is, however, a peculiar behavior.

```javascript

console.log(planet);                   // {name: 'Earth'}

console.log('Our planet: ' + planet);  // 'Our planet: planet name - "Earth"'

```

In the first case, the `console.log()` statement _does not require your object to be represented as a string,_ therefore it is represented as an object. However, if you do `console.log('Our planet: ' + planet)`, then, according to the string concatenation rules that we'll discuss in the next chapter, the `planet` object is casted to string by automatically calling the `toString()` method on it in the background.

Now, you might wonder how to define a custom `toString()` method on all our objects. The short answer is that generally you won't need one all the time and it can be achieved easier by defining it one time for a group of similar objects. The long answer will be addressed in one of the following chapters, when we will discuss about object constructors.

## Array => String

Arrays have also some interesting behaviors when converted to strings. But generally, the process is pretty straightforward. As you already know, arrays are objects, too, in JavaScript. However, the `Array` object overrides the `toString` method inherited from `Object`. Let's see how it functions.

```javascript
var numbers = [1, 2, 33, 'abc', true, false];
console.log(numbers.toString());  // "1,2,33,abc,true,false"
```

Each element from an array is transformed into a string and they are all concatenated using a `,` comma character.

But check out the following example:

```javascript
var planet = {name: 'Earth'};

//           0             1             2      3    4    5    <- arr indexes
var arr = [planet, [3, [4, 5, [6]]], undefined, {}, null, 0];
console.log(arr.toString());  // "[object Object],3,4,5,6,,[object Object],,0"
```

Initially we had 6 elements in the array, but after calling the `toString()` mehtod we have 7 values between commas and 2 empty values! Whooa!

**Here is the algorithm which the JavaScript engine executes when converting an array to a string:**

When the `toString()` method is called, internally it calls the `join()` method, that returns the string representation of the array. And here is the simplified algorithm of the `join()` method:

1. If _array_ length is zero, return the empty string. _[stop]_
2. Take the first _element_ from the array.
3. If the _element_ is **undefined** or **null**, let _R_ be an empty string, otherwise let _R_ be the result of `element.toString()`.
4. Let _k_ be **1**.
5. Repeat, while _k < len_
    1. Let _S_ be the concatenation of _R_ and _,_
    2. Let _element_ be the result of _array[k]_.toString().
    3. If _element_ is **undefined** or **null**, let _next_ be an empty string, otherwise let _next_ be the result of `element.toString()`.
    4. Let _R_ be the concatenation of _S_ and _next_.
    5. Increase _k_ by 1.
6. Return _R_.

Let's follow each index from the above example and explain its results according to the algorithm:

- at index 0 we have an object, which we already know returns `"[object Object]"` when the `toString()` method is called on it. _R = "[object Object]"_;
- increase k by 1. _k = 1_
- concatenate _R_ with a comma. _S = "[object Object],"_
- at index 1 we have an array with 2 elements: `3` and `[4, 5, [6]]`, therefore _next_ will be the result of calling the `toString()` method on the array `[3, [4, 5, [6]]]`. This, in turn, will call the `join()` method on this array, converting it to a string as follows:
    - take the first element. It is non-null, therefore convert it into a string. `3.toString()` is `'3'`. _R2 = '3'_
    - take the result and add a comma to it. _S2 = '3,'_
    - take the _next\_i_ element and convert it into a string. `[4, 5, [6]].toString()` will generate another `join()` call on this array:
        - take the first element. It is non-null, therefore convert it into a string. `4.toString()` is `4`. _R3 = '4'_
        - take the result and add a comma to it. _S3 = '4,'_
        - take the _next\_j_ element and convert it into a string. `5.toString()` is `'5'`
        - let _R3_ be the concatenation of _S3_ and _next\_j_. _R3 = '4,5'_
        - go to the next element
        - add a comma to the result. _S3 = '4,5,'_
        - take the _next\_j_ element and convert it into a string. `[6].toString()` will generate another `join()` call:
            - take the first element of the array and convert it to a string. `6.toString()` is `'6'`
            - there are no more elements, therefore return the result, which is `'6'`
        - let _R3_ be the concatenation of _S3_ and the _next\_j_ element. _R3 = '4,5,6'_
        - there are no more elements, return _R3_
    - let _R2_ be the concatenation of _S2_ and the _next\_i_ element. _R2 = '3,4,5,6'_
    - there are no more elements, return _R2_ as the result of converting `[3, [4, 5, [6]]]` to a string;
- let _R_ be the concatenation of _S_ and _next_. _R = "[object Object],3,4,5,6"_
- increase k by 1. _k = 2_
- let _S_ equal _R_ and a comma. _S = "[object Object],3,4,5,6,"_
- the the next element in array is `undefined`, therefore _next_ equals to an empty string
- let _R_ be the concatenation of _S_ and _next_. _R = "[object Object],3,4,5,6,"_
- increase _k_ by 1. _k = 3_
- let _S_ equal _R_ and a comma. _S = "[object Object],3,4,5,6,,"_ (note the double comma)
- ...

And so on. I think you have understood the flow. Just remember that when casting an array to a string, each element in the array is converted using the `toString()` method and joined with all other elements with a comma. The exception to this rule are the `null` and `undefined` values. If the array contains these values, an empty string will be used instead of them.

### The `join` method

As mentioned earlier, when calling the `toString` method on an array, interally it calls the `join` method. But we can call it explicitly as well. Moreover, we can pass the `join` method a _separator_ parameter, that will define what character will be between the elements of the array in the resulting string.

```javascript
var arr = [1, 2, 3];

console.log(arr.join());               // "1,2,3"
console.log(arr.join(':'));            // "1:2:3"
console.log(arr.join(' kabo-o-om! '));  // "1 kabo-o-om! 2 kabo-o-om! 3"
```

## Function => String

Functions aren't very surprising when it comes to representing them as a string. Using the `toString()` or the `String()` global object to transform a function into a string will simply return the string representation of the function object in the form of a function declaration.

```javascript
function explode (tntAmount) {
    var explosionEffects = true;
    loadTnT(tntAmount);
    return 'Ka-boo-oom!';
}

var fnExpression = function sleep () { return 'Z-z-z'; };

console.log(explode.toString());       // function explode (tntAmount) {
                                       //     var explosionEffects = true;
                                       //     loadTnT(tntAmount);
                                       //
                                       //     return 'Ka-boo-oom!';
                                       // }

console.log(fnExpression.toString());  // function sleep () { return 'Z-z-z'; };
```

## Conclusion on converting [something] => String    

Generally speaking, converting something to a string is pretty easy and obvious, except some cases. However, you will remember them, as they are simple and thus you will be able to say how anything will be transformed into a string without hesitation!

# [something] => Number

What can be easier than converting something to a number? Well, for us, humans, it is pretty easy to say whether something written on a piece of paper or monitor is a number or not, but computers need exact instructions. Therefore, JavaScript provides you with _several_ methods to convert something to a number:

1. The `parseInt` global function.
2. The `parseFloat` global function.
3. The `Number` global object.
4. The `+` unary operator prepended to a variable.

All these methods are doing the same job, although there are some differences in the way they handle some values. 

The first two of them expect a _string_ as an argument, therefore, anything that you will pass into it will be automatically converted to a string as described in the previous section (using the `toString()` method).

The last two methods both try to convert the "something" that you provide to them to a number according to some rules (that are different from the rules of `parseInt` and `parseFloat`).

In order to make the explanation process easier, let's divide these four methods into two groups:

**Group A:** `parseInt` and `parseFloat` methods.

**Group B:** `Number` and `+` unary operator methods.

Let's discuss all these details in concrete scenarios.

## String => Number

### `parseInt` and `parseFloat` functions

When converting to number from a string using _group A,_ both these functions expect to **parse** a string. This means that you should provide the function with a string argument to be parsed and transformed into a number. When these functions receive a string, they trim it (remove any leading and trailing spaces from the string) and **start to analyze each character one by one.** In case a character can be a part of a number, it is being counted into translation to number and next character is being analyzed. However, once the JavaScript interpreter arrives at a character that cannot be converted to a number (e.g. the letter 'H'), the convertion process stops and the result is what was converted until that character. Let's see some examples that will clarify things:

```javascript
parseInt('23');           // 23
parseFloat('-23');        // -23

// parseInt will stop at the first character that does not refer to an integer.
parseInt('-3.14');        // -3
parseFloat('3.14');       // 3.14

// The conversion process stops once it encounters a character 
// that "doesn't belong" to a number
parseInt('12a34.g');      // 12
parseFloat('-4.2-3');     // -4.2

// Anything that these functions cannot parse from the beginning, results in 
// Not a Number (NaN), which, as you know, is of type "number" in JavaScript :)
parseInt('');             // NaN
parseFloat('a123');       // NaN

// Even the string "Infinity", "null" and "undefined", that are valid values
// are converted to NaN, because starting from the first character they cannot
// be converted to a valid number.
parseInt('Infinity');     // NaN
parseFloat('null');       // NaN
parseFloat('undefined');  // NaN
```

### `Number` and `+` unary operator

When converting a string to a number using _group B_ methods, there is another set of rules that apply in the conversion process. In these cases, the string value should strongly adhere to a number representation, otherwise it will be considered as `NaN`. See it for yourself:

```javascript
Number('23');        // 23
+'-23';              // -23

// You can convert variables that hold strings as well.
// Note that you can use variables also with `parseInt` and `parseFloat`.
var pi = '3.14';
Number(pi);          // 3.14
+pi;                 // 3.14

// The whitespace is trimmed before conversion
Number('   -1  ');   // -1
+'    -1  ';         // -1

// The "Infinity" string the only string that starts with a letter and is 
// converted to a number different than NaN
Number('Infinity');  // Infinity
+'-Infinity';        // -Infinity

// The empty string is the second string (the first one being the Infinity string
// with plus or minus sign (well, technically this is not "one" string) that the
// methods in group B convert to a valid number. All the rest strings return NaN.
Number('');          // 0
+'';                 // 0

// Even if the following string can be converted with `parseInt` or `parseFloat`
// functions to 1, it will return NaN using `Number` and `+`, because the string
// as a whole is not a valid number representation.
Number('12abc');     // NaN
+'12abc';            // NaN
```

## Boolean => Number

This one will be short :).

Attentive readers will be able to predict the result of conversion using the functions from _group A_. As already mentioned, these functions expect a **string** as an argument, or, if provided something different than a string, convert that _something_ to a string using the `toString` method and apply the rules of `string => number` conversion.

Therefore, as the `true` and `false` boolean values have the same string representation of `"true"` and `"false"`, both `parseInt` and `parseFloat` will return `NaN`

```javascript
parseInt(false);   // NaN
parseFloat(true);  // NaN
```

Nevertheless, the situation is different for methods in _group B_. Here we have special rules for each boolean value.

```javascript
Number(true);  // 1 <- `true` boolean value will always return 1
+false;        // 0 <- `false` boolean value will always return 0
```

## Null => Number

The null value can also be converted to a number, but only using the methods from _group B_, as you should already be able to explain why it won't work using the methods from _group A_.

Therefore, the `null` value is transformed to number `0` in JavaScript.

```javascript
Number(null);  // 0
+null;         // 0
```

## Undefined => Number

It may sound counterintuitive, but the `undefined` value is converted to a `NaN` value irrespective of the method you use.

```javascript
parseInt(undefined);  // NaN
Number(undefined);    // NaN
```

## Object => Number

Transforming objects to numbers finally rehabilitates the _group A_ methods, as you will be able, in a way, to use them as well when converting from objects to numbers.

As mentioned earlier, the `parseInt` and `parseFloat` global functions expect a string argument that these functions will parse. Therefore, when passing an object to it, it will be converted to a string by means of the `toString()` method and the resulting string will be converted to a number, if possible.

```javascript
var emptyObj = {};  // its string representation in "[object Object]"
var person = {
    name: 'Jane',
    age: 29,
    hobby: 'knitting',
    toString: function () {
        // `this` keyword refers to the object itself,
        // in our case `person`
        return this.age + ' years old';
    }
};

parseInt(emptyObj);  // NaN <- the "[object Object]" string can't be transformed
parseFloat(person);  // 29  <- the "29 years old" string is transformed as 29
```

In real world situations you should not use this method though. It is because of the `toString`'s method role. Generally speaking, you override the `toString` method of an object to make it more readable when a string representation of that object is required. However, in the above case, when you will need a string representation of the `person` object, you will get a number;

```javascript
// When you want to concatenate a string and an object, JavaScript automatically
// converts the object to a string.
console.log('The person object: ' + person);  // 'The person object: 29'

// The purpose of having a good `toString` method is to make the a meaningful 
// string representation of the object.
person.toString = function () {
    return 'Name - ' + this.name + ', age - ' + this.age + 
        ', hobby - ' + this.hobby;
};

console.log('The person object: ' + person); 
// Will log: 'The person object: Name - Jane, age - 29, hobby - knitting'
```

Therefore, in case you need to transform some objects to numbers, use the methods from _group B_.

Unlike `parseInt` and `parseFloat`, the `Number` and `+` unary operator actualy try to convert the argument you pass to them to a number instead of a string. But let's see the default behavior first.

```javascript
Number(person);  // NaN
+person;         // NaN
```

In case of objects, there is a method that _is supposed_ to represent an object as a primitive number. _Supposed to_ means that it can do whatever you like, but JavaScript will expect that it return a primitive representation of the object.

```javascript
// Let's add the `valueOf` method on the `person` object defined earlier
person.valueOf = function () {
    return this.age;
};

Number(person);  // 29
+person;         // 29
```

The `valueOf` method is inherited by every object descended from `Object` and by default it returns the object itself. However, in our case we overrode it and when the `Number` global object internally tried to convert it to a primitive, the `valueOf` method returned the number 29.

## Array => Number

As arrays are objects, much of the things described when converting objects => numbers apply to arrays as well.

```javascript
// `parseInt` expects a string, therefore the array is being converted
// to "1,2,3" and then it is converted to a number.
parseInt([1, 2, 3]);  // 1

// The empty array is converted to an empty string. Therefore
// the `parseFloat` has nothing to parse and returns NaN.
parseFloat([]);       // NaN

// By default, the `valueOf` called on an array returns the array itself.
// Therefore it is not possible to convert it to a number.
+[1, 2, 3];           // NaN
```

## Conclusion on converting [something] => Number

Converting something to a number is not that hard either in JavaScript. Although there are four methods to do that, two of them expect a string to convert (or convert anything to a string) and the other two try to convert to a number according to another set of rules. It's easy to remember that `parseInt` and `parseFloat` expect something to **parse**—namely a string. They are pretty flexible in converting a string to a number. 

The `Number` and `+` unary operator, on the other hand, require strict representations of strings, otherwise it will be a `NaN`. And these two can also convert booleans and null values as well.

# [something] => Boolean

Converting to boolean is easier than to string and number, because there are only two possible outcomes after conversion - either `true` or `false`. There are two ways to convert something to boolean: 

- `Boolean` global object 
- `!!` double not operator

Although both of them work the same, the latter is more frequently used, as it is faster to type.

## String => Boolean

Any string that is different from the empty string is converted to the `true` value, while the empty string is `false`.

```javascript
!!'abc';                  // true
Boolean('abra-cadabra');  // true
!!'';                     // false
```

## Number => Boolean

Any number that is different than `0` and `NaN` is converted to true.

```javascript
!!1.3       // true
!!-10000    // true
!!4e2       // true
!!0         // false
!!Infinity  // true
!!-.4       // true
!!NaN       // false
```

## Null, Undefined => Boolean

Null and Undefined values will always be casted to `false`.

```javascript
!!null;       // false
!!undefined;  // false
```

## Object => Boolean

On the other hand, objects are always casted to `true`, even if the object is empty.

```javascript
!!{};                 // true
!!{planet: 'Earth'};  // true
```

## Array => Boolean

As arrays are objects in JavaScript, they are also casted to true.

```javascript
!![];     // true
!![1,2];  // true
```

## Conclusion on converting [something] => Boolean

Converting something to a boolean value is easy, because there are only two possible outcomes. You just need to remember that only `0, NaN, "", null, undefined` values convert to the `false` value and all the rest are converted to `true`.

# [something] => null, undefined

As the `null` value is a single value, you can't have any rules of conversion to it, because it is a single variable, so whatever you will try to convert will be `null`. This applies to the `undefined` value as well.

# [something] => Object

Although you will rarely need to convert a primitive into an object (as objects are key-value pairs and what should be the object representation of number 2?), JavaScript has methods to let you do so. 

You will probably be surprised, but in order to cast a primitive into an object, you should use the same global objects that you already know:

- String
- Number
- Boolean

The only difference is that you should use them together with the `new` keyword. Let's analyze some specific examples.

## String => Object

Whenever you want to cast a string to an object, use the String constructor.

```javascript
var str = 'Galaxy';
var objStr = new String(str);

console.log(objStr);
// {
//   0: 'G',
//   1: 'a',
//   2: 'l',
//   3: 'a',
//   4: 'x',
//   5: 'y',
//   "length": 6,
//   "[[PrimitiveValue]]": "Galaxy"
// }

typeof str;     // 'string'
typeof objStr;  // 'object'
```

As you can see, the variable created using `new String` is of type "object" as well, and not "string".

## Number => Object

To convert a number to an object, use `new Number`.

```javascript
var nr = 121;
var objNr = new Number(nr);
var objNaN = new Number(NaN);

console.log(objNr);   // { "[[PrimitiveValue]]": 121 }
console.log(objNaN);  // { "[[PrimitiveValue]]": NaN }

typeof nr;     // 'number'
typeof objNr;  // 'object'
```

A number object is represented as a key-value pair where the key is the string `"[[PrimitiveValue]]"` and the value is the number itself.

## Boolean => Object

Likewise, to cast a boolean into an object, use `new Boolean`.

```javascript
var objBool = new Boolean(true);

console.log(objBool);  // { "[[PrimitiveValue]]": true }

typeof true;     // 'boolean'
typeof objBool;  // 'object'
```

## Array => Object

Well, as arrays **are** objects, there is no built-in method to convert from one into another, as an array is already of type object. In case that you still need for some reason to convert from an array to an object, like this:

```javascript
['a', 'b', 'c']
       |
       V
{ 
  0: 'a',
  1: 'b',
  2: 'c'
}
```

or to any other form, you will have to write your own function. This is out of scope of this chapter, therefore we'll leave this exercise for one of the later chapters. 

## Conclusion on converting [something] => Object

Converting something to an object turned out to be straightforward, due to the existence of the aforementioned global objects. These global objects are also called **object constructors**. We will talk about them when getting to know another Hero of Programming. As for now, just remember to use the `new` keyword.

# [something] => Array

Even if arrays are objects, when speaking about conversion specifically to arrays, there are ways that differ from converting to objects.

## String => Array

As arrays are sequences of elements and strings are sequences of characters, we can put to work this _sequences_ thing and convert somehow from string to array. 

This is achieved using the `split()` string method and it is the inverse of the `join` array method.

The `split` method has the following syntax:

```javascript
str.split([separator[, limit]])
```

**separator** is an optional parameter that specifies the character(s) to use for separating the string. If a separator is omitted, the returned array will contain only one element — the string itself.

**limit** is an optional parameter of type integer, that defines how many splits should be made/how many elements the returning array to contain.

Let's analyze some specific examples.

```javascript
var arr1 = 'abracadabra'.split();
var arr2 = 'abracadabra'.split('');
var arr3 = 'abracadabra'.split('b');
var arr4 = 'abracadabra'.split('a');
var arr5 = 'abracadabra'.split('zz');
var arr6 = 'This house is my home'.split(' ho');

// If no separator is provided, the resulting array contains the string itself
console.log(arr1);  // ['abracadabra']

// If the separator is an empty string, the resulting array is an array of characters
console.log(arr2);  // ['a', 'b', 'r', 'a', 'c', 'a', 'd', 'a', 'b', 'r', 'a']

// If the separator is a string, the resulting array contains the substrings
// created from removing the separator from the original string
console.log(arr3);  // ['a', 'racada', 'ra']

// In case the separator is found right at the beginning or end of string,
// it is still removed and the empty string is inserted into array at the
// beginning or end.
console.log(arr4);  // ['', 'br', 'c', 'd', 'br', '']

// In case the separator is not found, the resulting array also contains one
// element that is the string itself
console.log(arr5);  // ['abracadabra']

// The separator could be a string of characters longer than one character.
console.log(arr6);  // ['This', 'use is my', 'me']
```

## Number => Array

Well, how do you imagine converting a number to an array? If you have a number that has more than one digit, you could possibly think of this type of conversion from `1234` to `[1, 2, 3, 4]`, but this is not the number `1234` anymore.

Therefore you can't convert really a number to an array, because it doesn't make any sense. The only way you can convert number `1234` to an array is to write it in this way: `[1234]`.

## Boolean => Array

The same story applies here. A boolean is one value, either `true` or `false`, therefore you can't convert that into an array.

## Object => Array

There is no built-in method to convert an object into an array. But even if it were, you would need to define how would you like the conversion to occur? Suppose you have the following object:

```javascript
{
    name: 'Steven',
    age: 33,
    hobby: null,
    married: true
}
```

How would you like to convert it?

```javascript
['Steven', 33, null, true]                                             // 1
['Steven', 33, false, true]                                            // 2
[['name', 'Steven'], ['age', 33], ['hobby', null], ['married', true]]  // 3
['name:Steven', 'age:33', 'hobby:null', 'married:true']                // 4
```

All these are possible ways to convert the given object that you might want to consider and there are even more possible options. That's why, partially, there is no built-in method to convert an array into an object, because there are so many possible scenarios that you might need. In this case, it is better to write your own function that will make this conversion. We will do this in the following chapter.

## Conclusion on converting [something] => Array

In this section you saw that you can easily convert a string into an array. Numbers, booleans, null and undefined aren't really convertible to arrays because these are single values and not sequences of something. Objects _can_ be converted into an array, but because there are so many ways to do this, there is no built-in method that would make the conversion, forcing you to write your own method that will fit your needs.

# Conclusion on type conversion

This chapter comes to its end. You found out how to transform between different data types. Although it may seem a lot of information (which it is), focus on remembering the _rules_ by which the casting process occurs. And do not worry if you won't remember everything at once. In the following chapters we ocasionally will recall what we've learned in this section, therefore you will have the opportunity to remember them better.

Now, you can take the [quiz on type conversion](/quizzes/js/type-conversion/) once more (or for the first time) and see how good you understood the material. Do not worry if you can't score 100 points yet. Learning needs time and persistence, so feel free to reread parts of this article that you feel you understood less and retake the quiz from time to time.

