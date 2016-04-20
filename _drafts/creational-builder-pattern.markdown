---
layout: post
title: Builder Pattern
categories: design-patterns
---
##Intent

Ease the creation of complex objects by using specialized builders that take care of the construction process.

##When to use it

Whenever you have a complex object that is built in a step-by-step manner or when you would like to simplify the creation process of a complex object for a user, consider using a Builder Pattern.

##Specific example 1

In Middle-Earth there are lots of armed conflicts happenning all the time. The biggest of them, besides numerous warriors, require siege weapons. Now imagine that we are in charge to build a dozen of catapults and trebuchets for the upcoming battle. And because the catapult and trebuchet are complex machines, that require a lot of effort and knowledge of how to build it, we will need a whole Construction Site to build them.

##Specific example 2

There is another potential usage of the Builder Pattern in Middle-Earth. For this example let's switch to the villain side and see how we can build such a complex entity as an _army_ (\*evil smile\* mua-ha-ha-ha-ha-ha-ha >:) ). Sauron can build armies using his power. Any army consists of numerous types of warriors - which makes it a complex object and we need a simple and convenient way to create them.

##Implementation without pattern

There are multiple ways to build such a complex machine as a trebuchet. We could either have different workers that do everything and we coordinate the process, or we might first build the component parts and combine them at once to get a trebuchet, or build them gradually, but we should know the order in which to assemble them. However, when we'll need to build a catapult, we'll have to review our approach and check whether it is relevant or it should be changed.

##Implementation using Builder Pattern

**Example 1** Using the Builder Pattern, we will train a _Trebuchet Master Builder_ and a _Catapult Master Builder._ Then we will work only with them, by asking them to build a catapult/trebuchet and they will further coordinate the construction process, because they will know how exactly you should build a catapult and in what order to assemble the component pieces. Also, all the work will be done on a _Construction Site_ dedicated to build siege weapons.

**Example 2** Using the Builder Pattern, we will give the possibility to Sauron to chain his commands to create an army in steps - one type of warriors at a time.

##Pattern components

TBD

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

Above are the constructors for our siege weapons and the _Constructor Site_ (the Director component). Now, we are going to create the _Builders_ that can build one of the siege weapons we need.

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

Now we have everything we need to build catapults and trebuchets efficiently and we do not necessarily need to know how either of them are actually built. To create a catapult and a trebuchet, we ask for each builder to build one on our construction site.

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



{% highlight javascript lineanchors %}
{% endhighlight %}


##Python implementation



##Advantages



##Disadvantages



##Real world usage examples



##Things to consider


##Additional resources


