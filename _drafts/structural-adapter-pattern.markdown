---
layout: post
title: Adapter Pattern
description: Adapter Pattern is a structural pattern that is pretty straighforward in what it does - it adapts interfaces of different classes so that they can work together.
permalink: /patterns/adapter/
date: 2016-08-20 20:31:19
categories: design-patterns
---
**Adapter Pattern** is a _structural pattern_ that is pretty straighforward in what it does - it adapts interfaces of different classes so that they can work together.

## When to use it

Whenever you have to use a third party module/service in your code or when you are working on an existing codebase and need to rewrite/add some code, consider using the Adapter Pattern. Generally speaking, use Adapter Pattern whenever you need, for whatever reason, to make two (or more) classes/interfaces that are incompatible, work together.

## Specific example

A real life example would be this picture:

# TODO picture here

We use such adapters when we travel and have to make the plug and the wire match.

However, in the Middle-earth there is no electricity (yet) and we need to come up with a relevant example here. Probably it won't be very natural, but bear with me and you'll understand what the point is. 

Let's consider the case of siege weapons (again). Imagine that humans had some siege weapons - catapults, operated by "Catapult Managers". These managers know how to use the catapults, as the only method that these catapults have is a `shoot()` method which throws a projectile into the enemy.

Now, bright human minds worked hard on making the deadliest siege weapons and built an advanced catapult, with an additional `aim()` method for improving accuracy and a modified `launchProjectile()` method for shooting. 

Do not ask me why couldn't they make the same `shoot()` method on the advanced catapult, because sometimes people do weird things or things that have no sense. However, the job is done and we have what we have: a myriad of old catapults with a `shoot()` method, an increasing number of new advanced catapults with a `launchProjectile()` method and a bunch of catapult managers that expect every catapult to have a `shoot()` method. 

**Note:** The "not very natural" thing that I mentioned about this idea (probably) is the fact that as we assume catapult managers are sentient beings, they should deal with a new catapult with ease. But if to take a real world _programming_ example, a "catapult manager" is any code that calls the method of our object. It can be a network request, another object, user interaction, etc. and most often the calling method (in our case the `shoot()` method) is hardcoded. With this in mind, let's see what we can do about it so that the "catapult managers" from our own projects that expect a `shoot()` method don't encounter problems in using the advanced catapult.

===

Let's consider the case when we need to adapt the communication between a giant [Ent](http://lotr.wikia.com/wiki/Ents) and a small [Hobbit](http://lotr.wikia.com/wiki/Hobbits), as by default they are incompatible (suppose that because of the height difference between them, the Ent can't hear what the hobbit speaks). Thus, we need to _adapt_ the communication between these two parties so that they can exchange information.

Some details that will help us further explain this pattern:
Suppose an ent has an average height of 7 meters and it can hear sound that comes from a source located at least 150 cm above the ground.
On the other hand, a hobbit has a height around 60 to 120 cm, but can hear the sound emitted from any altitude.

## Implementation without pattern

To make sure that the code that calls the `shoot()` method doesn't throw an error when using an AdvancedCatapult object, without the adapter pattern we need to rewrite the code that calls the old method to make it call the new method. 

The implementation difficulty of this approach though resides between "very hard" and "impossible." It may be very hard to find every occurence of the calling code and substitute the old method with the new one, as you might unintentionally skip some places that will result in errors, but it is impossible to do anything if the old method is called by some third party code, code that you don't have access to and you can't change.

===

in real life we can't change every existing catapult like we can do in our code, by changing the `Catapult` class that generates catapults. But let's consider the fact that we have a codebase where there are catapults used all around and they shoot at somebody/something. Now, in order to change the 

If to consider that an Ent is represented by a class in OOP that has a `communicateWithAnotherEnt()` method (because mainly ents communicate between each other and rarely with other creatures, especially so little like hobbits are) and the Hobbit represented by another class with a `communicate()` method, without rewriting one of the methods of either class, we actually won't achieve any success. And pretty often rewriting existing code is not a good idea, as these classes may use these methods somewhere in other place and by changing them to fit this specific case (a hobbit communicating with an ent), we may break the existing working code in some other place. 

Imagine we change the default height of a hobbit to match the minimum height that ents start to hear at. This small and apparently harmless change will have a dramatical impact on hobbits lifestyle, as their appartments will be too short for them and they will start hitting everything in their houses with their heads.

## Implementation using Adapter Pattern

With the Adapter Pattern, we can write a third class, the adapter, that will make it possible for the legacy code to make use of the new object through the old interface. In our case, the Catapult Manager will be able to use the Advanced Catapult by means of the `shoot()` method.

## Pattern components

![Adapter Pattern Participants]({{ site.url }}/assets/images/DesignPatterns/AdapterPattern.png)

- The _Client_ creates a new clone by asking the Prototype to clone itself.
- The _Prototype_ is an object/collection of objects that can clone itself.
- The _Clones_ are objects that are being created by the Prototype's cloning.

## JavaScript implementation

The general principle of the Adapter Pattern is to translate one interface (an object's properties and methods) to another. It serves as a wrapper on the object that we would like to adapt that translates properties and methods to match the "old" requirements.

So, in our case, we have the Catapult and the AdvancedCatapult object constructors, as below.
 
{% highlight javascript lineanchors %}
// This is the old interface.
function Catapult() {
    this.shoot = function (distance, angle) { /* ... */ }
}

// This is the new interface
function AdvancedCatapult() {
    this.shootingAngle = 45;
    this.aim = function (distance) { /* returns shootingAngle */ };
    this.launchProjectile = function () { /* uses `this.shootingAngle` instead of `angle` */};
}
{% endhighlight %}

Obviously, the code that was using the old `Catapult` object with its `shoot()` method will throw an error if we will supply an `AdvancedCatapul` object that doesn't have that method. What we do in this case is simply wrap the AdvancedCatapult in the Adapter constructor that mimics the old interface.

{% highlight javascript lineanchors %}
// Adapter interface
function CatapultAdapter() {
    var catapult = new AdvancedCatapult();

    return {
        shoot: function (distance, angle) {
            catapult.shootingAngle = catapult.aim(distance);
            console.log('Angle improvement: ' + (catapult.shootingAngle - angle) );
            catapult.launchProjectile();
        }
    }
}
{% endhighlight %}

Let's define a simple example of the calling code that expects a catapult object and operates on it.

{% highlight javascript lineanchors %}
// The Catapult Manager.
function CatapultManager() {
    this.act = function (catapult) {
        catapult.shoot();
    }
}
{% endhighlight %}

Now, due to our adapter, our catapult manager won't throw any error if given a new catapult object.

{% highlight javascript lineanchors %}
var manager = new CatapultManager();
var catapult = new Catapult();
var adaptedCatapult = new CatapultAdapter();

manager.act(catapult);  // The old working code.

manager.act(adaptedCatapult);  // The new code, that also works.
{% endhighlight %}

{% highlight javascript lineanchors %}
{% endhighlight %}

## Python implementation

{% highlight python lineanchors %}
{% endhighlight %}

## Advantages

- 

## Disadvantages

- 

## Real world usage examples



## Things to consider



## Additional resources

