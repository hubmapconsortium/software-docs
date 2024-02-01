---
layout: page
---

# HuBMAP Dataset schema

### Last Updated: 2023-04-17

## Overview:
This page describes the Dataset schema for HuBMAP data. Dataset data may be returned itself or a part of another entity.  For example, this endpoint searches Datasets for a specified group and data type:
```
GET https://search.api.hubmapconsortium.org/param-search/datasets?data_types=LC-MS_top_down&contacts.affiliation=Northwestern University
```

And the following search for the Sample of which is the Dataset is a descendant:
```
GET https://search.api.hubmapconsortium.org/param-search/samples?group_name=Stanford TMC&descendants.uuid=277152f17b5a2f308820ab4d85c5a426
```

## Description: 
A query string is built by combining schema elements documented below with matching values.  Each "term" of the query is combined using the & character, and the entire query is attached to the base URL after a ? character, per web standards.

Query terms may be composited from attributes deeper in the schema type of an attribute.  For example, the Dataset Schema attribute ```contacts``` is has a type of Person Schema, and Person Schema has an attribute ```affiliation```. Querying Datasets supports a term to search for contact's affiliation such as ```contacts.affiliation=Northwestern University```. 

Multiple schema types may be listed for an attribute, but the same principle to build a query term applies.  For example, the Dataset Schema attribute ```metadata``` may contain many kinds of assay types, each with its own schema.  Looking at the [LC-MS Schema](https://hubmapconsortium.github.io/ingest-validation-tools/lcms), we see it contains a Metadata Schema, and we can search using the attributes it contains by prefixing the term with ```metadata.metadata```.  Searching for an assay catagory of mass spectrometry would lead to the term ```metadata.metadata.assay_category=mass_spectrometry```, and a query like:
```
GET https://search.api.hubmapconsortium.org/param-search/datasets?metadata.metadata.assay_category=mass_spectrometry
```

## Limitations:
- This document lists resources pulled from configuration files.  The content of those files, at the provided links, may be newer.

## Dataset Schema 
attributes as listed at [entity-api Dataset schema drop-down](https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3):

| Attribute                        | Type                                                                                    | Constraint      | Description                                                                                                                                                                                                                                          |
|----------------------------------|-----------------------------------------------------------------------------------------|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| description                      | string                                                                                  |                 | Free text description of the dataset                                                                                                                                                                                                                 |
| created_timestamp                | integer                                                                                 | read-only       | The timestamp of when the node was created. The format is an integer representing milliseconds since midnight Jan 1, 1970                                                                                                                            |
| created_by_user_displayname      | string                                                                                  | read-only       | The name of the person or process authenticated when creating the object                                                                                                                                                                             |
| created_by_user_email            | string                                                                                  | read-only       | The email address of the person or process authenticated when creating the object.                                                                                                                                                                   |
| created_by_user_sub              | string                                                                                  | read-only       | The subject id as provided by the authorization mechanism for the person or process authenticated when creating the object.                                                                                                                          |
| uuid                             | string                                                                                  | read-only       | The HuBMAP unique identifier, intended for internal software use only. This is a 32 digit hexadecimal uuid e.g. 461bbfdc353a2673e381f632510b0f17                                                                                                     |
| hubmap_id                        | string                                                                                  | read-only       | A HuBMAP Consortium wide unique identifier randomly generated in the format HBM###.ABCD.### for every entity.                                                                                                                                        |
| error_message                    | string                                                                                  | readOnly: false | An open text field that holds the last error message that arose from pipeline validation or analysis.                                                                                                                                                |
| last_modified_timestamp          | integer                                                                                 | read-only       | The timestamp of when the object was last modified. The format is an integer representing milliseconds since midnight, Jan 1, 1970                                                                                                                   |
| creators                         | array of [`Person Schema`](./schema-person.html)                                        |                 | A list of the people who created the entity with full name, email, ORCID iD, institution, etc.. This is analogus to the author list on a publication.                                                                                                |
| contacts                         | array of [`Person Schema`](./schema-person.html)                                        |                 | A list of the people who are the main contacts to get information about the entity.                                                                                                                                                                  |
| entity_type                      | string                                                                                  | read-only       | One of the normalized entity types: Dataset, Collection, Sample, Donor                                                                                                                                                                               |
| registered_doi                   | string                                                                                  |                 | The doi of a the registered entity. e.g. 10.35079/hbm289.pcbm.487. This is set during the publication process and currently available for certain Collections and Datasets.                                                                          |
| doi_url                          | string                                                                                  | read-only       | The url from the doi registry for this entity. e.g. https://doi.org/10.35079/hbm289.pcbm.487                                                                                                                                                         |
| contains_human_genetic_sequences | boolean                                                                                 |                 | True if the data contains any human genetic sequence information. Can only be set at CREATE/POST time                                                                                                                                                |
| title                            | string                                                                                  |                 | The dataset title.                                                                                                                                                                                                                                   |
| published_timestamp              | integer                                                                                 | read-only       | The timestamp of when the dataset was published. The format is an integer representing milliseconds since midnight, Jan 1, 1970.                                                                                                                     |
| published_user_displayname       | string                                                                                  | read-only       | The name of the authenticated user or process that published the data.                                                                                                                                                                               |
| published_user_sub               | string                                                                                  | read-only       | The subject id for the user who published the data as provided by the authorization mechanism for the person or process authenticated when the dataset was publised.                                                                                 |
| published_user_email             | string                                                                                  | read-only       | The email address of the user who published the provided by the authorization mechanism for the person or process authenticated when published.                                                                                                      |
| local_directory_rel_path         | string                                                                                  | read-only       | The path on the local HIVE file system, relative to the base data directory, where the data is stored.                                                                                                                                               |
| group_uuid                       | string                                                                                  |                 | The uuid of globus group which the user who created this entity is a member of. This is required on Create/POST if the user creating the Donor is a member of more than one write group. This property cannot be set via PUT (only on Create/POST).  |
| group_name                       | string                                                                                  | read-only       | The displayname of globus group which the user who created this entity is a member of                                                                                                                                                                |
| previous_revision_uuid           | string                                                                                  |                 | The uuid of previous revision dataset. Can only be set at Create/POST time.                                                                                                                                                                          |
| next_revision_uuid               | string                                                                                  | read-only       | The uuid of next revision dataset                                                                                                                                                                                                                    |
| sub_status                       | string                                                                                  |                 | A sub-status provided to further define the status. The only current allowable value is "Retracted"                                                                                                                                                  |
| retraction_reason                | string                                                                                  |                 | Information recorded about why a the dataset was retracted.                                                                                                                                                                                          |
| dbgap_sra_experiment_url         | string                                                                                  |                 | A URL linking the dataset to the associated uploaded data at dbGaP.                                                                                                                                                                                  |
| dbgap_study_url                  | string                                                                                  |                 | A URL linking the dataset to the particular study on dbGap it belongs to                                                                                                                                                                             |
| data_access_level                | string from [`data_access_level` attribute values](#data_access_level-attribute-values) | read-only       | One of the values: public, consortium.                                                                                                                                                                                                               |
| status                           | string string from [`status` attribute values](#status-attribute-values)                |                 | One of: NewProcessing, QA Published Error Hold Invalid                                                                                                                                                                                               |
| contributors                     | array of [`Person Schema`](./schema-person.html)                                        | read-only       | A list of people who contributed to the creation of this dataset. Returned as an array of contributors, with each element a Person schema instance.                                                                                                  | 
| data_types                       | string from [`data_types` attribute values](#data_types-attribute-values)               |                 | The data or assay types contained in this dataset as a json array of strings. Each is an assay code from [assay types](https://raw.githubusercontent.com/hubmapconsortium/search-api/main/src/search-schema/data/definitions/enums/assay_types.yaml) |
| antibodies                       | array of [`Antibody Schema`](./schema-antibody.html)                                    |                 | A list of antibodies used in the assay that created the dataset                                                                                                                                                                                      |
| metadata                         | JSON-encoded string for a supported [assay type schema](#assay-type-schemas)            |                 | The metadata returned from the ingest pipeline processing at data submission time. Provided as json.                                                                                                                                                 |
| thumbnail_file                   | string                                                                                  |                 | The dataset thumbnail file detail. Stored in db as a stringfied json, e.g., {"filename": "thumbnail.jpg", "file_uuid": "c35002f9c3d49f8b77e1e2cd4a01803d"}                                                                                           |
| lab_dataset_id                   | string                                                                                  |                 | A name or identifier used by the lab who is uploading the data to cross reference the data locally                                                                                                                                                   |
| files                            | array of [`File Schema`](./schema-file.html)                                            |                 | An array of information about the files contained in the dataset.                                                                                                                                                                                    |


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
- `AF`: Autofluorescence Microscopy
- `AF_pyramid`: Autofluorescence Microscopy [Image Pyramid]
- `ATACseq-bulk`: Bulk ATAC-seq
- `bulk_atacseq`: Bulk ATAC-seq [BWA + MACS2]
- `cell-dive`: Cell DIVE
- `celldive_deepcell`: CellDIVE [DeepCell + SPRM]
- `CODEX`: CODEX
- `CODEX2`: CODEX (CODEX2 assay type)
- `codex_cytokit_v1`: CODEX [Cytokit + SPRM]
- `codex_cytokit`: CODEX [Cytokit + SPRM]
- `DART-FISH`: DART-FISH
- `DESI`: DESI
- `DESI_pyramid`: DESI [Image Pyramid]
- `image_pyramid`: Image Pyramid
- `IMC2D`: Imaging Mass Cytometry (2D)
- `IMC3D`: Imaging Mass Cytometry (3D)
- `IMC2D_pyramid`: Imaging Mass Cytometry (2D) [Image Pyramid]
- `IMC3D_pyramid`: Imaging Mass Cytometry (3D) [Image Pyramid]
- `lc-ms_label-free`: Label-free LC-MS
- `lc-ms_labeled`: Labeled LC-MS
- `lc-ms-ms_label-free`: Label-free LC-MS/MS
- `lc-ms-ms_labeled`: Labeled LC-MS/MS
- `LC-MS-untargeted`: Untargeted LC-MS
- `Lightsheet`: Lightsheet Microscopy
- `MALDI-IMS`: MALDI IMS
- `MALDI-IMS_pyramid`: MALDI IMS [Image Pyramid]
- `MIBI`: Multiplex Ion Beam Imaging
- `mibi_deepcell`: Multiplex Ion Beam Imaging [DeepCell + SPRM]
- `NanoDESI`: NanoDESI
- `NanoDESI_pyramid`: NanoDESI [Image Pyramid]
- `NanoPOTS`: NanoPOTS
- `NanoPOTS_pyramid`: NanoPOTS [Image Pyramid]
- `MxIF`: Multiplexed IF Microscopy
- `MxIF_pyramid`: Multiplexed IF Microscopy [Image Pyramid]
- `PAS`: PAS Stained Microscopy
- `PAS_pyramid`: PAS Stained Microscopy [Image Pyramid]
- `publication`: Publication Data
- `bulk-RNA`: Bulk RNA-seq
- `salmon_rnaseq_bulk`: Bulk RNA-seq [Salmon]
- `SNARE-ATACseq2`: snATACseq (SNARE-seq2)
- `SNARE-RNAseq2`: snRNAseq (SNARE-seq2)
- `sc_atac_seq_snare_lab`: snATAC-seq (SNARE-seq2) [Lab Processed]
- `sc_rna_seq_snare_lab`: snRNA-seq (SNARE-seq2) [Lab Processed]
- `salmon_rnaseq_snareseq`: snRNA-seq (SNARE-seq2) [Salmon]
- `sc_atac_seq_snare`: snATAC-seq (SNARE-seq2) [SnapATAC]
- `scRNAseq-10xGenomics-v2`: scRNA-seq (10x Genomics v2)
- `scRNAseq-10xGenomics-v3`: scRNA-seq (10x Genomics v3)
- `salmon_rnaseq_10x`: scRNA-seq (10x Genomics) [Salmon]
- `sciATACseq`: sciATAC-seq
- `sc_atac_seq_sci`: sciATAC-seq [SnapATAC]
- `sciRNAseq`: sciRNA-seq
- `salmon_rnaseq_sciseq`: sciRNA-seq [Salmon]
- `seqFish`: seqFISH
- `seqFish_pyramid`: seqFISH [Image Pyramid]
- `seqFish_lab_processed`: seqFISH [Lab Processed]
- `SIMS-IMS`: SIMS-IMS
- `snATACseq`: snATAC-seq
- `sn_atac_seq`: snATAC-seq [SnapATAC]
- `snRNAseq-10xGenomics-v2`: snRNA-seq (10x Genomics v2)
- `snRNAseq-10xGenomics-v3`: snRNA-seq (10x Genomics v3)
- `salmon_sn_rnaseq_10x`: snRNA-seq [Salmon]
- `Slide-seq`: Slide-seq
- `salmon_rnaseq_slideseq`: Slide-seq [Salmon]
- `Targeted-Shotgun-LC-MS`: Targeted Shotgun / Flow-injection LC-MS
- `TMT-LC-MS`: TMT LC-MS
- `WGS`: Whole Genome Sequencing
- `LC-MS`: LC-MS
- `MS`: MS
- `LC-MS_bottom_up`: LC-MS Bottom Up
- `MS_bottom_up`: MS Bottom Up
- `LC-MS_top_down`: LC-MS Top Down
- `MS_top_down`: MS Top Down

# Assay type schemas
### Imaging mass spectrometry
- [3D Imaging Mass Cytometry](https://hubmapconsortium.github.io/ingest-validation-tools/imc3d)
- [Imaging Mass Cytometry](https://hubmapconsortium.github.io/ingest-validation-tools/imc)
- [MALDI-IMS / SIMS-IMS / NanoDESI / DESI](https://hubmapconsortium.github.io/ingest-validation-tools/ims)
- [MIBI](https://hubmapconsortium.github.io/ingest-validation-tools/mibi)

### Other TSVs
- [antibodies](https://hubmapconsortium.github.io/ingest-validation-tools/antibodies)
- [contributors](https://hubmapconsortium.github.io/ingest-validation-tools/contributors)
- [sample](https://hubmapconsortium.github.io/ingest-validation-tools/sample)
- [sample-block](https://hubmapconsortium.github.io/ingest-validation-tools/sample-block)
- [sample-section](https://hubmapconsortium.github.io/ingest-validation-tools/sample-section)
- [sample-suspension](https://hubmapconsortium.github.io/ingest-validation-tools/sample-suspension)

### Sequence assays
- [SNARE-seq2 / sciATACseq / snATACseq](https://hubmapconsortium.github.io/ingest-validation-tools/scatacseq)
- [Slide-seq](https://hubmapconsortium.github.io/ingest-validation-tools/slideseq)
- [WGS](https://hubmapconsortium.github.io/ingest-validation-tools/wgs)
- [bulk RNA](https://hubmapconsortium.github.io/ingest-validation-tools/bulkrnaseq)
- [bulkATACseq](https://hubmapconsortium.github.io/ingest-validation-tools/bulkatacseq)
- [scRNAseq-10xGenomics-v2 / scRNAseq-10xGenomics-v3 / snRNAseq-10xGenomics-v2 / snRNAseq-10xGenomics-v3 / scRNAseq / sciRNAseq / snRNAseq / SNARE2-RNAseq](https://hubmapconsortium.github.io/ingest-validation-tools/scrnaseq)

### Mass spectrometry
- [CE-MS](https://hubmapconsortium.github.io/ingest-validation-tools/cems)
- [GC-MS](https://hubmapconsortium.github.io/ingest-validation-tools/gcms)
- [LC-MS / MS / LC-MS Bottom-Up / MS Bottom-Up / LC-MS Top-Down / MS Top-Down](https://hubmapconsortium.github.io/ingest-validation-tools/lcms)

### Clinical imaging modalities
- [Body CT](https://hubmapconsortium.github.io/ingest-validation-tools/bodyct)
- [MRI](https://hubmapconsortium.github.io/ingest-validation-tools/mri)
- [Micro CT](https://hubmapconsortium.github.io/ingest-validation-tools/microct)
- [OCT](https://hubmapconsortium.github.io/ingest-validation-tools/oct)
- [Ultrasound](https://hubmapconsortium.github.io/ingest-validation-tools/ultrasound)

### Imaging assays
- [AF](https://hubmapconsortium.github.io/ingest-validation-tools/af)
- [CODEX / CODEX2](https://hubmapconsortium.github.io/ingest-validation-tools/codex)
- [Cell DIVE / cell-dive](https://hubmapconsortium.github.io/ingest-validation-tools/celldive)
- [Light Sheet](https://hubmapconsortium.github.io/ingest-validation-tools/lightsheet)
- [MxIF](https://hubmapconsortium.github.io/ingest-validation-tools/mxif)
- [PAS microscopy](https://hubmapconsortium.github.io/ingest-validation-tools/stained)
- [seqFISH](https://hubmapconsortium.github.io/ingest-validation-tools/seqfish)
