---
layout: post
title: Prototype Pattern
categories: design-patterns
---
##Intent

**Prototype Pattern** is a _creational pattern_ that provides the possibility to easily obtain a duplicate of an object based on a given prototype.

##When to use it

Whenever you need to generate copies of similar simple or complex objects in your projects, consider using a Prototype Pattern.

##Specific example

Have you ever wondered how Sauron created his mighty Orc army? I believe the used some sort of magical type of the Prototype Pattern. He doesn't need each Orc to have a personality, he needs many copies of several types of strong warriors that can fight. Suppose we serve the Dark side and we need to create a fast and simple way to create 3 types of orcs: [_Uruk Scout_](http://lotr.wikia.com/wiki/Uruk-hai_Scouts), [_Uruk Pikeman_](http://lotr.wikia.com/wiki/Uruk-hai_Pikeman) and [_Uruk-hai berserker_](http://lotr.wikia.com/wiki/Berserkers) Let's see how the Prototype Pattern can help us in this situation.

##Implementation without pattern

Without the Prototype Pattern, there are mainly 2 possibilities:

- create 3 separate classes for each type of warrior we need, all of which would inherit from an `UrukHai` class and create warriors of each class separately.
- create only one `UrukHai` class and create different types of warriors by providing different parameters to the class on initialization.

##Implementation using Prototype Pattern

The key in implementing a Prototype Pattern is to have a possibility to clone existing objects. Thus, we would have 3 objects that would represent a scout, a pikeman and a berserker that could clone themselves on demand.

Alternatively, we could have a pool of available prototypes from which we could select which type of warrior we would like to clone.

##Pattern components

TBD

##JavaScript implementation

JavaScript itself is a prototype based language, meaning that inheritance is performed by cloning existing objects that serve as prototypes. This makes the usage of prototype pattern in Javascript easier, as the language itself facilitates pattern's underlying concepts.

To demonstrate the prototypal nature of JavaScript, we won't use any constructor in order to implement the pattern. Instead we would create a warrior using <del>object literal</del> dark magic. Let's create a simple Uruk-Hai first.

{% highlight javascript lineanchors %}
var urukHai = {
    weight: 50,  // in kg
    weapon: 'none',
    armor: 'none',
    attackSpeed: 20,
    maxSpeed: 12,  // in km/h
    currentSpeed: 0,
    run: function () { this.currentSpeed = this.maxSpeed; },  // abilities
    attack: function () { alert('Arghghghghg!!!!!'); }
};
{% endhighlight %}

In order to obtain a cloned urukHai, in JavaScript we can use `Object.create`.

{% highlight javascript lineanchors %}
var urukHaiClone = Object.create(urukHai);
{% endhighlight %}

And that's all you need in order to obtain a clone in JavaScript that inherits everything from its parent object. But let's go further and define the `create` method on the prototype itself.

{% highlight javascript lineanchors %}
var urukHai.create = function (newProps) {
    var clone = Object.create(this);
    for ( var prop in newProps ) {
        if ( newProps.hasOwnProperty(prop) ) {
            clone[prop] = newProps[prop];
        }
    }
    return clone;
}
var urukHaiScout = urukHai.create({
    armor: 'light', 
    weapon: 'light sword',
    disguiseLevel: 'none',
    maxSpeed: 10,
    scout: function () { 
        this.disguiseLevel = 'high';
        this.currentSpeed = 3;
    },
    attack: function () { 
        this.disguiseLevel = 'none'; 
        alert('Arghghghghg!!!!!');
    }
});
console.log(urukHaiScout.weight);    // 50
console.log(urukHaiScout.maxSpeed);  // 10
{% endhighlight %}

In the code above, besides cloning the prototype, we implemented the possibility to override some of the clone's properties and/or methods. This can come in handy when we need a duplicate of a complex object with most of its structure the same and only a few properties different.

Now, let's create a warriors **Prototype Manager** that can create different warriors on demand. A Prototype Manager is useful when a number of prototypes is dynamic. Suppose that Sauron might want to slightly modify an existing prototype and clone the newly created warrior as well as the existing warrior. We do not know beforehand what warriors might serve as prototypes, but we can provide an interface for Sauron to register warriors as prototypes.

{% highlight javascript lineanchors %}
var orcWarriorPrototypeManager = {
    prototypes: {},
    register: function (identifier, obj) { 
        this.prototypes[identifier] = obj; 
    },
    unregister: function (identifier, obj) { 
        delete this[identifier]; 
    },
    create: function (identifier, propertiesToUpdate) {
        propertiesToUpdate = propertiesToUpdate || {};
        if ( this.prototypes[identifier] === undefined ) {
            // If there is no such identifier, throw an error.
            throw 'No such warrior prototype';
        } 
        var clone = Object.create(this.prototypes[identifier]);
        for ( var prop in propertiesToUpdate ) {
            if ( propertiesToUpdate.hasOwnProperty(prop) ) {
                clone[prop] = propertiesToUpdate[prop];
            }
        }
        return clone;
    }
}

