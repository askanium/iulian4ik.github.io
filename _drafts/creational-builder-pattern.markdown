---
layout: post
title: Builder Pattern
categories: design-patterns
---
##Intent

The **Builder Pattern** eases the creation of complex objects by using specialized builders that take care of the construction process or by providing a way to build the objects step-by-step.

##When to use it

Whenever you have a complex object that is built in a step-by-step manner or when you would like to simplify the creation process of a complex object with many required _and_ optional parameters, consider using a Builder Pattern.

##Specific example 1

In Middle-Earth there are lots of armed conflicts happenning all the time. The biggest of them, besides numerous warriors, require siege weapons. Now imagine that we are in charge to build a dozen of catapults and trebuchets for the upcoming battle. And because the catapult and trebuchet are complex machines, that require a lot of effort and knowledge of how to build it, we will need a whole Construction Site to build them.

##Specific example 2

There is another potential usage of the Builder Pattern in Middle-Earth. For this example let's switch to the villain side and see how we can build such a complex entity as an _army_ (\*evil smile\* mua-ha-ha-ha-ha-ha-ha). Sauron can build armies using his own power. But any army consists of numerous types of warriors and not all of them are mandatory to be present in an army - which makes it a complex object and we need a simple and convenient way to create them.

##Implementation without pattern

There are multiple ways to build such a complex machine as a trebuchet. We could either have different workers that do everything and we coordinate the process, or we might first build the component parts and combine them at once to get a trebuchet, or build them gradually, but we should know the order in which to assemble them. However, when we'll need to build a catapult, we'll have to review our approach and check whether it is relevant or it should be changed.

##Implementation using Builder Pattern

**Example 1** Using the Builder Pattern, we will train a _Trebuchet Master Builder_ and a _Catapult Master Builder._ Then we will work only with them, by asking them to build a catapult/trebuchet and they will further coordinate the construction process, because they will know how exactly you should build a catapult and in what order to assemble the component pieces. Also, all the work will be done on a _Construction Site_ dedicated to build siege weapons.

**Example 2** Using the Builder Pattern, we will give the possibility to Sauron to chain his commands to create an army in steps - one type of warriors at a time.

##Pattern structure

![Builder Pattern Participants]({{ site.url }}/assets/images/DesignPatterns/TheBuilderPattern.png)

- The _Director_ is the entity that constructs the object using the builder interface. In our case, the Director is us, as we want to build siege weapons.
- The _Builder_ is the interface for creating different types of objects by using concrete Builders. In our case the Builder is the Construction Site.
- The _Concrete Builder_ knows how to create an object of a specific type. In our case, we have 2 builders - the Catapult and Trebuchet Master Builders.
- The _Product_ is the final object that is obtained by the _Director_ that used a specific _Concrete Builder._

Let's see how to implement the Builder Pattern to get a better understanding of the collaborations between pattern components.

##JavaScript implementation

####Example 1

For implementing the Builder Pattern in JavaScript, we will need a constructor for the _Construction Site_ and a constructor for each type of _Master Builders._

{% highlight javascript lineanchors %}
function ConstructionSite() {
    this.build = function (builder) {
        builder.createSkeleton();
        builder.createBase();
        builder.createThrowingMechanism();
        builder.provideProjectiles();
        return builder.get();
    }
}

function Trebuchet() {
    this.foundation = null;
    this.throwingMechanism = null;
    this.projectiles = 0;

    this.launchProjectile = function () {
        if ( this.projectiles > 0 ) {
            this.projectiles -= 1;
            alert('Fire!');
        } else {
            alert('No projectiles left! Aaaaa!');
        }
    }
}

function Catapult() {
    this.nrOfWheels = 0;
    this.foundation = null;
    this.stoppingMechanism = null;
    this.throwingMechanism = null;
    this.projectiles = 0;

    this.launchProjectile = function () {
        if ( this.projectiles > 2 ) {
            this.projectiles -= 3;  // Our catapults will fire 3 projectiles at once.
            alert('Fire!');
        } else {
            alert('Not enough projectiles! Aaaaa!');
        }
    }
}
{% endhighlight %}

Above are the constructors for our siege weapons and the _Constructor Site_ (the _Builder_ component). Now, we are going to create the _Concrete Builders_ that can build one of the siege weapons we need.

{% highlight javascript lineanchors %}
function TrebuchetMasterBuilder() {
    this.trebuchet = null;

    this.createSkeleton = function () {
        this.trebuchet = new Trebuchet();
    }

    this.createBase = function () {
        this.trebuchet.foundation = 'static';
    }

    this.createThrowingMechanism = function () {
        this.trebuchet.throwingMechanism = 'gravitational';
    }

    this.provideProjectiles = function () {
        this.trebuchet.projectiles = 15;
    }

    this.get = function () {
        return this.trebuchet;
    }
}

