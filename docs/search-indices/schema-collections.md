---
layout: page
---

# HuBMAP Collections schema

### Last Updated: 2023-04-17

## Overview:
This page describes the Collections schema for HuBMAP data. Collections data occurs in the Dataset schema.
```
GET https://search.api.hubmapconsortium.org/param-search/samples?group_name=Stanford TMC&organ=LI
```

And the following search for Datasets matched to a particular Sample, which is contained in the Dataset's `ancestors`:
```
GET https://search.api.hubmapconsortium.org/param-search/datasets?ancestors.lab_tissue_sample_id=B001-A-406
```

## Collections Schema
attributes as listed at [entity-api Dataset schema drop-down, collections drop-down, Collection schema drop-down](https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3):

| Attribute                      | Type                                               | Constraint | Description                                                                                                                                                                 |
|--------------------------------|----------------------------------------------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| created_timestamp              | integer                                            | read-only  | The timestamp of when the node was created. The format is an integer representing milliseconds since midnight Jan 1, 1970                                                   |
| created_by_user_displayname    | string                                             | read-only  | The name of the person or process authenticated when creating the object                                                                                                    |
| created_by_user_email          | string                                             | read-only  | The email address of the person or process authenticated when creating the object.                                                                                          |
| created_by_user_sub            | string                                             | read-only  | The subject id as provided by the authorization mechanism for the person or process authenticated when creating the object.                                                 |
| uuid                           | string                                             | read-only  | The HuBMAP unique identifier, intended for internal software use only. This is a 32 digit hexadecimal uuid e.g. 461bbfdc353a2673e381f632510b0f17                            |
| hubmap_id                      | string                                             | read-only  | A HuBMAP Consortium wide unique identifier randomly generated in the format HBM###.ABCD.### for every entity.                                                               |
| last_modified_timestamp        | integer                                            | read-only  | The timestamp of when the object was last modified. The format is an integer representing milliseconds since midnight, Jan 1, 1970                                          |
| last_modified_user_sub         | string                                             | read-only  | The subject id of the user who last modified the entity as provided by the authorization mechanism for the person or process authenticated when the object was modified.    |
| last_modified_user_email       | string                                             | read-only  | The email address of the person or process which authenticated when the object was last modified.                                                                           |
| last_modified_user_displayname | string                                             | read-only  | The name of the person or process which authenticated when the object was last modified.                                                                                    |
| entity_type                    | string                                             | read-only  | One of the normalized entity types: Dataset, Collection, Sample, Donor                                                                                                      |
| registered_doi                 | string                                             |            | The doi of a the registered entity. e.g. 10.35079/hbm289.pcbm.487. This is set during the publication process and currently available for certain Collections and Datasets. |
| doi_url                        | string                                             | read-only  | The url from the doi registry for this entity. e.g. https://doi.org/10.35079/hbm289.pcbm.487                                                                                |
| title                          | string                                             |            | The title of the Collection                                                                                                                                                 |
| creators                       | array of [`Person Schema`](./schema-person.html)   |            | A list of the people who created the entity with full name, email, ORCID iD, institution, etc.. This is analogus to the author list on a publication.                       |
| contacts                       | array of [`Person Schema`](./schema-person.html)   |            | A list of the people who are the main contacts to get information about the entity.                                                                                         |
| datasets                       | array of [`Dataset Schema`](./schema-dataset.html) | read-only  | The datasets that are contained in the Collection.                                                                                                                          |
