---
layout: post
icon: fas fa-cube
order: 6
toc: true
---

{% assign sorted = site.data.block_data | sort: 'name'%}
{% for recipe in sorted %}
  {% assign desc = site.data.block_descriptions[recipe.id].description %}
  {% include crafting-table-card.html desc=desc %}
{% endfor %}

<!-- buffer for the TOC -->
<div style="height: 800px"></div>

