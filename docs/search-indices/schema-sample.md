---
layout: page
---

# HuBMAP Sample schema

### Last Updated: 2023-04-17

## Overview:
This page describes the Sample schema for HuBMAP data. Sample data may be returned itself or a part of another entity.  For example, this endpoint searches Samples for a specified group and organ:
```
GET https://search.api.hubmapconsortium.org/param-search/samples?group_name=Stanford TMC&organ=LI
```

And the following search for Datasets matched to a particular Sample, which is contained in the Dataset's `ancestors`:
```
GET https://search.api.hubmapconsortium.org/param-search/datasets?ancestors.lab_tissue_sample_id=B001-A-406
```

## Description: 
A query string is built by combining schema elements documented below with matching values.  Each "term" of the query is combined using the & character, and the entire query is attached to the base URL after a ? character, per web standards.

Query terms may be composited from attributes deeper in the schema type of an attribute.  For example, the Sample Schema attribute ```metadata``` is has a type of Sample Metadata Schema, and Sample Metadata Schema has an attribute ```organ_condition```. Querying Samples supports a term to search for samples from healthy organs, such as ```metadata.organ_condition=healthy```, and a query like:
```
GET https://search.api.hubmapconsortium.org/param-search/samples?metadata.organ_condition=healthy&organ=LI
```

## Limitations:
- This document lists resources pulled from configuration files.  The content of those files, at the provided links, may be newer.

## Sample Schema 
attributes as listed at [entity-api Sample schema drop-down](https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3):

