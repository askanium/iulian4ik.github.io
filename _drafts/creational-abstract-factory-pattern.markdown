---
layout: post
title: Abstract Factory Pattern
categories: design-patterns
---
##Intent

**Abstract Factory** provides an interface for creating families of related objects without specifying their specific classes.

##When to use it

Whenever you need to create different type of objects that are united by a common theme, that have similar behaviour and functionality. Also, consider using Abstract Factory when you don't know beforehand what type of object/class you'll have to create, because you get the input on how to handle information from the user at runtime.

##Specific example

In Middle-Earth, there are many races: Elves, Orcs, Maiar, Dwarves, Humans, and many-many others. Suppose now that we need to have a way to create warriors of different races (Dwarfs, Elves, Human) but we don't know beforehand what races we'll need. We just need to provide a way to train warriors, but the decision will be done somewhere in the future. A "warrior" is the common theme for all these objects, that can fight, show off and prepare his weapon for battle, but yet each race's warrior is different.

##Implementation without pattern

Without the Abstract Factory Pattern, we will have a class for each type of warrior that will create warriors of specific types with their own characteristics, attributes and methods. We will need to know how to "operate" with each type of warrior in order to succeed in the battle.

##Implementation using Abstract Factory Pattern

Using the pattern, we will have an `AbstractFactory` defined that will generate different types of concrete factories that, in turn, will know how to create different types of warriors and we will have a common interface for all types of warriors that will define _how_ the warriors can behave. The AbstractFactory that builds factories and the AbstractSoldier interface that defines how the warriors behave are two key elements in implementing the Abstract Factory Pattern. Let's see what are the components and specific examples to make things more clear.

##Pattern components



##JavaScript implementation

