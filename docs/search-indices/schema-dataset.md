---
layout: page
---

# HuBMAP Dataset schema

### Last Updated: 2023-04-07

## Overview:
This page describes the Dataset schema for HuBMAP data. Dataset data may be returned itself or a part of another entity.  For example, this endpoint searches Datasets for a specified group and data type:
```
OpenSearch indices (@TODO-10 returned in Dev)
GET https://search.api.hubmapconsortium.org/param-search/datasets?group_name=Northwestern RTI&data_types=LC-MS_top_down
```
```
Neo4j (@TODO-178 returned in Dev for University of California San Diego TMC, 0 for Northwestern RTI)
WITH ".*SNARE-RNAseq2.*" as regex
MATCH (d:Dataset)
WHERE ANY(data_type IN d.data_types WHERE data_type =~ regex) AND d.group_name="Northwestern RTI"
RETURN d
```
And the following search for the Sample of which is the Dataset is a descendant:
```
OpenSearch indices (@TODO-10 returned in Dev)
GET https://search.api.hubmapconsortium.org/param-search/samples?group_name=Stanford TMC&descendants.uuid=277152f17b5a2f308820ab4d85c5a426
```
```
Neo4j (@TODO-6 returned in Dev)
WITH "salmon_rnaseq_10x__.*salmon-rnaseq" as regex
MATCH (d:Dataset)<-[*]-(s:Sample)
WHERE ANY(data_type IN d.dataset_info WHERE data_type =~ regex) AND d.group_name="Stanford TMC"
RETURN s
```

