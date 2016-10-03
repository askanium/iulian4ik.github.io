---
layout: page
title: About
permalink: /about/
tags: about
---

Whether you are starting to learn programming or already have some experience with it, sometimes it is hard to stay focused and keep learning all the things, new and old, related to the language, frameworks, algorithms and so on...

**Heroes of Programming** is the place where you will improve your skills and learn new useful information. And because there is so much information in the world wide web, in order to make your learning experience more engaging on this site, you will be accompanied by some Heroes. Who are they and what they do you will find out by exploring the site. 

Just note that today, heroes do not fight monsters and dragons. Today's most common "enemies" are tight deadlines, pesky clients, ambiguity and complexity. We have to deal with them on a daily basis, therefore it's important to have "weapons" of our own with which to fight them.

![Today's Monsters we need to fight](/assets/images/heroes/todays-monsters.png)

Explore and learn about the **Heroes of Programming** and remember that today's heroes help millions of people not by fighting with a sword or a spear, but by writing programs. And you have all chances to become one of them. 

**Become a Hero of Programming!**

<hr class="margin-top-md margin-bottom-md">

### Contact me

<div class="py2">
  {% if site.ajaxify_contact_form %}
    <form class="form-stacked">
      <input type="text" name="email" class="field-light" placeholder="{{ site.text.contact.email }}">
      <textarea type="text" name="content" class="field-light" rows="5" placeholder="{{ site.text.contact.content }}"></textarea>
      <input type="text" name="_gotcha" style="display:none" />
      <button type='submit' class="button button-blue button-big mobile-block">{{ site.text.contact.submit }}</button>
    </form>
  {% else %}
    <form action="https://formspree.io/{{ site.email }}" method="POST" class="form-stacked">
      <input type="text" name="email" class="field-light" placeholder="{{ site.text.contact.email }}">
      <textarea type="text" name="content" class="field-light" rows="5" placeholder="{{ site.text.contact.content }}"></textarea>
      <input type="hidden" name="_next" value="{{ site.baseurl }}/thanks/" />
      <input type="hidden" name="_subject" value="{{ site.text.contact.subject }}" />
      <input type="text" name="_gotcha" style="display:none" />
      <input type="submit" class="button button-blue button-big mobile-block" value="{{ site.text.contact.submit }}">
    </form>
  {% endif %}
</div>

{% if site.ajaxify_contact_form %}
  {% include ajaxify_content_form.html %}
{% endif %}
