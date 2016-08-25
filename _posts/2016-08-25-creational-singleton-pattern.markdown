---
layout: post
title: Singleton Pattern
permalink: /patterns/singleton/
date: 2016-08-25 15:31:19
categories: design-patterns
---
**Singleton Pattern** is a _creational pattern_ that assures there is only one instance of an object in your program so that when many different parts of your code want to access it, all of them operate on the same object.

##When to use it

Whenever you need an object to exist only _in one instance_, to be _unique,_ or when different parts of your application try to access an object concurrently **and** this object is a shared resource, consider using a Singleton Pattern.

##Specific example

In the Middle-Earth, one of the things that are unique is the _One Ring._ There is no other ring with such power in it (and a part of the Sauron's soul) and it can have exactly one bearer. Thus we must assure ourselves that we don't accidentally create another ring when trying to obtain the ring (otherwise, each and every being in Middle-Earth would find out what the bug is and create their own Rings of Power and bad things will happen).

##Implementation without pattern

Without the Singleton Pattern, each time we would need to get the OneRing object, we would check whether it exists, and if not, create it, otherwise use the existing ring.

##Implementation using Singleton Pattern

Using the Singleton Pattern, the way that we ask for the object instance does not let us create duplicates. We don't have access to the Ring directly, but we obtain it from the Singleton.

##Pattern components

![Singleton Pattern Participants]({{ site.url }}/assets/images/DesignPatterns/Singleton.png)

The _Singleton_ is responsible for creating and managing the instance object and defines a `getInstance()` method that returns the unique instance.

##JavaScript implementation

In JavaScript, a Singleton can be implemented using closures.

{% highlight javascript lineanchors %}
function TheRingOfPower (holder) {  // Constructor for The Ring
    this.holder = holder;  // If no holder is provided, the Ring will have `undefined` holder.
    this.setHolder = function (holder) {
    	this.holder = holder;
    }
}

var TheOneRing = (function () {
    var theOneRing = null;

    function getRing () {
    	if ( theOneRing === null ) {
            theOneRing = new TheRingOfPower();
    	}
    	return theOneRing;
    }

    return {
    	getRing: getRing
    };
})();
{% endhighlight %}

Now, whenever we need The Ring, we obtain it as follows.

{% highlight javascript lineanchors %}
var myPretious = TheOneRing.getRing();
myPretious.setHolder('Golum');
{% endhighlight %}

In case we again access The Ring, we obtain the same instance of Ring

{% highlight javascript lineanchors %}
var theRingOfPower = TheOneRing.getRing();

console.log(theRingOfPower.holder);          // 'Golum'
console.log(theRingOfPower === myPretious);  // true
{% endhighlight %}

{% highlight javascript lineanchors %}
{% endhighlight %}

##Python implementation

There are many ways in which to implement a Singleton Pattern in Python. As an example we will use a subclass to implement it.

{% highlight python lineanchors %}
class TheOneRing:
    
    class TheRingOfPower:
        def __init__(self):
            self.holder = None

        def set_holder(self, holder):
            self.holder = holder
        
    __ring = None

    def __str__(self):
        holder = 'nobody' if self.holder is None else self.holder
        return 'The Ring of Power is held by {}.'.format(holder)
        
    @classmethod
    def get_ring(cls):
        if not cls.__ring:
            cls.__ring = cls.TheRingOfPower()
        return cls.__ring
{% endhighlight %}

Now, whenever we need The Ring, we call the `get_ring()` method of the `TheOneRing` class, which checks whether there exists an instance of the ring already and if not, creates it.

{% highlight python lineanchors %}
my_precious = TheOneRing.get_ring()
my_precious.set_holder('Golum')

the_ring_of_power = TheOneRing.get_ring()

print(the_ring_of_power)  # The Ring of Power is held by Golum.
print(id(the_ring_of_power) == id(my_pretious))  # True
{% endhighlight %}

Here, [id()](https://docs.python.org/3/library/functions.html#id) returns the identity of an object, which is an unique integer that is constant for the object for its whole lifetime. In the example above, both variables have the same id, meaning it is the same object actually.

{% highlight python lineanchors %}
{% endhighlight %}

##Advantages

- Simple implementation. It is one of the simplest patterns to implement.
- Lazy initialization. The singleton can be initialized on demand and not necessarily at the start of your program.

##Disadvantages

- Singletons can become (most of them do) what is known as a _glorified global variable_ (a variable that knows and can do too much things)
- If not implemented properly and if the Singleton participates heavily in business logic, bad things can happen, because several instances of the Singleton can be created that are not synchronized, thus affecting the flow of your code.
- Dependency Injection Pattern is a very useful pattern, but Singleton Pattern hides the dependencies of the object, because it is accessible from global state and you will need to scan the whole code of your function to check whether a function uses the Singleton or not (you can, of course, inject it into the functions that need it though, thus alleviating the negative impact it has on hiding dependencies)

##Real world usage examples

- One of the most popular examples of using a Singleton is the logger. There should be only one log file that should be opened, wrote to, read from and closed properly, and when different parts of your code are trying to access it simultaneously, you need to assure that all of them operate on the same file.
- In web development, a menu object can be used as a Singleton, so that any change made on it, or any state it takes becomes available from anywhere.

##Things to consider

There's a lot of debate around the usage of Singleton Pattern. In most cases it doesn't bring any added value, because the task it tries to solve can be achieved by restructuring the code and thus not having/needing a global variable (on why using global variables is bad, check out [this](http://stackoverflow.com/a/19158418/3120525) stackoverflow answer that contains more links or just google it yourself). There are actually very few "acceptable" cases to use a Singleton, and when you found yourself in the situation that you need to have one instance only of something that will be accessed from different parts of your code, consider using the Singleton Pattern.

##Additional resources

- [[StackOverflow] On Design Patterns: When to use the Singleton?](http://stackoverflow.com/questions/228164/on-design-patterns-when-to-use-the-singleton)
- [[StackOverflow] What is so bad about singletons?](http://stackoverflow.com/questions/137975/what-is-so-bad-about-singletons)
