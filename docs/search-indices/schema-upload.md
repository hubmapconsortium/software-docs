---
layout: page
---

# HuBMAP Upload schema

### Last Updated: 2023-04-17

## Overview:
This page describes the Upload schema for HuBMAP data. Upload data occurs in the Dataset schema.
```
GET https://search.api.hubmapconsortium.org/param-search/samples?group_name=Stanford TMC&organ=LI
```

And the following search for Datasets matched to a particular Sample, which is contained in the Dataset's `ancestors`:
```
GET https://search.api.hubmapconsortium.org/param-search/datasets?ancestors.lab_tissue_sample_id=B001-A-406
```

## Upload Schema
attributes as listed at [entity-api Dataset schema drop-down, upload drop-down, Upload schema drop-down](https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3):

| Attribute                      | Type                                               | Constraint | Description                                                                                                                                                                                                                                         |
|--------------------------------|----------------------------------------------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| created_timestamp              | integer                                            | read-only  | The timestamp of when the node was created. The format is an integer representing milliseconds since midnight Jan 1, 1970                                                                                                                           |
| created_by_user_displayname    | string                                             | read-only  | The name of the person or process authenticated when creating the object                                                                                                                                                                            |
| created_by_user_email          | string                                             | read-only  | The email address of the person or process authenticated when creating the object.                                                                                                                                                                  |
| created_by_user_sub            | string                                             | read-only  | The subject id as provided by the authorization mechanism for the person or process authenticated when creating the object.                                                                                                                         |
| uuid                           | string                                             | read-only  | The HuBMAP unique identifier, intended for internal software use only. This is a 32 digit hexadecimal uuid e.g. 461bbfdc353a2673e381f632510b0f17                                                                                                    |
| hubmap_id                      | string                                             | read-only  | A HuBMAP Consortium wide unique identifier randomly generated in the format HBM###.ABCD.### for every entity.                                                                                                                                       |
| last_modified_timestamp        | integer                                            | read-only  | The timestamp of when the object was last modified. The format is an integer representing milliseconds since midnight, Jan 1, 1970                                                                                                                  |
| last_modified_user_sub         | string                                             | read-only  | The subject id of the user who last modified the entity as provided by the authorization mechanism for the person or process authenticated when the object was modified.                                                                            |
| last_modified_user_email       | string                                             | read-only  | The email address of the person or process which authenticated when the object was last modified.                                                                                                                                                   |
| last_modified_user_displayname | string                                             | read-only  | The name of the person or process which authenticated when the object was last modified.                                                                                                                                                            |
| entity_type                    | string                                             | read-only  | One of the normalized entity types: Dataset, Collection, Sample, Donor, Upload                                                                                                                                                                      |
| description                    | string                                             |            | Free text description of the data being submitted.                                                                                                                                                                                                  |
| title                          | string                                             |            | Title of the datasets, a sentence or less                                                                                                                                                                                                           |
| status                         | string                                             |            | One of: New, Valid, Invalid, Error, Submitted                                                                                                                                                                                                       |
| validation_message             | string                                             |            | A message from the validation tools describing what is invalid with the upload.                                                                                                                                                                     |
| group_uuid                     | string                                             |            | The uuid of Globus group which the user who created this entity is a member of. This is required on Create/POST if the user creating the Donor is a member of more than one write group. This property cannot be set via PUT (only on Create/POST). |
| group_name                     | string                                             | read-only  | The displayname of Globus group which the user who created this entity is a member of                                                                                                                                                               |
| dataset_uuids_to_link          | string                                             | write-only | List of datasets to add to the Upload. Provide as a json array of the dataset uuids like: ["232934234234234234234270c0ea6c51d604a850558ef2247d0b4", "230948203482234234234a57bfe9c056d08a0f8e6cd612baa3bfa"]                                        |
| dataset_uuids_to_unlink        | string                                             | write-only | List of datasets to remove from a Upload. Provide as a json array of the dataset uuids like: ["232934234234234234234270c0ea6c51d604a850558ef2247d0b4", "230948203482234234234a57bfe9c056d08a0f8e6cd612baa3bfa"]                                     |
| datasets                       | array of [`Dataset Schema`](./schema-dataset.html) | read-only  | The datasets that are contained in this Upload.                                                                                                                                                                                                     |
