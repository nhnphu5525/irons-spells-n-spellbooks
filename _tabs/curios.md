---
layout: post
icon: fa-solid fa-ring
order: 4
toc: true
---
{% assign lastGroup = 'XXX' %}
{% assign groups = site.data.curio_data | group_by: 'group'%}
{% assign sorted_groups = groups | sort: 'name'%}

{% for group in sorted_groups %}
<h2 id="{{group.name}}"> {{group.name}}</h2>
<hr>
  {% assign sorted_groups = group.items | sort: 'name' %}
  {% for recipe in sorted_groups %}
    {% include crafting-table-card.html pixelated="true" desc=recipe.tooltip %}
    {% assign lastGroup = recipe.group %}
  {% endfor %}
{% endfor %}
<!-- buffer for the TOC -->
<div style="height: 800px"></div>

