---
layout: post
title: Factory Pattern
permalink: /patterns/factory/
date: 2016-08-20 15:31:19
categories: design-patterns
---
**Factory Pattern** is a _creational pattern_ that provides an interface for creating objects, but it lets subclasses decide which type of object to instantiate.

## When to use it

Whenever you need to create objects/classes of different types, that are specified at runtime by user, or that depend on different criteria that can't be predicted beforehand (e.g. on already instantiated classes) consider using a Factory Pattern.

## The difference from the Abstract Factory

For some readers, there might appear some confusion related to the Factory Pattern and the Abstract Factory Pattern. First of all, because both of these patterns are _factories_ in a way or another, and second, because they both _create objects/classes of different types._ So, what is the difference then?

Well, the Abstract Factory _uses_ the factories that we will discuss in this post. The difference is the fact that the [Abstract Factory](/patterns/abstract-factory/) is broader, it can create "families" of different objects, like human archers and warriors, dwarf archers and warriors and elf archers and warriors. On the other hand, a Factory is responsible to create archers or warriors of only one race. Let's move on and analyze an example that will clarify things.

## Specific example

[Thranduil](http://lotr.wikia.com/wiki/Thranduil), the Elven king who ruled over the Woodland Realm, <strike>asked</strike> ordered (elves are pretty arrogant with us, humans, aren't they?) you to create an easier method to recruit three types of warriors: scouts, archers and swordsmen. "His majesty" just wants to specify what type of warrior he wants and that's it. Let's see how Factory Pattern can help us in this situation.

## Implementation without pattern

Without the Factory Pattern, anytime you will need to create a type of warrior, you will have a conditional flow to see what type of warrior should be created. Then, based on the required condition, you will create the proper type of object.

## Implementation using Factory Pattern

With Factory Pattern, you will create a factory that will accept a `type` parameter and will return you the required instantiated object. In this way, the creation of the object happens inside the factory.

## Pattern components

![Factory Pattern Participants]({{ site.url }}/assets/images/DesignPatterns/FactoryPattern.png)

- The _Creator_ is the factory class that creates new products.
- The _Abstract Product_ defines an interface of objects that the factory creates.
- The _Product_ is the actual product that is created by the factory.

## JavaScript implementation

As we do not have class based inheritance in JavaScript and there are no abstract classes, the Abstract Product component is absent here. Moreover, we will have to assure that the "Products" (in our case the Warriors) have the same methods on them so that the client can use any product from our factory without needing to do elaborate checks to see if a particular method exists.

{% highlight javascript lineanchors %}
function WarriorFactory() {
    this.createWarrior = function (type) {
        var warrior;
 
        switch ( type ) {
            case 'swordsman':
                warrior = new Swordsman();
                break;
            case 'archer':
                warrior = new Archer();
                break;
            case 'scout':
                warrior = new Scout();
                break;
            default:
                warrior = new Swordsman();
        }
 
        // Let's capitalize warrior's type.
        warrior.type = type.charAt(0).toUpperCase() + type.slice(1);
 
        warrior.attack = function () {
            console.log(this.type + " takes his " + this.weapon + " and shouts: Gurth enin goth!");  // Death to the enemy! 
        }
 
        return warrior;
    }
}
 
var Swordsman = function () {
    this.weapon = "sword";
    this.armor = "chain";
};
 
var Archer = function () {
    this.weapon = "bow";
    this.armor = "leather";
};
 
var Scout = function () {
    this.weapon = "dagger";
    this.armor = "leather";
};
{% endhighlight %}

Note that we defined a default statement, which gets executed if the provided type matches no specified cases. In our case, if we try to train a "berserker," the factory will train a Swordsman instead. How you handle types that do not match depends on each case, just keep in mind that you _need_ to handle them.

Now, whenever we want to create a warrior, we address to our WarriorFactory and ask what type of warrior we would like to get.

{% highlight javascript lineanchors %}
// First, create an instance of the WarriorFactory
var warriorFactory = new WarriorFactory();

var warriors = [];

warriors.push(warriorFactory.createWarrior('archer'));
warriors.push(warriorFactory.createWarrior('scout'));
warriors.push(warriorFactory.createWarrior('archer'));
warriors.push(warriorFactory.createWarrior('swordsman'));

warriors.forEach(function (warrior) {
    warrior.attack();
});
{% endhighlight %}

The above code will output to the console the following.

{% highlight javascript %}
Archer takes his bow and shouts: Gurth enin goth!
Scout takes his dagger and shouts: Gurth enin goth!
Archer takes his bow and shouts: Gurth enin goth!
Swordsman takes his sword and shouts: Gurth enin goth!
{% endhighlight %}

And that is how to implement a Factory Pattern in JavaScript. Additionally, you could add a second parameter to the `createWarrior` method - an object that holds some specific characteristics to be applied on the object that should be created by the factory.

{% highlight javascript lineanchors %}
{% endhighlight %}

## Python implementation

In Python, we define our factory as a class with a class method on it that returns the required instance of the class. Also, here we define a `Warrior` class that our swordsmen, archers and scouts will inherit from. This `Warrior` class has all the methods that our "product family" will have in common (in our case - only the `attack` method) and plays the role of the _Product_ component from the above diagram.

{% highlight python lineanchors %}
class WarriorFactory:
    
    # We define a class method here to be able to get objects 
    # we need without instantiating a WarriorFactory object.
    @classmethod
    def create_warrior(self, warrior_type):
        if warrior_type == 'swordsman':
            return Swordsman(weapon='sword', armor='chain')
        elif warrior_type == 'archer':
            return Archer(weapon='bow', armor='leather')
        elif warrior_type == 'scout':
            return Scout(weapon='dagger', armor='leather')
        else:
            # The default value, if warrior_type doesn't match anything else.
            return Swordsman(weapon='sword', armor='chain')


class Warrior:
    """This is a parent class from which our warrior classes will inherit."""    
    def __init__(self, type_, weapon, armor):
        self.type_ = type_  # It is not recommended to use `type`, as a parameter, as it shadows the `type` built-in function, that's why we use a _ at the end.
        self.weapon = weapon
        self.armor = armor

    def attack(self):
        print(self.type_ + " takes his " + self.weapon + " and shouts: Gurth enin goth!")


class Swordsman(Warrior):
    
    def __init__(self, weapon, armor):
        self.attack_range = 2  # in meters
        super(Swordsman, self).__init__('Swordsman', weapon, armor)  # The first parameter is warrior type.


class Archer(Warrior):
    
    def __init__(self, weapon, armor):
        self.attack_range = 200  # elven archers are indeed good at this
        super(Archer, self).__init__('Archer', weapon, armor)
        

class Scout(Warrior):
    
    def __init__(self, weapon, armor):
        self.attack_range = 0  # scouts attack only when necessary, from behind
        super(Scout, self).__init__('Scout', weapon, armor)
        
    def attack(self):
        """We override the `attack` method because scouts should be quiet.
        They simply kill their enemies without too much noise."""
        print(self.type_ + " takes his " + self.weapon + " and whispers with a grin on his face: The time for you has come.")

{% endhighlight %}

Note that we defined a default statement, which gets executed if the provided `warrior_type` matches no specified warriors. In our case, if we try to train a "berserker," the factory will train a Swordsman instead. How you handle types that do not match depends on each case, just keep in mind that you _need_ to handle them.

Now, whenever we want to create a warrior, we address to our WarriorFactory and ask what type of warrior we would like to get. The implementation is very similar to that of JavaScript.

{% highlight python lineanchors %}
# create a list that will hold all our different warriors
warriors = []

warriors.append(WarriorFactory.create_warrior('archer'))
warriors.append(WarriorFactory.create_warrior('scout'))
warriors.append(WarriorFactory.create_warrior('swordsman'))
warriors.append(WarriorFactory.create_warrior('scout'))

for warrior in warriors:
    warrior.attack()
{% endhighlight %}

The code above will generate the following output.

{% highlight python lineanchors %}
Archer takes his bow and shouts: Gurth enin goth!
Scout takes his dagger and whispers with a grin on his face: The time for you has come.
Swordsman takes his sword and shouts: Gurth enin goth!
Scout takes his dagger and whispers with a grin on his face: The time for you has come.
{% endhighlight %}

{% highlight python lineanchors %}
{% endhighlight %}

## Advantages

- [Loose Coupling](https://en.wikipedia.org/wiki/Loose_coupling). By using the Factory Pattern, the places that need a specific object do not need to know how to construct one, because the factory holds that information.
- Makes it possible to create objects based on conditions that are dynamic in nature (e.g. user input, existing state of the program, etc.).
- If there is a need to instantiate in many places, there is no need to repeat the condition.
- Testability. You can write unit-tests for your factory once and then only test whether the factory method that creates the object is called.
- Extensibility. Whenever you need to add a new class to the factory, none of the calling code, tests or implementation needs to be changed. You simply create the class and extend the factory to be able to create it as well.

## Disadvantages

- As with the Abstract Factory Pattern, the Factory Pattern adds another level ob abstraction, which makes your code more complex.
- In simple cases, when the criteria for creation of objects is simple, the Factory Pattern makes your code more complex without any additional value.

## Real world usage examples

- When developing plugins for applications, you can make your main application call the factory to instantiate the specific plugin. Thus, you can develop your application without needing to know what is going to be plugged into it.
- Whenever you just want to obtain a class that "does the job," based on some complicated conditions that you have and on the current state of the app that cannot be predicted.

## Things to consider

- The provided examples here are pretty simple and in real world probably would not require to be implemented using the factory pattern. What a more realistic implementation would look like is to have some more complex logic in the factory class and some dependencies injected that are required by different product classes. But in order to explain the concept behind this pattern, we sticked to a simple example.
- There is a difference between the **Factory Pattern** and the **Factory Method** (and the Abstract Factory Pattern, but we covered that difference already). This post addresses the Factory Pattern, or, how it is often related to - the Simple Factory. The difference between the two is out of scope of this article, but just to offer a brief explanation - with Simple Factory, there is _one class_ that decides which object to instantiate based on the provided condition and that one class can _create all possible types of objects_ that are "registered" in the factory, whereas with the Factory Method the objects are created by each individual subclass that inherits from an abstract class, so there are _many subclasses,_ each of which _creates only one type of object._ These differences offer their own advantages and disadvantages, but it is a topic for another post.

## Additional resources

- [Wikipedia] [Factory Method](https://en.wikipedia.org/wiki/Factory_method_pattern)
- [JavaScript Design Patterns] [The Factory Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript)
- [Simple Factory vs. Factory Method vs. Abstract Factory](http://corey.quickshiftconsulting.com/blog/first-post)

