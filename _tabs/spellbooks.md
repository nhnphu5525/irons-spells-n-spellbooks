---
layout: post
icon: fas fa-book
order: 2
toc: true
---

{% assign sorted = site.data.spellbook_data | sort: 'name'%}
{% assign groups = site.data.spellbook_data | group_by: 'group'%}
{% assign sorted_groups = groups | sort: 'name'%}

{% for group in sorted_groups %}
<h2 id="{{group.name}}"> {{group.name}}</h2>
<hr>
  {% assign sorted_groups = group.items | sort: 'name' %}
  {% for recipe in sorted_groups %}
    {% assign desc = "" | append: site.data.spellbook_descriptions[recipe.id].description %}
    {% include crafting-table-card.html pixelated="true" desc=desc%}
  {% endfor %}
{% endfor %}

<!-- buffer for the TOC -->
<div style="height: 800px"></div>

