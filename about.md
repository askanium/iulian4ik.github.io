---
layout: page
title: About
permalink: /about/
tags: about
---

Have you ever wanted to be a professional programmer and to build great products used by millions of people worldwide?

Programming is one of the most trending jobs right now and learning to code was never more in demand than right now.

By help of the **Heroes of Programming** you can learn the foundations of programming.

## Who are the Heroes of Programming?

Since ancient times people searched for heroes who did heroic deeds and saved people from monsters and other terrible things. bla bla bla.

By mastering the concepts related to each hero, you can master the language itself. And from there you are not far to become a great programmer.

## A short bio

My name is Iulian Gulea and I'm a developer from Moldova (have you even heard about this country?) that wraps his head around different concepts of programming. 

I have 5 years of experience in developing web apps. Currently my tech stack is *Python/Django + Django REST Framework* on the backend and *AngularJS* on the frontend. I also like visualizing things using *D3.js.*

Besides programming, however, I have 8 years of experience in training and development. I've worked for 5 years at an internationnal telco company as a Training and Quality of Sales coordinator and have 3 years of training experience in the NGO sector (AIESEC Moldova/Ukraine). Although writing is not the same as delivering a training, I hope that my experience in training will contribute to clear and useful posts.

And besides all that, I am passionate about Machine Learning.

## Why this site exists

When working as a trainer, I was (and currently am) passionate about learning processes. I believe (and numerous research proves it) that when you want to learn something, the fastest way is to get your hands dirty and practice/do it. And as the old saying goes:

>If you can't explain it simply you don't understand it well enough.

And this is the place where I will try to explain things in a simple manner.

## Contact me

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
