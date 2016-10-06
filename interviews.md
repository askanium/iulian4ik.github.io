---
layout: page
title: Interviews
permalink: /interviews/
tags: interviews
---

<div>
    <h2 class="h2 center margin-top-md margin-bottom-sm">Heroes of JavaScript</h2>

    <ul class="post-list">
        {% for post in site.posts %}
            {% if post.categories contains 'interview' and post.categories contains 'JavaScript' %}
                {% assign js_interviews = true %}
                <li>
                    <h3>
                        <a href="{{ post.url }}">{{ post.title }}</a>
                    </h3>
                    <span class="date">{{ post.date | date: '%B %d, %Y'}}</span>
                </li>
            {% endif %}
        {% endfor %}
        {% if js_interviews != true %}
            <li>No interviews yet.</li>
        {% endif %}
    </ul>
</div>

<div>
    <h2 class="h2 center margin-top-md margin-bottom-sm">Heroes of Python</h2>

    <ul class="post-list">
        {% for post in site.posts %}
            {% if post.categories contains 'interview' and post.categories contains 'Python' %}
                {% assign python_interviews = true %}
                <li>
                    <h3>
                        <a href="{{ post.url }}">{{ post.title }}</a>
                    </h3>
                    <span class="date">{{ post.date | date: '%B %d, %Y'}}</span>
                </li>
            {% endif %}
        {% endfor %}
        {% if python_interviews != true %}
            <li>No interviews yet.</li>
        {% endif %}
    </ul>
</div>