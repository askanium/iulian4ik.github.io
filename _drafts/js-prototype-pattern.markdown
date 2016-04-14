---
layout: post
title: Prototype Pattern
categories: design-patterns
---
Recall how many times you wished there was a `Ctrl+C` and `Ctrl+V` possibility on paper, where there were blocks of text that needed to be written several times and you had to routinely copy the same text over and over... How cool would it be to have a possibility to somehow duplicate the block of text in your paper wherever you would like. The **Prototype Pattern** would come in handy in such situations.

**Prototype Pattern** is a _creational pattern,_ which means it can be used whenever you _create things_ in your program.

Let's start by first defining what a prototype is. According to wikipedia's [article](https://en.wikipedia.org/wiki/Prototype):

>A prototype is an early sample, model, or release of a product built to test a concept or process **or to act as a thing to be replicated** or learned from.

The highlighted part is was is relevant for understanding the Prototype pattern.

At the heart of the Prototype pattern stays the prototype -- which represents an object for which you can easily obtain a clone/copy. You can have as many prototypes as you want. When I started to grasp the concepts of design patterns, it was somehow unclear for me in what cases to use it. But its potential uses are widespread.

It is not news that humanity generates content at a continuously increasing pace. For instance, according to a post on [ACI](http://aci.info/2014/07/12/the-data-explosion-in-2014-minute-by-minute-infographic/), in 2014, facebook users shared nearly 2.5 million pieces of content and twitter users tweeted nearly 300,000 times **each minute.** That is a lot of content that is _created_, so there's a lot of potential for using the Prototype pattern.

##Real world example

Imagine you are a writer. You've written a great book on _JavaScript_ which was read by a lot of people. As we are all humans, sometimes we make mistakes and so did you -- attentive readers spotted some typos in your book and let you know about them. Meanwhile, the language evolved and you would like to add some really cool examples of features that appeared in Javascript since you published your book. Now, ideally you would like to obtain a copy of your book that can be edited (you need to save your first edition book intact, for historical purposes).

##Javascript example 1

Imagine you write an app that generates geometric shapes. By clicking buttons, users can generate a _square, circle or triangle_ shapes. 

####Before applying a prototype pattern

You generate each shape on each click of a button.

####After applying a prototype pattern

You have 3 prototypes, one for a square, for a triangle and for a circle. And whenever the user presses a button to obtain a new shape, the corresponding prototype clones itself and returns a clone to the user.

####Implementation

The key to implementing a prototype pattern is having a `clone()` method on the prototype, that can clone itself and return the cloned self.