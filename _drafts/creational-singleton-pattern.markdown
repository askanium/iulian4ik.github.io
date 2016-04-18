---
layout: post
title: Singleton Pattern
categories: design-patterns
---
##Intent

**Singleton Pattern** is a _creational pattern_ that assures there is only one instance of an object in your program and its creation can be delayed upon when it is needed.

##When to use it

Whenever you need an object to exist only _in one instance_, to be _unique,_ or when different parts of your application try to access an object concurrently, consider using a Singleton Pattern.

##Specific example

In the Middle-Earth, one of the things that are unique is the _One Ring._ There is no other ring with such power in it (and a part of the Sauron's soul) and we must assure ourselves that we don't accidentally create another ring when trying to obtain the ring (otherwise, each and every being in Middle-Earth would find out what the bug is and create their own Rings of Power and bad things will happen).

##Implementation without pattern

Without the Singleton Pattern, each time we would need to get the OneRing object, we would check whether it exists, and if not, create it, otherwise use the existing ring.

##Implementation using Prototype Pattern

Using the Singleton Pattern, the way that we ask for the object instance does not let us create duplicates. We don't have access to the Ring directly, but we ask for it from the Singleton.

##Pattern components

TBD

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

In Python we have a similar structure.

{% highlight python lineanchors %}
class TheOneRing:
	
	class TheRingOfPower:
		def __init__(self, holder):
			self.holder = holder

		def __str__(self):
			holder = 'nobody' if self.holder is None else self.holder
			return 'The Ring of Power is held by {}'.format(holder)

	ring = None

	def __init__(self, holder=None):
		if TheOneRing.ring is None:
			TheOneRing.ring = TheOneRing.TheRingOfPower(holder)
		else:
			TheOneRing.ring.holder = holder

	def __getattr__(self, name):
		return getattr(self.ring, name)
{% endhighlight %}

{% highlight python lineanchors %}
{% endhighlight %}

{% highlight python lineanchors %}
{% endhighlight %}

##Advantages

- Simple implementation
- Lazy initialization

##Disadvantages



##Real world usage examples



##Things to consider

Some do not like it, because it overpowers the singleton.