// Register `urukHai` and `urukHaiScout` as a prototype
orcWarriorPrototypeManager.register('urukHai', urukHai);
orcWarriorPrototypeManager.register('urukHaiScout', urukHaiScout);

// Clone the existing Uruk-Hai and transform it into a Pikeman.
var urukHaiPikeman = orcWarriorPrototypeManager.create('urukHai', {
    weight: 80,
    armor: 'heavy',
    weapon: 'pike',
    maxSpeed: 8,
    ??????????assault: function () {}
});

// Register our `urukHaiPikeman` as a prototype
orcWarriorPrototypeManager.register('urukHaiPikeman', urukHaiPikeman);

// Create a berserker prototype
var urukHaiBerserker = orcWarriorPrototypeManager.create('urukHai', {
    weight: 136,
    weapon: 'a huge sword with a five-foot blade and a foot-long double spike at the end',
    maxSpeed: 10,
    enrage: function () {
        this.maxSpeed = 18;
        this.attackSpeed = 27;
    }
});

// Register our `urukHaiBerserker` as a prototype
orcWarriorPrototypeManager.register('urukHaiBerserker', urukHaiBerserker);
{% endhighlight %}

Now, whenever we would like to create any of the three types of warriors, we can use the Prototype Manager.

{% highlight javascript lineanchors %}
orcWarriorPrototypeManager.create('urukHaiScout');      // Creates a scout
orcWarriorPrototypeManager.create('urukHaiPikeman');    // Creates a pikeman
orcWarriorPrototypeManager.create('urukHaiBerserker');  // Creates a berserker
{% endhighlight %}


{% highlight javascript lineanchors %}
{% endhighlight %}

##Python implementation

In Python, we can obtain a clone of an object using the [`copy`](https://docs.python.org/3.1/library/copy.html) module. `copy.deepcopy()` creates a deep copy and `copy.copy()` creates a shallow copy. Which one to choose depends on what you are trying to achieve. As a simple explanation of shallow vs deep copy, check out this SO [answer](http://stackoverflow.com/a/17246744/3120525). For our purpose, a shallow copy will be enough.

{% highlight python lineanchors %}
class UrukHai:
    def __init__(self, weight, weapon, max_speed, attack_speed, **other):
        '''Other might be: disguise, armor, etc.'''
        self.weight = weight
        self.weapon = weapon
        self.max_speed = max_speed
        self.attack_speed = attack_speed
        self.__dict__.update(other)

    def __str__(self):
        mylist=[]
        ordered = OrderedDict(sorted(self.__dict__.items()))
        for i in ordered.keys():
            mylist.append('{}: {}'.format(i, ordered[i]))
            if i == 'price':
                mylist.append('$')
            mylist.append('\n')
        return ''.join(mylist)
{% endhighlight %}

And the Prototype Manager:

{% highlight python lineanchors %}
class PrototypeManager:
    def __init__(self):
        self.prototypes = dict()

    def register(self, identifier, obj):
        self.prototypes[identifier] = obj

    def unregister(self, identifier):
        del self.prototypes[identifier]

    def clone(self, identifier, **attr):
        prototype = self.prototypes.get(identifier, None)
        if prototype is None:
            raise KeyError('Incorrect prototype identifier: {}'.format(identifier))
        obj = copy.copy(prototype)
        obj.__dict__.update(attr)
        return obj
{% endhighlight %}

{% highlight python lineanchors %}
{% endhighlight %}

##Advantages

- It can greatly reduce the number of required classes for generating similar objects with slight differences (e.g. an Uruk-Hai class instead of 3 classes for Scout, Pikeman and Berserker).

- The cloned object inherits references to existing functions from the prototype, thus optimizing memory usage and boosting performance.

- Possibility to dynamically add prototypes to clone from.

##Disadvantages

- For simple objects with few differences the Prototype Pattern is not worth the effort and will overcomplicate things.

##Real world usage examples

As it is a creational pattern and as nowadays humanity creates information in tremendous volumes, this pattern can be used whenever there's a need to create instances of different objects. Some examples:

- When creating a company structure with its shops and other entities, each of which has some shared values (e.g. shops in the same city have the same City, Company and Department)
- When on your mobile phone you want to send someone a message based on a predefined template, you can register those templates ("Will call you later.", "Can't talk right now.", etc.) as prototypes that can be cloned.

##Things to consider

- In JavaScript you can pass as a second argument to `Object.create` an object with properties settings. You can make some properties configurable, enumerable or writable. For instance we would like to restrict changing the weapon of an Uruk-Hai Pikeman, because, after all, a pikeman without a pike won't be a pikeman.

- There are 2 modalities of cloning (not only in Python): shallow and deep cloning. Sometimes you would like to use one over the other.