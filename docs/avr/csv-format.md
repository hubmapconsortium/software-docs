---
layout: page
---
# HuBMAP Antibody Validation Report CSV Structure
With each submission of AVR documents associated header/metadata information must be include for each AVR document. This information is provided as a .csv file.  It is recommended to start with the blank (header only) [template csv file](/avr/avr-template.csv), use Excel or other spreadsheet to enter the data, then export as a comma separated value (csv) file.  An example [example AVR csv file](/avr/example-avrs.csv) is also available. All columns in the csv file are required, with the definitons of the columns here:


| csv column               | description                                                                    |
|--------------------------|--------------------------------------------------------------------------------|
| protocols_io_doi         | All validation pipelines need an accompanying protocol on protocols.io. If the validation procedure is the same for all antibodies your which lab tests, then a single protocol can be used. If validation procedures differ, then different methods will need different validation protocols. |
| uniprot_accession_number | This can typically be found on the vendor’s website, but can also be found by searching <a href="https://www.uniprot.org" target="_blank">UniProt.org</a> directly. Please note that different species have different UniProt accession numbers for the same protein. If your data was acquired using human tissue, be sure you are choosing the UniProt accession for the human protein. |
| target_name              | This is the name of the protein that the antibody is targeting. Please list the UniProt protein name. This may be different than the common name for the protein. |
| rrid                     | This can usually be found on the vendor’s website, but can also be found by searching at <a href="https://scicrunch.org/resources/Antibodies/search" target="_blank">https://scicrunch.org/resources/Antibodies/search</a> or <a href="https://antibodyregistry.org" target="_blank">htps://antibodyregistry.org</a>. If there is no RRID, you can create one here: <a href="https://scicrunch.org/resources/about/resource" target="_blank">https://scicrunch.org/resources/about/resource</a>. |
| antibody_name            | This is the name of the antibody from the vendor’s website. |
| host_organism            | This is the species that was used to generate the antibody (e.g. mouse, rabbit, etc). |
| clonality                | This will be either Monoclonal or Polyclonal. |
| vendor                   | This is the company that sells the antibody. |
| catalog_number           | This is pretty self-explanatory. |
| lot_number               | This is the lot number for the antibody that was validated. |
| recombinant              | Simple Yes or No if the antibody was recombinant. |
| organ_or_tissue          | This is the tissue that was used to acquire the validation data. This should be the same tissue that was used in the downstream assay. |
| hubmap_platform          | This is the downstream assay that was used (e.g. CODEX, MIBI, etc). |
| submitter_orciid         | This is needed for whomever is submitting the validation data. This will be used to differentiate the same antibodies being tested across different groups. |
| avr_filename             | The name of the corresponding AVR document in PDF format that this row of metadata is associated with.  This name must match the file uploaded in the Antibody PDF section of the AVR upload screen during submission. An example AVR document can be found <a href="/avr/example-avr.pdf" target="_blank">here</a>. |