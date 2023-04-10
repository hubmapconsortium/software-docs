---
layout: page
---

# HuBMAP Donor schema

### Last Updated: 2023-04-07

## Overview:
This page describes the Donor schema for HuBMAP data. Donor data may be returned itself or a part of another entity.  For example, this endpoint searches Donors for a specified group and organ type:
```
OpenSearch indices (@TODO-5 returned in Dev)
GET https://search.api.hubmapconsortium.org/param-search/donors?group_name=Stanford TMC&descendants.organ=LI
```
```
Neo4j (@TODO-10 returned in Dev)
match (s:Sample {organ:'LI'})<-[*]-(d:Donor {group_name:'Stanford TMC'}) return s
```
And the following search for Samples matched to a particular Donor, which is contained in the Sample's `ancestors`:
```
OpenSearch indices (@TODO-10 returned in Dev)
GET https://search.api.hubmapconsortium.org/param-search/samples?ancestors.lab_donor_id=W83/B001
```
```
Neo4j (@TODO-6 returned in Dev)
match (s:Sample)<-[*]-(d:Donor {lab_donor_id:'W148'}) return s
```

## Description: 
Per the standard [Search API](https://smart-api.info/ui/7aaf02b838022d564da776b03f357158) functionality the indices are stored as a pair of [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/index.html) indicies consisting of a private/consortium only index and a public/open to all index.  The Search API will automatically direct to the index based on the user authroization.

Each document in the files index contains information about one File entity in a Dataset.  The structure of these documents is described below.

## Limitations:
- The current index only includes documents for Files in primary Datasets which are published and do not contain genetic information.
- The File Info document in the index contains accurate information from HuBMAP data stores at the time the Dataset was
processed, and may not reflect subsequent changes until a re-index is complete.

## Donor Schema 
attributes as listed at [entity-api Donor schema drop-down](https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3):

| Attribute                      | Type                                                                                  | Constraint | Description                                                                                                                                                                                                                                                                                                                          |
|--------------------------------|---------------------------------------------------------------------------------------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| created_timestamp              | integer                                                                               | read-only  | The timestamp of when the node was created. The format is an integer representing milliseconds since midnight Jan 1, 1970                                                                                                                                                                                                            |
| created_by_user_displayname    | string                                                                                | read-only  | The name of the person or process authenticated when creating the object                                                                                                                                                                                                                                                             |
| created_by_user_email          | string                                                                                | read-only  | The email address of the person or process authenticated when creating the object.                                                                                                                                                                                                                                                   |
| created_by_user_sub            | string                                                                                | read-only  | The subject id as provided by the authorization mechanism for the person or process authenticated when creating the object.                                                                                                                                                                                                          |
| uuid                           | string                                                                                | read-only  | The HuBMAP unique identifier, intended for internal software use only. This is a 32 digit hexadecimal uuid e.g. 461bbfdc353a2673e381f632510b0f17                                                                                                                                                                                     |
| hubmap_id                      | string                                                                                | read-only  | A HuBMAP Consortium wide unique identifier randomly generated in the format HBM###.ABCD.### for every entity.                                                                                                                                                                                                                        |
| last_modified_timestamp        | integer                                                                               | read-only  | The timestamp of when the object was last modified. The format is an integer representing milliseconds since midnight, Jan 1, 1970                                                                                                                                                                                                   |
| last_modified_user_sub         | string                                                                                | read-only  | The subject id of the user who last modified the entity as provided by the authorization mechanism for the person or process authenticated when the object was modified.                                                                                                                                                             |
| last_modified_user_email       | string                                                                                | read-only  | The email address of the person or process which authenticated when the object was last modified.                                                                                                                                                                                                                                    |
| last_modified_user_displayname | string                                                                                | read-only  | The name of the person or process which authenticated when the object was last modified.                                                                                                                                                                                                                                             |
| entity_type                    | string                                                                                | read-only  | One of the normalized entity types: Dataset, Collection, Sample, Donor, Upload                                                                                                                                                                                                                                                       |
| registered_doi                 | string                                                                                |            | The doi of a the registered entity. e.g. 10.35079/hbm289.pcbm.487. This is set during the publication process and currently available for certain Collections and Datasets.                                                                                                                                                          |
| doi_url                        | string                                                                                | read-only  | The url from the doi registry for this entity. e.g. https://doi.org/10.35079/hbm289.pcbm.487                                                                                                                                                                                                                                         |
| description                    | string                                                                                |            | Free text description of the donor                                                                                                                                                                                                                                                                                                   |
| data_access_level              | string from [`data_access_level` attribute values](#dataaccesslevel-attribute-values) | read-only  | One of the values: public, consortium                                                                                                                                                                                                                                                                                                |
| protocol_url                   | string                                                                                |            | The protocols.io doi url pointing the protocol describing the donor selection, inclusion/exclusion criteria                                                                                                                                                                                                                          |
| lab_donor_id                   | string                                                                                |            | A lab specific identifier for the donor.                                                                                                                                                                                                                                                                                             |
| submission_id                  | string                                                                                | read-only  | The hubmap internal id with embedded semantic information e.g.: VAN0003. This id is generated at creation time which tracks the lab, donor, organ and sample hierarchy per the following: https://docs.google.com/document/d/1DjHgmqWF1VA5-3mfzLFNfabbzmc8KLSG9xWx1DDLlzo/edit?usp=sharing                                           |
| group_uuid                     | string                                                                                |            | The uuid of globus group which the user who created this entity is a member of. This is required on Create/POST if the user creating the Donor is a member of more than one write group. This property cannot be set via PUT (only on Create/POST).                                                                                  |
| group_name                     | string                                                                                | read-only  | The displayname of globus group which the user who created this entity is a member of                                                                                                                                                                                                                                                |
| label                          | string                                                                                |            | Lab provided, de-identified name for the donor                                                                                                                                                                                                                                                                                       |
| metadata.living_donor_data     | array of [`Donor Metadata Schema`](#donor-metadata-schema)                            |            | @TODO-reflect multiple? Mention typ-race, age, sex, BMI?<BR>Information about the donor who's tissue was used. The tissue was obtained during a procedure. Only living_donor_data or organ_donor_data, not both can be defined for a single donor.                                                                                   |
| metadata.organ_donor_data      | array of [`Donor Metadata Schema`](#donor-metadata-schema)                            |            | @TODO-reflect multiple? Mention typ-race, age, sex, BMI?<BR>Information about the donor who's organ(s) was/were used. The organ was obtained via an organ donation program from a deceaced donor. Only living_donor_data or organ_donor_data, not both can be defined for a single donor.                                            | 
| creators                       | array of [`Person Schema`](#person-schema)                                            |            | A list of the people who created the entity with full name, email, ORCID iD, institution, etc.. This is analogous to the author list on a publication.                                                                                                                                                                               |
| contacts                       | array of [`Person Schema`](#person-schema)                                            |            | A list of the people who are the main contacts to get information about the entity.                                                                                                                                                                                                                                                  |
| image_files                    | array of [`File Schema`](#file-schema)                                                | read-only  | List of uploaded image files and descriptions of the files. Stored in db as a stringfied json array.                                                                                                                                                                                                                                 |
| image_files_to_add             | string containing JSON array                                                          | write-only | List of ***temporary file ids*** with an optional description. Provide as a json array with an temp_file_id and description attribute for each element like ```{"files": [{"temp_file_id":"dzevgd6xjs4d5grmcp4n","description":"This is image file one"},{"temp_file_id":"yrahjadfhadf","description":"This is image file two"}]}``` |
| image_files_to_remove          | string containing JSON array                                                          | write-only | List of image files ***previously uploaded*** to delete. Provide as a json array of the file_uuids of the file like: ```["232934234234234234234270c0ea6c51d604a850558ef2247d0b4", "230948203482234234234a57bfe9c056d08a0f8e6cd612baa3bfa"]```                                                                                        |

### Donor Metadata Schema
attributes as listed at [entity-api Donor schema drop-down, metadata drop-down, DonorMetadata drop-down](https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3):

| Attribute                       | Type                                                                                 | Description                                                                                                                                                                                                                                                                                                        |
|---------------------------------|--------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| code                            | string                                                                               | This is a Code from a source vocabulary in the HuBMAP Knowledge Graph, currently limited to UMLS source vocabulary terms.                                                                                                                                                                                          |
| sab                             | string                                                                               | This is the source vocabulary in the HuBMAP Knowledge Graph. Currently limited to UMLS source vocabularies.                                                                                                                                                                                                        |
| concept_id                      | string                                                                               | This is the Concept ID from the HuBMAP Knowledge Graph. Currently limited to UMLS concepts.                                                                                                                                                                                                                        |
| data_type                       | string from [`data_type` attribute values](#datatype-attribute-values)               | This is the data type of the record. Numeric types will generally have non-null data_value. Nominal types will generally have null data_value.                                                                                                                                                                     |
| data_value                      | string                                                                               | The data value of the record.                                                                                                                                                                                                                                                                                      |
| numeric_operator                | string from [`numeric_operator` attribute values](#numericoperator-attribute-values) | This is the numeric operator for the data value .This enables inputing thresholds and ranges for data values by using greater than or less than.                                                                                                                                                                   |
| units                           | string                                                                               | This are the units for the data value.                                                                                                                                                                                                                                                                             |
| preferred_term                  | string                                                                               | This is the preferred display term for the item. It may or may not correspond to a term in UMLS for this concept.                                                                                                                                                                                                  |
| grouping_concept                | string                                                                               | This is the Concept ID from the HuBMAP Knowledge Graph, currently limited to UMLS concetps, that is to be used for grouping the record.                                                                                                                                                                            |
| grouping_concept_preferred_term | string                                                                               | This is the preferred display term for the facet in which this record should be counted for faceted search in the portal. It may or may not correspond to a term in UMLS for the grouping concept.                                                                                                                 |
| grouping_code                   | string                                                                               | This is a Code from a source vocabulary in the HuBMAP Knowledge Graph, currently limited to UMLS vocabulary codes. This code corresponds to the grouping_concept.                                                                                                                                                  |
| grouping_sab                    | string                                                                               | This is a grouping for the source vocabulary in the HuBMAP Knowledge Graph, currently limited to UMLS source vocabularies.. This sab corresponds to the grouping_code.                                                                                                                                             |
| graph_version                   | string                                                                               | This is the version of the HuBMAP Knowledge Graph that the Concept appears in, currently the version of UMLS that is used.                                                                                                                                                                                         |
| start_datetime                  | integer                                                                              | This is the approximate time difference in seconds between the procurement and the start of this event (this is to construct time series records of clinical data for event-level data not donor-level data). An empty or zero value designates missing data or that this field is not applicable for the concept. |
| end_datetime                    | integer                                                                              | This is the approximate time difference in seconds between the procurement and the end of this event (this is to construct time series records of clinical data for event-level data not donor-level data). An epty of zero value designates missing data or that this field is not applicable for the concept     |

### `data_access_level` attribute values
The data_access_level of the `DonorSchema` is one of the values following enumerated values:
- `public`
- `consortium`

### `data_type` attribute values
The data_type of the `DonorMetadataSchema` is one of the values following enumerated values:
- `Nominal`
- `Numeric`

### `numeric_operator` attribute values
The numeric_operator of the `DonorMetadataSchema` is one of the values following enumerated values:
- `EQ`
- `GT`
- `LT`

## Person Schema
attributes as listed at [entity-api Donor schema drop-down, creators drop-down, Person schema drop-down](https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3):

| Attribute                | Type     | Description                                           |
|--------------------------|----------|-------------------------------------------------------|
| first_name               | string   | The full name of the person.                          |
| last_name                | string   | The last name of the person.                          |
| middle_name_or_initial   | string   | The middle name or initial of the person.             |
| orcid_id                 | string   | The ORCID iD of the person.                           |
| affiliation              | string   | The institution that the person is affiliated with.   |

## File Schema
Attributes as listed at [entity-api Donor schema drop-down, image_files drop-down, File schema drop-down](https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3):

| Attribute   | Type   | Description                                                                                |
|-------------|--------|--------------------------------------------------------------------------------------------|
| filename    | string | The name of the file.                                                                      |
| description | string | A description of the file. The Dataset.thumbnail_file does not have this file description. |
| file_uuid   | string | The HuBMAP unique identifier for the file.                                                 |

from GET hm_dev_consortium_entities/_mapping
            "portal_metadata_upload_files"
                "description"
                "filepath"

```
https://github.com/hubmapconsortium/software-docs/issues/79
```
Create full documentation on the software.docs site for the new parameterized search feature which:

Explains how to use the new /param-search/<entity-type> endpoint
Fully documents the schemata for the entities types supported as a way of documenting the available, searchable attributes. This should explain the construction of multilevel attributes, for example if searching in Sample space the attribute donor.protocol_url is constructed from the top level Sample attribute donor (which points to the Donor schema), then protocol_url attribute from Donor.


### OpenSearch document keyword attributes
Examples are enumerated as follows, but the current, authoritative list is returned from a call
to the search-api endpoint [/attribute-values?attribute_name_list](/attribute-values?attribute_name_list).
@TODO-determine if ".keyword" needs to be repeated here on each attribute, since I don't think that
was ever evaluated after implementation...
- visit.keyword
- uuid.keyword


#### source_samples keyword attributes
@TODO-Do I say source_samples is for a Sample, and link to the Sample schema?
@TODO-Do I say, when searching for a Sample, the donor.protocol_url is the protocol URL of the Donor of the Sample?

Examples are enumerated as follows, but the current, authoritative list is returned from a call
to the search-api endpoint [/attribute-values?attribute_name_list](/attribute-values?attribute_name_list).


- ancestors.metadata.dag_provenance_list.hash.keyword
