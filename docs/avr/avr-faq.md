---
layout: page
---

## Table of Contents
  1. **[General AVR Questions](#general-avr-questions)**
      1. [What is an antibody validation report?](#what-is-an-antibody-validation-report)
      2. [How are antibodies validated within HuBMAP?](#how-are-antibodies-validated-within-hubmap)
      3. [How can I access, search and browse existing AVRs?](#how-can-i-access-search-and-browse-existing-avrs)
      4. [Who should submit an AVR?](#who-should-submit-an-avr)
      5. [Can I contribute an AVR if I am not a HuBMAP member?](#can-i-contribute-an-avr-if-i-am-not-a-hubmap-member)
      6. [Can I add to or make changes to an existing AVR?](#can-i-add-to-or-make-changes-to-an-existing-avr)
      7. [Do AVRs capture species cross-reactivity?](#do-avrs-capture-species-cross-reactivity)
      8. [Is there a working group that I may join to support authoring an Organ Mapping Antibody Panel and submitting AVRs?](#is-there-a-working-group-that-i-may-join-to-support-authoring-an-organ-mapping-antibody-panel-and-submitting-avrs)
      9. [How do I cite an AVR?](#how-do-i-cite-an-avr)
  2. **[Submitting AVRs](#submitting-avrs)**
      1. [How do I complete an AVR?](#how-do-i-complete-an-avr)
      2. [How do I upload AVRs? ](#how-do-i-upload-avrs)
      3. [Should every antibody in an OMAP have a corresponding AVR?](#should-every-antibody-in-an-omap-have-a-corresponding-avr)
      4. [Should I fill out an AVR for antibodies that work but are not included in an OMAP?](#should-i-fill-out-an-avr-for-antibodies-that-work-but-are-not-included-in-an-omap)
      5. [Should I fill out an AVR for antibodies that do not work for an imaging platform or tissue?](#should-i-fill-out-an-avr-for-antibodies-that-do-not-work-for-an-imaging-platform-or-tissue)


# Frequently Asked Questions (FAQ) for Antibody Validation Reports (AVRs)

## General AVR Questions

### What is an antibody validation report?
AVRs provide details on the characterization of individual antibodies for multiplexed antibody-based imaging assays and capture information that many journals request for manuscript submission. These details include target information, UniProt accession number, target name, Research Resource Identifiers (RRID), host organism, vendor, catalog number, and lot number. These reports provide details on controls used for characterization (positive and negative tissues, cell lines, isotype controls, etc), exemplar imaging data, and information on other antibodies tested. HuBMAP characterization data is specific to multiplexed imaging and goes beyond the information typically provided by the manufacturer, including considerations such as direct conjugation and cycling effects. The report format is a PDF that additionally includes a link to the specific validation protocol used for characterization on Protocols.io, (required for HuBMAP members) or other protocol repositories (non-HuBMAP members).
    
### How are antibodies validated within HuBMAP?
Antibodies for multiplexed imaging assays are first selected based on literature reports demonstrating their use in immunofluorescence (IF) and immunohistochemistry (IHC) studies. On average, 2-3 antibodies per biomarker are evaluated for their performance in the intended downstream assay. HuBMAP recommends qualitative assessment criteria to include the following:
•	Antibody Specificity: The spatial pattern and localization are as expected based on validation data from the vendor and descriptions from literature, e.g., antibody labels the expected cell types and subcellular compartment and colocalizes with orthogonal antibodies. Lastly, background signals from non-specific binding/fluorescence artifacts should be qualitatively assessed using positive and negative control tissues.
•	Antibody Sensitivity: The signal-to-noise ratio for each antibody should be assessed based on the threshold level of all imaging data collected for validation, antibody concentration, and microscope acquisition settings.
•	When 2 or 3 antibodies from different vendors are compared, the same display threshold should be applied to comparable regions or field of views (FOVs) from serial sections. This practice ensures that antibody sensitivity and specificity are evaluated on similar cell types and anatomical structures in the tissue of interest. 
•	Images obtained from positive and/or negative control slides should be assessed simultaneously to interpret antibody specificity.
•	Antibody Reproducibility: Antibody performance is determined to be consistent across multiple experiments and internal users. Minimal lot-to-lot variability is observed with polyclonal antibodies.

More details can be found in a Nature Methods primer authored by HuBMAP members (Hickey et al. 2021). 

### How can I access, search and browse existing AVRs?
The current AVR database, HuBMAP AVR Search, allows antibodies to be queried by fields including clone, RRID, catalog number, organ/tissue, HuBMAP platform, and Organ Mapping Antibody Panel (OMAP) ID. AVRs may be viewed in the browser or downloaded as PDFs.

### Who should submit an AVR?
We ask that all Organ Mapping Antibody Panel (OMAP) authors submit an AVR for each antibody in their panel. In addition, we welcome AVRs from users of all antibody-based imaging assays, including vendors. AVR authors do not need to be affiliated with HuBMAP (See Q3). Beginning in 2023, we are excited to open AVR contributions to the larger community and welcome contributions from industry leaders and technology developers in the spatial biology field. We hope that the HuBMAP AVR Portal will provide a valuable resource for all. 

### Can I contribute an AVR if I am not a HuBMAP member?
AVR authors do not need to be affiliated with HuBMAP; however, at this time we ask that you reach out to the Lead AVR Assembly Contact listed in Table 1 of the SOP: Constructing Antibody Validation Reports (AVRs). Instructions for completing an AVR can be found in “SOP: Constructing Antibody Validation Reports (AVRs)”.

### Can I add to or make changes to an existing AVR?
No, not at this time. Please carefully review your AVR before submission. In certain circumstances, we will accept revised AVRs that correct minor changes such as typos. Please reach out to the Lead AVR Assembly Contact listed in Table 1 of the “SOP: Constructing Antibody Validation Reports (AVRs)” when you are ready to upload. In the future, we will allow AVRs to be edited as antibodies are characterized in other tissues. 

### Do AVRs capture species cross-reactivity?
No, not at this time. Information on species cross-reactivity can be found in the links to vendor datasheets within the AVR. 

### Is there a working group that I may join to support authoring an Organ Mapping Antibody Panel and submitting AVRs?
Yes, please join the Affinity Reagents Working Group by completing this form to indicate your interest:  https://forms.gle/Y2TVAcadSNn8Tdks7 .

### How do I cite an AVR?
Please refer to an AVR by its unique AVR ID (e.g. AVR-1, AVR-2) and cite an AVR using the digital object identifier (DOI) assigned to each AVR Document. If your AVR is supporting an OMAP, please also refer to the OMAP ID that it supports.

## Submitting AVRs

### How do I complete an AVR?
Please see Table 2a and 2b in SOP: Constructing Antibody Validation Reports (AVRs) for details on how to complete metadata fields and on the [AVR header/metadata page](/avr/csv-format.html)

### How do I upload AVRs?
If you are a HuBMAP member, you may upload AVRs using the AVR Upload Page (login required). Detailed directions for upload can be found here. If there are questions at any point of submission, please reach out to the Lead AVR Assembly Contact listed in that SOP when you are ready to upload. 

### Should every antibody in an OMAP have a corresponding AVR?
Yes, beginning in 2023 all antibodies included in an OMAP should have an AVR. AVRs and OMAPs are designed to be integrated based on common fields. 

### Should I fill out an AVR for antibodies that work but are not included in an OMAP?
This is encouraged but not required. Alternatively, you may provide this information in the AVR section titled Section IV Validation Data: Other antibodies tested. 

### Should I fill out an AVR for antibodies that do not work for an imaging platform or tissue?
No, no additional report is needed for antibodies that do not work for your imaging platform or tissue. Instead, we ask that you list antibodies that are not recommended and/or alternative candidates (different clone and/or conjugate) in the AVR associated with your validated antibody. You may provide this information in the AVR section titled Section IV Validation Data: Other antibodies tested.
