---
layout: page
---

# HuBMAP Antibody schema

### Last Updated: 2023-04-17

## Overview:
This page describes the Antibody schema for HuBMAP data. Antibody data occurs in the Dataset schema.
The antibody-api is used to search the antibody index, rather than search-api.

## Antibody Schema
attributes as listed at [entity-api Dataset schema drop-down, antibodies drop-down, Antibody schema drop-down](https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3):

| Attribute                | Type   | Constraint                                                                                                                                                                  | Description |
|--------------------------|--------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| antibody_name            | string | The name of the antibody.                                                                                                                                                   |
| channel_id               | string | The assay specific identifier for the channel corresponding to the antibody.                                                                                                |
| conjugated_cat_number    | string | An antibody may be conjugated to a fluorescent tag or a metal tag for detection. Conjugated antibodies may be purchased from commercial providers. Blank if not applicable. |
| conjugated_tag           | string | An antibody may be conjugated to a fluorescent tag or a metal tag for detection. Conjugated antibodies may be purchased from commercial providers. Blank if not applicable. |
| dilution                 | string | The dilition ratio, e.g. 1/200 for the antibody. Blank if not applicable.                                                                                                   |
| lot_number               | string | The antibody lot number from the vendor.                                                                                                                                    |
| rr_id                    | string | The unique antibody identifier from the Antibody Registry (https://antibodyregistry.org).                                                                                   |
| uniprot_accession_number | string | The unique identifier for the target protein in the UniProt database (https://www.uniprot.org).                                                                             |
