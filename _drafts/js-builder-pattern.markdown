---
layout: post
title: Builder Pattern
categories: design-patterns
---
Imagine how

The **Builder Pattern** is a _creational pattern_ that separates the construction of complex objects from their representations so that the same construction process can create different objects in a step-by-step manner and that not necessarily have similar structure.

I struggled a lot when comprehending this pattern mainly because of the "step-by-step building of the object."

"Why in the world would I want to create an object in a step-by-step manner?" thought I initially. But after a lot of reading about the Builder Pattern, I saw that sometimes you indeed need to create an object step-by-step. Nothing is more explicit than a real world example, so here's an example of the Builder Pattern in action - a pizza vending machine.

<iframe width="420" height="315" src="https://www.youtube.com/embed/Pyrav_9Pbsc" frameborder="0" allowfullscreen></iframe>

But it's not only the step-by-step building process that is key in the Builder Pattern.

##Builder Pattern structure

A Builder Pattern consists of a _Director,_ that using a _Builder_ with a _Concrete Build Specification_ can build a _Product._

The _Director_ is the coordinator of the process. It constructs the object step-by-step by means of a builder.

##Builder Pattern in action







Let's imagine you are building an app that has different UIs (User Interfaces) for different types of users. There are 3 types of users: `Anonymous User Interface, Client User Interface` and `Admin User Interface.`

For each type of user, we want different interfaces:

- [Anonymous User] can see the _Login_ button, _Contacts_ and _About_ pages only.
- [Client User] can see the _Logout, Contacts, About_ and _Dashboard_ pages.
- [Admin User] can see _Dashboard, Settings, User Management_ and _Logs._

####Before applying the builder pattern

You would have a constructor for each type of the user interface. And whenever you would like to create a user interface, you would have to use one of your constructors.

####After applying the builder pattern

You have a _Director,_ a _Builder_ and 3 _ConcreteBuilders_ that can build you the 3 types of user interfaces.

####Implementation

There are several key elements in implementing the Builder Pattern.

#####1. The Builder itself is simple

{% highlight javascript lineanchors %}
function UserInterfaceBuilder () {
    this.build = function (builder) {
        return builder.build();
    }
}
{% endhighlight %}

This has the benefit of isolating the code for construction and representation. The builder itself does not know how exactly to create an interface. It only knows how to build an interface given a concrete builder.

This demonstrates the fact that the logic of creating a User Interface is encapsulated in each 



Imagine you are responsible for writing the code for the pizza vending machine. There are 4 types of pizza that the vending machine can cook:

- Pizza Napoletana. Main ingredients: Tomatoes, 





And here we have another benefit that the Builder Pattern provides - the separation of the construction process.



There are 2 types of implementation that I've seen over the internet.

Chained build process

Concrete builder