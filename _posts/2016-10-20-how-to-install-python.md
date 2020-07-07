---
layout: post

title: How to install Python

image: /assets/images/2016/10/python.org.png

meta_description: "In case you have decided to learn Python, you will have to install it first. The installation process depends on your operating system, but today it is pretty simple and straightforward to install Python on your machine."

summary: "See how to install Python 3 on your machine, be it Windows or Linux. Today the installation process is quite simplified, with few steps to make until having Python on your machine."

permalink: /how-to-install-python/

date: 2016-10-20 12:00:00

categories: [basics,python]

tags: [howto,installing]

keywords: [python,install python,hotwo]

sharemessage: 'Wanna help other install Python on their computers? Share this article!'
---

Whether you have answered affirmatively to the question of [why to learn Python](/why-to-learn-python), the first thing you need to do is to install Python on your computer. This is what we will talk about in this article.

But before that, I just wanted to let you know that I have written an excellent post on [How To Become An Expert At Anything](https://iuliangulea.com/blog/the-path-toward-mastery-how-to-become-an-expert/). If you would like to become an expert Python developer, make sure to check that post out!

As I don't have a Mac yet, we'll address the installation process on Linux and Windows operating systems.

Also, we'll consider installing Python 3.5 over Python 2.7, as sooner or later Python 2.7 won't be supported and you will have to switch to Python 3 anyway. Why then not to make it now? Besides that, Python 3 has many nifty features and generally speaking it is a better version of Python (it's the next version of Python, after all, so it should be better).

## Linux (Ubuntu)

As I'm mainly an Ubuntu user, I will describe the installation process in this OS. However, other Linux distributions will have similar installation process, so you should be able to install Python in them, too.

But wait... Any modern Linux distribution has Python pre-installed! Oh, it's Python 2.7. Actually... not really! The latest Long-Term Support (Ubuntu 16.04 LTS) version of Ubuntu has even Python 3.5 pre-installed! That's cool, but I will still have to write how to install it, for users of previous versions of Ubuntu.

There are several steps you need to make in order to install Python 3 on your system.

### 1. Download Python 3 from www.python.orgj

Go to the Python website and select Downloads from the menu.

![Python.org home page](/assets/images/2016/10/python.org.png)

On the downloads page, click on the **Download Python 3.5.x** (in my case it is 3.5.2) and save the source release on your computer.

![Python.org downloads page](/assets/images/2016/10/python.org-downloads-page.png)

### 2. Extract source files

Next, open a terminal and navigate to the folder where you have saved the Python source. Mine is in `~/Downloads/Software`

When you're in the folder, enter

```shell
$ tar xf Python-3.5.2.tar.xz
```

To extract source files from the archive and then cd into the extracted directory.

```shell
$ cd Python-3.5.2
```

### 3. Prepare to install Python

Inside that folder there is a README file with the build instructions applicable to Unix, Linux, BSD, OSX, and Cygwin, therefore this process should work on Macs as well.

While being in the same folder, run consecutively the following commands one at a time:

```shell
$ ./configure
$ make
$ make test
$ sudo make install
```

All these commands will take some time to run, but in the end they will install Python 3 on your machine as `python3`.

### 4. Check Python installation

In your terminal run `python3`. It should start the Python 3 interpreter and you should see its version (3.5.2 in my case).

### 5. Harness the power of Python 3!

You're done! Whenever you will need to run a program using Python 3, use the `python3` command in your terminal.

```shell
$ python3 test.py
```

## Windows

When I started to write this part and got to install Python on my Windows 7 machine, I was pleasantly surprised to find out that the installation process is fairly simple now, comparing it to that one from some years ago, when you had to modify environment variables in the system settings and set up your environment. 

So, let's go step by step.

### 1. Download Python 3 from www.python.org

As in the case of Linux, go to the Python website and select Downloads from the menu.

![Python.org home page](/assets/images/2016/10/python.org.png)

On the downloads page, click on the **Download Python 3.5.x** (in my case it is 3.5.2) and save the source release on your computer. The site identifies your operating system and will download for you the windows installer of Python 3.

![Python.org downloads page](/assets/images/2016/10/python.org-downloads-page.png)

This will download an executable file (.exe) that will install Python 3 on your machine.

### 2. Run the executable file

When you run the executable file, select the "Add Python 3.5 to PATH" checkbox. 

![Python installation on Windows part 1](/assets/images/2016/10/python-install-1.png)

This will make `python` available in your command line. After selecting it, press on "Install Now" button, which will install Python 3 in a default folder.

![Python installation on Windows part 2](/assets/images/2016/10/python-install-2.png)

After it, wait until the install process finishes and you're done!

### 3. Harness the power of Python 3!

You're done! Open up a Command Prompt, write `python` and press Enter. This will launch the Python interpreter and you should see what version of Python has launched. Whenever you will need to run a python file, use the `python` command and the file name.

```shell
> python test.py
```

### A note on installing Python 2 and Python 3 on the same Windows machine

In case you have already had Python 2 installed before Python 3 install, you might run into problems, as the `python` command will link to only one Python version (that of Python 2).

To overcome this, you can use the `py` alias with the version of Python interpreter you need.

For instance, imagine you have a `test.py` file with the following contents:

```python
import sys
sys.stdout.write("Hi! This is Python %s\n" % (sys.version,))
```

This will print `Hi! This is Python ` and the version of the python interpreter with which you ran the file.

Thus, if you want to run this file in your Command Prompt using Python 3 interpreter, write `py -3 test.py`. This is the output you will receive:

![Running a python file using "py -3" alias](/assets/images/2016/10/py-3-test.png)

In case you have multiple versions of Python 2 (2.6, 2.7), or Python 3 (3.4, 3.5), you can use the `py` alias to launch a specific version. For instance, with `py -2.6` you will launch the Python 2.6 interpreter.

Another way you can choose between Python interpreters is to use what is called a **shebang line**.

Edit your `test.py` file to add the shebang line at the beginning.

```python
#! python2
import sys
sys.stdout.write("Hi! This is Python %s\n" % (sys.version,))
```

Now, if you will type `py test.py` in your Command Prompt, you will get the following:

![Running a python file using Python 2](/assets/images/2016/10/python2-output.png)

But if you change the Python version in the shebang line:

```python
#! python3
import sys
sys.stdout.write("Hi! This is Python %s\n" % (sys.version,))
```

Then by running `py test.py` you will get your Python 3 version.

![Running a python file using Python 3](/assets/images/2016/10/python3-output.png)
