---
layout: page
---
# HuBMAP File Info Elasticsearch document

### Last Updated: 2022-12-01

## Overview:
This page describes File Info documents stored in Elasticsearch indices for Files associated with Datasets.

## Description: 
Elasticsearch indices contain [documents of a single type](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/removal-of-types.html).
Each document in the hm_files index contains information about one File entity in a Dataset.  The structure of the
documents is described below.

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
| data_types       | An array of strings with codes for the assay types of the Dataset. See [Assay Type Codes](#assay-type-codes) below.        |

### `samples` Array Elements:

| samples Element | Description                                                                                      |
|-----------------|--------------------------------------------------------------------------------------------------|
| uuid            | The uuid of a Sample entity whose specimen type is not 'organ', which is an ancestor of the file |
| code            | A code for the specimen type. See [Tissue Sample Types](#tissue-sample-types) below              |
| type            | A description for the tissue sample type of the specimen, specified as the "code"                |

### `organs` Array Elements:

| organs Element | Description                                                                                                        |
|----------------|--------------------------------------------------------------------------------------------------------------------|
| uuid           | The uuid of a Sample entity whose specimen type is 'organ', which is an ancestor of a Sample included in "samples" |
| type_code      | A code for the organ type of the Dataset. See [Organ Type Codes](#organ-type-codes) below                          |
| type           | A description for the organ type of the specimen, specified as the "type_code"                                     |

### `donors` Array Elements:

| donors Element | Description                                                                                                                                    |
|----------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| uuid           | The uuid of a Donor entity which is an ancestor of a Sample included in "organs"                                                               |
| age            | A float value created from the Donor entity metadata for the [UMLS age group CUI C0001779](https://uts.nlm.nih.gov/uts/umls/concept/C0001779)  |
| units          | The unit of measure for the age concept of the Donor entity metadata                                                                           |
| race           | A UMLS preferred term from the Donor entity metadata for the [UMLS race group CUI C0034510](https://uts.nlm.nih.gov/uts/umls/concept/C0034510) |

### Tissue Sample Types
Examples are enumerated below, but the current, authoritative list is in the [tissue_sample_types.yaml](https://raw.githubusercontent.com/hubmapconsortium/search-api/main/src/search-schema/data/definitions/enums/tissue_sample_types.yaml) file of the search-api repository.
- atacseq
- biopsy
- blood
- cell_lysate
- clarity_hydrogel
- codex
- cryosections_curls_from_fresh_frozen_oct
- cryosections_curls_rnalater
- ffpe_block
- ffpe_slide
- fixed_frozen_section_slide
- fixed_tissue_piece
- flash_frozen_liquid_nitrogen
- formalin_fixed_oct_block
- fresh_frozen_oct_block
- fresh_frozen_section_slide
- fresh_frozen_tissue
- fresh_frozen_tissue_section
- fresh_tissue
- frozen_cell_pellet_buffy_coat
- gdna
- module
- nuclei
- nuclei_rnalater
- organ
- organ_piece
- other
- pbmc
- pfa_fixed_frozen_oct_block
- plasma
- protein
- ran_poly_a_enriched
- rna_total
- rnalater_treated_and_stored
- rnaseq
- scatacseq
- scrnaseq
- segment
- seqfish
- sequence_library
- serum
- single_cell_cryopreserved
- snatacseq
- snrnaseq
- tissue_lysate
- wgs

### Organ Type Codes
Examples are enumerated below, but the current, authoritative list is in the [organ_types.yaml](https://raw.githubusercontent.com/hubmapconsortium/search-api/master/src/search-schema/data/definitions/enums/organ_types.yaml) file of the search-api repository.
- AO
- BL
- BD
- BM
- BR
- LF
- RF
- HT
- LB
- LE
- LI
- LK
- LL
- LN
- LV
- LY
- LO
- RO
- OT
- PA
- PL
- RB
- RE
- RK
- RL
- RN
- SI
- SK
- SP
- ST
- TH
- TR
- UR
- UT

### Assay Type Codes
Examples are enumerated as follows, but the current, authoritative list is in the [assay_types.yaml](https://raw.githubusercontent.com/hubmapconsortium/search-api/main/src/search-schema/data/definitions/enums/assay_types.yaml) file of the search-api repository.
- AF
- AF_pyramid
- ATACseq-bulk
- CODEX
- CODEX2
- DART-FISH
- IMC2D
- IMC2D_pyramid
- IMC3D
- IMC3D_pyramid
- LC-MS
- LC-MS-untargeted
- LC-MS_bottom_up
- LC-MS_top_down
- Lightsheet
- MALDI-IMS
- MALDI-IMS_pyramid
- MIBI
- MS
- MS_bottom_up
- MS_top_down
- MxIF
- MxIF_pyramid
- NanoDESI
- NanoDESI_pyramid
- NanoPOTS
- NanoPOTS_pyramid
- PAS
- PAS_pyramid
- SNARE-ATACseq2
- SNARE-RNAseq2
- Slide-seq
- TMT-LC-MS
- Targeted-Shotgun-LC-MS
- WGS
- bulk-RNA
- bulk_atacseq
- cell-dive
- celldive_deepcell
- codex_cytokit
- codex_cytokit_v1
- image_pyramid
- lc-ms-ms_label-free
- lc-ms-ms_labeled
- lc-ms_label-free
- lc-ms_labeled
- mibi_deepcell
- salmon_rnaseq_10x
- salmon_rnaseq_bulk
- salmon_rnaseq_sciseq
- salmon_rnaseq_slideseq
- salmon_rnaseq_snareseq
- salmon_sn_rnaseq_10x
- scRNAseq-10xGenomics-v2
- scRNAseq-10xGenomics-v3
- sc_atac_seq_sci
- sc_atac_seq_snare
- sc_atac_seq_snare_lab
- sc_rna_seq_snare_lab
- sciATACseq
- sciRNAseq
- seqFish
- seqFish_lab_processed
- seqFish_pyramid
- snATACseq
- snRNAseq-10xGenomics-v2
- snRNAseq-10xGenomics-v3
- sn_atac_seq