| Attribute                   | Type                                                                                                  | Constraint | Description                                                                                                                                                                                                                                                                                        |
|-----------------------------|-------------------------------------------------------------------------------------------------------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| description                 | string                                                                                                |            | Free text description of the sample                                                                                                                                                                                                                                                                |
| created_timestamp           | integer                                                                                               | read-only  | The timestamp of when the node was created. The format is an integer representing milliseconds since midnight Jan 1, 1970                                                                                                                                                                          |
| created_by_user_displayname | string                                                                                                | read-only  | The name of the person or process authenticated when creating the object                                                                                                                                                                                                                           |
| created_by_user_email       | string                                                                                                | read-only  | The email address of the person or process authenticated when creating the object.                                                                                                                                                                                                                 |
| created_by_user_sub         | string                                                                                                | read-only  | The subject id as provided by the authorization mechanism for the person or process authenticated when creating the object.                                                                                                                                                                        |
| uuid                        | string                                                                                                | read-only  | The HuBMAP unique identifier, intended for internal software use only. This is a 32 digit hexadecimal uuid e.g. 461bbfdc353a2673e381f632510b0f17                                                                                                                                                   |
| hubmap_id                   | string                                                                                                | read-only  | A HuBMAP Consortium wide unique identifier randomly generated in the format HBM###.ABCD.### for every entity.                                                                                                                                                                                      |
| last_modified_timestamp     | integer                                                                                               | read-only  | The timestamp of when the object was last modified. The format is an integer representing milliseconds since midnight, Jan 1, 1970                                                                                                                                                                 |
| creators                    | array of [`Person Schema`](./schema-person.html)                                                      |            | A list of the people who created the entity with full name, email, ORCID iD, institution, etc.. This is analogous to the author list on a publication.                                                                                                                                             |
| contacts                    | array of [`Person Schema`](./schema-person.html)                                                      |            | A list of the people who are the main contacts to get information about the entity.                                                                                                                                                                                                                |
| entity_type                 | string                                                                                                | read-only  | One of the normalized entity types: Dataset, Collection, Sample, Donor                                                                                                                                                                                                                             |
| registered_doi              | string                                                                                                |            | The doi of a the registered entity. e.g. 10.35079/hbm289.pcbm.487. This is set during the publication process and currently available for certain Collections and Datasets.                                                                                                                        |
| doi_url                     | string                                                                                                | read-only  | The url from the doi registry for this entity. e.g. https://doi.org/10.35079/hbm289.pcbm.487                                                                                                                                                                                                       |
| protocol_url                | string                                                                                                |            | The protocols.io doi url pointing the protocol under wich the sample was obtained and/or prepared.                                                                                                                                                                                                 |
| group_uuid                  | string                                                                                                |            | The uuid of globus group which the user who created this entity is a member of. This is required on Create/POST if the user creating the Donor is a member of more than one write group. This property cannot be set via PUT (only on Create/POST).                                                |
| group_name                  | string                                                                                                | read-only  | The displayname of globus group which the user who created this entity is a member of                                                                                                                                                                                                              |
| submission_id               | string                                                                                                |            | The hubmap internal id with embedded semantic information e.g.: VAN0003-LK-1-10. This id is generated at creation time which tracks the lab, donor, organ and sample hierarchy per the following: https://docs.google.com/document/d/1DjHgmqWF1VA5-3mfzLFNfabbzmc8KLSG9xWx1DDLlzo/edit?usp=sharing |
| visit                       | string                                                                                                |            | The visit id for the donor/patient when the sample was obtained.                                                                                                                                                                                                                                   |
| data_access_level           | string from [`data_access_level` attribute values](#data_access_level-attribute-values)               | read-only  | One of the values: public, consortium                                                                                                                                                                                                                                                              |
| sample_category             | string from [`sample_category` attribute values](#sample_category-attribute-values)                   |            | A code representing the category of the specimen. Must be one of organ, block, section , suspension. This is a required field. If set to organ, the organ property must be provided as well.                                                                                                       |
| specimen_type               | string from [`specimen_type` deprecated attribute values](#specimen_type-deprecated-attribute-values) |            | DEPRECATED: No longer a required field. A code representing the type of specimen. Must be one of the codes specified in: [tissue sample types](https://raw.githubusercontent.com/hubmapconsortium/search-api/main/src/search-schema/data/definitions/enums/tissue_sample_types.yaml)               |
| organ                       | string from [`organ` attribute values](#organ-attribute-values)                                       |            | Organ code specifier, only set if sample_category == organ. Valid values found in: [organ types](https://raw.githubusercontent.com/hubmapconsortium/search-api/main/src/search-schema/data/definitions/enums/organ_types.yaml)                                                                     |
| metadata                    | array of [`Sample Metadata Schema`](#sample-metadata-schema)                                          |            | The sample specific metadata derived from the uploaded sample_metadata.tsv file. Returned as a json object.                                                                                                                                                                                        |
| rui_location                | string containing JSON dictionary                                                                     |            | The sample location and orientation in the ancestor organ as specified in the RUI tool. Returned as a json object.                                                                                                                                                                                 |

### Sample Metadata Schema
attributes as listed at [entity-api Sample schema drop-down, metadata drop-down, DonorMetadata drop-down](https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3):
The sample specific metadata derived from the uploaded sample_metadata.tsv file. Returned as a json object.

| Attribute                         | Type                                                                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|-----------------------------------|------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| sample_id                         | string                                                                                   | The HuBMAP Identifier for the sample.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| procedure_date                    | string                                                                                   | The date at which the organ from which the tissue sample came from was procurred, in the format YYYY-MM-DD                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| pathologist_report                | string                                                                                   | Further details on organ level QC checks.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| warm_ischemia_time_value          | integer                                                                                  | Time interval between cessation of blood flow and cooling to 4C. Blank if not applicable.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| warm_ischemia_time_unit           | string                                                                                   | Time units that the warm_ischemia_time_value is reported in. Blank if not applicable                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| cold_ischemia_time_value          | integer                                                                                  | Time interval on ice to the start of preservation protocol. Blank if not applicable.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| cold_ischemia_time_unit           | string                                                                                   | Time units that the cold_ischemia_time_value is reported in. Blank if not applicable.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| specimen_preservation_temperature | string                                                                                   | The temperature of the medium during the preservation process. Reported as preservation method, temperature and units, e.g. Freezer (-80 Celsius)                                                                                                                                                                                                                                                                                                                                                                                          |
| specimen_quality_criteria         | string                                                                                   | RIN score. e.g. RIN: 8.7                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| specimen_tumor_distance_value     | string                                                                                   | If surgical sample from a tumor biopsy, how far from the tumor was the sample obtained from. Typically a number of centimeters. Blank if not applicable or unknown.                                                                                                                                                                                                                                                                                                                                                                        |
| specimen_tumor_distance_unit      | string                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| vital_state                       | string from [`vital_state` attribute values](#vitalstate-attribute-values)               | The vital state of the donor who the tissue sample came from.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| health_status                     | string from [`health_status` attribute values](#healthstatus-attribute-values)           | Donor from which the tissue sample came from's baseline physical condition prior to immediate event leading to organ/tissue acquisition. For example, if a relatively healthy patient suffers trauma, and as a result of reparative surgery, a tissue sample is collected, the subject will be deemed 'relatively healthy'. Likewise, a relatively healthy subject may have experienced trauma leading to brain death. As a result of organ donation, a sample is collected. In this scenario, the subject is deemed 'relatively healthy'. |
| organ_condition                   | string from [`organ_condition` attribute values](#organcondition-attribute-values)       | Health status of the organ at the time of tissue sample recovery.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| perfusion_solution                | string from [`perfusion_solution` attribute values](#perfusionsolution-attribute-values) | Health status of the organ at the time of sample recovery.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

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
The specimen_type of the `Sample Schema` is deprecated and not required. Its value must be from [tissue sample types](https://raw.githubusercontent.com/hubmapconsortium/search-api/main/src/search-schema/data/definitions/enums/tissue_sample_types.yaml). Examples inlcude:
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
The organ of the `Sample Schema` is a value from the current, authoritative list of [organ types](https://raw.githubusercontent.com/hubmapconsortium/search-api/main/src/search-schema/data/definitions/enums/organ_types.yaml). Examples include:
- `AO`: Aorta
- `BL`: Bladder
- `BD`: Blood
- `BM`: Bone Marrow
- `BR`: Brain
- `LF`: Fallopian Tube (Left)
- `RF`: Fallopian Tube (Right)
- `HT`: Heart
- `LB`: Bronchus (Left)
- `LE`: Eye (Left)
- `LI`: Large Intestine
- `LK`: Kidney (Left)
- `LL`: Lung (Left)
- `LN`: Knee (Left)
- `LV`: Liver
- `LY`: Lymph Node
- `LO`: Ovary (Left)
- `RO`: Ovary (Right)
- `OT`: Other
- `PA`: Pancreas
- `PL`: Placenta
- `RB`: Bronchus (Right)
- `RE`: Eye (Right)
- `RK`: Kidney (Right)
- `RL`: Lung (Right)
- `RN`: Knee (Right)
- `SI`: Small Intestine
- `SK`: Skin
- `SP`: Spleen
- `ST`: Sternum
- `TH`: Thymus
- `TR`: Trachea
- `UR`: Ureter
- `UT`: Uterus

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

## File Schema
Attributes as listed at [entity-api Donor schema drop-down, image_files drop-down, File schema drop-down](https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3):

| Attribute   | Type   | Description                                                                                |
|-------------|--------|--------------------------------------------------------------------------------------------|
| filename    | string | The name of the file.                                                                      |
| description | string | A description of the file. The Dataset.thumbnail_file does not have this file description. |
| file_uuid   | string | The HuBMAP unique identifier for the file.                                                 |

