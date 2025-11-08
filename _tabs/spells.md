---
layout: post
icon: fas fa-scroll
order: 1
toc: true
---
<style>
.table-wrapper {
  --tb-even-bg: #2C2B2B;
  --tb-odd-bg: #2C2B2B;
  --tb-border-color: rgba(255,255,255,.2);
}
</style>
{% assign grouped_schools = site.data.spell_data | group_by: 'school' | sort: 'school' %}
{% assign sorted_schools = grouped_schools | sort: 'name'%}
{% for spell_group in sorted_schools %}

## {{spell_group.name}} Spells

<hr>
{% assign sorted_spells = spell_group.items | sort: 'name' %}
{% for spell in sorted_spells %}

{% include spell-card.html %}
{% endfor %}
{% endfor %}
<!-- buffer for the TOC -->
<div style="height: 800px"></div>



