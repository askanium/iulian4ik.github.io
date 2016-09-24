---
layout: page
title: Quizzes
permalink: /quizzes/
tags: quizzes
---

<div>
    <h2 class="h2 center margin-top-md margin-bottom-sm">JavaScript</h2>

    <ul class="post-list">
        {% for post in site.quizzes_javascript %}
            {% assign js_quizzes = true %}
            <li>
                <h3>
                    <a href="{{ post.url }}">{{ post.title }}</a>
                </h3>
                <span class="date">{{ post.date | date: '%B %d, %Y'}}</span>
            </li>
        {% endfor %}
        {% if js_quizzes != true %}
            <li>No quizzes yet.</li>
        {% endif %}
    </ul>
</div>

<div>
    <h2 class="h2 center margin-top-md margin-bottom-sm">Python</h2>

    <ul class="post-list">
        {% for post in site.posts %}
            {% if post.categories contains 'quiz' and post.tags contains 'python' %}
                {% assign python_quizzes = true %}
                <li>
                    <h3>
                        <a href="{{ post.url }}">{{ post.title }}</a>
                    </h3>
                    <span class="date">{{ post.date | date: '%B %d, %Y'}}</span>
                </li>
            {% endif %}
        {% endfor %}
        {% if python_quizzes != true %}
            <li>No quizzes yet.</li>
        {% endif %}
    </ul>
</div>