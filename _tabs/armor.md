---
layout: post
icon: fas fa-shield
order: 3
toc: true
---
{% assign lastGroup = 'XXX' %}
{% assign groups = site.data.armor_data | group_by: 'group'%}
{% assign sorted_groups = groups | sort: 'name'%}

{% for group in sorted_groups %}
<h2 id="{{group.name}}"> {{group.name}}</h2>
<hr>
  {% assign sorted_groups = group.items | sort: 'sortOverride' %}
  {% for recipe in sorted_groups %}
    {% assign desc = "" | append: site.data.armor_descriptions[recipe.id].description %}
    {% include crafting-table-card.html pixelated="true" desc=desc %}
    {% assign lastGroup = recipe.group %}
  {% endfor %}
{% endfor %}
<!-- buffer for the TOC -->
<div style="height: 800px"></div>

