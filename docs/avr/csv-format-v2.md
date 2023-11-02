---
layout: page
---
# HuBMAP Antibody Validation Reports
An Antibody Validation Report (AVR) submission will include two (2) types of files: 
1)	AVR pdfs (one for each validated antibody) and 
2)	A .csv file which catalogs all of the AVR PDF files that will be uploaded together  

## **Standard Operating Procedures (SOP)**
[Standard Operating Procedure (SOP):Constructing Antibody Validation Reports (AVRs)](https://doi.org/10.5281/zenodo.7418623) and 

## **Antibody Validation Report (AVR) Frequently Asked Questions (FAQs)**
[AVR Frequently Asked Questions (FAQ)](https://software.docs.hubmapconsortium.org/avr/avr-faq.html)


## **AVR Fillable Template**
[AVR fillable template .docx](https://software.docs.hubmapconsortium.org/avr/avr-template-form-v2.docx)

An Example of the [AVR filled template, saved as PDF file for upload:](https://software.docs.hubmapconsortium.org/avr/example-avr-v2.pdf) 

## **AVR .csv catalog file of AVR PDFs**
For the .csv file, it is recommended to start with the AVR catalog .csv template (blank header only) and use Excel or other spreadsheet  software to enter the data, then export it as a comma separated value (csv) file. The table below describes the expected format of the contents of each column. 

[AVR catalog .csv template]( https://software.docs.hubmapconsortium.org/avr/avr-template-v2.csv)

An example [filled AVR csv file](/avr/example-avrs-v2.csv) is also available. 


## Required vs Conditionally Required vs Optional fields in the .csv catalog file
Note that most of the fields are required; however, some of the columns in the csv file are conditionally required if the AVR is supporting an Organ Mapping Antibody Panel (OMAP) or completely optional depending on the assay technology for which the antibody was validated.  

## Description of expected format of the contents of each column in the .csv catalog file

| csv column               | description                                                                    | Required format| Example |
|--------------------------|--------------------------------------------------------------------------------|----------------| --------|
| uniprot_accession_number | Identifies the target protein (see <a href="https://www.uniprot.org" target="_blank">UniProt.org</a>). Please note that different species have different UniProt accession numbers for the same protein. For human proteins, be certain to include human protein designation. For multiclonal (pan-) antibodies, list UniProt accession numbers for all targeted proteins as a comma separated list. If a UniProt accession number cannot be found for the antibody, please leave the field blank.| Alphanumeric  (see https://www.uniprot.org/help/accession_numbers) | A2BC19, P12345, Q9BZS1 |
|HGNC_ID                   | Gene identification number from [Human Gene Ontology Nomenclature Committee (HGNC)](https://www.genenames.org/) encoding the target protein. If entry is for a multiclonal (pan-) antibody, list HGNC ID for all genes as a comma separated list. If a HGNC ID cannot be found for the antibody, please leave the field blank.| HGNC:#### | HGNC:4947, HGNC:3612|
|target_name               | This is the name of the protein that the antibody is targeting. Please list the UniProt protein name. This may be different from the common name for the protein. | Commonly used name or protein abbreviation | CD20, ICAM, Somatostatin |
|isotype                   | Describes the antibody isotype. Please write out any symbols. (e.g. IgG, IgG1, IgG1 kappa)|
| host                     | This is the species that was used to generate the antibody (e.g. mouse, rabbit, etc). |
|clonality| This will be either Monoclonal or Polyclonal.If monoclonal provide the clone ID or identify the antibody as polyclonal. |
|vendor                   | This is the company that sells the antibody. |
|catalog_number           | Provides catalog number from vendor for the source of the antibody.|
|lot_number               | This is the lot number for the antibody that was validated. |
|recombinant              | Simple Yes or No if the antibody was recombinant. Recombinant antibodies (rAbs) are monoclonal antibodies which are generated in vitro using synthetic genes.|
|concentration_value      | Provides a recommended usage in standardized units (μg/mL). Numeric only (units standardized) If providing dilution instead, leave this field blank. Required field if AVR is part of an Organ Mapping Antibody Panel (OMAP). |
|dilution                 | Provides a recommended dilution factor. If providing a concentration instead, leave this field blank. 1:#### (please use colon and not a slash or backslash (e.g. 1:100, 1:50,1:2000) Required field if AVR is part of an Organ Mapping Antibody Panel (OMAP).|
|conjugate                | Specifies addition to the antibody (e.g., fluorophore, heavy metal, oligonucleotide) enabling detection, if applicable. If no conjugate, leave blank.|
|rrid                     | This can usually be found on the vendor’s website, but can also be found by searching at <a href="https://scicrunch.org/resources/Antibodies/search" target="_blank">https://scicrunch.org/resources/Antibodies/search</a> or <a href="https://antibodyregistry.org" target="_blank">htps://antibodyregistry.org</a>. If there is no RRID, you can create one here: <a href="https://scicrunch.org/resources/about/resource" target="_blank">https://scicrunch.org/resources/about/resource</a>. |
|method                   | This is the downstream assay that was used (e.g. CODEX, MIBI, etc). |
|tissue_preservation      | Preservation technique used. If fixative other than formalin, indicate the percentage of fixative indicated (e.g., 1% or 4%). Use a common abbreviation format (e.g., FFPE for formalin fixed paraffin embedded).| 
|protocol_doi            | All validation pipelines need an accompanying protocol on protocols.io. or another open protocol repository. Details the protocol used to validate the antibody, including positive and negative controls and example images. If the validation procedure is the same for all antibodies your which lab tests, then a single protocol can be used. If validation procedures differ, then different methods will need different validation protocols. |
| author_orcid            | This is needed for whomever is submitting the validation data. This will be used to differentiate the same antibodies being tested across different groups. Identifies the individual who validated the antibody used in the assay; Format ####-####-####-#### (the last digit may be X) See https://info.orcid.org/researchers/ |
| vendor_affiliation      | Identities whether the antibody validation was done by commercial entity (antibody vendor or multiplexed technology provider). Vendor name. If not applicable, please leave this field blank. (e.g. Cell Signaling Technology, Bio-Techne, Abcam, Biolegend,  Akoya Biosciences, Leica Microsystems)|
| organ          | This is the tissue that was used to acquire the validation data. This should be the same tissue that was used in the downstream assay. |
|organ_uberon              | Uberon multi-species anatomy ontology ID for organ (e.g. for kidney UBERON:0002113). Accessible via the Ontology look-up service (OLS): https://www.ebi.ac.uk/ols/search?ontology=uberon |
| antigen_retrieval        | If applicable, indicate general conditions under which  antigen retrieval was performed. Additional details should be available in the referenced protocol (see protocol_doi field).Required format: pH values; if multiple, separate by commas. |
| avr_pdf_filename         | The name of the corresponding AVR document in PDF format that this row of metadata is associated with.  This name must match the file uploaded in the Antibody PDF section of the AVR upload screen during submission. An example AVR document can be found <a href="/avr/example-avr-v2.pdf" target="_blank">here</a>.|
| omap_id                  | Unique identifier assigned to Organ Mapping Antibody Panel (OMAP) at time of publication. OMAP with number based on date created (e.g. OMAP-1, OMAP-2) (optional field)|
| cycle_number             | Identifies the cycle number in which an antibody was either applied to the tissue or, in the case of CODEX,visualized with a fluorescent reporter. For non-cyclic methods use 1 for all cycles. Required field if AVR is part of an Organ Mapping Antibody Panel (OMAP).|
|fluorescent_reporter      | For indirect visualization (e.g., oligo-conjugated antibodies), define the fluorescent reporter utilized in the corresponding cycle. For metal or fluorophore-conjugated antibodies, please leave blank. Required field if AVR is part of an Organ Mapping Antibody Panel (OMAP).|