function CatapultMasterBuilder() {
    this.catapult = null;

    this.createSkeleton = function () {
        this.catapult = new Catapult();
    }

    this.createBase = function () {
        this.catapult.foundation = 'dynamic';
        this.catapult.nrOfWheels = 6;  // This is a massive catapult
    }

    this.createThrowingMechanism = function () {
        this.catapult.throwingMechanism = 'spring';
        this.catapult.stoppingMechanism = 'blockage';
    }

    this.provideProjectiles = function () {
        this.catapult.projectiles = 30;
    }

    this.get = function () {
        return this.catapult;
    }
}
{% endhighlight %}

Now we have everything we need to build catapults and trebuchets efficiently and we do not necessarily need to know how either of them are actually built. To create a catapult and a trebuchet, we use each builder to build one on our construction site.

{% highlight javascript lineanchors %}
var constructionSite = new ConstructionSite();
var trebuchetBuilder = new TrebuchetMasterBuilder();
var catapultBuilder = new CatapultMasterBuilder();

var catapult = constructionSite.construct(catapultBuilder);
var trebuchet = constructionSite.construct(trebuchetBuilder);

catapult.launchProjectile();   // Fire!
trebuchet.launchProjectile();  // Fire!

console.log(catapult.projectiles);   // 27
console.log(trebuchet.projectiles);  // 14
{% endhighlight %}

We provide the builder to our construction site, which knows how to operate with the builder. This has the following benefits:

1. We do not need to know how exactly a complex object is built - the builder knows this.
2. As far as the builders implement the same API, the objects built by the Director can vary significantly in their structure. This means we can have the same interface for creating different objects (but we still need to provide builders for those objects).

####Example 2

