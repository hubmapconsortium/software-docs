---
layout: page
---

# HuBMAP Person schema

### Last Updated: 2023-04-17

## Overview:
This page describes the Person schema for HuBMAP data. Person data occurs in the Donor, Sample or Dataset schemas.
```
GET https://search.api.hubmapconsortium.org/param-search/donors?group_name=Stanford TMC&descendants.organ=LI
```

## Person Schema
attributes as listed at [entity-api Donor schema drop-down, creators drop-down, Person schema drop-down](https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3):

| Attribute                | Type     | Description                                           |
|--------------------------|----------|-------------------------------------------------------|
| first_name               | string   | The full name of the person.                          |
| last_name                | string   | The last name of the person.                          |
| middle_name_or_initial   | string   | The middle name or initial of the person.             |
| orcid_id                 | string   | The ORCID iD of the person.                           |
| affiliation              | string   | The institution that the person is affiliated with.   |
