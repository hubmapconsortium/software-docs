---
layout: page
---

# HuBMAP Sample schema

### Last Updated: 2023-04-07

## Overview:
This page describes the Sample schema for HuBMAP data. Sample data may be returned itself or a part of another entity.  For example, this endpoint searches Samples for a specified group and organ:
```
OpenSearch indices (@TODO-5 returned in Dev)
GET https://search.api.hubmapconsortium.org/param-search/samples?group_name=Stanford TMC&organ=LI
```
```
Neo4j (@TODO-10 returned in Dev)
match (s:Sample {group_name:'Stanford TMC',organ:'LI'}) return s
```
And the following search for Datasets matched to a particular Sample, which is contained in the Dataset's `ancestors`:
```
OpenSearch indices (@TODO-10 returned in Dev)
GET https://search.api.hubmapconsortium.org/param-search/datasets?ancestors.lab_tissue_sample_id=B001-A-406
```
```
Neo4j (@TODO-19 returned in Dev)
match (d:Dataset)<-[*]-(s:Sample {lab_tissue_sample_id:'B001-A-406'}) return d
```

<BR><B>@TODO-MARKDOWN LINKING SEEMS TO BE VERY IMPLEMENTATION SPECIFIC. EVALUATE...</B>
<BR><B>@TODO CONFIRM IF WE NEED STRUCTURED ENUMERATION FOR entity_type VALUES + DEF "normalized"</B>