## Description: 
Per the standard [Search API](https://smart-api.info/ui/7aaf02b838022d564da776b03f357158) functionality the indices are stored as a pair of [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/index.html) indicies consisting of a private/consortium only index and a public/open to all index.  The Search API will automatically direct to the index based on the user authroization.

Each document in the files index contains information about one File entity in a Dataset.  The structure of these documents is described below.

## Limitations:
- The current index only includes documents for Files in primary Datasets which are published and do not contain genetic information.
- The File Info document in the index contains accurate information from HuBMAP data stores at the time the Dataset was
processed, and may not reflect subsequent changes until a re-index is complete.

## Dataset Schema 
attributes as listed at [entity-api Dataset schema drop-down](https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3):

| Attribute                        | Type                                                                                                | Constraint      | Description                                                                                                                                                                                                                                          |
|----------------------------------|-----------------------------------------------------------------------------------------------------|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| description                      | string                                                                                              |                 | Free text description of the dataset                                                                                                                                                                                                                 |
| created_timestamp                | integer                                                                                             | read-only       | The timestamp of when the node was created. The format is an integer representing milliseconds since midnight Jan 1, 1970                                                                                                                            |
| created_by_user_displayname      | string                                                                                              | read-only       | The name of the person or process authenticated when creating the object                                                                                                                                                                             |
| created_by_user_email            | string                                                                                              | read-only       | The email address of the person or process authenticated when creating the object.                                                                                                                                                                   |
| created_by_user_sub              | string                                                                                              | read-only       | The subject id as provided by the authorization mechanism for the person or process authenticated when creating the object.                                                                                                                          |
| uuid                             | string                                                                                              | read-only       | The HuBMAP unique identifier, intended for internal software use only. This is a 32 digit hexadecimal uuid e.g. 461bbfdc353a2673e381f632510b0f17                                                                                                     |
| hubmap_id                        | string                                                                                              | read-only       | A HuBMAP Consortium wide unique identifier randomly generated in the format HBM###.ABCD.### for every entity.                                                                                                                                        |
| error_message                    | string                                                                                              | readOnly: false | An open text field that holds the last error message that arose from pipeline validation or analysis.                                                                                                                                                |
| last_modified_timestamp          | integer                                                                                             | read-only       | The timestamp of when the object was last modified. The format is an integer representing milliseconds since midnight, Jan 1, 1970                                                                                                                   |
| last_modified_user_sub           | string                                                                                              | read-only       | The subject id of the user who last modified the entity as provided by the authorization mechanism for the person or process authenticated when the object was modified.                                                                             |
| last_modified_user_email         | string                                                                                              | read-only       | The email address of the person or process which authenticated when the object was last modified.                                                                                                                                                    |
| last_modified_user_displayname   | string                                                                                              | read-only       | The name of the person or process which authenticated when the object was last modified.                                                                                                                                                             |
| entity_type                      | string                                                                                              | read-only       | One of the normalized entity types: Dataset, Collection, Sample, Donor                                                                                                                                                                               |
| registered_doi                   | string                                                                                              |                 | The doi of a the registered entity. e.g. 10.35079/hbm289.pcbm.487. This is set during the publication process and currently available for certain Collections and Datasets.                                                                          |
| doi_url                          | string                                                                                              | read-only       | The url from the doi registry for this entity. e.g. https://doi.org/10.35079/hbm289.pcbm.487                                                                                                                                                         |
| contains_human_genetic_sequences | boolean                                                                                             |                 | True if the data contains any human genetic sequence information. Can only be set at CREATE/POST time                                                                                                                                                |
| title                            | string                                                                                              |                 | The dataset title.                                                                                                                                                                                                                                   |
| published_timestamp              | integer                                                                                             | read-only       | The timestamp of when the dataset was published. The format is an integer representing milliseconds since midnight, Jan 1, 1970.                                                                                                                     |
| published_user_displayname       | string                                                                                              | read-only       | The name of the authenticated user or process that published the data.                                                                                                                                                                               |
| published_user_sub               | string                                                                                              | read-only       | The subject id for the user who published the data as provided by the authorization mechanism for the person or process authenticated when the dataset was publised.                                                                                 |
| published_user_email             | string                                                                                              | read-only       | The email address of the user who published the provided by the authorization mechanism for the person or process authenticated when published.                                                                                                      |
| local_directory_rel_path         | string                                                                                              | read-only       | The path on the local HIVE file system, relative to the base data directory, where the data is stored.                                                                                                                                               |
| group_uuid                       | string                                                                                              |                 | The uuid of globus group which the user who created this entity is a member of. This is required on Create/POST if the user creating the Donor is a member of more than one write group. This property cannot be set via PUT (only on Create/POST).  |
| group_name                       | string                                                                                              | read-only       | The displayname of globus group which the user who created this entity is a member of                                                                                                                                                                |
| previous_revision_uuid           | string                                                                                              |                 | The uuid of previous revision dataset. Can only be set at Create/POST time.                                                                                                                                                                          |
| next_revision_uuid               | string                                                                                              | read-only       | The uuid of next revision dataset                                                                                                                                                                                                                    |
| thumbnail_file_to_add            | string($temp_file_id)                                                                               | write-only      | Just a temporary file id. Provide as a json object with an temp_file_id like {"temp_file_id":"dzevgd6xjs4d5grmcp4n"}                                                                                                                                 |
| thumbnail_file_to_remove         | string($file_uuid)                                                                                  | write-only      | The thumbnail image file previously uploaded to delete. Provide as a string of the file_uuid like: "c35002f9c3d49f8b77e1e2cd4a01803d"                                                                                                                |
| sub_status                       | string                                                                                              |                 | A sub-status provided to further define the status. The only current allowable value is "Retracted"                                                                                                                                                  |
| retraction_reason                | string                                                                                              |                 | Information recorded about why a the dataset was retracted.                                                                                                                                                                                          |
| dbgap_sra_experiment_url         | string                                                                                              |                 | A URL linking the dataset to the associated uploaded data at dbGaP.                                                                                                                                                                                  |
| dbgap_study_url                  | string                                                                                              |                 | A URL linking the dataset to the particular study on dbGap it belongs to                                                                                                                                                                             |
| data_access_level                | string from [`data_access_level` attribute values](#data_access_level-attribute-values)             | read-only       | One of the values: public, consortium.                                                                                                                                                                                                               |
| status                           | string string from [`status` attribute values](#status-attribute-values)                            |                 | One of: NewProcessing, QA Published Error Hold Invalid                                                                                                                                                                                               |
| creators                         | array of [`Person Schema`](#person-schema)                                                          |                 | A list of the people who created the entity with full name, email, ORCID iD, institution, etc.. This is analogus to the author list on a publication.                                                                                                |
| contacts                         | array of [`Person Schema`](#person-schema)                                                          |                 | A list of the people who are the main contacts to get information about the entity.                                                                                                                                                                  |
| contributors                     | array of [`Person Schema`](#person-schema)                                                          | read-only       | A list of people who contributed to the creation of this dataset. Returned as an array of contributors, with each element a Person schema instance.                                                                                                  | 
| data_types                       | string from [`data_types` attribute values](#data_types-attribute-values)                           |                 | The data or assay types contained in this dataset as a json array of strings. Each is an assay code from [assay types](https://raw.githubusercontent.com/hubmapconsortium/search-api/main/src/search-schema/data/definitions/enums/assay_types.yaml) |
| collections                      | array of [`Collections Schema`](#collections-schema)                                                | read-only       | A list of collections that this dataset belongs to.                                                                                                                                                                                                  |
| antibodies                       | array of [`Antibody Schema`](#antibody-schema)                                                      |                 | A list of antibodies used in the assay that created the dataset                                                                                                                                                                                      |
| upload                           | array of [`Upload Schema`](#upload-schema)                                                          | read-only       | The Data Upload that this dataset is associated with.                                                                                                                                                                                                |
| ingest_metadata                  | string                                                                                              |                 | The metadata returned from the ingest pipeline processing at data submission time. Provided as json.                                                                                                                                                 |
| thumbnail_file                   | string                                                                                              |                 | The dataset thumbnail file detail. Stored in db as a stringfied json, e.g., {"filename": "thumbnail.jpg", "file_uuid": "c35002f9c3d49f8b77e1e2cd4a01803d"}                                                                                           |
| direct_ancestors                 | array of [`Sample Schema`](#sample-schema) <B>@TODO-and/or?</B> [`Dataset Schema`](#dataset-schema) | read-only       | A list of direct parent ancensters (one level above) that the Dataset was derived from.                                                                                                                                                              |


### `data_access_level` attribute values
The data_access_level of the `Dataset Schema` is one of the values following enumerated values:
- `public`
- `consortium`

### `status` attribute values
The status attribute of the `Dataset Schema` is one of the values following enumerated values:
- `New`
- `Processing`
- `QA`
- `Published`
- `Error`
- `Hold`
- `Invalid`

### `data_types` attribute values
The data_types attribute of the `Dataset Schema` is a value from the current, authoritative list of [assay types](https://raw.githubusercontent.com/hubmapconsortium/search-api/main/src/search-schema/data/definitions/enums/assay_types.yaml). Examples include:
- `AF`
- `ATACseq-bulk`
- `bulk_atacseq`
- `cell-dive`
- `CODEX`
- `codex_cytokit`
- `DART-FISH`
- `image_pyramid`
- `IMC`
- `3D-IMC`
- `lc-ms_label-free`
- `lc-ms_labeled`
- `lc-ms-ms_label-free`
- `lc-ms-ms_labeled`
- `LC-MS-untargeted`
- `Lightsheet`
- `MALDI-IMS-neg`
- `MALDI-IMS-pos`
- `MxIF`
- `PAS`
- `bulk-RNA`
- `salmon_rnaseq_bulk`
- `SNAREseq`
- `sc_atac_seq_snare_lab`
- `sc_atac_seq_snare`
- `scRNA-Seq-10x`
- `salmon_rnaseq_10x`
- `sc_rna_seq_snare_lab`
- `salmon_rnaseq_snareseq`
- `sciATACseq`
- `sc_atac_seq_sci`
- `sciRNAseq`
- `salmon_rnaseq_sciseq`
- `seqFish`
- `seqFish_lab_processed`
- `snATACseq`
- `sn_atac_seq`
- `snRNAseq`
- `salmon_sn_rnaseq_10x`
- `Slide-seq`
- `Targeted-Shotgun-LC-MS`
- `TMT-LC-MS`
- `WGS`

## Person Schema
attributes as listed at [entity-api Dataset schema drop-down, creators drop-down, Person schema drop-down](https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3):

| Attribute                | Type     | Description                                           |
|--------------------------|----------|-------------------------------------------------------|
| first_name               | string   | The full name of the person.                          |
| last_name                | string   | The last name of the person.                          |
| middle_name_or_initial   | string   | The middle name or initial of the person.             |
| orcid_id                 | string   | The ORCID iD of the person.                           |
| affiliation              | string   | The institution that the person is affiliated with.   |

## Collections Schema
attributes as listed at [entity-api Dataset schema drop-down, collections drop-down, Collection schema drop-down](https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3):

| Attribute                      | Type                                       | Constraint | Description                                                                                                                                                                 |
|--------------------------------|--------------------------------------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| created_timestamp              | integer                                    | read-only  | The timestamp of when the node was created. The format is an integer representing milliseconds since midnight Jan 1, 1970                                                   |
| created_by_user_displayname    | string                                     | read-only  | The name of the person or process authenticated when creating the object                                                                                                    |
| created_by_user_email          | string                                     | read-only  | The email address of the person or process authenticated when creating the object.                                                                                          |
| created_by_user_sub            | string                                     | read-only  | The subject id as provided by the authorization mechanism for the person or process authenticated when creating the object.                                                 |
| uuid                           | string                                     | read-only  | The HuBMAP unique identifier, intended for internal software use only. This is a 32 digit hexadecimal uuid e.g. 461bbfdc353a2673e381f632510b0f17                            |
| hubmap_id                      | string                                     | read-only  | A HuBMAP Consortium wide unique identifier randomly generated in the format HBM###.ABCD.### for every entity.                                                               |
| last_modified_timestamp        | integer                                    | read-only  | The timestamp of when the object was last modified. The format is an integer representing milliseconds since midnight, Jan 1, 1970                                          |
| last_modified_user_sub         | string                                     | read-only  | The subject id of the user who last modified the entity as provided by the authorization mechanism for the person or process authenticated when the object was modified.    |
| last_modified_user_email       | string                                     | read-only  | The email address of the person or process which authenticated when the object was last modified.                                                                           |
| last_modified_user_displayname | string                                     | read-only  | The name of the person or process which authenticated when the object was last modified.                                                                                    |
| entity_type                    | string                                     | read-only  | One of the normalized entity types: Dataset, Collection, Sample, Donor                                                                                                      |
| registered_doi                 | string                                     |            | The doi of a the registered entity. e.g. 10.35079/hbm289.pcbm.487. This is set during the publication process and currently available for certain Collections and Datasets. |
| doi_url                        | string                                     | read-only  | The url from the doi registry for this entity. e.g. https://doi.org/10.35079/hbm289.pcbm.487                                                                                |
| title                          | string                                     |            | The title of the Collection                                                                                                                                                 |
| creators                       | array of [`Person Schema`](#person-schema) |            | A list of the people who created the entity with full name, email, ORCID iD, institution, etc.. This is analogus to the author list on a publication.                       |
| contacts                       | array of [`Person Schema`](#person-schema) |            | A list of the people who are the main contacts to get information about the entity.                                                                                         |
| datasets                       | @TODO                                      | read-only  | The datasets that are contained in the Collection.                                                                                                                          |

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

## Upload Schema
attributes as listed at [entity-api Dataset schema drop-down, upload drop-down, Upload schema drop-down](https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3):

| Attribute                      | Type    | Constraint | Description                                                                                                                                                                                                                                         |
|--------------------------------|---------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| created_timestamp              | integer | read-only  | The timestamp of when the node was created. The format is an integer representing milliseconds since midnight Jan 1, 1970                                                                                                                           |
| created_by_user_displayname    | string  | read-only  | The name of the person or process authenticated when creating the object                                                                                                                                                                            |
| created_by_user_email          | string  | read-only  | The email address of the person or process authenticated when creating the object.                                                                                                                                                                  |
| created_by_user_sub            | string  | read-only  | The subject id as provided by the authorization mechanism for the person or process authenticated when creating the object.                                                                                                                         |
| uuid                           | string  | read-only  | The HuBMAP unique identifier, intended for internal software use only. This is a 32 digit hexadecimal uuid e.g. 461bbfdc353a2673e381f632510b0f17                                                                                                    |
| hubmap_id                      | string  | read-only  | A HuBMAP Consortium wide unique identifier randomly generated in the format HBM###.ABCD.### for every entity.                                                                                                                                       |
| last_modified_timestamp        | integer | read-only  | The timestamp of when the object was last modified. The format is an integer representing milliseconds since midnight, Jan 1, 1970                                                                                                                  |
| last_modified_user_sub         | string  | read-only  | The subject id of the user who last modified the entity as provided by the authorization mechanism for the person or process authenticated when the object was modified.                                                                            |
| last_modified_user_email       | string  | read-only  | The email address of the person or process which authenticated when the object was last modified.                                                                                                                                                   |
| last_modified_user_displayname | string  | read-only  | The name of the person or process which authenticated when the object was last modified.                                                                                                                                                            |
| entity_type                    | string  | read-only  | One of the normalized entity types: Dataset, Collection, Sample, Donor, Upload                                                                                                                                                                      |
| description                    | string  |            | Free text description of the data being submitted.                                                                                                                                                                                                  |
| title                          | string  |            | Title of the datasets, a sentence or less                                                                                                                                                                                                           |
| status                         | string  |            | One of: New, Valid, Invalid, Error, Submitted                                                                                                                                                                                                       |
| validation_message             | string  |            | A message from the validation tools describing what is invalid with the upload.                                                                                                                                                                     |
| group_uuid                     | string  |            | The uuid of Globus group which the user who created this entity is a member of. This is required on Create/POST if the user creating the Donor is a member of more than one write group. This property cannot be set via PUT (only on Create/POST). |
| group_name                     | string  | read-only  | The displayname of Globus group which the user who created this entity is a member of                                                                                                                                                               |
| dataset_uuids_to_link          | string  | write-only | List of datasets to add to the Upload. Provide as a json array of the dataset uuids like: ["232934234234234234234270c0ea6c51d604a850558ef2247d0b4", "230948203482234234234a57bfe9c056d08a0f8e6cd612baa3bfa"]                                        |
| dataset_uuids_to_unlink        | string  | write-only | List of datasets to remove from a Upload. Provide as a json array of the dataset uuids like: ["232934234234234234234270c0ea6c51d604a850558ef2247d0b4", "230948203482234234234a57bfe9c056d08a0f8e6cd612baa3bfa"]                                     |
| datasets                       | @TODO   | read-only  | The datasets that are contained in this Upload.                                                                                                                                                                                                     |

## Sample Schema
Attributes as listed at [entity-api Dataset schema drop-down, direct_ancestors drop-down, Sample schema drop-down](https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3):
<B>@TODO-HOW ARE WE DE-DUP'ING, KEEPING IT DRY, NORMALIZING...WHATEVER?  POINT TO CONTENT OF schema-sample.md
<BR>
[&quot;internal&quot; link to schema?](http://localhost:4000/search-indices/schema-sample.html#sample-schema)
</B>


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
