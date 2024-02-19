---
layout: page
---
# Sample Bulk Registration

To bulk register tissue samples log into the [Data Ingest Portal](https://ingest.hubmapconsortium.org) and use the "Samples" menu pick below the "Bulk" menu.

On the sample bulk registration page you'll be asked to upload a .tsv file containing one row for each tissue sample that will be registered.  An [example samples.tsv](https://raw.githubusercontent.com/hubmapconsortium/ingest-ui/master/src/src/assets/Documents/example-sample-registrations.tsv) file is provided as a template. This .tsv file contains 7 columns (fields) that contain required information for each tissue to be registered.  A description of these fields is below.  Once the .tsv file has been successfully uploaded and submitted the system will register the samples and provide the new HuBMAP IDs.

Tissue samples of type organ, block, section or suspension can be registered.

### Sample Bulk Registration TSV Fields

| Field/Column | Description |
| --- | --- |
| source_id | REQUIRED: The HuBMAP ID (e.g. HBM123.ABCD.4567) of the source for this tissue sample.  For samples that represent a whole organ, this source must be a donor, for any other sample type the source must be another sample (i.e., the sample that the newly registered sample was taken from). |
| lab_ id | REQUIRED: An id used internally by the lab for the sample. |
| sample_category | REQUIRED: The top level type of sample that is being registered. Valid values are `organ`, `block`, `section` or `suspension`. If `organ` is specified then the organ_type field must be provided. |
| organ_type | This field is required only if the sample_category is specified as `organ`.  This is the HuBMAP defined code for the organ that this registration represents (example, `BR` for Brain or `LK` for Left Kidney) from the [organ_types.yaml file](https://github.com/hubmapconsortium/search-api/blob/main/src/search-schema/data/definitions/enums/organ_types.yaml). |
| sample_protocol | REQUIRED: A DOI URL from the [protocols.io site](https://protocols.io) of a protocol describing the procedures used when creating/preparing the sample. |
| description | A description of the sample for purposes of generally describing the sample and finding for use to find it via keyword search in the Data Ingest Portal. |
| rui_location | This field is requred for all block level registrations.  This is the JSON output from the [location Registrion User Interface Tool (RUI)](https://hubmapconsortium.github.io/ccf-ui/rui/), spatially locating the block inside the organ of origin.  See the [RUI Demo](https://www.youtube.com/watch?v=142hGer4xvU) for instruction on how to register a location and obtain the JSON representation. |


### Sample Metadata Submission
After samples have been registered sample metadata must be provided to the HuBMAP data curators.  Please contact help@hubmapconsortium.org to initiate this process.  See a description on the sample metadata, submitted as .tsv files on the  [Sample Metadata TSV Page](https://hubmapconsortium.github.io/ingest-validation-tools/sample/).