In statically-typed languages such as Java, the abstract classes and interfaces enforce consistency in derived classes. In JavaScript there is no support for class-based inheritance, therefore the AbstractFactory and AbstractSoldier classes are absent in the implementation of this pattern. But because JavaScript is a dynamically-typed language, we have [duck typing](https://en.wikipedia.org/wiki/Duck_typing) to help us implement the Abstract Factory Pattern. We will have to assure that the factories that generate warriors as well as the warriors that are to be generated will have that consistency that in Java is achieved using abstract classes and interfaces. This means that we need to take care that all our factories and types of warriors have the same methods defined on them.

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

In Python we do have class-based inheritance, therefore we will have the factory and warrior abstract classes.

{% highlight python lineanchors %}
class AbstractFactory:
    factories = {
        "human": HumanSoldierFactory,
        "dwarf": DwarfSoldierFactory,
        "elf": ElfSoldierFactory
    }

    @classmethod
    def get_factory(cls, factory):
        chosen_factory = cls.factories.get(factory, None)
        if chosen_factory is None:
            raise TypeError('Unknown Factory.')
        return chosen_factory()

class AbstractSoldier:
    def __init__(self, weapon, armor):
        self.weapon = weapon
        self.armor = armor

    def prepare_weapon(self):
        pass

    def attack(self):
        pass

class HumanWarrior(AbstractSoldier):
    def __init__(self, weapon, armor):
        self.race = 'human'
        super(HumanWarrior, self).__init__(weapon, armor)

    def prepare_weapon(self):
        print('The human warrior stretches, grabs his mighty {}, smiles at it and is ready to fight.'.format(self.weapon))

    def attack(self):
        print('For honor!')

class HumanArcher(AbstractSoldier):
    def __init__(self, weapon, armor):
        self.race = 'human'
        super().__init__(weapon, armor)

    def prepare_weapon(self):
        print('The archer takes his {} with agility and checks the string.'.format(self.weapon))

    def attack(self):
        print('Tzzzzing!')

class DwarfWarrior(AbstractSoldier):
    def __init__(self, weapon, armor):
        self.race = 'dwarf'
        super().__init__(weapon, armor)

    def prepare_weapon(self):
        print('The dwarf takes his {}, swings it several times and starts looking for the enemy to attack.'.format(self.weapon))

    def attack(self):
        print('For Durin!')

class DwarfArcher(AbstractSoldier):
    def __init__(self, weapon, armor):
        self.race = 'human'
        super().__init__(weapon, armor)

    def prepare_weapon(self):
        print("The dwarf axe thrower checks his {}'s sharpness.".format(self.weapon))

    def attack(self):
        print('Eat some metal!')

class ElfWarrior(AbstractSoldier):
    def __init__(self, weapon, armor):
        self.race = 'elf'
        super().__init__(weapon, armor)

    def prepare_weapon(self):
        print('The elf takes his {} and is ready to fight.'.format(self.weapon))

    def attack(self):
        print('Gurth enin goth!')

class ElfArcher(AbstractSoldier):
    def __init__(self, weapon, armor):
        self.race = 'human'
        super().__init__(weapon, armor)

    def prepare_weapon(self):
        print('The elven archer chooses who will be the first 10 victims of his first shot.'.format(self.weapon))

    def attack(self):
        print('Gurth enin goth!')

class HumanSoldierFactory:
    def train_warrior(self, armor):
        return HumanWarrior('sword', armor)
    def train_archer(self, armor):
        return HumanArcher('crossbow', armor)

class DwarfSoldierFactory:
    def train_warrior(self, armor):
        return DwarfWarrior('axe', armor)
    def train_archer(self, armor):
        return DwarfArcher('throwing axe', armor)

class ElfSoldierFactory:
    def train_warrior(self, armor):
        return ElfWarrior('long sword', armor)
    def train_archer(self, armor):
        return ElfArcher('bow', armor)
{% endhighlight %}

Then, whenever we want to create warriors of specific type, we address to the corresponding factory.

{% highlight python lineanchors %}
human_warrior_factory = AbstractFactory.get_factory('human')
dwarf_warrior_factory = AbstractFactory.get_factory('dwarf')
elf_warrior_factory = AbstractFactory.get_factory('elf')

warriors = list()

warriors.append(human_warrior_factory.train_archer('chain armor'))
warriors.append(dwarf_warrior_factory.train_warrior('heavy armor'))
warriors.append(elf_warrior_factory.train_archer('light armor'))

for warrior in warriors:
    warrior.prepare_weapon()
{% endhighlight %}

The above code will print:

{% highlight python lineanchors %}
The archer takes his crossbow with agility and checks the string.
The dwarf takes his axe, swings it several times and starts looking for the enemy to attack.
The elven archer chooses who will be the first 10 victims of his first shot.
{% endhighlight %}

You might note that our factories do not inherit from the AbstractFactory class. Over the internet there are implementations in Python like ours and there are implementations where factories inherit from an abstract factory. This is one of examples of the ambiguity in implementation in different languages. Originally, in the GoF book, the factories inherited from the abstract factory and overrode the methods. Probably this is the most "correct" way to implement the Abstract Factory Pattern. However, in Python, due to its dynamic nature, we are not obliged to do that and it's up to the programmer to choose how exactly to implement the pattern.

{% highlight python lineanchors %}
{% endhighlight %}

##Advantages

- Separation of concrete classes from the client and thus having more control of the way and type of objects that are created.
- Changing of a product family is easy - just switch the concrete factory (e.g. HobbitSoldierFactory instead of DwarfFactory) and the whole product family changes (HobbitWarrior and HobbitArcher).
- Provides consistency among products.

##Disadvantages

- Generally speaking, the Abstract Factory Pattern adds another level ob abstraction, which makes your code more complex.
- Whenever you need to add a method to a concrete factory, you need to add it to all factories in order to keep things consistent.

##Real world usage examples

- Dependency Injection (DI) makes use of the Abstract Factory, where you don't know beforehand what type of object you need to inject.
- 

##Things to consider

