---
permalink: /
title: "Xichong Zhang's Academic Page"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---
I am an incoming Ph.D. student in Computer Science at the [University of Waterloo](https://uwaterloo.ca/), where I will be advised by [Prof. Khuzaima Daudjee](https://cs.uwaterloo.ca/~kdaudjee/) and [Prof. Hong Zhang](https://hongzhangblaze.github.io/). I received my M.Eng. in Computer Science from the [University of Science and Technology of China](https://en.ustc.edu.cn/), where I was fortunate to be advised by Prof. Mingjun Xiao and Prof. Yin Xu. Before that, I received my B.S. in Physics from USTC, during which I conducted research in condensed matter physics advised by Zhenyu Wang. I have also been fortunate to work with Prof. Banghua Zhu and Prof. Jie Wu.

My research interests lie in **Efficient Machine Learning Systems**. I am particularly interested in designing resource-aware algorithms and system architectures for efficient LLM serving, aiming to make large language models more practical and commercially deployable. More specifically, I am interested in both system-level mechanisms, such as software-hardware co-design for LLM inference and serving, and algorithmic approaches that improve efficiency. Before moving toward ML systems, my research mainly focused on networking and distributed systems, especially edge computing.

Beyond my current research directions, I am broadly interested in all kinds of interesting problems. If you have any topics, ideas, or questions that you would like to discuss, please do not hesitate to reach out to me by email: **yyu18@mail.ustc.edu.cn**.

You can also find my articles on [IEEE Explore](https://ieeexplore.ieee.org/author/938778205545411) | [dblp](https://dblp.org/pid/381/6175.html).

## Selected Honors and Awards
- **Outstanding Graduate Award**, USTC, 2025
- **Graduate Academic Scholarship**, USTC, 2022, 2023, 2024
- **First Prize in College Physics Experiment IV**, USTC, 2021
- **National Encouragement Scholarship**, 2019, 2020

## Publications

{% include base_path %}

{% if site.publication_category %}
  {% for category in site.publication_category  %}
    {% assign title_shown = false %}
    {% for post in site.publications reversed %}
      {% if post.category != category[0] %}
        {% continue %}
      {% endif %}
      {% unless title_shown %}
        <h3>{{ category[1].title }}</h3><hr />
        {% assign title_shown = true %}
      {% endunless %}
      {% include archive-single.html %}
    {% endfor %}
  {% endfor %}
{% endif %}
