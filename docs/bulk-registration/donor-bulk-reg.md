---
layout: page
---
# Donor Bulk Registration

To bulk register donors log into the [Data Ingest Portal](https://ingest.hubmapconsortium.org) and use the "Donors" menu pick under the "Bulk" menu.

On the donor bulk registration you'll be asked to upload a .tsv file containing one row for each donor that is to be registered.  An [example donor.tsv](https://raw.githubusercontent.com/hubmapconsortium/ingest-ui/master/src/src/assets/Documents/example-donor-registrations.tsv) file is provided as a template. This .tsv file contains 4 columns (fields) that contain required information for each donor to be registered.  A description of these fields is below.  Once the .tsv file has been successfully uploaded and submitted the system will register the donors and provide the new HuBMAP IDs for these donors.

### Donor Registration Fields
| Field/Column | Description |
|---------------------|------------------|
| lab_id | REQUIRED: An id used internally by the lab for the donor.  DO NOT INCLUDE ANY PHI in this id.|
| lab_name | REQUIRED: A name used internally by the lab for this donor.  This field can be used to search for the donor in the Data Ingest Portal.  DO NOT INCLUDE ANY PHI in this name. |
| selection_protocol | REQUIRED: A DOI URL from the [protocols.io site](https://protocols.io) of a protocol describing the selection protocol used to select the donor. |
| description | A description of the donor for purposes of describing the donor and finding the donor by searching in the Data Ingest Portal.  DO NOT INCLUDE ANY PHI in this description. |


### Donor metadata submission
After donors have been registered documents need to be provided to the HIVE so additional information, i.e. "Donor Metadata" can be extracted.  See a description on the [Donor MetadataPage](https://software.docs.hubmapconsortium.org/donor.html)