Another implementation of the Builder Pattern found on the internet is the one that deals with the [Telescoping Constructor Pattern](http://codethataint.com/blog/telescoping-constructor-pattern-java/) in statically typed languages such as Java. Although in JavaScript there are no problems to pass a different amount of parameters at different function calls (thanks to the [_arguments_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) object), the challenge remains to interpret the passed in arguments and do the corresponding actions with them.

Suppose we have the following `Army` constructor:

{% highlight javascript lineanchors %}
function SauronArmy() {
    // Warriors
    this.urukHaiPikeman = 0;
    this.urukHaiBerserker = 0;
    this.blackUruks = 0;
    this.trolls = 0;
    this.nazgul = 0;

    // Siege tools
    this.batteringRams = 0;
    this.siegeLadders = 0;
    this.siegeTowers = 0;
}
{% endhighlight %}

How can we build a customized army using the constructor above? One thing we could do is define the constructor parameters like so:

{% highlight javascript lineanchors %}
function SauronArmy(urukHaiPikeman, urukHaiBerserker, ..., siegeTowers) {
    this.urukHaiPikeman = urukHaiPikeman;
    this.urukHaiBerserker = urukHaiBerserker;
    ...
    this.siegeTowers = siegeTowers;
}
{% endhighlight %}

But then, the creating process would look something like this:

{% highlight javascript lineanchors %}
var army = SauronArmy(10000, 5000, 5000, 300, 3, 2, 500, 40);
{% endhighlight %}

Not very clear, isn't it? And if you want to change something, you must look up the order first, then change the correct argument. 

Instead, let's define a way to set each type of unit individually.

{% highlight javascript lineanchors %}
function SauronArmyBuilder () {
    this.army = new SauronArmy();

    this.addUrukHaiPikeman = function ( nrOfPikemanUnits ) {
        this.army.urukHaiPikeman = nrOfPikemanUnits;
        return this;
    }

    this.addUrukHaiBerserkers = function ( nrOfBerkerkerUnits ) {
        this.army.urukHaiBerserkers = nrOfBerkerkerUnits;
        return this;
    }

    ...

    this.addSiegeTowers = function ( nrOfSiegeTowers ) {
        this.army.siegeTowers = nrOfSiegeTowers;
        return this;
    }

    this.getArmy = function () { return this.army; }
}
{% endhighlight %}

Now, the creation of an army becomes less cumbersome. Because we return `this` in each builder method, we can chain the calls.

{% highlight javascript lineanchors %}
var army = new SauronArmyBuilder()
                .addUrukHaiPikeman(10000)
                .addBlackUruks(4000)
                .addTrolls(500)
                .addSiegeLadders(400)
                .addSiegeTowers(50)
                .getArmy();
{% endhighlight %}

Using chained method we can add only those types of units that are needed by us. Also, if we want to change a specific type of unit, we know exactly where to do this.

{% highlight javascript lineanchors %}
{% endhighlight %}

##Python implementation

####Example 1

Now let's see how to implement the Builder Pattern in Python. But now let's assume we will have only one class - the `SiegeWeapon` class instead of a Trebuchet and a Catapult class. Still, we will need the Concrete Builders classes.

{% highlight python lineanchors %}
class SiegeWeapon:
    """The Siege Weapon class that can be either of a `Catapult` 
        or a `Trebuchet` type."""

    def __init__(self, type):
        self.type = type
        self.nr_of_wheels = 0
        self.foundation = None;
        self.stopping_mechanism = None;
        self.throwing_mechanism = None;
        self.projectiles = 0;

    def __str__(self):
        return '{}, nr of projectiles left = {}'.format(self.type, 
                                                        self.projectiles);

    def fire(self, nr_of_projectiles):
        if self.projectiles < nr_of_projectiles:
            print("Not enough projectiles! We're all gonna die!!!")
        else:
            self.projectiles -= nr_of_projectiles
            print('Fire!')


class CatapultBuilder:
    """The builder class for a Catapult that knows how to build one."""

    def __init__(self):
        self.catapult = SiegeWeapon('catapult')

    def __add_wheels(self):
        self.catapult.wheels = 4

    def add_base(self):
        self.catapult.foundation = 'dynamic'
        self.__add_wheels()

    def add_throwing_mechanism(self):
        self.catapult.throwing_mechanism = 'spring'
        self.catapult.stopping_mechanism = 'blockage'

    def add_projectiles(self):
        self.catapult.projectiles = 30

    def assemble(self):
        return self.catapult


class TrebuchetBuilder:
    """The builder class for a Trebuchet that knows how to build one."""

    def __init__(self):
        self.trebuchet = SiegeWeapon('trebuchet')

    def add_base(self):
        self.trebuchet.foundation = 'static'

    def add_throwing_mechanism(self):
        self.trebuchet.throwing_mechanism = 'gravitational'

    def add_projectiles(self):
        self.trebuchet.projectiles = 15

    @property
    def siege_weapon(self):
        return self.trebuchet
{% endhighlight %}

We're almost done. Just define the Director object - the ConstructionSite class and we can build siege weapons!

{% highlight python lineanchors %}
class ConstructionSite:
    """The object that operates with concrete builders that know how to create 
    complex objects."""

    def __init__(self):
        self.builder = None

    def build_siege_weapon(self, builder):
        self.builder = builder
        builder.add_base()
        builder.add_throwing_mechanism()
        builder.add_projectiles()

    @property
    def siege_weapon(self):
        return self.builder.siege_weapon

# And now, let's build a trebuchet!
construction_site = ConstructionSite()
construction_site.build_siege_weapon(TrebuchetBuilder)
trebuchet = construction_site.siege_weapon

print(trebuchet)  # trebuchet, nr of projectiles left = 15
{% endhighlight %}

####Example 2

In Python, due to the possibility to have _keyword arguments,_ there are no problems with telescoping constructor patterns, because we can (1) define the default value when writing the method and (2) provide only the required arguments on a method call by specifying the name of the argument along with its value. 

There are however cases when you would benefit from implementing the step-by-step creation process, but I'll leave this as an exercise for those who would like to practice their skills.

{% highlight python lineanchors %}
{% endhighlight %}

##Advantages

- The Builder Pattern separates the construction of complex objects from their representation, so that the same construction process can create different objects.
- It shifts the responsibility of knowing the creation process from the client to the builder, so that the client does not necessarily know how to create a complex object, but if (s)he provides a corresponding builder, the object will be built correctly.
- The chained building process makes the code easier to understand and reason about.

##Disadvantages

There are no real disadvantages of using the Builder Pattern. The only thing is that you will have to write a bit more code (that could introduce more complexity), but in the end, if your use case requires a Builder Pattern, there are only gains in the long run.

##Real world usage examples

- On of the examples of the chained building process can be found in jQuery. DOM objects can be really complex (they can have classes, attributes, styles, some of which are mandatory and others are optional). And it is quite hard to build a DOM element _at once._ It is more convenient to create it one part at a time: `$('<input />).attr({"type":"text", "id":"label"}).css('color', '#f00').height(30).width(100);`
- Another example can be found in the software of a [pizza vending machine](https://www.youtube.com/watch?v=B4_C1BmT-R8) or the [burrito vending machine](https://www.youtube.com/watch?v=hePE9mkKVrE)

##Additional resources

- [StackOverflow] [When would you use the Builder Pattern?](http://stackoverflow.com/questions/328496/when-would-you-use-the-builder-pattern)
- [Wikipedia] [Builder Pattern](https://en.wikipedia.org/wiki/Builder_pattern)
- [JavaScript Design Patterns] [The Builder Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#builderpatternjquery)
- [GoF Design patterns and JavaScript: The Builder pattern](http://prog-elisp.blogspot.md/2013/04/gof-design-patterns-and-javascript.html)