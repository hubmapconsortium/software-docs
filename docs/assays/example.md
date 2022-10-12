# Consumer-focused section
1. Date (published): **May 2, 2022
2. Version (of this document): **v2.0
3. Authors: **Diane Saunders, Heath Patterson, Liz McDonough, HuBMAP MxFBE assay team
4. What is being measured?
	a. Tags*: **Proteins; single-cell resolution; imaging**
	b. Descriptive (optional): **This spatial single-cell assay measures proteins. It is an Imaging-based spatial proteomics method. It provides quantitative and spatial analysis of over 40 protein markers across a whole tissue section at single-cell resolution.**
5. What analytical activities will the assay be used for within HuBMAP?
	a. Tags*: **Map-Creation-for-Organs; Data Integration**
	b. Descriptive (optional): [...]
6. What type of human samples are needed or used?
	a. Tags*: **Fresh fozen, FFPE**
	b. Link to [sample metadata standards](https://github.com/hubmapconsortium/ingest-validation-tools/tree/main/docs)
	c. Descriptive (optional): [...]
7. Commercial Product: [https://www.akoyabio.com/phenocycler/assays/](https://www.akoyabio.com/phenocycler/assays/)** 
\*Include tags that can be normalized across assays, allowing for assay filtering. When possible, use structured terminology (ontologies).

## Assay Description
Primary Reference [PMCIDs]( https://pubmed.ncbi.nlm.nih.gov/) **PMC8647621**

### Technology Overview
* [ ] **CODEX is a strategy for generating highly multiplexed images using traditional fluorescent imaging. In brief, antibodies to antigens of interest are labeled with unique oligonucleotide barcodes. The barcoded antibodies are then applied to a tissue sample where they bind to target antigens. Using a microfluidics robot integrated with a fluorescent microscope, complementary oligonucleotide probes tagged with fluorophores are introduced to the tissue sample in groups of three antigen-specific probes at a time, allowing hybridization to the barcodes on the target antibodies. Tissue images are captured in each fluorescent channel, the fluorophore-tagged probes are gently removed, and then the process is repeated until all antigens have been visualized. DAPI is imaged during each cycle, enabling generation of a composite image with up to 50 protein targets co-registered on a single tissue section.**

### Key Definitions
* [ ] **Important terms used to describe CODEX data acquisition are defined and illustrated in the figures below.

![CODEX-Fig1.png](CODEX-Fig1.png)
##### Figure 1: Schematics illustrating CODEX-related terminology.

* [ ] **(A) The selected imaging region is automatically divided into tiles (individual fields of view). 
* [ ] **(B) Images are acquired with adjacent tiles overlapping (e.g., 30%), as indicated by shaded regions, to enhance image alignment. Images are captured as the stage moves across the region row by row or via a serpentine path. 
* [ ] **(C) Stitching is the process of aligning and merging tiles into a single composite image. 
* [ ] **(D) Multiple z planes (depths) are acquired at each (x,y) tile position. 
* [ ] **(E) Segmentation algorithms, utilized during image processing, are used to visualize predicted cell boundaries based on nuclear and/or other cell morphology markers.**

Term | Definition
---- | ----------
Alignment or registration | Process of transforming different images into one coordinate system (registration of all channels in each cycle is performed)
Autofluorescence | Endogenous fluorescence signal from tissue
Background subtraction | Subtraction of autofluorescence intensity from total intensity
Channels | Refers to the fluorescence excitation wavelengths used (e.g., 488, 540, 750); may also be by corresponding fluorophore names (e.g., DAPI, GFP, dsRED, Cy5)
CODEX |CO-Detection by inDEXing
Cycle | The process of adding three oligonucleotide-conjugated fluorophores to a tissue section in order to image the complementary-conjugated antibodies, then gently removing the fluorophores so a new set of antibodies can be visualized
Deconvolution | Process of reversing the optical distortion that takes place in an optical microscope to “sharpen” images and improve definition
Fluorescence  | Light produced by a fluorophore that is bound to an oligonucleotide tag
Noise | Intensity not produced by light but electronic fluctuations or electronic background
Pitch | Distance between z-slices (images in z-stack)
Pixel | The smallest adjustable point of a rasterized image (resolution refers to the number of pixels in an image)
Region | User-defined imaging area
Signal | Intensity (detector counts) produced by fluorescence, both endogenous and introduced
Stitching | Process of combining multiple, overlapping fields of view (tiles) to generate a single, composite image of the tissue region
Tile | Rectangular field of view acquired at imaging magnification
X plane | Plane that determines width
Y plane | Plane that determines height
Z plane | Plane that determines depth
Z-stack | A series of images produced at different stage heights or positions along the z-axis

**Antibodies**
* [ ] As relevant, include any details about antibody usage that are assay-specific.\*
	Please see the HuBMAP [standard report for antibody validation](https://avr.hubmapconsortium.org/).

# Provider-focused section

## Directories and Files

### Directory structure
* [ ] Structure the information as a table, exemplified below.
* [ ] When possible, an agreed-upon single assay-specific directory structure should be used rather than allowing for variable directory names with regular expressions (more conducive to downstream Data Consumer use).
* [ ] The directory structure should not include files. File definitions should happen in the “Files included” section where files can be more appropriately documented.

Directory Name | Level | Required? | Description
---------------|-------|-----------|------------
raw/src|1|yes|This is the raw, unmodified files coming from the instrument (e.g., Akoya system). [*Populated by the data provider.*]
lab/drv| |yes|Processed files produced by the lab that generated the data. [*Populated by data providers.*]
lab/processed|2|yes|Image data that has been stitched and aligned and *optionally* has undergone background subtraction and deconvolution.
lab/segmented|3|no|Computationally predicted boundaries of cellular (nucleus, cytoplasm) and/or anatomical structures.
hive| |yes|Processed files produced by HIVE using the common pipeline. [*Populated by the HIVE.*]
hive/processed|2|yes|Image data that has been stitched and aligned and has undergone background subtraction and deconvolution.
hive/segmented|3|yes|Computationally predicted boundaries of cellular (nucleus, cytoplasm) and/or anatomical structures.

### Files Included
* [ ] Structure the information as a table, exemplified below.
* [ ] Files included (outside of the “lab” directory) should be agreed upon by the Assay Team and HIVE.
* [ ] *When possible, “file types” should include a link to an external definition, as exemplified below.
* [ ] When relevant, include a link to the program or pipeline used to generate each file. The program or pipeline used should be detailed in the “pipeline or data processing” metadata section below.
* [ ]  If the program/pipeline will perform any QA/QC filtering of the data when generating the file, note this in the file description with additional details provided in the “Data processing pipeline” section below.
* [ ] Avoid regular expressions in file names unless absolutely necessary (e.g., to denote a batch of files as in a set of fastq files).
* [ ] Files containing the metadata should also be included when relevant, for example, the TSV with assay-level metadata, the antibodies TSV, a file with the pipeline parameters, etc.

File | File type | Directory | Input file or precursor data | Generator program or pipeline with URL | Description
-----|-----------|-----------|------------------------------|----------------------------------------|------------
\*.czi or \*.scn | CZI or SCN | raw | n\/a | [Akoya link?] | Image data that is acquired directly from the microscope\; sometimes referred to as tiled or unstitched data.|
\*.tiff | TIFF | raw | n\/a | [Akoya link?] | Image data that is acquired directly from the microscope; sometimes referred to as tiled or unstitched data. |
\.OME.tiff | OME-TIF | lab \/ processed | n\/a |  | Images are a multi-page TIFF file comprised of all processed layers and metadata. |
HandE.tif or vHE.tif | TIFF | raw | n\/a | [Pathology Microscope] | H&E image or digital H&E image (if done). |
antibodies .tsv | TSV | lab | n\/a | manual | Tab delimited file listing the set of all antibodies used. |
lab-processing .tsv | TSV | lab | n\/a | manual | Comprehensive table containing the details of the lab-processing pipeline including all relevant parameters (if done). |
dataset.json | JSON | lab | experiment .json (if generated) | manual | HuBMAP internal metadata standards that describe microscopy acquisition details for imaging spatial proteomics methods. |

## Metadata
### Sample-level
* [ ] Any assay-specific considerations for the [sample-level metadata](https://docs.google.com/spreadsheets/d/1yqgPaVsUNpEavZOgl0bZsiTBABuVXJtq/edit#gid=233528636) should be detailed here. This is a required documentation element. To avoid any confusion, you should explicitly state if there are no assay-specific considerations. Example fields that may warrant assay-level definitions are included below.
    
**Sample field name** | **Sample type** <br> [block; section; suspension] | **Definition**
-------------------- | ------------ | ---------------------------------
Processing time | |
Source storage time | |

### Assay-level
* [ ] This is the assay-specific metadata that’s included in the assay metadata TSV files.
* [ ] Please include full descriptions.
* [ ] Structure the information as a table, exemplified below.
* [ ] *THE FOLLOWING TABLE IS AN EXAMPLE — EDIT AS APPROPRIATE.

Field | Required? | Data type | Description
----- | ----------- | ----------- | --------
 | | | 
 | | | 

#### Assay-level categorical field values
 * [ ]  Categorical field options should be listed in the following table. 
	 *As the list will change over time, please coordinate the categorical lists with the HIVE.

**Field [from above]** | **Values [semicolon separated]**
--------------------- | ----------------------------------
  | 
  | 

### Antibody
 * [ ]  Link to the [Antibody TSV file](https://hubmapconsortium.github.io/ingest-validation-tools/antibodies/).

### HIVE data processing pipeline
* [ ] This section is to be completed by the HIVE.
* [ ] All pipeline processing steps should be detailed in the table below, including all parameter values used, as exemplified below.
* [ ] A figure should be included, as relevant, to better elucidate the pipeline levels, with each level being fully described in the table.
* [ ] Yes/No — The pipeline will produce the processed files from raw without human intervention. If “No”, then the required steps (human interventions) need to be detailed here.
* [ ] This processing should detail any expected pre-processing of input file(s)?
* [ ] The description should include what the processing step achieves.
* [ ] Any manual interventions should be documented with links to publications, as relevant.

Level | Program | Version | Input File | Description 
------|---------|---------|------------|------------
1|CIM software|1.2|Level 0 (.czi)|- What pre-processing of input file is expected? <br> - What does this processing step achieve? <br> - Are there any manual interventions before output is finalized? *If yes, provide link to publication that has an explanation.*

### Lab data processing pipeline
* [ ] The same details as provided in the above section (“HIVE data processing pipeline”) should be detailed for each lab that uploads data that is processed independently from the HIVE.
* [ ] Do not include the lab-processing details here; but rather include this lab-specific processing table of information with your data upload.
* [ ] In the Files section, describe any files that include the details of the lab-processing pipeline.