## Description: 
Per the standard [Search API](https://smart-api.info/ui/7aaf02b838022d564da776b03f357158) functionality the indices are stored as a pair of [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/index.html) indicies consisting of a private/consortium only index and a public/open to all index.  The Search API will automatically direct to the index based on the user authroization.

Each document in the files index contains information about one File entity in a Dataset.  The structure of these documents is described below.

## Limitations:
- The current index only includes documents for Files in primary Datasets which are published and do not contain genetic information.
- The File Info document in the index contains accurate information from HuBMAP data stores at the time the Dataset was
processed, and may not reflect subsequent changes until a re-index is complete.

## Sample Schema 
attributes as listed at [entity-api Sample schema drop-down](https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3):

| Attribute                      | Type                                                                                                  | Constraint | Description                                                                                                                                                                                                                                                                                                                          |
|--------------------------------|-------------------------------------------------------------------------------------------------------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| created_timestamp              | integer                                                                                               | read-only  | The timestamp of when the node was created. The format is an integer representing milliseconds since midnight Jan 1, 1970                                                                                                                                                                                                            |
| created_by_user_displayname    | string                                                                                                | read-only  | The name of the person or process authenticated when creating the object                                                                                                                                                                                                                                                             |
| created_by_user_email          | string                                                                                                | read-only  | The email address of the person or process authenticated when creating the object.                                                                                                                                                                                                                                                   |
| created_by_user_sub            | string                                                                                                | read-only  | The subject id as provided by the authorization mechanism for the person or process authenticated when creating the object.                                                                                                                                                                                                          |
| uuid                           | string                                                                                                | read-only  | The HuBMAP unique identifier, intended for internal software use only. This is a 32 digit hexadecimal uuid e.g. 461bbfdc353a2673e381f632510b0f17                                                                                                                                                                                     |
| hubmap_id                      | string                                                                                                | read-only  | A HuBMAP Consortium wide unique identifier randomly generated in the format HBM###.ABCD.### for every entity.                                                                                                                                                                                                                        |
| last_modified_timestamp        | integer                                                                                               | read-only  | The timestamp of when the object was last modified. The format is an integer representing milliseconds since midnight, Jan 1, 1970                                                                                                                                                                                                   |
| last_modified_user_sub         | string                                                                                                | read-only  | The subject id of the user who last modified the entity as provided by the authorization mechanism for the person or process authenticated when the object was modified.                                                                                                                                                             |
| last_modified_user_email       | string                                                                                                | read-only  | The email address of the person or process which authenticated when the object was last modified.                                                                                                                                                                                                                                    |
| last_modified_user_displayname | string                                                                                                | read-only  | The name of the person or process which authenticated when the object was last modified.                                                                                                                                                                                                                                             |
| entity_type                    | string                                                                                                | read-only  | One of the normalized entity types: Dataset, Collection, Sample, Donor                                                                                                                                                                                                                                                               |
| registered_doi                 | string                                                                                                |            | The doi of a the registered entity. e.g. 10.35079/hbm289.pcbm.487. This is set during the publication process and currently available for certain Collections and Datasets.                                                                                                                                                          |
| doi_url                        | string                                                                                                | read-only  | The url from the doi registry for this entity. e.g. https://doi.org/10.35079/hbm289.pcbm.487                                                                                                                                                                                                                                         |
| description                    | string                                                                                                |            | Free text description of the sample                                                                                                                                                                                                                                                                                                  |
| specimen_type_other            | string                                                                                                |            | The user provided sample type if the 'other' sample_type is chosen.                                                                                                                                                                                                                                                                  |
| protocol_url                   | string                                                                                                |            | The protocols.io doi url pointing the protocol under wich the sample was obtained and/or prepared.                                                                                                                                                                                                                                   |
| group_uuid                     | string                                                                                                |            | The uuid of globus group which the user who created this entity is a member of. This is required on Create/POST if the user creating the Donor is a member of more than one write group. This property cannot be set via PUT (only on Create/POST).                                                                                  |
| group_name                     | string                                                                                                | read-only  | The displayname of globus group which the user who created this entity is a member of                                                                                                                                                                                                                                                |
| organ_other                    | string                                                                                                |            | The organ type provided by the user if "other" organ type is selected                                                                                                                                                                                                                                                                |
| direct_ancestor_uuid           | string                                                                                                | write-only | The uuid of source entity from which this new entity is derived from. Used on creation or edit to create an action and relationship to the ancestor. The direct ancestor must be a Donor or Sample. If the direct ancestor is a Donor, the sample must be of type organ.                                                             |
| submission_id                  | string                                                                                                |            | The hubmap internal id with embedded semantic information e.g.: VAN0003-LK-1-10. This id is generated at creation time which tracks the lab, donor, organ and sample hierarchy per the following: https://docs.google.com/document/d/1DjHgmqWF1VA5-3mfzLFNfabbzmc8KLSG9xWx1DDLlzo/edit?usp=sharing                                   |
| lab_tissue_sample_id           | string                                                                                                |            | Lab specific id for the sample.                                                                                                                                                                                                                                                                                                      |
| visit                          | string                                                                                                |            | The visit id for the donor/patient when the sample was obtained.                                                                                                                                                                                                                                                                     |
| data_access_level              | string from [`data_access_level` attribute values](#data_access_level-attribute-values)               | read-only  | One of the values: public, consortium                                                                                                                                                                                                                                                                                                |
| sample_category                | string from [`sample_category` attribute values](#sample_category-attribute-values)                   |            | A code representing the category of the specimen. Must be one of organ, block, section , suspension. This is a required field. If set to organ, the organ property must be provided as well.                                                                                                                                         |
| specimen_type                  | string from [`specimen_type` deprecated attribute values](#specimen_type-deprecated-attribute-values) |            | DEPRECATED: No longer a required field. A code representing the type of specimen. Must be one of the codes specified in: [tissue sample types](https://raw.githubusercontent.com/hubmapconsortium/search-api/main/src/search-schema/data/definitions/enums/tissue_sample_types.yaml)                                                 |
| organ                          | string from [`organ` attribute values](#organ-attribute-values)                                       |            | Organ code specifier, only set if sample_category == organ. Valid values found in: [organ types](https://raw.githubusercontent.com/hubmapconsortium/search-api/main/src/search-schema/data/definitions/enums/organ_types.yaml)                                                                                                       |
| metadata                       | array of [`Sample Metadata Schema`](#sample-metadata-schema)                                          |            | The sample specific metadata derived from the uploaded sample_metadata.tsv file. Returned as a json object.                                                                                                                                                                                                                          |
| rui_location                   | <B>@TODO-EVAL WHAT SHOWS AT https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3                |            | The sample location and orientation in the ancestor organ as specified in the RUI tool. Returned as a json object.                                                                                                                                                                                                                   |
| creators                       | array of [`Person Schema`](#person-schema)                                                            |            | A list of the people who created the entity with full name, email, ORCID iD, institution, etc.. This is analogous to the author list on a publication.                                                                                                                                                                               |
| contacts                       | array of [`Person Schema`](#person-schema)                                                            |            | A list of the people who are the main contacts to get information about the entity.                                                                                                                                                                                                                                                  |
| image_files                    | array of [`File Schema`](#file-schema)                                                                | read-only  | List of uploaded image files and descriptions of the files. Stored in db as a stringfied json array.                                                                                                                                                                                                                                 |
| image_files_to_add             | string containing JSON array                                                                          | write-only | List of ***temporary file ids*** with an optional description. Provide as a json array with an temp_file_id and description attribute for each element like ```{"files": [{"temp_file_id":"dzevgd6xjs4d5grmcp4n","description":"This is image file one"},{"temp_file_id":"yrahjadfhadf","description":"This is image file two"}]}``` |
| image_files_to_remove          | string containing JSON array                                                                          | write-only | List of image files ***previously uploaded*** to delete. Provide as a json array of the file_uuids of the file like: ```["232934234234234234234270c0ea6c51d604a850558ef2247d0b4", "230948203482234234234a57bfe9c056d08a0f8e6cd612baa3bfa"]```                                                                                        |
| metadata_files                 | array of [`File Schema`](#file-schema)                                                                | read-only  | List of uploaded image files and descriptions of the files. Stored in db as a stringfied json array.                                                                                                                                                                                                                                 |
| metadata_files_to_add          | string containing JSON array                                                                          |            | List of temporary file ids with an optional description. Provide as a json array with an temp_file_id and description attribute for each element like ```{"files": [{"temp_file_id":"dzevgd6xjs4d5grmcp4n","description":"This is image file one"},{"temp_file_id":"yrahjadfhadf","description":"This is image file two"}]}```       |
| metadata_files_to_remove       | string containing JSON array                                                                          |            | List of image files previously uploaded to delete. Provide as a json array of the file_uuids of the file like: ```["232934234234234234234270c0ea6c51d604a850558ef2247d0b4", "230948203482234234234a57bfe9c056d08a0f8e6cd612baa3bfa"]```                                                                                              |

### Sample Metadata Schema
attributes as listed at [entity-api Sample schema drop-down, metadata drop-down, DonorMetadata drop-down](https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3):
The sample specific metadata derived from the uploaded sample_metadata.tsv file. Returned as a json object.

| Attribute                         | Type                                                                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|-----------------------------------|--------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| sample_id                         | string                                                                         | The HuBMAP Identifier for the sample.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| procedure_date                    | string                                                                         | The date at which the organ from which the tissue sample came from was procurred, in the format YYYY-MM-DD                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| pathologist_report                | string                                                                         | Further details on organ level QC checks.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| warm_ischemia_time_value          | integer                                                                        | Time interval between cessation of blood flow and cooling to 4C. Blank if not applicable.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| warm_ischemia_time_unit           | string                                                                         | Time units that the warm_ischemia_time_value is reported in. Blank if not applicable                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| cold_ischemia_time_value          | integer                                                                        | Time interval on ice to the start of preservation protocol. Blank if not applicable.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| cold_ischemia_time_unit           | string                                                                         | Time units that the cold_ischemia_time_value is reported in. Blank if not applicable.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| specimen_preservation_temperature | string                                                                         | The temperature of the medium during the preservation process. Reported as preservation method, temperature and units, e.g. Freezer (-80 Celsius)                                                                                                                                                                                                                                                                                                                                                                                          |
| specimen_quality_criteria         | string                                                                         | RIN score. e.g. RIN: 8.7                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| specimen_tumor_distance_value     | string                                                                         | If surgical sample from a tumor biopsy, how far from the tumor was the sample obtained from. Typically a number of centimeters. Blank if not applicable or unknown.                                                                                                                                                                                                                                                                                                                                                                        |
| specimen_tumor_distance_unit      | string                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| vital_state                       | string from [`vital_state` attribute values](#vitalstate-attribute-values)     | The vital state of the donor who the tissue sample came from.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| health_status                     | string from [`health_status` attribute values](#healthstatus-attribute-values) | Donor from which the tissue sample came from's baseline physical condition prior to immediate event leading to organ/tissue acquisition. For example, if a relatively healthy patient suffers trauma, and as a result of reparative surgery, a tissue sample is collected, the subject will be deemed 'relatively healthy'. Likewise, a relatively healthy subject may have experienced trauma leading to brain death. As a result of organ donation, a sample is collected. In this scenario, the subject is deemed 'relatively healthy'. |
| organ_condition                   | string from [`organ_condition` attribute values](#organcondition-attribute-values) | Health status of the organ at the time of tissue sample recovery. |
| perfusion_solution                | string from [`perfusion_solution` attribute values](#perfusionsolution-attribute-values) | Health status of the organ at the time of sample recovery. |

### `data_access_level` attribute values
The data_access_level of the `Sample Schema` is one of the values following enumerated values:
- `public`
- `consortium`

### `sample_category` attribute values
The sample_category of the `Sample Schema` is one of the values following enumerated values:
- `organ`
- `block`
- `section`

### `specimen_type` deprecated attribute values
The specimen_type of the `Sample Schema` is deprecated and not required. It value must be from [tissue sample types](https://raw.githubusercontent.com/hubmapconsortium/search-api/main/src/search-schema/data/definitions/enums/tissue_sample_types.yaml):
atacseq
- `biopsy`
- `blood`
- `cell_lysate`
- `clarity_hydrogel`
- `codex`
- `cryosections_curls_from_fresh_frozen_oct`
- `cryosections_curls_rnalater`
- `ffpe_block`
- `ffpe_slide`
- `fixed_frozen_section_slide`
- `fixed_tissue_piece`
- `flash_frozen_liquid_nitrogen`
- `formalin_fixed_oct_block`
- `fresh_frozen_oct_block`
- `fresh_frozen_section_slide`
- `fresh_frozen_tissue`
- `fresh_frozen_tissue_section`
- `fresh_tissue`
- `frozen_cell_pellet_buffy_coat`
- `gdna`
- `module`
- `nuclei`
- `nuclei_rnalater`
- `organ`
- `organ_piece`
- `other`
- `pbmc`
- `pfa_fixed_frozen_oct_block`
- `plasma`
- `protein`
- `ran_poly_a_enriched`
- `rna_total`
- `rnalater_treated_and_stored`
- `rnaseq`
- `scatacseq`
- `scrnaseq`
- `segment`
- `seqfish`
- `sequence_library`
- `serum`
- `single_cell_cryopreserved`
- `snatacseq`
- `snrnaseq`
- `tissue_lysate`
- `wgs`

### `organ` attribute values
The organ of the `Sample Schema` is one of the values following enumerated values from [organ types](https://raw.githubusercontent.com/hubmapconsortium/search-api/main/src/search-schema/data/definitions/enums/organ_types.yaml):
- `AO`
- `BL`
- `BD`
- `BM`
- `BR`
- `LF`
- `RF`
- `HT`
- `LB`
- `LE`
- `LI`
- `LK`
- `LL`
- `LN`
- `LV`
- `LY`
- `LO`
- `RO`
- `OT`
- `PA`
- `PL`
- `RB`
- `RE`
- `RK`
- `RL`
- `RN`
- `SI`
- `SK`
- `SP`
- `ST`
- `TH`
- `TR`
- `UR`
- `UT`

### `vital_state` attribute values
The vital_state of the `Sample Metadata Schema` is one of the values following enumerated values:
- `living`
- `deceased`

### `health_status` attribute values
The health_status of the `Sample Metadata Schema` is one of the values following enumerated values:
- `cancer`
- `relatively`
- `healthy`
- `chronic illness`

### `organ_condition` attribute values
The organ_condition of the `Sample Metadata Schema` is one of the values following enumerated values:
- `healthy` 
- `diseased`

### `perfusion_solution` attribute values
The perfusion_solution of the `Sample Metadata Schema` is one of the values following enumerated values:
- `UWS`
- `HTK`
- `Belzer`
- `MPS/KPS`
- `Formalin`
- `Unknown`
- `None`

<BR><B>@TODO-DE-DUP TO THESE SCHEMAS SHARED WITH DONOR TO THEIR OWN MARKDOWN?</B>

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
