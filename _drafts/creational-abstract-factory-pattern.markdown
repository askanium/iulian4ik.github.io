---
layout: post
title: Abstract Factory Pattern
categories: design-patterns
---
##Intent

**Abstract Factory** provides an interface for creating families of related objects without specifying their specific classes.

##When to use it

Whenever you need to create different type of objects that are united by a common theme, that have similar behaviour and functionality.

##Specific example

In Middle-Earth, there are many races: Elves, Orcs, Maiar, Dwarves, Humans, and many-many others. Suppose now that we need to be able to create warriors of different races (Dwarfs, Elves, Human) to fight against Sauron. A "warrior" is the common theme for all these objects, that can fight, show off and prepare his weapon for battle, but yet each race's warrior is different.

##Implementation without pattern

Without the Abstract Factory Pattern, we will have a class for each type of warrior that will create warriors of specific types with their own characteristics, attributes and methods. We will need to know how to "operate" with each type of warrior in order to succeed in the battle.

##Implementation using Abstract Factory Pattern

Using the pattern, we will have an `AbstractFactory` defined that will know how to create different types of warriors and we will have a common interface for all types of warriors that will define _how_ the warriors can behave. The AbstractFactory that builds warriors and the AbstractWarrior interface that defines how the warriors behave are two key elements in implementing the Abstract Factory Pattern. Let's see what are the components and specific examples to make things more clear.

##Pattern components



##JavaScript implementation

In statically-typed languages such as Java, the abstract classes and interfaces enforce consistency in derived classes. In JavaScript there is no support for class-based inheritance, therefore the AbstractFactory and AbstractWarrior classes are absent in the implementation of this pattern. But because JavaScript is a dynamically-typed language, we have [duck typing](https://en.wikipedia.org/wiki/Duck_typing) to help us implement the Abstract Factory Pattern. We will have to assure that the factories that generate warriors as well as the warriors that are to be generated will have that consistency that in Java is achieved using abstract classes and interfaces. This means that we need to take care that all our factories and types of warriors have the same methods defined on them.

Let's define the Human, Elves and Dwarves warriors and their corresponding factories.

{% highlight javascript lineanchors %}
function HumanWarrior (armor, weapon) {
    this.race = 'human';
    this.armor = armor;
    this.weapon = weapon;

    this.prepareWeapon = function () {
        console.log('The human warrior stretches, grabs his mighty ' 
            + this.weapon + ', smiles at it and is ready to fight.');
    }

    this.attack = function () {
        console.log('- For honor!');
    }
}

function DwarfWarrior (armor, weapon) {
    this.race = 'dwarf';
    this.armor = armor;
    this.weapon = weapon;

    this.prepareWeapon = function () {
        console.log('The dwarf takes his ' + this.weapon 
            + ', swings it several times and starts looking for the enemy to attack.');
    }

    this.attack = function () {
        console.log('- For Durin!');
    }
}

function ElfWarrior (armor, weapon) {
    this.race = 'elf';
    this.armor = armor;
    this.weapon = weapon;

    this.prepareWeapon = function () {
        console.log('The elf takes his ' + this.weapon 
            + ' and is ready to fight.');  // What strict to the point elves are they!
    }

    this.attack = function () {
        console.log('- Gurth enin goth!');  // Death to the enemy! 
    }
}

function HumanWarriorFactory () {
    this.train = function (armor) {
        return new HumanWarrior(armor, 'sword');
    }
}
function DwarfWarriorFactory () {
    this.train = function (armor) {
        return new DwarfWarrior(armor, 'axe');
    }
}
function ElfWarriorFactory () {
    this.train = function (armor) {
        return new ElfWarrior(armor, 'long sword');
    }
}
function ElfArcherFactory () {
    this.train = function (armor) {
        return new ElfWarrior(armor, 'bow');
    }
}
{% endhighlight %}

Now, in order to make use of your implementation, we need to call the constructors of our factories, that in turn will generate instances of warriors for us.

{% highlight javascript lineanchors %}
var warriors = [];
var humanWarriorFactory = new HumanWarriorFactory();
var dwarfWarriorFactory = new DwarfWarriorFactory();
var elfWarriorFactory = new ElfWarriorFactory();
var elfArcherFactory = new ElfArcherFactory();

warriors.push(humanWarriorFactory.train('chain armor'));
warriors.push(dwarfWarriorFactory.train('heavy armor'));
warriors.push(elfWarriorFactory.train('chain armor'));
warriors.push(elfArcherFactory.train('light armor'));
warriors.push(humanWarriorFactory.train('heavy armor'));

warriors.each(function (warrior) {
    warrior.prepareWeapon();
    warrior.attack();
});
{% endhighlight %}

The above code will output to the console the following.

{% highlight javascript %}
The human warrior stretches, grabs his mighty sword, smiles at it and is ready to fight.
- For honor!
The dwarf takes his axe, swings it several times and starts looking for the enemy to attack.
- For Durin!
The elf takes his long sword and is ready to fight.
- Gurth enin goth!
The elf takes his bow and is ready to fight.
- Gurth enin goth!
{% endhighlight %}

Basically that's it. It may feel somehow unclear though how the Abstract Factory Pattern works in JavaScript (or in general). It's because of the nature of the language. Let's see an example in Python that will show you a more "standard" implementation of Abstract Factory.

{% highlight javascript lineanchors %}
{% endhighlight %}

##Python implementation

Huh?

{% highlight python lineanchors %}
class AbstractFactory:
    def train(self):
       pass

class AbstractWarrior:
    def __init__(self, weapon, armor):
       self.weapon = weapon
       self.armor = armor

    def prepare_weapon(self):
       pass

    def attack(self):
       pass

class HumanWarrior(AbstractWarrior):
    def __init__(self, weapon, armor):
       self.race = 'human'
       super(HumanWarrior, self).__init__(weapon, armor)

    def prepare_weapon(self):
       print('The human warrior stretches, grabs his mighty {}, 
             smiles at it and is ready to fight.'.format(self.weapon))

    def attack(self):
       print('For honor!')

class DwarfWarrior(AbstractWarrior):
    def __init__(self, weapon, armor):
       self.race = 'dwarf'
       super(DwarfWarrior, self).__init__(weapon, armor)

    def prepare_weapon(self):
       print('The dwarf takes his {}, swings it several times 
           and starts looking for the enemy to attack.'.format(self.weapon))

    def attack(self):
       print('For Durin!')

class ElfWarrior(AbstractWarrior):
    def __init__(self, weapon, armor):
       self.race = 'elf'
       super(ElfWarrior, self).__init__(weapon, armor)

    def prepare_weapon(self):
       print('The elf takes his {} and is ready to fight.'.format(self.weapon))

    def attack(self):
       print('Gurth enin goth!')


{% endhighlight %}

##Advantages



##Disadvantages



##Real world usage examples



##Things to consider


