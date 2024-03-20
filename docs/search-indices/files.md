---
layout: page
---
# HuBMAP File Indices

### Last Updated: 2024-03-20

## Overview:
This page describes File Info documents stored in the HuBMAP indices for Files associated with Datasets. These indices are accessible via the [HuBMAP Search API](https://smart-api.info/ui/7aaf02b838022d564da776b03f357158) using the index name `files`.  For example with the search endpoint like:
```
 POST https://search.api.hubmapconsortium.org/v3/files/search
```

## Description: 
Per the standard [Search API](https://smart-api.info/ui/7aaf02b838022d564da776b03f357158) functionality the indices are stored as a pair of [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/index.html) indicies consisting of a private/consortium only index and a public/open to all index.  The Search API will automatically direct to the index based on the user authroization.

Each document in the files index contains information about one File entity in a Dataset.  The structure of these documents is described below.

## Limitations:
- The current index only includes documents for Files in primary Datasets which are published and do not contain genetic information.
- The File Info document in the index contains accurate information from HuBMAP data stores at the time the Dataset was
processed, and may not reflect subsequent changes until a re-index is complete.

## Document elements:

| Document Element | Description                                                                                                                |
|------------------|----------------------------------------------------------------------------------------------------------------------------|
| file_uuid        | The uuid of the file                                                                                                       |
| checksum         | The hexidecimal representation of the MD5 checksum of the file                                                             |
| size             | Integer size of the file in bytes                                                                                          |
| rel_path         | The local file system path of the file relative to its Dataset directory, including the file name                          |
| file_extension   | The part of rel_path after the final period in the file name, which is after the final directory separator                 |
| samples          | An array of objects described below under `samples` Array Elements, with one for each non-organ Sample in the Dataset      |
| organs           | An array of objects described below under `organs` Array Elements, with one for each organ Sample in the Dataset           |
| donors           | An array of objects described below under `donors` Array Elements, with one for each donor of an entry in the organs array |
| dataset_uuid     | The 32 character UUID of the Dataset which is the direct ancestor of this file                                             |
| data_types       | An array of strings with codes for the assay types of the Dataset. (This is deprecated and will soon be replaced with the newer data_types field). |

### `samples` Array Elements:

| samples Element | Description                                                                                        |
|-----------------|----------------------------------------------------------------------------------------------------|
| uuid            | The uuid of a Sample entity whose sample category is not 'organ', which is an ancestor of the file |
| code            | A code for the sample category, one of organ, block, section or suspension                         |
| type            | The sample category- with recent updates this will be the same value as code, both code and type are kept for backwards compatibility    |

### `organs` Array Elements:

| organs Element | Description                                                                                                        |
|----------------|--------------------------------------------------------------------------------------------------------------------|
| uuid               | The uuid of a Sample entity whose specimen type is 'organ', which is an ancestor of a Sample included in "samples" |
| type_code          | A code for the organ type of the Dataset. For a list of possible codes see the [HuBMAP Ontology/UBKG Organ List](https://ontology.api.hubmapconsortium.org/organs?application_context=HUBMAP) |
| type.description   | A description for the organ type |
| type.iri   | The IRI pointing to a resource descibing the organ |

### `donors` Array Elements:

| donors Element | Description                                                                                                                                    |
|----------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| uuid           | The uuid of a Donor entity which is an ancestor of a Sample included in "organs"                                                               |
| age            | A float value created from the Donor entity metadata for the [UMLS age group CUI C0001779](https://uts.nlm.nih.gov/uts/umls/concept/C0001779)  |
| units          | The unit of measure for the age concept of the Donor entity metadata                                                                           |
| race           | A UMLS preferred term from the Donor entity metadata for the [UMLS race group CUI C0034510](https://uts.nlm.nih.gov/uts/umls/concept/C0034510) |


