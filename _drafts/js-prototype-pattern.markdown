---
layout: post
title: Prototype Pattern
categories: design-patterns
---
Recall how many times you wished there was a `Ctrl+C` and `Ctrl+V` possibility on paper, where there were blocks of text that needed to be written several times and you had to routinely copy the same text over and over... How cool would it be to have a possibility to somehow duplicate the block of text in your paper wherever you would like. The **Prototype Pattern** would come in handy in such situations.

**Prototype Pattern** is a _creational pattern,_ which means it can be used whenever you _create things_ in your program.

Let's start by first defining what a prototype is. According to wikipedia's [article](https://en.wikipedia.org/wiki/Prototype):

>A prototype is an early sample, model, or release of a product built to test a concept or process **or to act as a thing to be replicated** or learned from.

At the heart of the Prototype pattern stays the prototype -- which represents an object for which you can easily obtain a clone/copy. You can have as many prototypes as you want. When I started to grasp the concepts of design patterns, it was somehow unclear for me in what cases to use it. But its potential uses are widespread.

It is not news that humanity generates content at a continuously increasing pace. For instance, according to a post on [ACI](http://aci.info/2014/07/12/the-data-explosion-in-2014-minute-by-minute-infographic/), in 2014, facebook users shared nearly 2.5 million pieces of content and twitter users tweeted nearly 300,000 times **each minute.** That is a lot of content that is _created_, so there's a lot of potential for using the Prototype pattern.

##Real world offline example

Imagine you are a writer. You've written a great book on _JavaScript_ which was read by a lot of people. As we are all humans, sometimes we make mistakes and so did you -- attentive readers spotted some typos in your book and let you know about them. Meanwhile, the language evolved and you would like to add some really cool examples of features that appeared in Javascript since you published your book. Now, ideally you would like to obtain a copy of your book that can be edited and not write the whole book anew.

##Prototype Pattern in action

Imagine you write an app that generates geometric shapes. By clicking buttons, users can generate a _square, circle or triangle_ shapes. 

####Before applying a prototype pattern

You generate each shape on each click of a button.

####After applying a prototype pattern

You have 3 prototypes, one for a square, for a triangle and for a circle. And whenever the user presses a button to obtain a new shape, the corresponding prototype clones itself and returns a clone to the user.

####Implementation

Javascript itself is a prototype based language, meaning that inheritance is performed by cloning existing objects that serve as prototypes. This makes the usage of prototype pattern in Javascript easier, as the language itself facilitates pattern's underlying concepts.

The key to implementing a prototype pattern is having a possibility to clone the prototype and return the cloned instance.

It is easily done using `Object.create` method.

Suppose we have the following object:

{% highlight javascript lineanchors %}
var rectanglePrototype = {
    x: 0,
    y: 0,
    width: 20,
    height: 10,
    color: 'white'
};

// Define some methods on our rectangle
rectanglePrototype.getPerimeter = function () {
    return this.width * 2 + this.height * 2;
};
rectanglePrototype.getArea = function () {
    return this.width * this.height;
}
{% endhighlight %}

Now, whenever you need to generate another `rectangle`, you create a new object based on the prototype of the `rectanglePrototype`:

{% highlight javascript %}
var newRectangle = Object.create(rectanglePrototype);
{% endhighlight %}

Thus we make our newRectangle variable inherit everything from the `rectanglePrototype`, but we can easily overwrite some (or all) of its properties.

{% highlight javascript %}
newRectangle.x = 100;
newRectangle.color = 'orange';

console.log(newRectangle.x);      // 100
console.log(newRectangle.color);  // 'orange'
console.log(newRectangle.y);      // 0
{% endhighlight %}

One might argue that there's no real benefit in using this pattern, because there exist constructors that can easily generate another object instance:

{% highlight javascript %}
function Rectangle (x, y, weight, height, color) {
    this.x = x;
    this.y = y;
    this.weight = weight;
    this.height = height;
    this.color = color;
}

var rect1 = new Rectangle(0, 0, 100, 50, 'red');
var rect2 = new Rectangle(10, 10, 100, 100, 'blue');
{% endhighlight %}

The above code is completely valid and it has a lot of potential use cases. 

The Prototype Pattern, however, reveals its usefulness when objects are complex and you need the same object but with minor changes to it.

##Real world use case

Imagine you write an app where a user can create a company with its departments, entities, point of sales and employees.

Suppose a point of sale is defined as follows:

{% highlight javascript %}
function Entity (company, department, name, city, address) {
    this.company = company;
    this.department = department;
    this.name = name;
    this.city = city;
    this.address = address;
}
var pointOfSale = new Entity('Universe Inc.', 'Sales', 'New York', 'Milky Way Shop', 'Local Group street, 54')
{% endhighlight %}

The fields that do not change from one point of sale to another are _company, department and city_ (suppose the company is small and operates in one city only).

You can create several different point of sales, but you'd have to provide the same company, department and city over and over. Instead, you can create a clone of `pointOfSale` whenever you need a new point of sale and change only the relevant properties. For this, a helper function can be created that will create the prototype for you and overwrite the required fields:

{% highlight javascript %}
function createPointOfSale (name, address) {
    var newPointOfSale = Object.create(pointOfSale);
    pointOfSale.name = name;
    pointOfSale.address = address;
    return newPointOfSale;
}

var posAndromeda = createPointOfSale('Andromeda Shop', 'M31 street, 2.5mln lt.y.');
var posTriangulum = createPointOfSale('Triangulum Shop', 'NGC 598 street, 3mln lt.y.');
{% endhighlight %}

It's easier now to create point of sales objects, but we can define the `clone` method on the prototype itself:

{% highlight javascript %}
pointOfSale.clone = function (name, address) {
    var clone = Object.create(this);
    clone.name = name;
    clone.address = address;
}

// Now the prototype can clone itself.
var posSolarSystem = pointOfSale.clone('Solar Shop', 'Earth street, 42.000');
{% endhighlight %}

Actually this is the approach described in "The Gang of Four" book on design patterns. But this is not the end. We can go even further and create a Prototype Manager. 

A **Prototype Manager** is useful when a number of prototypes is dynamic in our app. Suppose that besides point of sales, the user wants to add another type of entities -- its research and development teams. One way to do this is to create the prototype beforehand and use it in a similar manner with point of sales, but the downside of this approach is that you don't know how many types of entities a user can have so you can't hardcode all possible prototypes.

{% highlight javascript %}
var entityPrototypeManager = {
    prototypes: {},
    register: function (identifier, obj) { 
        this.prototypes[identifier] = obj; 
    },
    unregister: function (identifier, obj) { 
        delete this[identifier]; 
    },
    clone: function (identifier, propertiesToUpdate) {
        propertiesToUpdate = propertiesToUpdate || {};
        var clone = Object.create(this.prototypes[identifier]);
        for (var prop in propertiesToUpdate) {
            if (propertiesToUpdate.hasOwnProperty(prop)) {
                clone[prop] = propertiesToUpdate[prop];
            }
        }
        return clone;
    }
}

// Register `pointOfSale` as a prototype
entityPrototypeManager.register('pos', pointOfSale);

// Clone the point of sale and override department, name and address
var researchEntity = entityPrototypeManager.clone('pos', {
    department: 'Research & Development',
    name: 'Machine Learning',
    address: 'Big Data street, 1Pbyte'
});

// Register our `researchEntity` as a prototype
entityPrototypeManager.register('r&d', researchEntity);

// Clone the `r&d` prototype and override its name
var newResearchEntity = entityPrototypeManager.clone('r&d', {
    name: 'Artificial Intelligence'
});
{% endhighlight %}

The above snippet shows how you can clone an existing object, modify it and register as another available prototype on the `entityPrototypeManager`.

##Wrapping up the Prototype Pattern

**Why?:** ...

**Goal:** Create new objects based on a prototype.

**Implementation:** Define a way to clone a prototype or define a `clone()` method on the prototype itself that clones it and returns the created object. Additionally, you can have a _Prototype Manager_ that holds a pool of available prototypes.

##Gotchas:

- `Object.create` creates a copy of an object, but all its properties are inherited. If you'll change the prototype's property, all cloned objects will have the updated property as well. 
{% highlight javascript %}
var x = {a: 10};
var y = Object.create(x);

x.a = 20;
console.log(y.a);  // 20
{% endhighlight %}
This is a powerful feature of Javascript, but you need to be careful because it can cause unexpected behavior. In order to obtain a clone with own properties, you'll need to write your own `clone` function instead of `Object.create`.

- `Object.create` accepts as the second argument an object that initializes object properties of the newly created object. Besides a property value, you can define whether it is enumerable, writable and/or configurable(deletable). You could make a prototype that has some properties that are not writable, so that the user cannot override them.