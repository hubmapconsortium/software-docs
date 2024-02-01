---
layout: page
---

# HuBMAP File schema

### Last Updated: 2023-04-17

## Overview:
This page describes the File schema for HuBMAP data. File data occurs in the Donor and Sample schemas.
```
GET https://search.api.hubmapconsortium.org/param-search/samples?group_name=Stanford TMC&organ=LI
```

And the following search for Datasets matched to a particular Sample, which is contained in the Dataset's `ancestors`:
```
GET https://search.api.hubmapconsortium.org/param-search/datasets?ancestors.lab_tissue_sample_id=B001-A-406
```

## File Schema
Attributes as listed at [entity-api Donor schema drop-down, image_files drop-down, File schema drop-down](https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3):

| Attribute   | Type   | Description                                                                                |
|-------------|--------|--------------------------------------------------------------------------------------------|
| filename    | string | The name of the file.                                                                      |
| description | string | A description of the file. The Dataset.thumbnail_file does not have this file description. |
| file_uuid   | string | The HuBMAP unique identifier for the file.                                                 |
